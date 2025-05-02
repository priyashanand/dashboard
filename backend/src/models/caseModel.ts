import mongoose from "mongoose";
import { ICase, ITask } from "../interfaces/case.interface";

export interface ITaskDocument extends ITask, Document {}

const {Schema} = mongoose;

const taskSchema = new Schema({
  taskTitle: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required:true,
    enum: ["pending", "in-progress", "completed"],
    default:"in-progress" 
  },
  description: {
    type: String,
    required:false,
    default:''
  },
  docs: {
    type: [String],
    required:true,
    default:[]
  },
});


export interface ICaseDocument extends ICase, Document {}

const caseSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  phone:{
    type: String,
    required: true,
  },
  gender:{
    type: String,
    required:true,
    enum: ["male", "female", "other"],
  },
  dob:{
    type:Date,
    required:true,
  },
  streetAddress:{
    type:String,
    required:true,
  },
  status:{
    type:String,
    required:true,
    enum: ["accepted", "archived", "inProcess"],
    default: "inProcess"
  },
  tasks: {
    type:[taskSchema],
    required:true,
    default:[]
  }
})

const Case = mongoose.model<ICaseDocument>("Case", caseSchema);

export default Case;