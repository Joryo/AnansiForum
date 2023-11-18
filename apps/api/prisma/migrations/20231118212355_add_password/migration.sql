/*
  Warnings:

  - Added the required column `password` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Member" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL
);
INSERT INTO "new_Member" ("createdAt", "email", "id", "name", "role", "updatedAt") SELECT "createdAt", "email", "id", "name", "role", "updatedAt" FROM "Member";
DROP TABLE "Member";
ALTER TABLE "new_Member" RENAME TO "Member";
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
