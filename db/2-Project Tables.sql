

CREATE TABLE "Campus" (
    "Id" serial NOT NULL,
    "Name" text NULL,
    CONSTRAINT "PK_Campus" PRIMARY KEY ("Id")
);

CREATE TABLE "Category" (
    "Id" serial NOT NULL,
    "Name" text NULL,
    CONSTRAINT "PK_Category" PRIMARY KEY ("Id")
);

CREATE TABLE "ProjectStatus" (
    "Id" serial NOT NULL,
    "Name" text NULL,
    CONSTRAINT "PK_ProjectStatus" PRIMARY KEY ("Id")
);

CREATE TABLE "Stage" (
    "Id" serial NOT NULL,
    "Title" text NULL,
    "Description" text NULL,
    CONSTRAINT "PK_Stage" PRIMARY KEY ("Id")
);

CREATE TABLE "Project" (
    "Id" serial NOT NULL,
    "Partner" text NULL,
    "Description" text NULL,
    "CurriculumConsultant" text NULL,
    "StartDate" timestamp without time zone NOT NULL,
    "EndDate" timestamp without time zone NOT NULL,
    "Value" numeric NOT NULL,
    "StatusId" integer NULL,
    "CategoryId" integer NULL,
    "CampusId" integer NULL,
    CONSTRAINT "PK_Project" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Project_Campus_CampusId" FOREIGN KEY ("CampusId") REFERENCES "Campus" ("Id") ON DELETE RESTRICT,
    CONSTRAINT "FK_Project_Category_CategoryId" FOREIGN KEY ("CategoryId") REFERENCES "Category" ("Id") ON DELETE RESTRICT,
    CONSTRAINT "FK_Project_ProjectStatus_StatusId" FOREIGN KEY ("StatusId") REFERENCES "ProjectStatus" ("Id") ON DELETE RESTRICT
);

CREATE TABLE "Checkpoint" (
    "Id" serial NOT NULL,
    "Description" text NULL,
    "Completed" boolean NOT NULL,
    "DueDate" timestamp without time zone NOT NULL,
    "StageId" integer NOT NULL,
    CONSTRAINT "PK_Checkpoint" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Checkpoint_Stage_StageId" FOREIGN KEY ("StageId") REFERENCES "Stage" ("Id") ON DELETE CASCADE
);

CREATE TABLE "Note" (
    "Id" serial NOT NULL,
    "Content" text NULL,
    "Timestamp" timestamp without time zone NOT NULL,
    "ProjectId" integer NOT NULL,
    CONSTRAINT "PK_Note" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Note_Project_ProjectId" FOREIGN KEY ("ProjectId") REFERENCES "Project" ("Id") ON DELETE CASCADE
);

CREATE TABLE "ProjectStage" (
    "ProjectId" integer NOT NULL,
    "StageId" integer NOT NULL,
    CONSTRAINT "PK_ProjectStage" PRIMARY KEY ("ProjectId", "StageId"),
    CONSTRAINT "FK_ProjectStage_Project_ProjectId" FOREIGN KEY ("ProjectId") REFERENCES "Project" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_ProjectStage_Stage_StageId" FOREIGN KEY ("StageId") REFERENCES "Stage" ("Id") ON DELETE CASCADE
);


CREATE INDEX "IX_Checkpoint_StageId" ON "Checkpoint" ("StageId");

CREATE INDEX "IX_Note_ProjectId" ON "Note" ("ProjectId");

CREATE INDEX "IX_Project_CampusId" ON "Project" ("CampusId");

CREATE INDEX "IX_Project_CategoryId" ON "Project" ("CategoryId");

CREATE INDEX "IX_Project_StatusId" ON "Project" ("StatusId");

CREATE INDEX "IX_ProjectStage_StageId" ON "ProjectStage" ("StageId");


