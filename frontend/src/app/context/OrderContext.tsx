"use client";

import { BookDto } from "@shared/dto/book.dto";
import { createContext, ReactNode, useState, useContext } from "react";
import Cookies from "js-cookie";

export interface BookOrder extends BookDto {
  amount: number;
}

interface OrderInfo {
  order: BookOrder[];
  addOrder: (book: BookDto) => void;
  clearOrder: () => void;
}

const OrderContext = createContext<OrderInfo | null>(null);

//* 순서 : 버튼 클릭 => Proivder 하위 리랜더링
export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<BookOrder[]>([]);

  const addOrder = (book: BookDto) => {
    const findIndex = order.findIndex((findBook) => findBook._id === book._id);

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
