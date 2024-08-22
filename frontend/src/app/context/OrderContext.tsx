"use client";

import { BookDto } from "@shared/dto/book.dto";
import { createContext, ReactNode, useState, useContext } from "react";
import Cookies from "js-cookie";

/**
 * * 황재민
 * * BookDto를 확장한 interface
 * * amount => BookDto X ( 몇개 구매할건지 )
 * TODO : 리스트를 제거 하기 위한 메소드가 구현이 되어야한다.
 */
export interface BookOrder extends BookDto {
  amount: number;
}

/**
 * * 황재민
 * * 커스텀 훅을 정의하기 위한 인터페이스
 * TODO : 삭제하기 위한 메소드를 여기에 추가
 */
interface OrderInfo {
  //* 주문목록들이 저장되어있는 배열
  order: BookOrder[];
  //* 주문목록에 더해주기위한 메소드
  addOrder: (book: BookDto) => void;
  //* 배열을 클리어하기 위한 메소드
  clearOrder: () => void;
}

const OrderContext = createContext<OrderInfo | null>(null);

//* 순서 : 버튼 클릭 => Proivder 하위 리랜더링
export const OrderProvider = ({ children }: { children: ReactNode }) => {
  //! 리액트 훅을 써서 정의하는 이유는 변화에 따라서 랜더링을 하기위해 리액트 훅을 쓴다.
  //! 리액트가 랜더링을 하는 기본적인 구조가 hook, props를 감지를 해서 랜더링을 하기 때문에
  const [order, setOrder] = useState<BookOrder[]>([]);

  //* addOreder 정의
  const addOrder = (book: BookDto) => {
    const findIndex = order.findIndex((findBook) => findBook._id === book._id);

    //* order목록에서 책을 찾는다.
    //* 책이 없으면 배열에 해당 책을 추가해준다. 
    //* 아닐 경우에는 amount +1을 (개수만 늘려주는 역할을 한다.)
    if (findIndex !== -1) {
      const copy = structuredClone(order);
      copy[findIndex].amount += 1
      setOrder(copy);
    } else {
      const bookOrder = book as BookOrder;
      bookOrder.amount = 1;
      setOrder((prev) => [...prev, bookOrder]);
    }
    //Cookies.set("Order", JSON.stringify(order));
  };

  //* setOrder를 통해서 [] 초기화
  const clearOrder = () => {
    setOrder([]);
    //Cookies.set("Order", JSON.stringify(order));
  };

  return (
    <OrderContext.Provider value={{ order, addOrder, clearOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
