import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      select: false,
    },

    googleId: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    status: {
      type: String,
      enum: ["active", "blocked", "inactive"],
      default: "active",
      index: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    resetToken: {
      type: String,
      default: "",
      select: false,
    },
    expiryToken: {
      type: Date,
    },
    //yeh purchasedPaper jab used hoga jab user koi paper kardiga toh us paper ki id store hogi
    purchasedPapers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Paper",
      },
    ],
    //Ye tab use hota hai jab:
    // User UPI se payment karta hai
    // hum manually check karte ho
    // Fir approve ya reject karte ho
    pendingPayments: [
      {
        paper: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Paper",
        },
        transactionId: String,
        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
      },
    ],
  },
  { timestamps: true },
);

userSchema.index({ isDeleted: 1, status: 1 });

const User = model("User", userSchema);

export default User;
