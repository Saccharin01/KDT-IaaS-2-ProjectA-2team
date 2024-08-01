import React from "react";
import IDetailPageInterface from "./IDetailPageInterface";
import ImageComponent from "frontend/components/ImageComponent/ImageComponent";
import ParameterComponent from "frontend/components/ParameterComponent/ParameterComponent";
import ButtonComponent from "frontend/components/ButtonComponent/ButtonComponent";
import InformationComponent from "../../InformationComponent/InformationComponent"


const DetailPageAssembly :React.FC<IDetailPageInterface> = ({data}) => {

  return (
  <div className="w-screen h-screen flex flex-col">
    <div className="h-1/4 pb-11 flex justify-center items-center">
        <h1 className="w-1/2 bg-amber-400 text-center text-4xl">123</h1>
    </div>

    <div className="p-9 h-3/4 flex gap-10">
      
      <div className="w-1/4 bg-amber-700 flex flex-col">
        <div className="h-1/2">1</div>
        <div className="h-1/2 flex flex-col">2
          <div>1-1</div>
        </div>
      </div>

      <div className="flex justify-center items-center w-1/2 bg-amber-700">
        <ImageComponent src="" alt="1234"/>
      </div>
      <div className="w-1/4 bg-amber-700"> right
        <div></div>
        <div></div>
      </div>
    </div>

  </div>
  );
}








// const DetailPageAssembly :React.FC<IDetailPageInterface> = ({data}) => {
//   return(
//     <div>
//       <h2>책 이름</h2>

//       <div>
//         <div>details</div>
//         <div>hash</div>
//       </div>

//       <div>
//         <ImageComponent src="이미지 링크" alt="이미지 링크"/>
//       </div>

//       <div>
//         <ParameterComponent>price price</ParameterComponent>
//         <ParameterComponent>Stock Stock</ParameterComponent>
//         <ButtonComponent type="button">장바구니</ButtonComponent>
//         <ButtonComponent type="button">바로구매</ButtonComponent>
//       </div>
//     </div>
//   )
// }


export default DetailPageAssembly