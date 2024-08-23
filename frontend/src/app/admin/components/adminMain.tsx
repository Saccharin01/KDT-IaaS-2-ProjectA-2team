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

/**
 * * 황재민
 * TODO 리팩토링이 필요한 곳이 아닐까?
 * @returns 
 */
export function AdminMainComponent() {
  //* 버튼에 따라서 가져오는 데이터가 달라진다.
  const context = React.useContext(SideSelectContext);

  //* 각 버튼에 따라서 가져온 데이터
  const [data, setData] = React.useState<unknown[] | null>(null);
  //* 테이블 헤더
  const [header, setHeader] = React.useState<ITableHeader | null>(null);
  //* 테이블 필드
  const [field, setField] = React.useState<IFieldType | null>(null);
  //* 데이터 컨트롤러 모달창에서 OK => 데이터가 수정되는데, Service로 보내기 위해서 형식을 정의한 axios
  const [dataController, setDataController] = React.useState<DataController | null>(null);
  //* 데이터 다 불러올떄까지 로딩, 
  const [loading, setLoading] = React.useState<boolean>(true); // 로딩 상태 추가

  //* 데이터 불러오는 함수
  React.useEffect(() => {
    const fetchData = async () => {
      //* 데이터로딩을 시작
      setLoading(true); 
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

  //* tanstack 라이브러리 페이지를 가서 함수를 파악한다.
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
