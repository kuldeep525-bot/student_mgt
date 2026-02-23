import mongoose from "mongoose";

const paperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    questionPdf: {
      type: String,
      required: true,
    },
    answerPdf: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 10,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Paper = new mongoose.model("Paper", paperSchema);
export default Paper;
