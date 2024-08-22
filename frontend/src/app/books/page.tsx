"use client";

import { MakeQueryObj } from "@shared/func/MakeQueryObj";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback, Suspense } from "react";
import { HTTP } from "../../../src/static/HTTP";
import { BookDto } from "@shared/dto/book.dto";
import axiosInstance from "frontend/src/module/axiosInstance";
import BookComponent from "./components/BookComponent";
import axios from "axios";

/**
 * * 황재민
 * * 책 나열에 대한 page
 * TODO 모듈분리가 가능하게 하고 싶다 (리팩토링)
 * TODO (1) Component (BookDto) 데이터양식에 따라 변경이 가능해야함 (2) 책 배열(BookDto[]) 이것도 매개변수로.
 * ! 모듈을 분리하고 싶으면 여기는 제네릭에 대해서 심도있는 공부를 해야한다.
 * @returns 
 */
export default function BookList() {

  //* 해당 페이지의 쿼리스트링을 가지고온다.
  //* 가져오는 이유 해당쿼리스트링으로 원하는 데이터를 가져오기 위해서
  const query = useSearchParams();

  //* 책 배열
  const [books, setBooks] = useState<BookDto[]>([]);

  //#region -- 데이터를 더 불러오기 위한 훅 --
  //* 1Page당 => 10개의 bookData, 스크롤이 내려가면 page값이 +1이 된다. 
  //* 해당 백엔드 부분에서는 1page (1~10), 2page (11~20) => page에 맞게 (1~10)이런 로직은 백엔드에 되어있다.
  const [page, setPage] = useState<number>(1);

  //* 로딩의 역활, 데이터를 불러오는동안 스크롤이 내려가 똑같은 데이터가 완전히 불러올동안 사용자 이벤트를 block한다.
  const [loading, setLoading] = useState<boolean>(false);

  //* 옵저버, 사용자가 스크롤을 맨 마지막으로 내렸는지 감시하는 역활, 말 그대로 감시자.
  const observer = useRef<IntersectionObserver | null>(null);

  //* boolean(true,false) => 데이터가 더있냐라는 걸 나타내기위한 훅. 
  const [hasMore, setHasMore] = useState<boolean>(true);
  //#endregion

  //* 데이터를 불러오기위한 메소드
  const fetchData = (page: number) => {
    const result = MakeQueryObj(query, page);

    //! 잘못된 쿼리면 데이터를 불러오지 않는다. 잘못된 접근
    //TODO 잘못된 접근에 대한 처리가 필요. 페이지 이동 or 페이지에서 알려주기 (404)
    if (result === null) return;

    //* 제대로된 객체가 구성이 됬다.
    else {
      setLoading(true);
      axiosInstance
        .get(HTTP.SEARCH, {
          //* 쿼리를 만드는 작업
          params: {
            ...result,
            page: page,
          },
        })
        .then((res) => {
          //* 타입 단언 중요하다. 왜 타입단언을 여기서 선언하였는가?
          //? 타입 가드를 써도 된다. => 더 안전한 방법.
          const newBooks = res.data as BookDto[];
          if (newBooks.length === 0) {
            setHasMore(false); // 더 이상 데이터가 없으면
          } else {
            //* 기존의 데이터와 현재 받은데이터를 합쳐서 새로운 바열을 만들고 할당
            setBooks((prevBooks) => [...prevBooks, ...newBooks]);
          }
          setLoading(false);
        });
    }
  };

  //! 흠 처음 실행됬을 때, 단 한번만 실행하게 하고 싶다.
  //! 쿼리문이 변경되면 자동으로 다시 데이터 받아오게 의존성 배열에 추가.
  useEffect(() => {
    //console.log("fetchData 호출 확인: " + decodeURI(query.toString()));
    const source = axios.CancelToken.source();
    
    fetchData(page);
    
    //* useEffect에서의 return의 역활은 unmount 해당 컴포넌트로 나갔을 때 실행되는 콜백함수
    //* 요청을 취소 (unmount됬을 때)
    return () => {
      if(source)
        source.cancel();
    };
  }, [page, query]);

  //* 옵저버 callback함수
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
  //* 검색결과 변경시 초기화해주는 작업
  useEffect(() => {
    setLoading(true);
    setBooks([]);
    setHasMore(true);
    setPage(1);
  }, [query]);

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
