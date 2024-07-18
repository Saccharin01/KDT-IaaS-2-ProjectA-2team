import { UlComponent } from "./Ulcomponent.js";
import { LiComponent} from "./LiComponent.js";

export const Assembly = {


 tagAssembly :  (incommingData)=>{

    const root = document.getElementById("root")
    
    root.innerHTML = UlComponent.tagStlye()

    const ul = document.querySelector("ul")

    const liString = LiComponent(incommingData)

    ul.innerHTML = liString
  },

  reactAssembly : (incommingData)=>{
    
    const root = document.getElementById("root")

    root.innerHTML = UlComponent.reactStyle(incommingData)

  }
}