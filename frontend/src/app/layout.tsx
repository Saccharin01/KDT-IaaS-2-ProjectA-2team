import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { SearchProvider } from "./context/SearchContext";
import { UserProvider } from "./context/UserContext";
import { OrderProvider } from "./context/OrderContext";

const inter = Inter({ subsets: ["latin"] });

/**
 * * 황재민
 * * metadata => Header mete 정보를 기록
 */
export const metadata: Metadata = {
  title: "CyberFunc Book",
  description: "A simple bookstore app",
};

/**
 * * 황재민
 * * 페이지의 전체적인 레이아웃을 나타낸다.
 * * 크게 두가지의 영역으로 구분 <Header, main> => < Navbar, children(page.tsx) >
 * @param param0 : page.tsx  
 * @returns 
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //* Provider를 최상단 루트에 넣어둔 이유, 유저 정보, 주문 목록 활용하기 위해서
  return (
    <html lang="en">
      <UserProvider>
        <OrderProvider>
          <SearchProvider>
            <body className="bg-gray-100">
              <header>
                <Navbar />
              </header>
              <main className="pt-16 box-border h-screen -z-0">{children}</main>
            </body>
          </SearchProvider>
        </OrderProvider>
      </UserProvider>
    </html>
  );
}
