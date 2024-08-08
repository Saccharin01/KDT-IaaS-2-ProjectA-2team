"use client";
import useOnchange from "./hooks/useOnchange/useOnchange";
import React from "react";
import InputComponent from "./components/InputComponent";

const placeholderMsg: { [key: string]: string } = {
  user_id: "아이디를 입력하세요",
  password: "비밀번호를 입력하세요",
  nickName: "닉네임을 입력하세요",
  budget: "예산이 어느정도 되시나요",
};

const tailwind = {
  button: "border-2 border-blue-700 m-4",
};

const LogIn: React.FC = () => {
  const [inputValue, onChangeHandler] = useOnchange();

  const ClickEvnet = async () => {
    console.log(inputValue);
    try {
      const FetchData = await fetch(`http://localhost:3001/sign_up`, {
        method: "POST",
        body: JSON.stringify(inputValue),
        headers: { "Content-Type": "application/json" },
      });

      if (!FetchData.ok) {
        console.log("Error occured");
        throw new Error();
      }

      const data = await FetchData.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(`오류 발생 : `, error);
    }
  };

  const inputAmount = Object.keys(placeholderMsg);

  return (
    <div>
      {inputAmount.map((element, index) => (
        <InputComponent
          type={element === "budget" ? "number" : "text"}
          key={index}
          name=""
          placeholderMsg={inputAmount[element]}
          onChangeHandler={onChangeHandler}
          className=""
        />
      ))}

      <button type="button" onClick={ClickEvnet} className={tailwind.button}>
        테스트 버튼
      </button>
    </div>
  );
};

export default LogIn;
