"use client";

import { MakeQueryObj } from "@shared/func/MakeQueryObj";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { HTTP } from "../../../src/static/HTTP";
import { BookDto } from "@shared/dto/book.dto";
import axiosInstance from "frontend/src/module/axiosInstance";
import BookComponent from "./components/BookComponent";
import { useRouter } from "next/navigation";

export default function BookList() {
  const router = useRouter();
  const query = useSearchParams();
  const [books, setBooks] = useState<BookDto[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchData = () => {
    const result = MakeQueryObj(query, page);
    if (result === null) return;
    else {
      setLoading(true);

      axiosInstance
        .get(HTTP.SEARCH, {
          params: {
            ...result,
            page: page,
          },
        })
        .then((res) => {
          const newBooks = res.data as BookDto[];
          setBooks((prevBooks) => [...prevBooks, ...newBooks]);
          setLoading(false);
        });
    }
  }

  useEffect(() => fetchData(), [page, query]);

  useEffect(() => {
    router.refresh();
    setBooks([]);
  },[query])

  return (
    <div>
      <div>
        {books.map((book, index) => (
          <div key={index}>
            <BookComponent {...book} />
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}
