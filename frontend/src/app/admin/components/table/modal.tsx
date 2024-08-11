"use client";

import React, { useState, useEffect } from "react";
import { IFieldType } from "./interface/IField";
import { DataController } from "./class/DataController";

interface ModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  data: T | null;
  onSave: (updatedData: T) => void;
  onAdd: (newData: T) => void;
  fieldTypes: IFieldType; // 필드 타입 정보
  crud: TableCRUD;
  dataController: DataController;
}

export function ModalComponent<T>({
  isOpen,
  onClose,
  data,
  onSave,
  onAdd,
  fieldTypes,
  crud,
  dataController,
}: ModalProps<T>) {
  const [formData, setFormData] = useState<T | null>(data);

  //* Error를 저장하는 React Hook
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [title, setTitle] = useState<string>();
  const keys = Object.keys(fieldTypes) as (keyof T)[];
  //* 데이터가 변경되었을 때
  //* 변경되었을 때는 row클릭을 기존과 다른곳에 했을 때
  useEffect(() => {
    setErrors({});
    if (data) {
      setFormData(data);
    } else {
      //* 비어있는 데이터 생성
      const emptyData = {} as T;
      keys.forEach((key) => {
        emptyData[key] = "" as any;
      });
      setFormData(emptyData);
    }
  }, [data]);

  useEffect(() => {
    switch (crud) {
      case "create":
        setTitle("New Data");
        break;
      case "update":
        setTitle("Edit Data");
        break;
      case "none":
        setTitle("none");
        break;
    }
  }, [crud]);

  //* 데이터가 완성되어 있지 않거나 || open 상태가 아닐 때
  if (!isOpen || !formData) return null;

  //* 각 input창 이벤트
  const handleChange = (key: keyof T, value: any) => {
    //* 특정 키 값 업데이트
    //! key가 새로운 키면, 프로퍼티가 추가된다
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (validate()) {
      if (formData) {
        const res = await sendData();
        if(crud === 'update')
          onSave(res.data);
        else if(crud === 'create')
          onAdd(res.data);
      }
      onClose();
    }
  };

  //* 각 필드의 데이터 유효성 검사
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    keys.forEach((key) => {
      const expectedType = fieldTypes[key as string];
      let value = formData[key];

      switch (expectedType) {
        case "string":
          if (typeof value !== "string") {
            newErrors[key as string] = "Must be a string";
          }
          break;
        case "number":
          if (isNaN(Number(value))) {
            newErrors[key as string] = "Must be a number";
          }
          else {
            formData[key] = parseInt(value as string) as any;
          }
          break;
        case "boolean":
          if (value !== true && value !== false) {
            newErrors[key as string] = "Must be true or false";
          }
          break;
        case "arr_string": {
          if(Array.isArray(value)){
            value = value.join() as any;
          }

          if (typeof value !== "string") {
            newErrors[key as string] = "Must be a string";
          } else {
            const regex = /^(?:[^,]+)(?:,[^,]+)*$/;
            if (!regex.test(value)) {
              newErrors[key as string] =
                "Must be a ArrString : 'string,string,string'";
            } else {
              const data: string = value as string;
              formData[key] = data.split(",") as any;
            }
          }
          break;
        }
        case "date": {
          if (typeof value !== "string") {
            newErrors[key as string] = "Must be a string";
          } else {
            const dateTimeRegex =
            /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)?$/;
            const result = dateTimeRegex.test(value);
            if (result === false) {
              newErrors[key as string] = "Must be a Date : YYYY-MM-DDThh:mm:ss.000Z";
            }
          }
          break;
        }
        default:
          break;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //* 서버에 해당 데이터 보내기
  const sendData = () => {
    switch (crud) {
      case "create":
        return dataController.PostMethod(formData);
      case "update":
        return dataController.PutMethod(formData);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-3/6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="space-y-4">
          {Object.entries(formData).map(([key, value]) => {
            return (
              fieldTypes[key] !== "none" &&
              fieldTypes[key] !== undefined && (
                <div key={key}>
                  <div className="grid grid-cols-2 items-center">
                    <label className="font-semibold">{key}</label>
                    <input
                      title="input"
                      className="border p-1 "
                      type="text"
                      value={value as any}
                      onChange={(e) =>
                        handleChange(key as keyof T, e.target.value)
                      }
                    />
                  </div>
                  <div>
                    {errors[key as string] && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors[key as string]}
                      </span>
                    )}
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="mt-4 flex justify-end space-x-4">
          <button onClick={onClose} className="border p-2 bg-gray-200 rounded">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="border p-2 bg-blue-500 text-white rounded"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
