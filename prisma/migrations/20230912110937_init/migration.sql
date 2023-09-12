-- CreateTable
CREATE TABLE "VisitCounter" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "VisitCounter_pkey" PRIMARY KEY ("id")
);
