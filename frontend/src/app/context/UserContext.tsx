"use client";

import { createContext, useState, ReactNode, useContext } from "react";

/**
 * * 황재민
 * * id: 유저의 Id
 * * token: 인증 토큰
 */
interface UserInfo {
  id: string;
  token: string;
}

interface UserContextType {
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  
  //* 리액트 훅
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserInfo = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserInfo must be used within an UserProvider");
  }

  return context;
};
