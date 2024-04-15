-- CreateTable
CREATE TABLE "user_cards" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,

    CONSTRAINT "user_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rarity_user_cards" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "userCardId" TEXT NOT NULL,
    "rarityId" TEXT NOT NULL,

    CONSTRAINT "rarity_user_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_card_statistics" (
    "id" TEXT NOT NULL,
    "userCardId" TEXT NOT NULL,
    "hp" INTEGER NOT NULL,
    "atk" INTEGER NOT NULL,
    "def" INTEGER NOT NULL,
    "spd" INTEGER NOT NULL,
    "mana" INTEGER NOT NULL,

    CONSTRAINT "user_card_statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_card_progression" (
    "id" TEXT NOT NULL,
    "userCardId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "exp" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "user_card_progression_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_card_decks" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userCardId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "user_card_decks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_cards_userId_cardId_idx" ON "user_cards"("userId", "cardId");

-- CreateIndex
CREATE INDEX "rarity_user_cards_userCardId_rarityId_idx" ON "rarity_user_cards"("userCardId", "rarityId");

-- CreateIndex
CREATE UNIQUE INDEX "user_card_statistics_userCardId_key" ON "user_card_statistics"("userCardId");

-- CreateIndex
CREATE UNIQUE INDEX "user_card_progression_userCardId_key" ON "user_card_progression"("userCardId");

-- CreateIndex
CREATE INDEX "user_card_decks_userId_userCardId_idx" ON "user_card_decks"("userId", "userCardId");

-- AddForeignKey
ALTER TABLE "user_cards" ADD CONSTRAINT "user_cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_cards" ADD CONSTRAINT "user_cards_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rarity_user_cards" ADD CONSTRAINT "rarity_user_cards_userCardId_fkey" FOREIGN KEY ("userCardId") REFERENCES "user_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rarity_user_cards" ADD CONSTRAINT "rarity_user_cards_rarityId_fkey" FOREIGN KEY ("rarityId") REFERENCES "rarities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_card_statistics" ADD CONSTRAINT "user_card_statistics_userCardId_fkey" FOREIGN KEY ("userCardId") REFERENCES "rarity_user_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_card_progression" ADD CONSTRAINT "user_card_progression_userCardId_fkey" FOREIGN KEY ("userCardId") REFERENCES "rarity_user_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_card_decks" ADD CONSTRAINT "user_card_decks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_card_decks" ADD CONSTRAINT "user_card_decks_userCardId_fkey" FOREIGN KEY ("userCardId") REFERENCES "rarity_user_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
