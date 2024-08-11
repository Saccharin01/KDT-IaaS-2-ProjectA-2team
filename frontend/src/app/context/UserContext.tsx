"use client";

import { createContext, useState, ReactNode, useContext } from "react";

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
