export type SearchType = "title" | "tag";

export enum QUERY_TYPE {
  TITLE = "title",
  TAG = "tag",
}

export enum QUERY_KEY {
  TYPE = 'type',
  CONTENT = 'content',
}

export interface IBookSearchQuery {
  type: SearchType;
  content: string;
}

export class BookSearchQuery implements IBookSearchQuery {
  constructor(
    public type: SearchType,
    public content: string,
    public page: number
  ) {}
}

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
