import { Router } from "express";
import { authuser } from "../middlewares/auth.middleware";
import { generateInterviewReportController } from "../controllers/interview.controller";
import { upload } from "../middlewares/file.middleware";

const interviewRouter = Router();

interviewRouter.post("/", authuser, upload.single("resume"), generateInterviewReportController);

export default interviewRouter;
