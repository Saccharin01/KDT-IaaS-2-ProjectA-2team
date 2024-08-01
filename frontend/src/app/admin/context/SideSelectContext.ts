import { createContext } from "react";
import { SideContextState } from "../interface/types";

interface SideSelectContextType {
  selected: SideContextState | null;
  setSelected: React.Dispatch<React.SetStateAction<SideContextState | null>>;
}

export const SideSelectContext = createContext<SideSelectContextType | null>(
  null
);