import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { SearchProvider } from "./context/SearchContext";
import { UserProvider } from "./context/UserContext";
import { OrderProvider } from "./context/OrderContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CyberFunc Book",
  description: "A simple bookstore app",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
