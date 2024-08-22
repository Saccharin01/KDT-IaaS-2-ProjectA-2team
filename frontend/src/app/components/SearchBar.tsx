"use client";

import { KeyboardEvent, useContext, useRef } from "react";
import { SearchContext, useSearch } from "../context/SearchContext";
import { QUERY_TYPE, SearchType } from "@shared/query/bookSearch.query";
import { searchLogic } from "../func/search_logic";
import { useRouter } from "next/navigation";

/**
 * * 황재민
 * * Search Component
 * TODO 모듈로 분리하기 위해 해야할 것들! (리팩토링)
 * TODO (1) 토글 목록을 매개변수로 받아와 설정한다. (2) 검색이벤트도 매개변수로 받아와 커스텀할 수 있게한다. (3) context의 사용여부
 * TODO 모듈 분리가 가능한다 
 * ! context와 이 SearchBar를 하나로 묶는다.
 * @returns 
 */
const SearchBar = () => {

  //* useRouter를 사용한 이유는 검색한 결과에 맞게 페이지를 이동하기 위해서 useRouter()를 사용했다.
  //* useRouter를 통해서 페이지의 이동이 가능하기 때문
  const router = useRouter();
  
  //* 검색결과를 저장하기위핸 context의 사용.
  //const searchContext = useContext(SearchContext);
  //const { query, setQuery } = searchContext;

  //* 커스텀 훅
  const { query, setQuery } = useSearch();

  //* 계속 랜더링 하는게 싫기 떄문에 useRef로 받아와, 검색됬을시만 context에 저장
  //* ref 어떻게 이해하면 편한가? => vanilla로 생각한다면
  //! let input = document.getElementById()로 생각하면 편하다.

  //* 기본사람들이 하는예제를 보면 value에 useState의 훅을 달아.
  //* input이 변경될떄마다, value값이 변하면 => useState의 값도 변경된다 (React Hook) => 랜더링을 다시한다. => 성능에 문제가 생긴다.
  //* 그래서 ref로 했다.
  
  //* input 검색창 ref
  const inputRef = useRef<HTMLInputElement | null>(null);
  //* 목록 ref
  const selectRef = useRef<HTMLSelectElement | null>(null);

  //* 검색 이벤트
  //* 여기서는 Enter, Search를 click해서 발생하는 이벤트를 정의하였다.
  const searchEvent = () => {
    //! 둘 중하나라도 null이면 안된다. 
    //! (1) Error, (2) return 동작 x (3) Defaul값을 준다.
    if (!inputRef || !selectRef) return;

    //* 검색 결과를 저장
    setQuery({
      type: selectRef.current.value as SearchType,
      content: inputRef.current.value,
    });

    //* 페이지를 넘어가는 메소드
    searchLogic(query.type, query.content, router);
  };

  //* Enter
  const keydownEv = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {searchEvent()};
  };

  return (
    <>
      <div className="flex flex-nowrap items-center bg-white overflow-hidden px-2 py-1 justify-between mx-auto shadow-gray-200 shadow-lg rounded-lg h-min">
        <input
          ref={inputRef}
          className="text-base text-gray-500 flex-grow outline-none px-2 w-72 "
          type="text"
          value={query.content}
          placeholder="Search your domain name"
          onChange={(e) => {
            setQuery({ ...query, content: e.target.value });
          }}
          onKeyDown={keydownEv}
        />
        <div className="flex flex-nowrap items-center px-2 rounded-lg space-x-4 mx-auto ">
          <select
            ref={selectRef}
            title="list"
            defaultValue={query.type}
            className="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg"
            onChange={(e) => {
              setQuery({ ...query, type: e.target.value as SearchType });
            }}
          >
            <option value={QUERY_TYPE.TITLE}>{QUERY_TYPE.TITLE}</option>
            <option value={QUERY_TYPE.TAG}>{QUERY_TYPE.TAG}</option>
          </select>
          <button
            className="bg-indigo-600 text-white text-sm rounded-lg px-4 py-2"
            onClick={searchEvent}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
