import { createContext } from "react";
import { SideContextState } from "../interface/types";

interface SideSelectContextType {
  selected: SideContextState | null;
  setSelected: React.Dispatch<React.SetStateAction<SideContextState | null>>;
}

/**
 * * 황재민
 * * Context의 역활
 * * 사이드의 버튼을 감지하기 위해서 Context을 선언을 하였다.
 */
export const SideSelectContext = createContext<SideSelectContextType | null>(
  null
);