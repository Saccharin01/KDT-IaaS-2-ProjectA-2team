'use client'

import { createContext, useState, ReactNode, useContext } from "react";
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

export const useSearch = () => {
  const context = useContext(SearchContext);
  
  if(!context){
    throw new Error("useSearch must be used within an searchProvider");
  }

  return context
}