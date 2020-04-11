ALTER TABLE "Checkpoint"
  DROP COLUMN "Completed",
  DROP COLUMN "DueDate";

DROP TABLE IF EXISTS "ProjectStage";

CREATE TABLE "ProjectCheckpoint" (
    "ProjectId" integer NOT NULL,
    "CheckpointId" int NOT NULL,
    "Completed" boolean,
    "DueDate" timestamp without time zone,
    CONSTRAINT "PK_ProjectCheckpoint" PRIMARY KEY ("ProjectId", "CheckpointId"),
    CONSTRAINT "FK_ProjectCheckpoint_Project" FOREIGN KEY ("ProjectId") REFERENCES "Project" ("Id") ON DELETE RESTRICT,
    CONSTRAINT "FK_ProjectCheckpoint_Checkpoint" FOREIGN KEY ("CheckpointId") REFERENCES "Checkpoint" ("Id") ON DELETE RESTRICT
);

