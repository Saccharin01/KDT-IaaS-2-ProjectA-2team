"use client"
import { useState, useEffect } from "react";
import IUserData from "./interface/ISignUp"
import React from "react";

const placeholderMsg = {
  id: "아이디를 입력하세요",
  pw: "비밀번호를 입력하세요",
  nickName: "닉네임을 입력하세요",
  budget: "예산이 어느정도 되시나요",
};


const tailwind = {
  button : "border-2 border-blue-700 m-4"
}


const LogIn: React.FC = () => {

  const [inputValue, setInputValue] = useState<IUserData>({
    userId : "",
    password : "",
    nickname : "",
    budget : 0
  })

  const onChangeHandler = (e : React.ChangeEvent<HTMLInputElement>):void => {
    const {name, value} = e.target
    setInputValue(({...props})=>({
      ...props,
      [name] : value
    }))
  }


  const ClickEvnet = async () => {
    console.log(inputValue)
    try {
      const FetchData = await fetch(`http://localhost:3001/login`, {
        method : "POST",
        body : JSON.stringify(inputValue),
        headers : {'Content-Type' : "application/json"}
      }) 

      if(!FetchData.ok){
        console.log("Error occured")
        throw new Error()
      }

    } catch (error) {
      console.error(error)      
    }
  }


// 반복 많음. 이걸 다 컴포넌트로 쪼개서 할 수 있지 않을까?
  return (
    <div onChange={onChangeHandler}>
      <div>
        <input type="text" placeholder={placeholderMsg.id} name="userId" className={tailwind.button}/>
      </div>
      <div>
        <input type="text" placeholder={placeholderMsg.pw} name="password" className={tailwind.button}/>
      </div>
      <div>
        <input type="text" placeholder={placeholderMsg.nickName} name="nickname" className={tailwind.button}/>
      </div>
      <div>
        <input type="text" placeholder={placeholderMsg.budget} name="budget" className={tailwind.button}/>
      </div>
      <button type="button" onClick={ClickEvnet} className={tailwind.button}>테스트 버튼</button>
    </div>
  );
};

export default LogIn
