import { TagComponent } from "./TagComponent.js";
import { LiComponent } from "./LiComponent.js";


export const UlComponent = {

  tagStlye : ()=>{
  
    return TagComponent("ul","")
  
  },
  
  reactStyle : (incommingData) => {
  
    return `
      <ul>
        ${LiComponent(incommingData)}
      </ul>
    `
  }


}

