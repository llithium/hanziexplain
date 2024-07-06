/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { createContext, useEffect, useState } from "react";

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
    const tradSelectedLocalStorage = localStorage.getItem("tradSelected");

    useEffect(() => {
      if (tradSelectedLocalStorage === "true") {
        setTradSelected(true);
      } else if (tradSelectedLocalStorage === "false") {
        setTradSelected(false);
      }
    }, []);
  }
  return (
    <TraditionalContext.Provider value={{ tradSelected, setTradSelected }}>
      {children}
    </TraditionalContext.Provider>
  );
}
