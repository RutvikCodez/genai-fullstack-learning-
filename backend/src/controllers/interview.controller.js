import { PDFParse } from "pdf-parse";
import { generateInterviewReport } from "../services/ai.service";
import interviewReportModel from "../models/interviewReport.model";

export const generateInterviewReportController = async (req, res) => {
  const resumeFile = req.file;
  const { selfDescription, jobDescription } = req.body;

  const resumeContent = PDFParse(req.file.buffer);

  const interviewReportByAi = await generateInterviewReport(
    resumeContent,
    selfDescription,
    jobDescription,
  );

  const interviewReport = await interviewReportModel.create({
    user: req.user._id,
    resume: resumeContent,
    selfDescription,
    jobDescription,
    ...interviewReportByAi,
  });

  res.status(200).json({
    message: "Interview report generated successfully",
    interviewReport,
  });
};
