import { FetchData } from "./FetchData.js";
import { Assembly } from "../components/Assembly.js";
/**
 * keyDown 이벤트와 이벤트 버블링을 활용해 target 요소에 클릭 이벤트를 발생시키는 함수.
 * @param {*} keyType 사용자가 누르는 키보드의 키
 * @param {*} target 클릭 이벤트가 발생될 대상
 */
const ClickEvent = (target)=>{

  document.addEventListener("click", async (event) => {
    const button = document.querySelector(target);

    if (event.target === button) {
     const inputData = document.querySelector("input").value;
     const data =  await FetchData(3001,`search/books?title=${inputData}`);
     console.dir(data)
     console.log(data)
     Assembly.reactAssembly(data)
     }
  });
}

export default ClickEvent
// keydownEvent("Enter",button[type="submit"])

