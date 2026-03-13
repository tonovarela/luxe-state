import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper function to create slugs
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Image Pools from Unsplash (Premium/Luxury Vibe)
const livingRooms = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',
  'https://images.unsplash.com/photo-1600607687931-cebf667c2e53',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',
  'https://images.unsplash.com/photo-1600566753086-00f18efc2291',
  'https://images.unsplash.com/photo-1600121848594-d8644e57abab',
];

const kitchens = [
  'https://images.unsplash.com/photo-1600566753158-f2495af44234',
  'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4',
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f',
  'https://images.unsplash.com/photo-1556912177-c5405710a184',
];

const bedrooms = [
  'https://images.unsplash.com/photo-1616594831210-911220-e15b29be8c8f',
  'https://images.unsplash.com/photo-1617331140180-e8262094733a',
  'https://images.unsplash.com/photo-1505691938895-1758d7eaa511',
  'https://images.unsplash.com/photo-1540518614846-7eded433c457',
];

const bathrooms = [
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a',
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14',
  'https://images.unsplash.com/photo-1620626011761-9963d7b6973e',
];

const outdoor = [
  'https://images.unsplash.com/photo-1600607687644-c7112f42a981',
  'https://images.unsplash.com/photo-1600585154526-990d0d1e3d93',
  'https://images.unsplash.com/photo-1613490900794-7e9a41c19b3a',
];

function getRandomImages(count: number) {
  const pools = [livingRooms, kitchens, bedrooms, bathrooms, outdoor];
  const selected: string[] = [];
  
  // Pick one from each pool if possible to ensure variety
  for (let i = 0; i < count; i++) {
    const pool = pools[i % pools.length];
    const img = pool[Math.floor(Math.random() * pool.length)];
    // Add Unsplash optimization params
    selected.push(`${img}?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1200`);
  }
  return selected;
}

