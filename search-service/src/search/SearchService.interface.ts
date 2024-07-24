import { SearchResponse } from "@shared/SearchDTO";

export interface searchInterface {
  searchBooks(query: string): Promise<SearchResponse>;
}
