'use client'

import { createContext, useState, ReactNode } from "react";
import { IBookSearchQuery, QUERY_TYPE } from "@shared/query/bookSearch.query";

interface SearchContextType {
  query: IBookSearchQuery;
  setQuery: React.Dispatch<React.SetStateAction<IBookSearchQuery>>;
}

export const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<IBookSearchQuery>({
    type: QUERY_TYPE.TITLE,
    content: "",
  });

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};