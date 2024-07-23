import mongoose from "mongoose";
import { BookSchema } from "./Schema";
import { SearchDTO } from "@shared/SearchDTO";

/**
 * 
 * @param modelName 
 * @param query 
 * @returns 
 */



export const searchBooks = async (modelName: string, query: string): Promise<any> => {
  const model = mongoose.model(modelName, BookSchema, modelName);
  const searchRegex = new RegExp(query, 'i'); // 대소문자 구분 없이 검색
  
  try {
    const data = await model.find({ title: { $regex: searchRegex } });
    console.log('Found data:', data);
    return data;
  } catch (err) {
    console.error('Error fetching books:', err);
    throw err; // 에러 발생 시 프로미스를 reject 상태로 만듭니다.
  }
};
