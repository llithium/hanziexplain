import { Switch } from "@nextui-org/switch";
import { useContext } from "react";
import { TraditionalContext } from "./traditional-provider";

const TraditionalSwitcher = () => {
  const { tradSelected, setTradSelected } = useContext(TraditionalContext);

  return (
    <>
      <span className="font-hans">简</span>{" "}
      <Switch
        className="m-0 font-hans"
        size="sm"
        color="default"
        onValueChange={(v) => setTradSelected(!tradSelected)}
      ></Switch>
      <span className="font-hans">繁</span>
    </>
  );
};

export default TraditionalSwitcher;
