import mongoose, { Document, Schema as MongooseSchema } from "mongoose";
import { ICase, ITask } from "../interfaces/case.interface";

export interface ITaskDocument extends ITask {}

const taskSchema = new MongooseSchema<ITaskDocument>({
  taskTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  indStatus: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "in-progress",
  },
  docs: {
    type: [String],
    required: true,
    default: [],
  },
});

interface NameSchema {
  type: string;
  indStatus: 'pending' | 'in-progress' | 'completed';
}

const nameSchema = new MongooseSchema<NameSchema>({
  type: {
    type: String,
    default: ''
  },
  indStatus: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
}, { _id: false }); // Disable _id for sub-documents

interface EmailSchema {
  type: string;
  indStatus: 'pending' | 'in-progress' | 'completed';
}

const emailSchema = new MongooseSchema<EmailSchema>({
  type: {
    type: String,
    default: ''
  },
  indStatus: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
}, { _id: false });

interface PhoneSchema {
  type: string;
  indStatus: 'pending' | 'in-progress' | 'completed';
}

const phoneSchema = new MongooseSchema<PhoneSchema>({
  type: {
    type: String,
    default: ''
  },
  indStatus: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
}, { _id: false });

interface GenderSchema {
  type: 'male' | 'female' | 'other';
  indStatus: 'pending' | 'in-progress' | 'completed';
}

const genderSchema = new MongooseSchema<GenderSchema>({
  type: {
    type: String,
    enum: ["male", "female", "other"],
    default:"male"
  },
  indStatus: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
}, { _id: false });

interface DobSchema {
  type: Date;
  indStatus: 'pending' | 'in-progress' | 'completed';
}

const dobSchema = new MongooseSchema<DobSchema>({
  type: {
    type: Date,
    default: new Date('0001-01-01'),
  },
  indStatus: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
}, { _id: false });

interface StreetAddressSchema {
  type: string;
  indStatus: 'pending' | 'in-progress' | 'completed';
}

const streetAddressSchema = new MongooseSchema<StreetAddressSchema>({
  type: {
    type: String,
    default: ''
  },
  indStatus: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
}, { _id: false });

export interface ICaseDocument extends ICase, Document {}

const caseSchema = new MongooseSchema<ICaseDocument>({
  name: {
    type: nameSchema,
  },
  email: {
    type: emailSchema,
  },
  phone: {
    type: phoneSchema,
  },
  gender: {
    type: genderSchema,
  },
  dob: {
    type: dobSchema,
  },
  streetAddress: {
    type: streetAddressSchema,
  },
  status: {
    type: String,
    required: true,
    enum: ["accepted", "archived", "inProcess"],
    default: "inProcess",
  },
  tasks: {
    type: [taskSchema],
    required: true,
    default: [],
  },
});

const Case = mongoose.model<ICaseDocument>("Case", caseSchema);

export default Case;