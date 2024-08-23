"use client";

import axiosInstance from "frontend/src/module/axiosInstance";
import { HTTP } from "frontend/src/static/HTTP";
import { useContext, useRef } from "react";
import { LoginDto, LoginResDto } from "@shared/dto/login.dto";
import { HTTP_RESPONSE } from "frontend/src/static/HTTP_RESPONSE";
import { UserContext, useUserInfo } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { ROUTER_PATH } from "frontend/src/static/ROUTER_PATH";
import { AxiosError} from 'axios';

/**
 * * 홯재민
 * @returns 
 */
export default function Login() {

  //* 페이지 이동을 위한 라우터
  const router = useRouter();

  //* id 필드
  const idRef = useRef<HTMLInputElement | null>(null);

  //* password 필드
  const passwordRef = useRef<HTMLInputElement | null>(null);

  //* 유저 정보를 저장하기위해서 불러운 Context
  // const userContext = useContext(UserContext);
  const { setUserInfo } = useUserInfo();

  //* 로그인에 대한 이벤트
  const loginEvent = () => {

    //* 아이디, 페스워드의 value로 json 객체를 만드는과정이라고 할 수 있다.
    const body: LoginDto = {
      _id: idRef.current.value,
      password: passwordRef.current.value,
    };

    //* 서비스(백엔드)로 해당 데이터를 보내준다.
    //* 서비스에서는 201 Code 로그인 완료, 다른 에러코드 로그인 실패했다라고 처리를 하였다.
    axiosInstance.post(HTTP.AUTH_LOGIN, body).then((res) => {
      if (res.status === HTTP_RESPONSE.POST_OK) {
        const data = res.data as LoginResDto;
        setUserInfo({
          id: body._id,
          token: data.access_token,
        });

        //* 로그인 상태 저장후 메인 홈으로 이동한다.
        router.push(ROUTER_PATH.HOME)
      } 
    }).catch(
      (error : AxiosError) => {
        //TODO 로그인 실패 처리
      }
    );
  };

  return (
    <div className="h-full bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-3/5">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 to-indigo-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Login</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="text"
                    ref={idRef}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    ref={passwordRef}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <button className="bg-indigo-600 text-white rounded-md px-2 py-1" onClick={loginEvent}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
