import { Types } from "mongoose";


export interface ITask {
  _id?: Types.ObjectId;
  taskTitle: string;
  status: 'pending' | 'in-progress' | 'completed';
  description: string;
  docs: string[];
}

export interface ICase {
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  dob: Date;
  streetAddress: string;
  status: 'accepted' | 'archived' | 'inProcess';
  tasks: ITask[];
}
