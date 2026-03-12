BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[properties] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [location] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [beds] FLOAT(53) NOT NULL,
    [baths] FLOAT(53) NOT NULL,
    [area] FLOAT(53) NOT NULL,
    [image_url] NVARCHAR(1000) NOT NULL,
    [badge] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [is_featured] BIT NOT NULL CONSTRAINT [properties_is_featured_df] DEFAULT 0,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [properties_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [properties_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
