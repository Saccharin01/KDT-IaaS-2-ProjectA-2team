import React from "react";
import IButtonInterface from "./IButtonInterface";

const ButtonComponent: React.FC<IButtonInterface> = ({children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export default ButtonComponent