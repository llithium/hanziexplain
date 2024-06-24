"use client";

import { createContext, useState } from "react";

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
  return (
    <TraditionalContext.Provider value={{ tradSelected, setTradSelected }}>
      {children}
    </TraditionalContext.Provider>
  );
}
