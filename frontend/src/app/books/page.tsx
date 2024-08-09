"use client";

import { MakeQueryObj } from "@shared/func/MakeQueryObj";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback, Suspense } from "react";
import { HTTP } from "../../../src/static/HTTP";
import { BookDto } from "@shared/dto/book.dto";
import axiosInstance from "frontend/src/module/axiosInstance";
import BookComponent from "./components/BookComponent";
import axios from "axios";

//TODO : 첫 번쨰 문제 : 빠르게 이동시, useEffect 호출이 안돔
export default function BookList() {
  const query = useSearchParams();
  const [books, setBooks] = useState<BookDto[]>([]);

  //* 옵저빙을 위한 리액트 훅 :)
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchData = (page: number) => {
    const result = MakeQueryObj(query, page);

    // console.log(
    //   "PAGE : " + page,
    //   "QUERY : " + decodeURI(query.toString()) + "DATA LENGTH : " + books.length
    // );

    //! 잘못된 쿼리면 데이터를 불러오지 않는다. 잘못된 접근
    //TODO 잘못된 접근에 대한 처리가 필요. 페이지 이동 or 페이지에서 알려주기
    if (result === null) return;
    else {
      setLoading(true);
      axiosInstance
        .get(HTTP.SEARCH, {
          params: {
            ...result,
            page: page,
          },
        })
        .then((res) => {
          const newBooks = res.data as BookDto[];
          if (newBooks.length === 0) {
            setHasMore(false); // 더 이상 데이터가 없으면
          } else {
            setBooks((prevBooks) => [...prevBooks, ...newBooks]);
          }
          setLoading(false);
        });
    }
  };

  //! 쿼리문이 변경되면 자동으로 다시 데이터 받아오게 의존성 배열에 추가.
  useEffect(() => {
    //console.log("fetchData 호출 확인: " + decodeURI(query.toString()));
    const source = axios.CancelToken.source();
    fetchData(page);
    return () => {
      source.cancel();
    };
  }, [page, query]);

  const lastItemRef = useCallback(
    (node: HTMLDivElement) => {
      //* 현재 옵저빈중인 것을 해제
      //* 이전에 설정된 관찰자를 해제하여 새로운 관찰자로 대체하기 위함, 이렇게 하면 중복 관찰을 방지합니다.
      if (observer.current) observer.current.disconnect();
      //* 아이템이 더이상 없거나 로딩중 일때 :)
      if (loading || !hasMore) return;
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  //! 호출 확인 완료
  useEffect(() => {
    //console.log("초기화 호출 확인: " + decodeURI(query.toString()));
    setLoading(true);
    setBooks([]);
    setHasMore(true);
    setPage(1);
  }, [query.toString()]);

  return (
    <div>
      {books.length === 0 ? (
        <div>Not Founded Data </div>
      ) : (
        books.map((book, index) => (
          <div key={index}>
            <BookComponent {...book} />
          </div>
        ))
      )}
      <div ref={lastItemRef} />
      {loading && <p>Loading...</p>}
    </div>
  );
}
