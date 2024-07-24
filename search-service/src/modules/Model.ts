import mongoose from 'mongoose'
import { BookSchema } from './Schema'
import * as dotenv from "dotenv"

dotenv.config()
const name = process.env.MODEL_NAME


export const BookModel = mongoose.model(name,BookSchema)