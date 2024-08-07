"use client"; // 클라이언트에서 사용하는 컴포넌트 라는 것을 명시

import React from "react";
import { useState } from "react";

const Input: React.FC = () => {
  //리액트 컴포넌트 함수

  // useState의 값을 구조 분해 할당으로 가져오고, useState()을 이용해서 빈 문자열을 setValue에 전달, 해당 과정을 통해 value의 값이 빈 문자열로 초기화
  const [value, setValue] = useState<string>("");
  const [response, setResponse] = useState<{ response: string }[]>([]);

  // 인풋 창의 값을 핸들링 하는 핼퍼 함수, 타입 명시를 통해 해당 함수가 어떤 값을 가지는지 명시
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    console.log(value);
    setValue(event.target.value);
    // 구조 분해 할당을 통해서 꺼내온 setValue() 함수를 통해 value 에 값을 할당.
  };

  //이벤트 핸들러로 설정 할 ClickHandler 함수를 선언
  const ClickHandler = () => {
    //"http://localhost:3001/input" 으로 데이터를 요청하는 fetchAPI를 호출, 두 번째 매개변수에 method, header, body를 선언 및 할당.
    fetch("http://localhost:3001/input", {
      //method 의 기본 값은 GET, 이 경우에는 POST 메서드를 사용하기 때문에 POST를 명시
      method: "POST",
      // body 에 setValue 함수를 이용해서 할당 된 value 값을 직렬화한 뒤 할당
      body: JSON.stringify({ data: value }),
      // 요청 헤더 (Request Header)에 전송되는 데이터의 형식을 지정, 이 경우에는 application/json으로 명시
      headers: {
        "Content-Type": "application/json",
      },
    })
      // 위 fetch 함수의 요청이 전송 된 다음 실행 될 함수를 지정. 이 개념을 프로미스 체이닝 이라고 함
      .then((res) => {
        // 매개변수 요청에 대한 응답이 ok일 시 (res (response) 의 응답이 ok 일 시) 콘솔에 submit success 라는 문구를 띄우고
        // 돌아온 응답을 역 직렬화 해 준 결과를 리턴 값으로 돌려줌
        if (res.ok) {
          console.log("submit success");
          return res.json();
        } else {
          // 응답 헤더가 ok가 아닐 경우, 콘솔에 submit failed 라는 문구를 띄우고, 에러 객체를 리턴해서 함수의 흐름을 끊음
          console.log("submit failed");
          return new Error();
        }
      })
      // 마찬가지로, .then으로 연결된 함수의 행동이 끝난 다음 실행 될 함수를 선언
      // 탬플릿 리터럴(백틱 === ``)을 이용해서 received : 라는 문자열 다음, 매개변수로 들어온 data 를 집어넣어줌
      .then((data) => {
        console.log(data);

        console.dir(`result!!!! : ${data}`);

        setResponse(data);
      });
  };

  const keyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key == "Enter") {
      ClickHandler();
    }
  };

  // 위의 함수와 동일한 방식이지만, async와 await 문법을 이용해서 조금 더 직관적으로 변경한 함수
  const ClickHandler2 = async () => {
    // async, await 선언에서는 try Catch 구문을 이용하며, try 블록 안에 있는 함수를 실행.
    // 만일 실행 과정에서 오류가 발생하면, 그 즉시 catch 구문으로 오류를 던져서 try 구문을 멈춤

    try {
      const fetching = await fetch("http://localhost:3001/input", {
        method: "POST",
        body: value,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (fetching.ok) {
        const data = await fetching.json();
        console.log("submit success");
        return data;
      } else {
        console.log("Submit Fail!!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div onKeyDown={keyDown}>
      <input
        type="text"
        placeholder="Hello,world!"
        className="border-2 mb-7"
        onChange={handleInputChange}
      ></input>

      <div
        className="
            border-2 
            bg-red-400 h-8 w-20 flex flex-col items-center cursor-pointer hover:bg-red-800"
        onClick={ClickHandler}
      >
        button
      </div>
      <div>
        result section
        {response.length > 0 && (
          <ul>
            {response.map((element, index) => (
              <li key={index}>{element.response}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Input;
