"use client";

import React from "react";
import { SearchComponent } from "./search";
import { SideSelectContext } from "../context/SideSelectContext";
import { TableComponent } from "./table";
import { bookHeader, ITableHeader } from "../interface/ITable";
import { BookDto } from "@shared/dto/book.dto";
import axiosInstance from "../../../module/axiosInstance";

export function AdminMainComponent() {
  const context = React.useContext(SideSelectContext);

  const [data, setData] = React.useState<BookDto[] | null>(null);
  const [header, setHeader] = React.useState<ITableHeader | null>(null);

  React.useEffect(() => {
    switch (context.selected) {
      case "order": {
        setHeader(bookHeader);
        console.log("안녕");
        axiosInstance.get("/admin/books").then((res) => setData(res.data));
      }
      case "stock": {
        setHeader(bookHeader);
        axiosInstance.get("/admin/books").then((res) => setData(res.data));
      }
      default:
        setData(null);
    }
  }, [context]);

  return (
    <div className="fle flex flex-col items-center gap-2 w-full">
      {/* <SearchComponent /> */}
      {data && <TableComponent header={bookHeader} data={data} />}
    </div>
  );
}
