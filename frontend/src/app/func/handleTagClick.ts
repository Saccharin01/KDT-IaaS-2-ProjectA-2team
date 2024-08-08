import { IBookSearchQuery } from "@shared/query/bookSearch.query";
import { IsStringRecord } from "frontend/func/IsStringRecord";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleTagClick = (tag: string, router: AppRouterInstance) => {
  
  let query: IBookSearchQuery = {
    type: "tag",
    content: tag,
  };

  if (IsStringRecord(query)) {
    const queryString = new URLSearchParams(query).toString();
    router.push(`/books/?${queryString}`);
  } else {
    //TODO: 에러 페이지로 이동을 해야한다.
  }
};