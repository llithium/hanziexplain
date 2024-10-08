"use client";
import { useContext } from "react";
import { TraditionalContext } from "@/components/providers/traditional-provider";
import { Switch } from "@/components/ui/switch";

const TraditionalSwitcher = () => {
  const { tradSelected, setTradSelected } = useContext(TraditionalContext);
  function handleValueChange(value: boolean) {
    setTradSelected(!tradSelected);
    localStorage.setItem("tradSelected", value.toString());
  }
  return (
    <div className="flex items-center gap-1">
      <span className="font-hans">简</span>
      <Switch
        className="m-0 font-hans"
        color="default"
        checked={tradSelected}
        onCheckedChange={handleValueChange}
      />
      <span className="font-hans">繁</span>
    </div>
  );
};

export default TraditionalSwitcher;
