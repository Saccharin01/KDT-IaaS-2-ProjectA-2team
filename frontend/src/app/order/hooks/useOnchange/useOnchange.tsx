import { useOnchangeInterface } from "./useOnchange.interface";
import { useState } from "react";

function useOnchange() {


  const [inputValue, setInputValue] = useState<useOnchangeInterface>({
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

  return [inputValue, onChangeHandler] as const;
}

export default useOnchange;
