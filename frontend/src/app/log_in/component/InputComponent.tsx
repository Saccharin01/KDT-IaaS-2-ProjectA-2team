import React from "react"

interface InputComponentInterface {
  key : number
  name : string
  placeholderMsg: string; // 플레이스홀더 메시지를 담고 있는 객체
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void; // 입력 필드의 값 변경을 처리하는 함수
  className?: string; // (선택 사항) 스타일 클래스를 적용할 수 있는 추가 prop
}

/**
 * 
 * @param param0 
 * @returns 랜더링 하는 리액트 엘리먼트 반환
 */

const InputComponent :React.FC<InputComponentInterface> = ({key, placeholderMsg, onChangeHandler, name ,className}) => (
  <div>
      <div key={key}>
        <input
          type="text"
          placeholder={placeholderMsg}
          name={name}
          onChange={onChangeHandler} 
          className={className} />
      </div>)
  </div>
)

export default InputComponent