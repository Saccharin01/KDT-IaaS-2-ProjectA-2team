import React from "react";
import SearchBar from "./components/SearchBar";
import HashTags from "./components/HashTag";

export default function Home() {

  const tags = [
    "#전기",
    "#영어",
    "#예술",
    "#기독교",
    "#향수",
    "#청소",
    "#소설",
    "#인공지능",
    "#육아",
    "#자연",
    "#요리",
    "#학습",
    "#야구",
    "#감성",
    "#여행",
    "#미스터리",
    "#추억",
    "#긴장감",
  ];

  return (
    <>
      <div className="h-full bg-gray-100 flex justify-center items-center flex-col">
        <SearchBar />
        <div className="w-3/6 h-72 mt-10">
          <HashTags tags={tags} />
        </div>
      </div>
    </>
  );
}
