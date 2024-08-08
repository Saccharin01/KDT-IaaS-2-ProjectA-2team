import useOnchangeInterface from "./useOnchange.interface";
import { useState } from "react";


function useOnchange() {
  const [inputValue, setInputValue] = useState<useOnchangeInterface>({
    userId: "",
    password: "",
    nickname: "",
    budget: 0,
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInputValue(({ ...props }) => ({
      ...props,
      [name]: value,
    }));
  };
  return [inputValue, onChangeHandler] as const
}

export default useOnchange;
