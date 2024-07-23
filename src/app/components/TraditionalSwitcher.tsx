"use client";
import { Switch } from "@nextui-org/switch";
import { useContext } from "react";
import { TraditionalContext } from "./traditional-provider";

const TraditionalSwitcher = () => {
  const { tradSelected, setTradSelected } = useContext(TraditionalContext);
  function handleValueChange(value: boolean) {
    setTradSelected(!tradSelected);
    localStorage.setItem("tradSelected", value.toString());
  }
  return (
    <>
      <span className="font-hans">简</span>{" "}
      <Switch
        className="m-0 font-hans transition-opacity hover:opacity-80 active:opacity-disabled"
        size="sm"
        color="default"
        isSelected={tradSelected}
        onValueChange={handleValueChange}
      />
      <span className="font-hans">繁</span>
    </>
  );
};

export default TraditionalSwitcher;
