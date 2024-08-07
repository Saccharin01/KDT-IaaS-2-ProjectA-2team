"use client"; // 클라이언트에서 사용하는 컴포넌트 라는 것을 명시
import React, { useState, useEffect } from "react";

const InputComponent: React.FC = () => {
  const [data, setData] = useState<string[]>([]); // 어떤 데이터를?
  const [inputValue, setInputValue] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/input") //엔트리 포인트 Get /Input
      .then((res) => {
        if (res.ok) {
          console.log("submit success");
          return res.json();
        } else {
          console.log("submit failed");
          return new Error();
        }
      })
      .then((data: { response: string[] }) => {
        const { response } = data;
        console.log(`result!!!!`, response);
        setData(data.response);
      });
  }, []);

  useEffect(() => {
    console.log("Updated data:", data);
  }, [data]);

  const changeEventHandle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const filterdData = data.filter((element) =>
      element.includes(e.target.value),
    );
    if (e.target.value == "" || undefined) {
      setInputValue([]);
    } else {
      setInputValue(filterdData);
    }
    console.log(inputValue);
  };
  return (
    <div>
      <input placeholder="test" onChange={changeEventHandle}></input>

      <div
        className="
          border-2 
          bg-red-400 h-8 w-20 flex flex-col items-center cursor-pointer hover:bg-red-800"
      >
        button
      </div>
      <div>
        <h1>result section</h1>
        <ul>
          {inputValue.length > 0 &&
            inputValue.map((element, index) => <li key={index}>{element}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default InputComponent;
