/*
  Warnings:

  - You are about to drop the column `badgeUrl` on the `Team` table. All the data in the column will be lost.
  - Added the required column `flag` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "badgeUrl",
ADD COLUMN     "flag" TEXT NOT NULL;
