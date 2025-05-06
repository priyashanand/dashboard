import { Types } from "mongoose";

export interface ITask {
  _id: Types.ObjectId;
  taskTitle: string;
  description: string;
  indStatus: 'pending' | 'in-progress' | 'completed';
  docs: string[];
}

export interface ICase {
  name: { type: string; indStatus?: 'pending' | 'in-progress' | 'completed' };
  email: { type: string; indStatus?: 'pending' | 'in-progress' | 'completed' };
  phone: { type: string; indStatus?: 'pending' | 'in-progress' | 'completed' };
  gender: { type: 'male' | 'female' | 'other'; indStatus?: 'pending' | 'in-progress' | 'completed' };
  dob: { type: Date; indStatus?: 'pending' | 'in-progress' | 'completed' };
  streetAddress: { type: string; indStatus?: 'pending' | 'in-progress' | 'completed' };
  status: 'accepted' | 'archived' | 'inProcess';
  tasks: ITask[];
}