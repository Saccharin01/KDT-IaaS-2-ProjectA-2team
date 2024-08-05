import * as mongoose from 'mongoose';
export const DataBaseSetting = {
  url: 'mongodb+srv://chousik01:70318202@cluster0.mmiiheq.mongodb.net/',
  name: 'testDataBase',
};

// Test 인터페이스 정의
export interface IName extends Document {
  name: string;
}

export const TestSchema = new mongoose.Schema<IName>({
  name: { type: String, required: true },
});