-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "idNumber" TEXT,
    "householdAddr" TEXT,
    "residentialAddr" TEXT,
    "phoneNumber" TEXT,
    "birthDate" DATETIME,
    "bankAccount" TEXT,
    "currentCompany" TEXT,
    "jobTitle" TEXT
);
INSERT INTO "new_User" ("bankAccount", "birthDate", "currentCompany", "email", "householdAddr", "id", "idNumber", "jobTitle", "name", "password", "phoneNumber", "residentialAddr") SELECT "bankAccount", "birthDate", "currentCompany", "email", "householdAddr", "id", "idNumber", "jobTitle", "name", "password", "phoneNumber", "residentialAddr" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_idNumber_key" ON "User"("idNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
