"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { writeFile, mkdir } from "node:fs/promises"
import { join } from "node:path"

export async function saveProperty(propertyId: string | null, formData: FormData) {
  const session = await auth()

  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized access. Admin role required.")
  }

  // Generate a new ID if creating, use the provided one if editing
  const id = propertyId || crypto.randomUUID()
  const title = formData.get("title") as string
  const location = formData.get("location") as string
  const price = parseFloat(formData.get("price") as string) || 0
  const beds = parseFloat(formData.get("beds") as string) || 0
  const baths = parseFloat(formData.get("baths") as string) || 0
  const area = parseFloat(formData.get("area") as string) || 0
  const type = formData.get("type") as string
  const status = formData.get("status") as string
  const description = formData.get("description") as string
  const badge = formData.get("badge") as string || ""
  const isFeatured = formData.get("isFeatured") === "on"
  
  // Basic validation
  if (!title || !price) {
    throw new Error("Title and Price are required fields.")
  }

  // Create slug from title
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")

  // Ensure upload directory exists
  const uploadDir = join(process.cwd(), "public/uploads")
  try {
    await mkdir(uploadDir, { recursive: true })
  } catch (err) {
    // Ignore error if directory already exists
  }

  // Handle Image Uploads
  const images = formData.getAll("images") as File[]
  const validImages = images.filter(img => img.size > 0 && img.name)
  
  const savedImages: { url: string; alt: string }[] = []

  for (const img of validImages) {
    const bytes = await img.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const ext = img.name.split('.').pop()
    const filename = `${uniqueSuffix}.${ext}`
    
    const filepath = join(uploadDir, filename)
    await writeFile(filepath, buffer)

    savedImages.push({
      url: `/uploads/${filename}`,
      alt: title
    })
  }

  // Delete existing images to be replaced by new ones if they are uploaded
  // Optional depending on your logic, but typical for simple form replacements
  if (propertyId && savedImages.length > 0) {
    await prisma.propertyImage.deleteMany({
      where: { propertyId: id }
    })
  }

  const existingImagesObj = await prisma.propertyImage.findMany({ where: { propertyId: id }});
  const hasImagesToSave = savedImages.length > 0;
  
  const imageData = hasImagesToSave ? {
     create: savedImages.map(img => ({
        url: img.url,
        alt: img.alt
     }))
  } : undefined;

  // Insert or Update the property
  const property = await prisma.property.upsert({
    where: { id },
    update: {
      title,
      location,
      price,
      beds,
      baths,
      area,
      type,
      status,
      description,
      badge,
      isFeatured,
      slug,
      ...(hasImagesToSave && { images: imageData })
    },
    create: {
      id,
      title,
      location,
      price,
      beds,
      baths,
      area,
      type,
      status,
      description,
      badge,
      isFeatured,
      slug,
      images: imageData
    }
  })

  revalidatePath("/admin/properties")
  revalidatePath("/properties")
  revalidatePath("/")

  return { success: true, id: property.id }
}

export async function deleteProperty(propertyId: string) {
  const session = await auth()

  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized access. Admin role required.")
  }

  await prisma.property.delete({
    where: { id: propertyId }
  })

  revalidatePath("/admin/properties")
  revalidatePath("/properties")
  revalidatePath("/")
  
  return { success: true }
}
