import {ReadonlyURLSearchParams} from "next/navigation";
import { BookSearchQuery, IsSearchType } from "@shared/query/bookSearch.query";

export function MakeQueryObj(params: ReadonlyURLSearchParams, page: number): BookSearchQuery | null {
  const type = params.get('type');
  const content = params.get('content');

  if(!IsSearchType(type)) return null;

  return new BookSearchQuery(type, content, page)
}
