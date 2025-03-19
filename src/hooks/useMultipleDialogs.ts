import { useState } from "react";

const useMultipleDialogs = <T extends string>(
  initialStates: Record<T, boolean>
) => {
  const [dialogs, setDialogs] = useState<Record<T, boolean>>(initialStates);

  const toggleDialog = (dialogKey: T) => {
    setDialogs((prev) => ({
      ...prev,
      [dialogKey]: !prev[dialogKey],
    }));
  };

  return {
    dialogs,
    toggleDialog,
  };
};

export default useMultipleDialogs;
