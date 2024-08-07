"use client"
import { useState, useEffect } from "react";
import IUserData from "./interface/IUserData"
import React from "react";

const placeholderMsg = {
  id: "아이디를 입력하세요",
  pw: "비밀번호를 입력하세요",
  nickName: "닉네임을 입력하세요",
  budget: "예산이 어느정도 되시나요",
};


const AlertMsg = (event : any) => {
  if (event.target.value == "" || undefined) {
    return <p>inputField must be fill</p>;
  }
};

const LogIn: React.FC = () => {

  const [inputValue, setInputValue] = useState<IUserData>({
    userId : "",
    password : "",
    nickname : "",
    budget : 0
  })

  const onChangeHandler = (e : React.ChangeEvent<HTMLInputElement>):void => {
    const {name, value} = e.target
    setInputValue({
      userId : value,
      password : ""
    })
  }



  return (
    <div>
      <div>
        <input type="text" placeholder={placeholderMsg.id} />
      </div>
      <div>
        <input type="text" placeholder={placeholderMsg.pw} />
      </div>
      <div>
        <input type="text" placeholder={placeholderMsg.nickName} />
      </div>
      <div>
        <input type="text" placeholder={placeholderMsg.budget} />
      </div>
    </div>
  );
};

export default LogIn


// import React, { useState } from "react";

// const placeholderMsg = {
//   id: "아이디를 입력하세요",
//   pw: "비밀번호를 입력하세요",
//   nickName: "닉네임을 입력하세요",
//   budget: "예산이 어느정도 되시나요",
// };

// const LogIn: React.FC = () => {
//   const [formValues, setFormValues] = useState({
//     id: "",
//     pw: "",
//     nickName: "",
//     budget: ""
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormValues({
//       ...formValues,
//       [name]: value
//     });
//   };

//   const isFieldEmpty = (field: string) => {
//     return formValues[field] === "";
//   };

//   return (
//     <div>
//       <div>
//         <input
//           type="text"
//           name="id"
//           placeholder={placeholderMsg.id}
//           onChange={handleChange}
//         />
//         {isFieldEmpty("id") && <p>아이디를 입력하세요.</p>}
//       </div>
//       <div>
//         <input
//           type="password"
//           name="pw"
//           placeholder={placeholderMsg.pw}
//           onChange={handleChange}
//         />
//         {isFieldEmpty("pw") && <p>비밀번호를 입력하세요.</p>}
//       </div>
//       <div>
//         <input
//           type="text"
//           name="nickName"
//           placeholder={placeholderMsg.nickName}
//           onChange={handleChange}
//         />
//         {isFieldEmpty("nickName") && <p>닉네임을 입력하세요.</p>}
//       </div>
//       <div>
//         <input
//           type="text"
//           name="budget"
//           placeholder={placeholderMsg.budget}
//           onChange={handleChange}
//         />
//         {isFieldEmpty("budget") && <p>예산을 입력하세요.</p>}
//       </div>
//     </div>
//   );
// };

// export default LogIn;