"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ROUTER_PATH } from "frontend/src/static/ROUTER_PATH";
import { useUserInfo } from "../context/UserContext";
import { useOrder } from "../context/OrderContext";

/**
 * * 황재민
 * * Navbar의 역활은 항상 고정적으로 존재해야되는 Component
 * @returns 
 */
export default function Navbar() {

  //* 화면의 루트('/')일 때만 존재, 이 루트경로를 판단하기 위해서 사용한 변수
  const path = usePathname();

  //* path에 따라 boolean 값이 변경되는 역할 => Navbar에 검색페이지를 보여줄것인지 판단하는 리액트훅 
  //* 조건부 렌더링에 사용된다.
  const [isView, setIsView] = useState<boolean>();

  //* 유저 정보다 담긴 커스텀 훅
  //* userInfo가 null이 아니면, 로그인이 된 상태다.
  const { userInfo, setUserInfo } = useUserInfo();

  //* 주문 목록 커스텀 훅 => order의 개수를 파악해서 navbar 주문목록알림을 위한 훅
  const { order } = useOrder();

  //* array.reduce => 누산치, amount를 계산해서 총 몇개가 주문목록에 올라가있는지 파악
  //* 자바스크립트에서의 배열메소드는 코드의 양을 줄이기위한 획기적인 도구다, 꼭 기억하도록 
  const length = order.reduce((arr,cur) => arr + cur.amount,0)

  //* path => 경로를 판단
  useEffect(() => {
    if (path === "/") setIsView(false);
    else setIsView(true);
  }, [path]);

  return (
    <nav>
      <div className="w-screen fixed z-50 bg-white">
        <div className="flex justify-between h-16 px-10 shadow items-cente">
          <div className="flex items-center space-x-1">
            <h1 className="text-xl lg:text-2xl font-bold cursor-pointer mr-3">
              CyberFunc
            </h1>
            <div className="hidden lg:flex justify-around space-x-4 gap-10">
              <Link
                href={ROUTER_PATH.HOME}
                className="hover:text-indigo-600 text-gray-700 pl-10"
              >
                Home
              </Link>
              <Link
                href={ROUTER_PATH.ABOUT}
                className="hover:text-indigo-600 text-gray-700"
              >
                About
              </Link>
              <Link
                href={ROUTER_PATH.CHECKOUT}
                className="hover:text-indigo-600 text-gray-700 relative"
              >
                Checkout
                {length !== 0 && (
                  <span className="absolute  bg-red-600 text-red-100 px-2 py-1 text-xs font-extrabold rounded-full -top-3">
                    {length}+
                  </span>
                )}
              </Link>
              <Link
                href={ROUTER_PATH.ADMIN}
                className="hover:text-indigo-600 text-gray-700"
              >
                ADMIN
              </Link>
            </div>
          </div>
          <div className="flex items-center">{isView && <SearchBar />}</div>
          <div className="flex space-x-4 items-center">
            {userInfo ? (
              <>
                <h3>{userInfo.id}</h3>
                <button
                  title="logout"
                  onClick={() => {
                    setUserInfo(null);
                  }}
                  className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm"
                >
                  logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-800 text-sm">
                  LOGIN
                </Link>
                <Link
                  href="/signup"
                  className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm"
                >
                  SIGNUP
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
