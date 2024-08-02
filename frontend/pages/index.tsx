import { useEffect, useState } from "react";
import data from "../components/testData";
import SearchBooksAssembly from "frontend/components/Assembly/SearchBooks/SearchBooksAssembly";

useState

const testState = ()=>{
  const [state,setState] = useState(null)
  console.log(state)

  useEffect(()=>{
    fetch("http://localhost:3000/search/books?title=하나님")
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