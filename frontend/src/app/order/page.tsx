"use client";
// import useOnchange from "./hooks/useOnchange/useOnchange";i
import React from "react";
import InputComponent from "./components/InputComponent";
import axiosInstance from "frontend/src/module/axiosInstance";
import { HTTP } from "../../../src/static/HTTP";
import { useState } from "react";
import PaymentDTO from "@shared/dto/paymentDTO"

const placeholderMsg: { [key: string]: string } = {
  // user_id: "아이디를 입력하세요",
  // nickName: "닉네임을 입력하세요",
  // budget: "예산이 어느정도 되시나요",
  address: "주소를 입력 해주세요",
  price: "가격 입력",
  amount: "수량 입력",
};

const tailwind = {
  button: "border-2 border-blue-700 m-4",
};



const OrderSubmit: React.FC = () => {


  const [inputValue, setInputValue] = useState<PaymentDTO>({
    user_id: "",
    book_id: 0,
    address: "",
    price: 0,
    amount: 0,
    payment : ""
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInputValue((prevState) => {
      let parsedValue;
      if (name === "price" || name === "amount") {
        parsedValue = parseInt(value);
      } else if (name === "order_date") {
        parsedValue = new Date(value);
      } else {
        parsedValue = value;
      }

      return {
        ...prevState,
        [name]: parsedValue,
      };
    });
  };


  axiosInstance.get(HTTP.SEARCH, {
    params: {
      ...result,
      page: page,
    },
  });


  const ClickEvnet = async () => {
    console.log(inputValue);
    try {
      const FetchData = await fetch(`http://localhost:3000/payments`, {
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
          <InputComponent
            key={index}
            type={
              element === "price" || element === "amount" ? "number" : "text"
            }
            name={element}
            placeholderMsg={placeholderMsg[element]}
            onChange={onChangeHandler}
            className=""
          />
        </div>
      ))}

      <button type="button" onClick={ClickEvnet} className={tailwind.button}>
        테스트 버튼
      </button>
    </div>
  );
};

export default OrderSubmit;
