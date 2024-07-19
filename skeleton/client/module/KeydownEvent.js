/**
 * keyDown 이벤트와 이벤트 버블링을 활용해 target 요소에 클릭 이벤트를 발생시키는 함수.
 * @param {*} keyType 사용자가 누르는 키보드의 키
 * @param {*} target 클릭 이벤트가 발생될 대상
 */
const keydownEvent = (keyType,target)=>{

  document.addEventListener("keydown", (event) => {
    if (event.key === keyType) {
      const button = document.querySelector(target);
      console.log(button);
      button.click();
    }
  });
}

export default keydownEvent
// keydownEvent("Enter",button[type="submit"])

