import React from "react"

interface InputComponentInterface {
  type : string
  key : number
  name : string
  placeholderMsg: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // (옵션)입력 필드의 값 변경을 처리하는 함수
  className?: string; // (옵션) 스타일 클래스를 적용할 수 있는 추가 prop
}

/**
 * @param param0 
 * @returns 랜더링 하는 리액트 엘리먼트 반환
 */

const InputComponent :React.FC<InputComponentInterface> =({type, key, placeholderMsg, onChange, name ,className}) => (
  <div>
      <div key={key}>
        <input
          type={type}
          placeholder={placeholderMsg}
          name={name}
          onChange={onChange} 
          className={className} />
      </div>
  </div>
)

export default InputComponent