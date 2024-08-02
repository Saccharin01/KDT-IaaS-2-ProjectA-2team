"use client"

import { useEffect, useState } from "react";
import SearchBooksAssembly from "frontend/components/Assembly/SearchBooks/SearchBooksAssembly";


const testState = ()=>{
  const [state,setState] = useState(null)
  console.log(state)

  useEffect(()=>{
    /**
     * ! 프록시 경로처리 로직에 주의
     * ! /search/books/2407190 같은 경우 프록시 서버에서 숫자 부분을 "경로"로 처리해버림
     * ! data 페칭 시 "/" 붙이면 안됨
     * ! 쿼리스트링으로 요청을 보내야 하는 경우 꼼꼼하게 확인해서 처리해야 함.
     */
    fetch("http://localhost:3000/search/books 2407190")
    .then((res)=>res.json())
    .then((data)=>setState(data))
    .catch((err)=>{console.error(`fetch failed: ${err}`)})
  },[])

  {console.log(state)}

  return (
    <div id="root"
    className="h-screen">
      {state ? <SearchBooksAssembly data={state.incomeData}/> : <p>wtf</p>}
      {/* <SearchBooksAssembly data={data.test}/> */}
    </div>
  );
}


// const SearchBook = () => {
//   return (
//     <div id="root"
//     className="h-screen">
//       <SearchBooksAssembly data={data.test}/>
//     </div>
//   );
// };

export default testState