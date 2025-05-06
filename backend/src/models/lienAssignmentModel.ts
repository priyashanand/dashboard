import mongoose, { Document, Schema } from "mongoose";

// Document interface
export interface ILienAssignment extends Document {
  caseId: mongoose.Types.ObjectId;
  providerIds: mongoose.Types.ObjectId[];
  billAmount?: number;
  reducedAmount?: number;
  lienOffer?: number;
  lienOfferStatus?: "pending" | "in-progress" | "completed";
  treatmentStatus?: "pending" | "in-progress" | "completed";
  medicalRecords?: string[];
  bills?: string[];
}

// Schema definition
const lienAssignmentSchema = new Schema<ILienAssignment>({
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case",
    required: true,
  },
  providerIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },
  ],
  billAmount: {
    type: Number,
  },
  reducedAmount: {
    type: Number,
  },
  lienOffer: {
    type: Number,
  },
  lienOfferStatus: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  treatmentStatus: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  medicalRecords: [
    {
      type: String,
    },
  ],
  bills: [
    {
      type: String,
    },
  ],
}, {
  timestamps: true,
});

// Model export
const LienAssignment = mongoose.model<ILienAssignment>("LienAssignment", lienAssignmentSchema);

export default LienAssignment;
