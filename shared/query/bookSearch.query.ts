export type SearchType = "title" | "tag";

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
  return type === "title" || type === "tag";
}

export function BookSearchQueryFilter(bookSearchQuery: IBookSearchQuery): {
  [key: string]: RegExp;
} {
  let filter;

  if (bookSearchQuery.type === "title") {
    filter = { title: new RegExp(bookSearchQuery.content, "i") };
  } else if (bookSearchQuery.type === "tag") {
    filter = { hashtags: new RegExp(bookSearchQuery.content, "i") };
  }

  return filter;
}
