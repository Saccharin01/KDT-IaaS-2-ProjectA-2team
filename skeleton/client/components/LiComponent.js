import { TagComponent } from "./TagComponent.js";

export const LiComponent = (incommingData)=>{

   let liString = ""

  for(let element of incommingData){

    liString += TagComponent("li",`제목 : ${element.title}, 저자 : ${element.author}`)

  }
  return liString
}