import { UlComponent } from "./UlComponent.js";
import { LiComponent} from "./LiComponent.js";

export const Assembly = {


 tagAssembly :  (incommingData)=>{

    const root = document.getElementById("root")
    
    root.innerHTML = UlComponent.tagStlye()

    const ul = document.querySelector("ul")

    let liString = ""
    for(let element of incommingData){
      liString += LiComponent(`제목 : ${element.title}, 저자 : ${element.author}`)
    }

    ul.innerHTML = liString
  },

  reactAssembly : (incommingData)=>{
    
    const root = document.getElementById("root")

    root.innerHTML = UlComponent.reactStyle(incommingData)

  }
}