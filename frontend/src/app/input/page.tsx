'use client'

import React from "react";
import { useState } from "react";

    
    
    
    

const Input:React.FC = ()=>{

    const [value,setValue] = useState<string>('')

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        console.log(value)
         setValue(event.target.value); }


    const ClickHandler = ()=>{

        fetch("http://localhost:3001/input",{
        method:"POST",
        body:value,
        headers : {
        'Content-Type' : "text/plain"
        }
    })
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
        console.log(`received : ${data}`)
    })
}




  return(
    
    <div>
        <input type="text" placeholder="Hello,world!" className="border-2 mb-7" onChange={handleInputChange}></input>
        <div className="
            border-2 
            bg-red-400 h-8 w-20 flex flex-col items-center cursor-pointer hover:bg-red-800"
            onClick={ClickHandler}
            >button</div>
        <div>result section</div>



    </div>
  )
}




export default Input