async function main() {
  const propertiesData = [
    { id: 'p1', title: 'The Glass Pavilion', location: 'Beverly Hills, California', price: 5250000, beds: 5, baths: 4.5, area: 4200, latitude: 34.0736, longitude: -118.4004, coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCra-FKp81t0_OM8bWD55m2o9OOSnR_v7D0UilyExMImxyIcr9tIMZ2Py3HcC0ra_MtSsBkduMcwxUNKI9_iSXFFr_YRON1SF9hNM3fcYy-uG7N7uusL0Z367WINi1V7_GwfNQx-gsbUqLtzVi4ivFyqFQGb4qBs79bALeSFb6i3_ZnJnI1VVrN-VeZYHjfYyQI5C6zy90N3uxWZpwzIBhNoUDKKQjQ8EOEYPoyPTzhnh6b6AS3dkkFJ8t4xSDC6qjhMrQUoUPnAeM', badge: 'Exclusive', type: 'House', status: 'For Sale', isFeatured: true },
    { id: 'p2', title: 'Azure Heights Penthouse', location: 'Downtown, Vancouver', price: 3800000, beds: 3, baths: 3, area: 2100, latitude: 49.2827, longitude: -123.1207, coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDurAGHzg_fpQxFal-obkFVy1Q3WLPdueAQpz0itcQiRV-WfvulnBEDJbNeV8J06q4mX7PTtXYVJjX4-mHVr_khZLZxQ_s8f6fruGqzeqALyMu8wEHRK1EsOs9f4_jPmS7FxcdzrDkR88Wz0GjaPLXkTZRoJQfur59rxYRLi-WYcW-VU_gKS39CPLOMlftvqGvW0IOk5tXgst5mJ4WQM-ICN4vkdel9ido9YFUQga0OI10i6NSe5W4owt33-2YRi_b_ltdZW2QZC5s', badge: 'New Arrival', type: 'Penthouse', status: 'For Sale', isFeatured: true },
    { id: 'p3', title: 'Modern Family Home', location: '123 Pine St, Seattle', price: 850000, beds: 3, baths: 2, area: 120, latitude: 47.6062, longitude: -122.3321, coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuQ9M7U6euA6_cXmYuXnej-N5IuawAW8ds-4G1mzfqmiBc13qXsPhf9_j_zTB8gfEunrBHo8xMsxYawCw_pl8fsxbxRkmyvLR1N9Tiye5ZJG7fwlLn9MwyBanXYhE0emGwp59es1FEyQTRQbmXLUKO74Yj34ZHqrqIkOtMKhP8CmRFvfoHT5LAe10105vUhKNkxIBvtt530nfLigSUTemOOcJMVNmsgactntRJUwOBU_TZzND7BYtDklr8uZcNYlQOK5U74-ufIf-E', badge: 'FOR SALE', type: 'House', status: 'For Sale', isFeatured: false },
    { id: 'p4', title: 'Urban Loft', location: '456 Elm Ave, Portland', price: 3200, beds: 1, baths: 1, area: 85, latitude: 45.5152, longitude: -122.6784, coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4zNatD3vePhIZAi6OHHJKmamYSgeBNSKjEt32tvkkf4s6aBXCF8R4LNfDfPa9leA0t6N1OKOcP358WwZrnosbCBxSM7EaY2_P7qkx3MinRgmHQn7RvleNTwy8cLigMoR3iv0u83chBVbZYI6BcNMcqv80W-l1pIUgIWZcDIXEqtUatrsojSGfM0lTNDZpkBntBUkRY6NB4ZUymYNYvTHXKbO8NZ6N6uoyuuHqcaRWKzHCNXkOR3p-_EVFAHR8QwijIY_m1mefPZ4', badge: 'FOR RENT', type: 'Apartment', status: 'For Rent', isFeatured: false },
    { id: 'p5', title: 'Highland Retreat', location: '789 Mountain Rd, Bend', price: 620000, beds: 2, baths: 2, area: 98, latitude: 44.0582, longitude: -121.3153, coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARQWC19e7mleUpjb8CWLztEv_svJeRFOaC2i-9r9GctFuX5Barzhfai9wNM1WW8bcGlqdFM32d3KPf7SItom5ijdHOz5rGGQPeT7PlWs8-y9LkfcsHLQqsLxalhxP94XJo76_mAMp7T2dVj3hPKHNzTDLLiS6ujSdSsyo3onxQthp4ZkVE8op92gyTLUUucaGaxO8vJvyhH3HuWB07EPqT1WsW0lr9Of5lUPonjG9eiqE1XiJXTqzXUZQt5JorfPwCO1MioZA_Zro', badge: 'FOR SALE', type: 'House', status: 'For Sale', isFeatured: false },
    { id: 'p6', title: 'Sea View Penthouse', location: '321 Ocean Dr, Miami', price: 4500, beds: 3, baths: 3, area: 180, latitude: 25.7617, longitude: -80.1918, coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGq4Phm0uDzCnjHAsnWpYTBVpOds_M6iOsJuRQQA5eUZHkztGgtc7eh_OE6wBeyW1-iZh7yyhROnvvmqkAZ9tyAWFGXk0FG52zU4kZ_EDLA0U0cRszy7byNXTeWe0_hS53SYmtCTEV8Y1AM-WxiIC38UMa15QwFDjXtCGQOxoh35K0Ol_70vfsxm0VqDbaWkr8tcEbLTLy0NXH_GcpGK4lAXizgxYOIlFWGyau-4OIfPZRpjCBDbz_qu3VlN201UUJGiuM9ajVd-U', badge: 'FOR RENT', type: 'Penthouse', status: 'For Rent', isFeatured: false },
    { id: 'p7', title: 'Central Studio', location: '555 Main St, Chicago', price: 550000, beds: 1, baths: 1, area: 50, latitude: 41.8781, longitude: -87.6298, coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1w-Hb1289NqZKon3VK8bpmMiCDYYiAMT5egzTINo9m9wSZRHv-k-1IGTVoL1NT8YeZXJHa87JPNDIPrtrbP7jChHq0ypXF90uByhC6VA9O788_B4FY8JVg4chbWN9bcrn9-9FvVvfZX8Aj60Iqg_C8CsCA9DEnJqi2rJvzmK5UP5z-9XRTRjBneAPCa8iGgGWBD9yYKsziN6vn0ePBDGo3inieQtmbr46W31p6UfQ649XRxTm7ygOY2J-jxW1r0qWs8i97KGpkTE', badge: 'FOR SALE', type: 'Apartment', status: 'For Sale', isFeatured: false },
    { id: 'p8', title: 'Garden Villa', location: '999 Oak Ln, Austin', price: 2800, beds: 2, baths: 2, area: 110, latitude: 30.2672, longitude: -97.7431, coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfGXdY0g51ojSg0GMeTW9ndLY3mpKK3oMtWxo2nwd_dwi1pgn1Boi_ovaDGIFhUA7nwu3WdBch8ZuHxoHu3QfgM5ceAsp8pglRVyCROWNcy9zeDNP2wqLoevyKGcaEyFYHYpIx2KK46nLWthnHiHugmkKw48kJsL8IjMO1bL3T1Zwt8bvQDTTUHTgB3GqZ2RU2asRzF1jVg0rLw3LWXXTq0YF1CsbhlWpYOuCEpH5bB8zkBlbKXR4At_M46AL8rJqn5c6BrPD5PP8', badge: 'FOR RENT', type: 'Villa', status: 'For Rent', isFeatured: false },
    { id: 'p9', title: 'Mountain View Estate', location: 'Aspen, Colorado', price: 4500000, beds: 6, baths: 5.5, area: 5500, latitude: 39.1911, longitude: -106.8175, coverUrl: 'https://images.unsplash.com/photo-1613490908736-1e94119d273a', badge: 'Exclusive', type: 'Estate', status: 'For Sale', isFeatured: false },
    { id: 'p10', title: 'Eco-Friendly Haven', location: 'Portland, Oregon', price: 950000, beds: 3, baths: 2.5, area: 1800, latitude: 45.5152, longitude: -122.6784, coverUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', badge: 'FOR SALE', type: 'House', status: 'For Sale', isFeatured: false },
    { id: 'p11', title: 'Luxury Beachfront Condo', location: 'Miami Beach, Florida', price: 12500, beds: 2, baths: 2, area: 1400, latitude: 25.7617, longitude: -80.1918, coverUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', badge: 'FOR RENT', type: 'Condo', status: 'For Rent', isFeatured: false },
    { id: 'p12', title: 'Historic Townhouse', location: 'Brooklyn, New York', price: 2100000, beds: 4, baths: 3, area: 2500, latitude: 40.6782, longitude: -73.9442, coverUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d', badge: 'FOR SALE', type: 'Townhouse', status: 'For Sale', isFeatured: false },
    { id: 'p13', title: 'Minimalist Desert Retreat', location: 'Joshua Tree, California', price: 780000, beds: 2, baths: 2, area: 1200, latitude: 34.1347, longitude: -116.3131, coverUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3', badge: 'FOR SALE', type: 'House', status: 'For Sale', isFeatured: false },
    { id: 'p14', title: 'Skyline View Apartment', location: 'Downtown, Chicago', price: 5200, beds: 2, baths: 2, area: 1100, latitude: 41.8781, longitude: -87.6298, coverUrl: 'https://images.unsplash.com/photo-1600585154526-990d0d1e3d93', badge: 'FOR RENT', type: 'Apartment', status: 'For Rent', isFeatured: false },
    { id: 'p15', title: 'Lakefront Cabin', location: 'Tahoe City, California', price: 1350000, beds: 3, baths: 2, area: 1900, latitude: 39.1673, longitude: -120.1449, coverUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9', badge: 'Exclusive', type: 'Cabin', status: 'For Sale', isFeatured: false },
    { id: 'p16', title: 'Suburban Oasis', location: 'Plano, Texas', price: 650000, beds: 4, baths: 3, area: 2800, latitude: 33.0198, longitude: -96.6989, coverUrl: 'https://images.unsplash.com/photo-1600585153246-880629729ff7', badge: 'FOR SALE', type: 'House', status: 'For Sale', isFeatured: false },
    { id: 'p17', title: 'Modern European Villa', location: 'Malibu, California', price: 8900000, beds: 5, baths: 6, area: 7200, latitude: 34.0259, longitude: -118.7798, coverUrl: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126', badge: 'New Arrival', type: 'Villa', status: 'For Sale', isFeatured: false },
    { id: 'p18', title: 'Cozy City Studio', location: 'San Francisco, California', price: 3400, beds: 1, baths: 1, area: 600, latitude: 37.7749, longitude: -122.4194, coverUrl: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83', badge: 'FOR RENT', type: 'Studio', status: 'For Rent', isFeatured: false },
    { id: 'p19', title: 'Riverfront Estate', location: 'Charleston, South Carolina', price: 3200000, beds: 5, baths: 4.5, area: 4500, latitude: 32.7765, longitude: -79.9311, coverUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233', badge: 'FOR SALE', type: 'Estate', status: 'For Sale', isFeatured: false },
    { id: 'p20', title: 'Contemporary Farmhouse', location: 'Nashville, Tennessee', price: 1100000, beds: 4, baths: 3.5, area: 3100, latitude: 36.1627, longitude: -86.7816, coverUrl: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c', badge: 'FOR SALE', type: 'House', status: 'For Sale', isFeatured: false },
    { id: 'p21', title: 'Downtown Penthouse Suite', location: 'Boston, Massachusetts', price: 15000, beds: 3, baths: 3, area: 2200, latitude: 42.3601, longitude: -71.0589, coverUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994', badge: 'Exclusive', type: 'Penthouse', status: 'For Rent', isFeatured: false },
    { id: 'p22', title: 'Rustic Mountain Lodge', location: 'Jackson Hole, Wyoming', price: 5400000, beds: 6, baths: 5, area: 6000, latitude: 43.4799, longitude: -110.7624, coverUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be', badge: 'FOR SALE', type: 'Lodge', status: 'For Sale', isFeatured: false },
    { id: 'p23', title: 'Tropical Island Villa', location: 'Maui, Hawaii', price: 7500000, beds: 4, baths: 4.5, area: 3800, latitude: 20.7984, longitude: -156.3319, coverUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb', badge: 'New Arrival', type: 'Villa', status: 'For Sale', isFeatured: false },
    { id: 'p24', title: 'Chic Parisian Apartment', location: 'Paris, France', price: 8500, beds: 2, baths: 1.5, area: 1000, latitude: 48.8566, longitude: 2.3522, coverUrl: 'https://images.unsplash.com/photo-1626079088806-e0e64cd8ed9a', badge: 'FOR RENT', type: 'Apartment', status: 'For Rent', isFeatured: false },
    { id: 'p25', title: 'Countryside Manor', location: 'Cotswolds, UK', price: 4200000, beds: 7, baths: 6, area: 8500, latitude: 51.8330, longitude: -1.8430, coverUrl: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b', badge: 'Exclusive', type: 'Manor', status: 'For Sale', isFeatured: false },
    { id: 'p26', title: 'Sleek Glass House', location: 'Auckland, New Zealand', price: 2900000, beds: 3, baths: 2, area: 2100, latitude: -36.8485, longitude: 174.7633, coverUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607', badge: 'FOR SALE', type: 'House', status: 'For Sale', isFeatured: false },
    { id: 'p27', title: 'Urban Micro Apartment', location: 'Tokyo, Japan', price: 1800, beds: 1, baths: 1, area: 350, latitude: 35.6762, longitude: 139.6503, coverUrl: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6', badge: 'FOR RENT', type: 'Apartment', status: 'For Rent', isFeatured: false },
    { id: 'p28', title: 'Zen Garden Home', location: 'Kyoto, Japan', price: 1400000, beds: 3, baths: 2, area: 1600, latitude: 35.0116, longitude: 135.7681, coverUrl: 'https://images.unsplash.com/photo-1501183638710-841dd1904471', badge: 'FOR SALE', type: 'House', status: 'For Sale', isFeatured: false },
    { id: 'p29', title: 'Veranda Vista', location: 'Oaxaca, Mexico', price: 450000, beds: 2, baths: 2, area: 1500, latitude: 17.0732, longitude: -96.7266, coverUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', badge: 'New Arrival', type: 'House', status: 'For Sale', isFeatured: false },
    { id: 'p30', title: 'Azure Bay Villa', location: 'Cancun, Mexico', price: 1200000, beds: 4, baths: 3.5, area: 3200, latitude: 21.1619, longitude: -86.8515, coverUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6', badge: 'Exclusive', type: 'Villa', status: 'For Sale', isFeatured: true },
    { id: 'p31', title: 'Modernist Mansion', location: 'Mexico City, Mexico', price: 2800000, beds: 5, baths: 6, area: 5500, latitude: 19.4326, longitude: -99.1332, coverUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', badge: 'FOR SALE', type: 'House', status: 'For Sale', isFeatured: false },
    { id: 'p32', title: 'Colonial Charm', location: 'San Miguel de Allende, Mexico', price: 750000, beds: 3, baths: 3, area: 2400, latitude: 20.9153, longitude: -100.7436, coverUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233', badge: 'FOR SALE', type: 'House', status: 'For Sale', isFeatured: false },
    { id: 'p33', title: 'Pacific Retreat', location: 'Puerto Vallarta, Mexico', price: 950000, beds: 3, baths: 3, area: 2800, latitude: 20.6534, longitude: -105.2253, coverUrl: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b', badge: 'FOR SALE', type: 'Villa', status: 'For Sale', isFeatured: false },
    { id: 'p34', title: 'Golden Gate View', location: 'San Francisco, California', price: 1800000, beds: 2, baths: 2, area: 1500, latitude: 37.7749, longitude: -122.4194, coverUrl: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83', badge: 'FOR SALE', type: 'Apartment', status: 'For Sale', isFeatured: false },
    { id: 'p35', title: 'Soho Loft', location: 'New York, NY', price: 3500000, beds: 2, baths: 2, area: 1800, latitude: 40.7128, longitude: -74.0060, coverUrl: 'https://images.unsplash.com/photo-1600585154526-990d0d1e3d93', badge: 'FOR SALE', type: 'Apartment', status: 'For Sale', isFeatured: true },
    { id: 'p36', title: 'Hollywood Hills Estate', location: 'Los Angeles, California', price: 9500000, beds: 6, baths: 7, area: 8500, latitude: 34.0522, longitude: -118.2437, coverUrl: 'https://images.unsplash.com/photo-1613490908736-1e94119d273a', badge: 'Exclusive', type: 'House', status: 'For Sale', isFeatured: true },
    { id: 'p37', title: 'Lakeside Manor', location: 'Lake Tahoe, Nevada', price: 4200000, beds: 5, baths: 4, area: 4800, latitude: 39.0968, longitude: -120.0324, coverUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9', badge: 'FOR SALE', type: 'House', status: 'For Sale', isFeatured: false },
    { id: 'p38', title: 'Desert Oasis', location: 'Palm Springs, California', price: 1500000, beds: 4, baths: 3, area: 3000, latitude: 33.8303, longitude: -116.5453, coverUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3', badge: 'FOR SALE', type: 'House', status: 'For Sale', isFeatured: false },
    { id: 'p39', title: 'Alpine Chalet', location: 'Aspen, Colorado', price: 6800000, beds: 5, baths: 5, area: 5200, latitude: 39.1911, longitude: -106.8175, coverUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be', badge: 'Exclusive', type: 'House', status: 'For Sale', isFeatured: false },
    { id: 'p40', title: 'Beachfront Bungalow', location: 'Malibu, California', price: 5500000, beds: 3, baths: 3, area: 2500, latitude: 34.0259, longitude: -118.7798, coverUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb', badge: 'New Arrival', type: 'House', status: 'For Sale', isFeatured: true },
    { id: 'p41', title: 'Penthouse Palace', location: 'Las Vegas, Nevada', price: 2100000, beds: 2, baths: 2, area: 2200, latitude: 36.1699, longitude: -115.1398, coverUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994', badge: 'FOR SALE', type: 'Penthouse', status: 'For Sale', isFeatured: false },
    { id: 'p42', title: 'Historic Haven', location: 'Savannah, Georgia', price: 850000, beds: 3, baths: 2.5, area: 2800, latitude: 32.0809, longitude: -81.0912, coverUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d', badge: 'FOR SALE', type: 'House', status: 'For Sale', isFeatured: false },
    { id: 'p43', title: 'Sky High Studio', location: 'Seattle, Washington', price: 650000, beds: 1, baths: 1, area: 800, latitude: 47.6062, longitude: -122.3321, coverUrl: 'https://images.unsplash.com/photo-1626079088806-e0e64cd8ed9a', badge: 'FOR SALE', type: 'Apartment', status: 'For Sale', isFeatured: false },
    { id: 'p44', title: 'Urban Edge', location: 'Portland, Oregon', price: 720000, beds: 2, baths: 2, area: 1200, latitude: 45.5152, longitude: -122.6784, coverUrl: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6', badge: 'FOR SALE', type: 'Apartment', status: 'For Sale', isFeatured: false },
    { id: 'p45', title: 'Country Classic', location: 'Nashville, Tennessee', price: 980000, beds: 4, baths: 3, area: 3400, latitude: 36.1627, longitude: -86.7816, coverUrl: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c', badge: 'FOR SALE', type: 'House', status: 'For Sale', isFeatured: false },
    { id: 'p46', title: 'Harbor House', location: 'Boston, Massachusetts', price: 1450000, beds: 3, baths: 3, area: 2100, latitude: 42.3601, longitude: -71.0589, coverUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233', badge: 'FOR SALE', type: 'House', status: 'For Sale', isFeatured: false },
    { id: 'p47', title: 'Island Escape', location: 'Honolulu, Hawaii', price: 3200000, beds: 4, baths: 3.5, area: 3100, latitude: 21.3069, longitude: -157.8583, coverUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', badge: 'Exclusive', type: 'Villa', status: 'For Sale', isFeatured: true },
    { id: 'p48', title: 'Vineyard Villa', location: 'Napa Valley, California', price: 4800000, beds: 5, baths: 4.5, area: 5200, latitude: 38.2975, longitude: -122.2869, coverUrl: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126', badge: 'Exclusive', type: 'House', status: 'For Sale', isFeatured: false },
  ]

  for (const propertyData of propertiesData) {
    const { coverUrl, ...property } = propertyData;
    const slug = slugify(property.title);
    
    // Generate 4 unique random images + cover
    const galleryUrls = getRandomImages(4);
    
    await prisma.property.upsert({
      where: { id: property.id },
      update: {
        slug: slug,
      },
      create: {
        ...property,
        slug: slug,
        images: {
          create: [
            { url: coverUrl.includes('unsplash') ? `${coverUrl}?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1200` : coverUrl, alt: `${property.title} Exterior` },
            ...galleryUrls.map((url, idx) => ({ url, alt: `Interior ${idx + 1}` }))
          ]
        }
      },
    })
  }

  console.log(`✅ Seeded ${propertiesData.length} properties with unique images`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
