import React from "react";
import ISearchBooksInterface from "./SearchBooksAssemblyInterface";
import ImageComponent from "../../ImageComponent/ImageComponent";
import InformationComponent from "../../InformationComponent/InformationComponent";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";



const SearchBooksAssembly: React.FC<ISearchBooksInterface> = ({ data }) => {
  return (
    <div className="container mx-auto p-2 pt-20 ">
      <div
      className="w-full flex justify-center lg:  h-14 flex-row my-12 border-2 border-gray-950 rounded-2xl bg-gray-500">
        <input 
        className=" lg: w-full bg-gray-200 rounded-2xl outline-none"
        type="search" title="search" placeholder="여긴 입력창이야" />
        </div>


      {data.map((element, index) => (

        <div key={index} className="h-auto flex flex-col lg:flex-row mb-8 border-2 border-gray-950 justify-between rounded-2xl">
          <div className="flex lg:w-48 p-4 items-center justify-center">
            <ImageComponent src={`${element._id}`} alt={`${element._id}`} className="w-40 h-auto" />
          </div>
          <div className="w-full lg:w-2/3 p-2">
            <InformationComponent
              title={element.title}
              author={element.author}
              price={element.price}
              explanation={element.explanation}
              className="mb-2"
            />
          </div>
            <div className=" flex flex-col items-center justify-evenly gap-2 p-2">
              <ButtonComponent type="button" title="basket" className="bg-gray-950 text-white px-4 py-2 rounded w-30">장바구니</ButtonComponent>
              <ButtonComponent type="button" title="buy_now" className="bg-gray-950 text-white px-4 py-2 rounded w-30">바로구매</ButtonComponent>
            </div>
        </div>
      ))}
    </div>
  );
};

export default SearchBooksAssembly;