"use client";

import React from "react";
import { SideSelectContext } from "../context/SideSelectContext";
import { TableComponent } from "./table/table";
import { ITableHeader } from "./table/interface/ITable";
import axiosInstance from "../../../module/axiosInstance";
import { bookHeader, bookField } from "../model/bookModel";
import { IFieldType } from "./table/interface/IField";
import { DataController } from "./table/class/DataController";

export function AdminMainComponent() {
  const context = React.useContext(SideSelectContext);

  //* 무슨 데이터가 들어올지 모르기 때문에, unknown 데이터 타입
  const [data, setData] = React.useState<unknown[] | null>(null);
  //* 테이블의 컬럼 헤더
  const [header, setHeader] = React.useState<ITableHeader | null>(null);
  //* 각 데이터의 필드의 타입
  const [field, setField] = React.useState<IFieldType | null>(null);

  const [dataController, setDataController] = React.useState<DataController>();

  React.useEffect(() => {
    switch (context.selected) {
      case "order": {
        setHeader(bookHeader);
        setField(bookField);
        setDataController(new DataController(process.env.NEXT_PUBLIC_PROXY_SERVICE_HOST, '/admin/books', '/admin/books'));
        axiosInstance.get("/admin/books").then((res) => setData(res.data));
      }
      case "stock": {
        setHeader(bookHeader);
        setField(bookField);
        setDataController(new DataController(process.env.NEXT_PUBLIC_PROXY_SERVICE_HOST, '/admin/books', '/admin/books'));
        axiosInstance.get("/admin/books").then((res) => setData(res.data));
      }
      default:
        setData(null);
    }
  }, [context]);

  return (
    <div className="fle flex flex-col items-center gap-2 w-full">
      {data && (
        <TableComponent
          header={header}
          data={data}
          field={field}
          dataController={dataController}
        />
      )}
    </div>
  );
}
