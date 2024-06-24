/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

interface TraditionalContextType {
  tradSelected: boolean;
  setTradSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TraditionalContext = createContext<TraditionalContextType>({
  tradSelected: false,
  setTradSelected: () => {},
});

export default function TraditionalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tradSelected, setTradSelected] = useState(false);
  if (typeof window !== "undefined") {
    const [tradSelectedLocalStorage, saveTradSelectedLocalStorage] =
      useLocalStorage("tradSelected", false);
    useEffect(() => {
      if (typeof window !== "undefined") {
        setTradSelected(tradSelectedLocalStorage);
      }
    }, []);

    useEffect(() => {
      if (typeof window !== "undefined") {
        saveTradSelectedLocalStorage(tradSelected);
      }
    }, [tradSelected]);
  }
  return (
    <TraditionalContext.Provider value={{ tradSelected, setTradSelected }}>
      {children}
    </TraditionalContext.Provider>
  );
}
