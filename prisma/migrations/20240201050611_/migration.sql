-- CreateTable
CREATE TABLE "Pal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "en_name" TEXT,
    "desc" TEXT,
    "type1" TEXT,
    "type2" TEXT,
    "stat" JSONB,

    CONSTRAINT "Pal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drop" (
    "item" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "amount" TEXT NOT NULL,
    "palName" TEXT NOT NULL,

    CONSTRAINT "Drop_pkey" PRIMARY KEY ("palName")
);

-- CreateTable
CREATE TABLE "Location" (
    "palName" TEXT NOT NULL,
    "day" JSONB,
    "night" JSONB,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("palName")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pal_name_key" ON "Pal"("name");

-- AddForeignKey
ALTER TABLE "Drop" ADD CONSTRAINT "Drop_palName_fkey" FOREIGN KEY ("palName") REFERENCES "Pal"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_palName_fkey" FOREIGN KEY ("palName") REFERENCES "Pal"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
