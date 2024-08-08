"use client";
import { useState } from "react";
import IUserData from "./interface/ISignUp";
import React from "react";

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
  const [inputValue, setInputValue] = useState<IUserData>({
    user_id: "",
    password: "",
    nickName: "",
    budget: 0,
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInputValue(({ ...props }) => ({
      ...props,
      [name]: value,
    }));
  };

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
        <div key={index}>
          <input
            type="text"
            placeholder={placeholderMsg[element]}
            name={element}
            className={tailwind.button}
            onChange={onChangeHandler}
          />
        </div>
      ))}

      <button type="button" onClick={ClickEvnet} className={tailwind.button}>
        테스트 버튼
      </button>
    </div>
  );
};

export default LogIn;
