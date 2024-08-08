"use Client"

import InputComponent from "./component/InputComponent";
import { useState } from "react";





interface LogInPageInterface {
  somethingAwesome : string[]
}


const layoutData = {
  userId : "아이디를 입력 해주세요",
  password : "비밀번호를 입력 해주세요"
}

const LogInPage : React.FC<LogInPageInterface> = ({somethingAwesome}) => {
  
  const [value, setValue] = useState(
    {
      id : "",
      password : ""
    }
  )

  return(
    somethingAwesome.map((elemet, index)=>
    
      <InputComponent
      key={index}
      name=""
      placeholderMsg=""
      onChangeHandler={console.log}
      />
    )
  )
}