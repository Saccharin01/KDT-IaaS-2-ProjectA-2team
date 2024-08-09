"use client";

import { KeyboardEvent, useContext, useRef } from "react";
import { SearchContext } from "../context/SearchContext";
import { QUERY_TYPE, SearchType } from "@shared/query/bookSearch.query";
import { handleTagClick } from "../func/handleTagClick";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const searchContext = useContext(SearchContext);
  const { query, setQuery } = searchContext;

  //* 계속 랜더링 하는게 싫기 떄문에 useRef로 받아와, 검색됬을시만 context에 저장
  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const searchEvent = () => {
    if (!inputRef || !selectRef) return;

    setQuery({
      type: selectRef.current.value as SearchType,
      content: inputRef.current.value,
    });

    handleTagClick(query.type, query.content, router);
  };

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
