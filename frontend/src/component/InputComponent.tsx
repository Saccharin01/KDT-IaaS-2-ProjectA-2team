'use client' // 클라이언트에서 사용하는 컴포넌트 라는 것을 명시
import React, { useEffect } from "react";
import { useState } from "react";

    
const InputComponent:React.FC = ()=>{
 const [data,setData] = useState([]) // 어떤 데이터를?
 useEffect( () => {
  fetch("http://localhost:3001/input") //엔트리 포인트 Get /Input
  .then((res)=>{
    if(res.ok){
        console.log("submit success")
        return res.json()
    } else{
        console.log("submit failed")
        return new Error()
    }
  })
.then((data)=>{
    console.log(data)
    console.log(`result!!!! : ${data}`)
    setData(data)
  })
})



return(

  <div>
    <input placeholder="test"></input>

    <div className="
        border-2 
        bg-red-400 h-8 w-20 flex flex-col items-center cursor-pointer hover:bg-red-800"
        >button</div>
    <div>result section
      
      </div>
  </div>
)
}




export default InputComponent