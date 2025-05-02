import mongoose from "mongoose";
import { IProvider, ILocation } from "../interfaces/provider.interface";

const { Schema } = mongoose;

// Define Location interface and Mongoose Document type
export interface ILocationDocument extends ILocation, Document {}

// Location sub-schema
const locationSchema = new Schema({
  street: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  zipCode: {
    type: String,
  },
});

// Define Provider interface and Mongoose Document type
export interface IProviderDocument extends IProvider, Document {}

// Main Provider schema
const providerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
  },
  address: [locationSchema], // Array of embedded location sub-documents
});

// Export Provider model
const Provider = mongoose.model<IProviderDocument>("Provider", providerSchema);

export default Provider;
