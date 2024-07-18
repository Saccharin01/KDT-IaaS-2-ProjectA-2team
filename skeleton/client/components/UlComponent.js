import { TagComponent } from "./TagComponent.js";
import { LiComponent } from "./LiComponent.js";


export const UlComponent = {

  tagStlye : ()=>{
  
    return TagComponent("ul","")
  
  },
  
  reactStyle : (incommingData) => {

    let innerString = ""

      for(let element of incommingData){
        innerString += LiComponent(`제목 : ${element.title}, 저자 : ${element.author}`)
      }

    return `
      <ul>
        ${innerString}
      </ul>
    `
  }


}

