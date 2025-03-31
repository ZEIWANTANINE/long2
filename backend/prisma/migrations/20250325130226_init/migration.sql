BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Teacher] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [teacherCode] NVARCHAR(1000) NOT NULL,
    [faculty] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Teacher_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Teacher_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[Researcher] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [researchField] NVARCHAR(1000) NOT NULL,
    [organization] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Researcher_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Researcher_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[Admin] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [permissions] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Admin_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Admin_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Teacher] ADD CONSTRAINT [Teacher_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Researcher] ADD CONSTRAINT [Researcher_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Admin] ADD CONSTRAINT [Admin_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
