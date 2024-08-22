import { IBookSearchQuery, QUERY_TYPE, SearchType } from "@shared/query/bookSearch.query";
import { IsStringRecord } from "frontend/func/IsStringRecord";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * * 황재민
 * @param type : SearchType (토글 무엇을 선택했는가?) 
 * @param content : 검색한 내용
 * @param router : 라우터 (현재 페이지의 라우터 )
 */
export const searchLogic = (type: SearchType, content: string, router: AppRouterInstance) => {
  
  let query: IBookSearchQuery = {
    type,
    content
  };

  //* IsStringRecord는 Record<string, string> 타입 변환을 위한 유저타입가드.
  if (IsStringRecord(query)) {
    const queryString = new URLSearchParams(query).toString(); //! 객체를 통해서 쿼리스트링을 만들고 싶었다. 
    router.push(`/books/?${queryString}`); //! 쿼리스트링 이동
  } else {
    //TODO: 에러 페이지로 이동을 해야한다.
    console.log(type, content);
  }
};