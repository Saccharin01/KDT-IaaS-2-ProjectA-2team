import {ReadonlyURLSearchParams} from "next/navigation";
import { BookSearchQuery, IsSearchType, QUERY_KEY } from "@shared/query/bookSearch.query";

export function MakeQueryObj(params: ReadonlyURLSearchParams, page: number): BookSearchQuery | null {
  const type = params.get(QUERY_KEY.TYPE);
  const content = params.get(QUERY_KEY.CONTENT);

  if(!IsSearchType(type)) return null;

  return new BookSearchQuery(type, content, page)
}
