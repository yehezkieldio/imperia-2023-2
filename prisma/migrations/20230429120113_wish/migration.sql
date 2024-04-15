-- CreateTable
CREATE TABLE "wishes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" INTEGER NOT NULL DEFAULT 1,
    "rarityWeight" JSONB,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "wishes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wish_history" (
    "id" TEXT NOT NULL,
    "rarity" "RarityType" NOT NULL,
    "isSoftPity" BOOLEAN NOT NULL,
    "isHardPity" BOOLEAN NOT NULL,
    "cardId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "wishId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wish_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CardToWish" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "wishes_name_idx" ON "wishes"("name");

-- CreateIndex
CREATE INDEX "wish_history_rarity_userId_wishId_idx" ON "wish_history"("rarity", "userId", "wishId");

-- CreateIndex
CREATE UNIQUE INDEX "_CardToWish_AB_unique" ON "_CardToWish"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToWish_B_index" ON "_CardToWish"("B");

-- AddForeignKey
ALTER TABLE "wish_history" ADD CONSTRAINT "wish_history_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wish_history" ADD CONSTRAINT "wish_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wish_history" ADD CONSTRAINT "wish_history_wishId_fkey" FOREIGN KEY ("wishId") REFERENCES "wishes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToWish" ADD CONSTRAINT "_CardToWish_A_fkey" FOREIGN KEY ("A") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToWish" ADD CONSTRAINT "_CardToWish_B_fkey" FOREIGN KEY ("B") REFERENCES "wishes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
