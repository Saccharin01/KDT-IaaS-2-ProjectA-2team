"use client";

import { BookDto } from "@shared/dto/book.dto";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { searchLogic } from "../../func/search_logic";
import { QUERY_TYPE } from "@shared/query/bookSearch.query";
import { useOrder } from "../../context/OrderContext";
import { ROUTER_PATH } from "frontend/src/static/ROUTER_PATH";

/**
 * * 황재민
 * * Book 정보에 대한 컴포넌트.
 * TODO : 동적으로 데이터에 맞게 하고 싶다. 분리 리팩토링 ( 제네릭 ) 
 * TODO : 데이터에 따라 컴포넌트를 구성한다. (책, 영화, etc ...)
 * @param param0 
 * @returns 
 */
export default function BookComponent({
...bookDTO
}: BookDto) {

  //* router를 쓰는 이유 
  //* BookComponent에 Tag클릭에 따른 이동을 위해서 router 
  const router = useRouter();

  //* 장바구니에 해당 책을 추가하기위한 커스텀훅
  const {order, addOrder} = useOrder();

  const imgPath = `/books/${bookDTO._id}.jpg`

  //* 책 추가하기 (장바구니)
  const addBookInOrder = () => {
    addOrder(bookDTO)
  }

  //* 바로구매
  const addBookAndMoveOrderPage = () => {
    addBookInOrder();
    router.push(ROUTER_PATH.CHECKOUT);
  }

  return (
    <>
      <div className="flex justify-between p-4 border rounded-md shadow-md">
        <div className="flex">
          <Image
            src={imgPath} // 이미지 경로
            alt="Description of the image" // 대체 텍스트
            width={140} // 이미지의 너비
            height={150} // 이미지의 높이
          />
          <div className="ml-4 flex flex-col overflow-hidden">
            <h2 className="text-lg font-bold mt-2">{bookDTO.title}</h2>
            <p>{bookDTO.author}</p>
            <p className="text-green-600 font-bold mt-2">
              {bookDTO.price}
              {/* 10% 12,600원 <span className="line-through">{price}</span> */}
            </p>
            <div className="mt-2 space-x-2">
              {bookDTO.hashtags.map((value: string, index) => (
                <span key={index} className="px-2 py-1 text-violet-600 border border-violet-600 hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring rounded" onClick={() => {searchLogic(QUERY_TYPE.TAG,value, router)}}>
                  {value}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded" onClick={addBookInOrder}>
            장바구니
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={addBookAndMoveOrderPage}>
            바로구매
          </button>
        </div>
      </div>
    </>
  );
}
