import mongoose from 'mongoose'
import { BookSchema } from './Schema'
import * as dotEnv from 'dotEnv'


dotEnv.config()
const name = process.env.MODEL_NAME


export const BookModel = mongoose.model(name,BookSchema,name)