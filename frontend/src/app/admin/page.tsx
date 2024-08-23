// app/inventory/page.tsx
"use client";

import React, { useState } from "react";
import { Sidebar } from "./components/sidebar";
import { AdminMainComponent } from "./components/adminMain";
import { SideSelectContext } from "./context/SideSelectContext";
import { SideContextState } from "./interface/types";

/**
 * * 황재민
 * * 관리자 페이지
 * @returns 
 */
export default function AdminPage() {
  
  const [selected, setSelected] = useState<SideContextState | null>(null);

  return (
    <SideSelectContext.Provider value={{ selected, setSelected }}>
    <div className="mx-auto w-screen h-screen">
      <div className="grid grid-cols-6 gap-4 m-3 w-full h-full">
        <div className="col-span-1 shadow-xl p-4 fiexd top-0 left-0">
          <Sidebar />
        </div>
        <div className="col-span-5 p-20 w-full">
          <AdminMainComponent/>
        </div>
      </div>
    </div>
    </SideSelectContext.Provider>
  );
}
