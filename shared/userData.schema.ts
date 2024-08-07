import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDataDocument = UserData & Document;

@Schema()
export class UserData {
  @Prop({ required: true })
  userId: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  nickName: string;
  @Prop()
  budget: number;
}

export const UserDataSchema = SchemaFactory.createForClass(UserData);
