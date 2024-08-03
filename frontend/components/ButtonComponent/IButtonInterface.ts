import { HTMLAttributes } from "react";

interface IButtonInterface extends HTMLAttributes<HTMLButtonElement>{
  type?: "button" | "submit" | "reset";
}

export default IButtonInterface;
