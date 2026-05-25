import { Schema, model } from "mongoose";

const technicalQuestionSchema = new Schema(
  {
    question: {
      type: String,
      required: [true, "Technical question is required"],
    },
    intention: { type: String, required: [true, "Intention is required"] },
    answer: { type: String, required: [true, "Answer is required"] },
  },
  { _id: false },
);

const behavioralQuestionSchema = new Schema(
  {
    question: {
      type: String,
      required: [true, "Behavioral question is required"],
    },
    intention: { type: String, required: [true, "Intention is required"] },
    answer: { type: String, required: [true, "Answer is required"] },
  },
  { _id: false },
);

const skillGapsSchema = new Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is required"],
    },
  },
  { _id: false },
);

const preparationPlanSchema = new Schema(
  {
    day: {
      type: Number,
      required: [true, "Day is required"],
    },
    focus: { type: String, required: [true, "Focus is required"] },
    tasks: [{ type: String, required: [true, "Tasks are required"] }],
  },
  { _id: false },
);

const interviewReportSchema = new Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
    },
    resume: { type: String },
    selfDescription: { type: String },
    matchScore: { type: Number, min: 0, max: 100 },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapsSchema],
    preparationPlan: [preparationPlanSchema],
  },
  { timestamps: true },
);

const interviewReportModel = model("interviewReport", interviewReportSchema);

export default interviewReportModel;
