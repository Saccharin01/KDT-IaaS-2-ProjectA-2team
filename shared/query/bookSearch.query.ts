export type SearchType = "title" | "tag";

export enum QUERY_TYPE {
  TITLE = "title",
  TAG = "tag",
}

export enum QUERY_KEY {
  TYPE = 'type',
  CONTENT = 'content',
}

/**
 * * 황재민
 * * type : 무슨 종류의 검색 (title, tag)
 * * content : 세부 내용, 검색한 내용 (책 제목, #의학)
 */
export interface IBookSearchQuery {
  type: SearchType;
  content: string;
}

/**
 * * 황재민
 * * 현재 검색 결과와 페이지의 정보가 담긴 객체 
 */
export class BookSearchQuery implements IBookSearchQuery {
  constructor(
    public type: SearchType,
    public content: string,
    public page: number
  ) {}
}

/**
 * * 황재민
 * * 타입 가드 => 타입을 좁힌다.
 * @param type 문자열
 * @returns 해당 문자열이 해당 Type에 속해있는가 boolean
 */
export function IsSearchType(type: string): type is SearchType {
  return type === QUERY_TYPE.TITLE || type === QUERY_TYPE.TAG;
}

export function BookSearchQueryFilter(bookSearchQuery: IBookSearchQuery): {
  [key: string]: RegExp;
} {
  switch (bookSearchQuery.type) {
    case QUERY_TYPE.TITLE:
      return { title: new RegExp(bookSearchQuery.content, "i") };
    case QUERY_TYPE.TAG:
      return { hashtags: new RegExp(bookSearchQuery.content, "i") };
  }
}
