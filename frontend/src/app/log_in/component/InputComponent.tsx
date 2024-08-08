import React from "react"

interface InputComponentInterface {
  inputAmount: string[]; // 입력 필드의 이름을 담고 있는 배열
  placeholderMsg: { [key: string]: string }; // 플레이스홀더 메시지를 담고 있는 객체
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void; // 입력 필드의 값 변경을 처리하는 함수
  className?: string; // (선택 사항) 스타일 클래스를 적용할 수 있는 추가 prop
}


const InputComponent :React.FC<InputComponentInterface> = ({ inputAmount, placeholderMsg, onChangeHandler, className }) => (
  <div>
    {inputAmount.map((element, index) => (
      <div key={index}>
        <input
          type="text"
          placeholder={placeholderMsg[element]}
          name={element}
          onChange={onChangeHandler} 
          className={className} />
      </div>))}
  </div>
)

export default InputComponent