/**
 * DOM 요소를 대체할 문자열을 리턴하는 함수
 * @param {*} tagName 작성할 태그의 이름
 * @param {*} textNode 태그 속에 들어갈 텍스트
 * @returns 
 */

export const TagComponent = (tagName, textNode)=>{
  return `<${tagName}>${textNode}</${tagName}>`
}
