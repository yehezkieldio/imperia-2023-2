-- CreateEnum
CREATE TYPE "ElementType" AS ENUM ('FIRE', 'WATER', 'ICE', 'LIGHTNING', 'EARTH', 'NATURE', 'WIND');

-- CreateEnum
CREATE TYPE "RarityType" AS ENUM ('COMMON', 'RARE', 'SUPER_RARE', 'SPECIALLY_SUPER_RARE', 'ULTRA_RARE');

-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "element" "ElementType" NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card_base_statistics" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "hp" INTEGER NOT NULL,
    "atk" INTEGER NOT NULL,
    "def" INTEGER NOT NULL,
    "spd" INTEGER NOT NULL,
    "mana" INTEGER NOT NULL,

    CONSTRAINT "card_base_statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rarities" (
    "id" TEXT NOT NULL,
    "name" "RarityType" NOT NULL,
    "probability" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "rarities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rarity_cards" (
    "id" TEXT NOT NULL,
    "rarityId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,

    CONSTRAINT "rarity_cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "cards_name_idx" ON "cards"("name");

-- CreateIndex
CREATE UNIQUE INDEX "card_base_statistics_cardId_key" ON "card_base_statistics"("cardId");

-- CreateIndex
CREATE UNIQUE INDEX "rarities_name_key" ON "rarities"("name");

-- CreateIndex
CREATE INDEX "rarity_cards_rarityId_cardId_idx" ON "rarity_cards"("rarityId", "cardId");

-- AddForeignKey
ALTER TABLE "card_base_statistics" ADD CONSTRAINT "card_base_statistics_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rarity_cards" ADD CONSTRAINT "rarity_cards_rarityId_fkey" FOREIGN KEY ("rarityId") REFERENCES "rarities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rarity_cards" ADD CONSTRAINT "rarity_cards_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
