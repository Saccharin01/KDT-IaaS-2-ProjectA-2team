import React from "react";
import IPageAssembly from "./PageAssemblyInterface";
import ImageComponent from "../ImageComponent/ImageComponent";
import DetailComponent from "../DetailComponent/DetailComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";


const PageAssembly: React.FC<IPageAssembly> = ({ data }) => {
  return (
    <div className="container mx-auto p-2">
      {data.map((element, index) => (
        <div key={index} className="h-auto flex flex-col lg:flex-row mb-8 border border-gray-950 justify-between">
          <div className="flex lg:w-48 p-4 items-center justify-center">
            <ImageComponent src={`${element._id}`} alt={`${element._id}`} className="w-40 h-auto" />
          </div>
          <div className="w-full lg:w-2/3 p-2">
            <DetailComponent
              title={element.title}
              author={element.author}
              price={element.price}
              explanation={element.explanation}
              className="mb-2"
            />
          </div>
            <div className=" flex flex-col items-center justify-center gap-2 p-2">
              <ButtonComponent type="button" title="basket" className="bg-blue-500 text-white px-4 py-2 rounded w-32">장바구니</ButtonComponent>
              <ButtonComponent type="button" title="buy_now" className="bg-blue-500 text-white px-4 py-2 rounded w-32">바로구매</ButtonComponent>
            </div>
        </div>
      ))}
    </div>
  );
};

export default PageAssembly;