
import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
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
      trim: true,
    },

    mobileNumber: {
      type: String,
      default: null,
      trim: true,
    },

    password: {
      type: String,
      default: undefined,
    },

    role: {
      type: String,
      enum: [
        "user",
        "owner",
        "agent",
        "builder",
        "investor",
        "admin",
      ],
      default: "user",
    },

    firebaseUid: {
      type: String,
      unique: true,
      sparse: true,
      default: undefined,
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Auth", authSchema);
