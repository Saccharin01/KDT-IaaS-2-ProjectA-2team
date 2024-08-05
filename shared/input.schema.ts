import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InputDocument = Input & Document;

@Schema()
export class Input {
  @Prop({ required: true })
  input: string;
}

export const InputSchema = SchemaFactory.createForClass(Input);