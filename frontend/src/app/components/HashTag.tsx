"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { searchLogic } from "../func/search_logic";
import { QUERY_TYPE } from "@shared/query/bookSearch.query";

interface HashTagsProps {
  tags: string[];
}

/**
 * * 황재민
 * * tags의 모임
 * TODO: 따로 모듈 분리가 힘들것이다. 이거는 우리 홈페이지의 고유한 기능, 굳이 분리할 필요가 없다
 * @param param0 
 * @returns 
 */
const HashTags = ({ tags }: HashTagsProps) => {
  //* tags가 클릭되면 이동할 수 있게 하기위한 라우터 
  const router = useRouter();

  return (
    <div className="flex justify-center flex-wrap gap-x-2 gap-y-4 mx-auto">
      {tags.map((tag) => (
        <button
          className="px-6 py-2 min-w-[120px] text-center text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring"
          key={tag}
          onClick={() => searchLogic(QUERY_TYPE.TAG ,tag, router)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default HashTags;
