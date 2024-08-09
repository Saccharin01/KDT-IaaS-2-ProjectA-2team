"use client";

import { useRef, useState } from "react";
import { ValidateEmail } from "../func/ValidateEmail";
import { SIGN_ERR_MSG } from "frontend/src/static/ERR_MSG";
import ErrComponent from "../components/ErrComponent";
import axiosInstance from "frontend/src/module/axiosInstance";
import { HTTP } from "frontend/src/static/HTTP";
import { useRouter } from "next/navigation";
import { ROUTER_PATH } from "frontend/src/static/ROUTER_PATH";
import { ValidatePhoneNumber } from "../func/ValidatePhoneNumber";
import { ValidatePassword } from "../func/ValidatePassword";
import { AccountDto } from "@shared/dto/account.dto";
import { HTTP_RESPONSE } from "frontend/src/static/HTTP_RESPONSE";
import Link from "next/link";
import { AxiosError } from "axios";

interface SignErr {
  id: string;
  phone: string;
  password: string;
  passwordCheck: string;
}

export default function SignUp() {
  const router = useRouter();

  const id = useRef<HTMLInputElement | null>(null);
  const phone = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const passwordCheck = useRef<HTMLInputElement | null>(null);

  const [signErr, setSignErr] = useState<SignErr>({
    id: SIGN_ERR_MSG.NONE,
    phone: SIGN_ERR_MSG.NONE,
    password: SIGN_ERR_MSG.NONE,
    passwordCheck: SIGN_ERR_MSG.NONE,
  });

  //* 유효성 검사
  const validate = () => {
    let isValid = true;

    const signMsg = structuredClone(signErr);

    if (
      !id.current ||
      !phone.current ||
      !password.current ||
      !passwordCheck.current
    )
      return;

    if (ValidateEmail(id.current.value) === false) {
      signMsg.id = SIGN_ERR_MSG.INVALID_EMAIL;
      isValid = false;
    } else {
      signMsg.id = SIGN_ERR_MSG.NONE;
    }

    if (ValidatePhoneNumber(phone.current.value) === false) {
      signMsg.phone = SIGN_ERR_MSG.INVALID_PHONE;
      isValid = false;
    } else {
      signMsg.phone = SIGN_ERR_MSG.NONE;
    }

    if (ValidatePassword(password.current.value) === false) {
      signMsg.password = SIGN_ERR_MSG.INVALID_PASSWORD;
    } else {
      signMsg.password = SIGN_ERR_MSG.NONE;
    }

    if (password.current.value !== passwordCheck.current.value) {
      signMsg.passwordCheck = SIGN_ERR_MSG.INCORRECT_PASSWORD;
      isValid = false;
    } else {
      signMsg.passwordCheck = SIGN_ERR_MSG.NONE;
    }

    if (isValid === false) {
      setSignErr(signMsg);
      return;
    }

    fetchData();
  };

  //* 상태코드를 통해 회원가입 성공 여부를 판단
  const fetchData = () => {
    const body: AccountDto = {
      _id: id.current.value,
      password: password.current.value,
      phone: phone.current.value,
    };

    axiosInstance
      .post(HTTP.AUTH_SIGNUP, body)
      .then((res) => {
        if (res.status === HTTP_RESPONSE.POST_OK) {
          router.push(ROUTER_PATH.LOGIN);
        }
      })
      .catch((err: AxiosError) => {
        if (err.response.status === HTTP_RESPONSE.SIGN_UP_FAIL)
          setSignErr({ ...signErr, id: SIGN_ERR_MSG.DUPLICATE_EMAIL });
      });
  };

  //* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel
  return (
    <div className="font-[sans-serif] max-w-4xl flex items-center mx-auto h-full p-4">
      <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-indigo-700 to-indigo-500 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg font-semibold">
              Create Your Account
            </h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
              Welcome to our registration page! Get started by creating your
              account.
            </p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">
              Simple & Secure Registration
            </h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
              Our registration process is designed to be straightforward and
              secure. We prioritize your privacy and data security.
            </p>
          </div>
        </div>

        <div className="md:col-span-2 w-full py-6 px-6 sm:px-16">
          <div className="mb-6">
            <h3 className="text-gray-800 text-2xl font-bold">
              Create an account
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Email
                <ErrComponent msg={signErr.id} />
              </label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  ref={id}
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter email"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="Link" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clipPath="url(#Link)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      strokeMiterlimit="10"
                      strokeWidth="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Phone
                <ErrComponent msg={signErr.phone} />
              </label>
              <div className="relative flex items-center">
                <input
                  name="phone"
                  type="tel"
                  ref={phone}
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter Phone"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Password
                <ErrComponent msg={signErr.password} />
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  ref={password}
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Password Check
                <ErrComponent msg={signErr.passwordCheck} />
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  ref={passwordCheck}
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm text-gray-800"
              >
                I accept the{" "}
                <Link
                  href={ROUTER_PATH.ABOUT}
                  className="text-blue-600 font-semibold hover:underline ml-1"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>
          </div>

          <div className="!mt-12">
            <button
              type="button"
              onClick={validate}
              className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none"
            >
              Create an account
            </button>
          </div>
          <p className="text-gray-800 text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link
              href={ROUTER_PATH.LOGIN}
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
