/*
  Warnings:

  - You are about to drop the column `anonymousVotes` on the `Poll` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Poll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Poll` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Poll" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "colorScheme" TEXT NOT NULL,
    "hideVotes" BOOLEAN NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "backgroundURL" TEXT NOT NULL
);
INSERT INTO "new_Poll" ("backgroundURL", "colorScheme", "hideVotes", "id", "title") SELECT "backgroundURL", "colorScheme", "hideVotes", "id", "title" FROM "Poll";
DROP TABLE "Poll";
ALTER TABLE "new_Poll" RENAME TO "Poll";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
