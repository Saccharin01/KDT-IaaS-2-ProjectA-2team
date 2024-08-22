import {ReadonlyURLSearchParams} from "next/navigation";
import { BookSearchQuery, IsSearchType, QUERY_KEY } from "@shared/query/bookSearch.query";

/**
 * * 황재민
 * * 목표 : 쿼리스트링과 페이지를 통해 서비스에 보내는 body를 구성한다.
 * @param params : Query
 * @param page : 현재 페이지
 * @returns : request.body
 */
export function MakeQueryObj(params: ReadonlyURLSearchParams, page: number): BookSearchQuery | null {
  const type = params.get(QUERY_KEY.TYPE);
  const content = params.get(QUERY_KEY.CONTENT);

  if(!IsSearchType(type)) return null;

  //* 객체 반환
  return new BookSearchQuery(type, content, page)
}
