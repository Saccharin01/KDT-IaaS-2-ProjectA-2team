"use client";

import ListItemComponent from "./components/ListComponent";
import { useOrder } from "../context/OrderContext";
import { useRef } from "react";
import { useUserInfo } from "../context/UserContext";
import { PaymentDto } from "@shared/dto/payment.dto";
import axiosInstance from "frontend/src/module/axiosInstance";
import { HTTP } from "../../static/HTTP";
import { HTTP_RESPONSE } from "frontend/src/static/HTTP_RESPONSE";

//TODO : 수량 해결해야합니다.
export default function PurchaseComponent() {
  const { order, clearOrder } = useOrder();
  const { userInfo } = useUserInfo();
  const addressRef = useRef<HTMLInputElement>();

  if (!order || order.length === 0) return <div> 주문 목록이 비어있습니다</div>;
  const price = order.reduce((acc, cur) => acc + ( cur.price * cur.amount), 0);

  const purchaseFunc = async () => {
    if (userInfo === null) {
      //TODO 로그인 상태가 아니다.
      //TODO 로그인 하라고 알려주기. 모달 창
      return;
    }

    const date = new Date().toISOString();

    const arrPurchasDto: PaymentDto[] = order.map((book) => {
      return {
        user_id: userInfo.id,
        book_id: book._id,
        address: addressRef.current.value,
        payment: "card",
        price: book.price,
        amount: book.amount,
        date
      };
    });

    console.log(HTTP.PAYMENT_PURCHASE);

    axiosInstance.post(HTTP.PAYMENT_PURCHASE, arrPurchasDto).catch((err) => {
      //TODO 에러에 대한 처리가 필요. 구매 실패 사용자에게 알림.
    })
  
    clearOrder();
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-50 py-5">
      <div className="px-5">
        <div className="mb-2">
          <a
            href="#"
            className="focus:outline-none hover:underline text-gray-500 text-sm"
          >
            <i className="mdi mdi-arrow-left text-gray-400"></i>Back
          </a>
        </div>
        <div className="mb-2">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-600">
            Checkout.
          </h1>
        </div>
        <div className="mb-5 text-gray-400">
          <a
            href="#"
            className="focus:outline-none hover:underline text-gray-500"
          >
            Home
          </a>{" "}
          /{" "}
          <a
            href="#"
            className="focus:outline-none hover:underline text-gray-500"
          >
            Cart
          </a>{" "}
          / <span className="text-gray-600">Checkout</span>
        </div>
      </div>
      <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
        <div className="w-full">
          <div className="-mx-3 md:flex items-start">
            <div className="px-3 md:w-7/12 lg:pr-10">
              <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                {order.map((book, index) => {
                  return <ListItemComponent key={index} {...book} />;
                })}
              </div>
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="-mx-2 flex items-end justify-end">
                  <div className="flex-grow px-2 lg:max-w-xs">
                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                      Discount code
                    </label>
                    <div>
                      <input
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="XXXXXX"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="px-2">
                    <button className="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold">
                      APPLY
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                <div className="w-full flex mb-3 items-center">
                  <div className="flex-grow">
                    <span className="text-gray-600">Subtotal</span>
                  </div>
                  <div className="pl-3">
                    <span className="font-semibold">$190.91</span>
                  </div>
                </div>
                <div className="w-full flex items-center">
                  <div className="flex-grow">
                    <span className="text-gray-600">Taxes (GST)</span>
                  </div>
                  <div className="pl-3">
                    <span className="font-semibold">$19.09</span>
                  </div>
                </div>
              </div> */}
              <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                <div className="w-full flex items-center">
                  <div className="flex-grow">
                    <span className="text-gray-600">Total</span>
                  </div>
                  <div className="pl-3">
                    <span className="font-semibold text-gray-400 text-sm">
                      KRW
                    </span>{" "}
                    <span className="font-semibold">₩{price}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-3 md:w-5/12 sticky top-16">
              <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                <div className="w-full flex mb-3 items-center">
                  <div className="w-32">
                    <span className="text-gray-600 font-semibold">Name</span>
                  </div>
                  <div className="flex-grow pl-3">
                    <input
                      className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="Name..."
                      defaultValue={userInfo ? userInfo.id : ""}
                      type="text"
                    />
                  </div>
                </div>
                <div className="w-full flex items-center">
                  <div className="w-32">
                    <span className="text-gray-600 font-semibold">Address</span>
                  </div>
                  <div className="flex-grow pl-3">
                    <input
                      ref={addressRef}
                      className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="John Smith"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                <div className="w-full p-3 border-b border-gray-200">
                  <div className="mb-5">
                    <label
                      htmlFor="type1"
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-indigo-500"
                        name="type"
                      />
                      <img
                        title="visa"
                        src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                        className="h-6 ml-3"
                      />
                    </label>
                  </div>
                  <div>
                    <div className="mb-3">
                      <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                        Name on card
                      </label>
                      <div>
                        <input
                          className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                          placeholder="John Smith"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                        Card number
                      </label>
                      <div>
                        <input
                          className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                          placeholder="0000 0000 0000 0000"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="mb-3 -mx-2 flex items-end">
                      <div className="px-2 w-1/4">
                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                          Expiration date
                        </label>
                        <div>
                          <select
                            title="month"
                            className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                          >
                            <option value="01">01 - January</option>
                            <option value="02">02 - February</option>
                            <option value="03">03 - March</option>
                            <option value="04">04 - April</option>
                            <option value="05">05 - May</option>
                            <option value="06">06 - June</option>
                            <option value="07">07 - July</option>
                            <option value="08">08 - August</option>
                            <option value="09">09 - September</option>
                            <option value="10">10 - October</option>
                            <option value="11">11 - November</option>
                            <option value="12">12 - December</option>
                          </select>
                        </div>
                      </div>
                      <div className="px-2 w-1/4">
                        <select
                          title="year"
                          className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                        >
                          <option value="2020">2020</option>
                          <option value="2021">2021</option>
                          <option value="2022">2022</option>
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                          <option value="2025">2025</option>
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                          <option value="2029">2029</option>
                        </select>
                      </div>
                      <div className="px-2 w-1/4">
                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                          Security code
                        </label>
                        <div>
                          <input
                            className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="000"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full p-3">
                  <label
                    htmlFor="type2"
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-indigo-500"
                      name="type"
                    />
                    <img
                      title="paypalImg"
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                      width="80"
                      className="ml-3"
                    />
                  </label>
                </div>
              </div>
              <div>
                <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold" onClick={purchaseFunc}>
                  <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
