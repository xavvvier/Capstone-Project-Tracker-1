ALTER TABLE "public"."ProjectCheckpoint"
  DROP CONSTRAINT "FK_ProjectCheckpoint_Project",
  ADD CONSTRAINT "FK_ProjectCheckpoint_Project" FOREIGN KEY ("ProjectId") REFERENCES "public"."Project"("Id") ON DELETE CASCADE;