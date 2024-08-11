"use client";

import React from "react";
import { SideSelectContext } from "../context/SideSelectContext";
import { TableComponent } from "./table/table";
import { ITableHeader } from "./table/interface/ITable";
import axiosInstance from "../../../module/axiosInstance";
import { bookHeader, bookField } from "../model/bookModel";
import { IFieldType } from "./table/interface/IField";
import { DataController } from "./table/class/DataController";
import { BookDto } from "@shared/dto/book.dto";
import { paymentField, paymentHeader } from "../model/paymentModel";
import { PaymentDto } from "@shared/dto/payment.dto";

export function AdminMainComponent() {
  const context = React.useContext(SideSelectContext);

  const [data, setData] = React.useState<unknown[] | null>(null);
  const [header, setHeader] = React.useState<ITableHeader | null>(null);
  const [field, setField] = React.useState<IFieldType | null>(null);
  const [dataController, setDataController] = React.useState<DataController | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true); // 로딩 상태 추가

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 데이터 로딩 시작
      try {
        let response;
        switch (context.selected) {
          case "order":
            setHeader(paymentHeader);
            setField(paymentField);
            setDataController(new DataController(
              process.env.NEXT_PUBLIC_PROXY_SERVICE_HOST,
              "/admin/payments",
              "/admin/payments"
            ));
            response = await axiosInstance.get("/admin/payments");
            setData(response.data as PaymentDto[]);
            break;

          case "stock":
            setHeader(bookHeader);
            setField(bookField);
            setDataController(new DataController(
              process.env.NEXT_PUBLIC_PROXY_SERVICE_HOST,
              "/admin/books",
              "/admin/books"
            ));
            response = await axiosInstance.get("/admin/books");
            setData(response.data as BookDto[]);
            break;

          default:
            setData(null);
            break;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null);
      } finally {
        setLoading(false); // 데이터 로딩 완료
      }
    };

    fetchData();
  }, [context.selected]);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시
  }

  if (!data || !header || !field || !dataController) {
    return <></>; // 데이터가 없거나 로딩이 완료되지 않은 경우
  }

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <TableComponent
        header={header}
        data={data}
        field={field}
        dataController={dataController}
      />
    </div>
  );
}
