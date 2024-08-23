// app/sidebar.tsx
"use client"; // 클라이언트 측 코드임을 명시합니다.

import React from "react";
import { SideSelectContext } from "../context/SideSelectContext";
import { ButtonComponent } from "./button";

/**
 * * 황재민
 * @returns 
 */
export function Sidebar() {
  //* 버튼의 상태를 변경하기 위해 가지고왔다.
  const context = React.useContext(SideSelectContext);

  const { selected, setSelected } = context;

  //* buttonEvent
  const btnEv = (sideSelect: string) => {
    switch(sideSelect){
      case "order":
        setSelected(sideSelect);
      case "stock":
        setSelected(sideSelect); 
      default:
        null
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 mt-3"> 
      <div className="text-4xl font-bold mt-5 mb-4">메뉴</div>
      <div className="shadow-gray-200 shadow-lg rounded-lg w-11/12">
      <ButtonComponent name="재고 목록" func={() => {btnEv("stock")}}/>
      </div>
      <div className="shadow-gray-200 shadow-lg rounded-lg w-11/12">
      <ButtonComponent name="주문 목록" func={() => {btnEv("order")}}/>
      </div>
    </div>
  );
}
