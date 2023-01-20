-- CreateTable
CREATE TABLE "Poll" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "colorScheme" TEXT NOT NULL,
    "hideVotes" BOOLEAN NOT NULL,
    "anonymousVotes" BOOLEAN NOT NULL,
    "backgroundURL" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "votes" INTEGER NOT NULL,
    "pollId" INTEGER NOT NULL,
    CONSTRAINT "Question_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
