// app/sidebar.tsx
"use client"; // 클라이언트 측 코드임을 명시합니다.

import React from "react";
import { SideSelectContext } from "../context/SideSelectContext";
import { ButtonComponent } from "./button";

export function Sidebar() {
  const context = React.useContext(SideSelectContext);

  const { selected, setSelected } = context;

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
      <div className="shadow-gray-200 shadow-lg rounded-lg">
      <ButtonComponent name="재고 목록" func={() => {btnEv("stock")}}/>
      </div>
      <div className="shadow-gray-200 shadow-lg rounded-lg">
      <ButtonComponent name="주문 목록" func={() => {btnEv("order")}}/>
      </div>
    </div>
  );
}
