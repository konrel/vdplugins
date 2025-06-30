import { find, findByProps } from "@vendetta/metro";
import { before } from "@vendetta/patcher";

let unpatch: () => void;

export const onLoad = () => {
  const vcButtons = find((x) =>
    typeof x?.default === "function" &&
    x.default.toString().includes("Start Voice Call")
  );

  if (!vcButtons) return;

  unpatch = before("default", vcButtons, (args) => {
    if (args[0]?.children) {
      args[0].children = args[0].children.filter?.(
        (c) =>
          !c?.props?.["aria-label"]?.toLowerCase?.().includes("call") &&
          !c?.props?.tooltip?.toLowerCase?.().includes("call")
      );
    }
  });
};

export const onUnload = () => {
  unpatch?.();
};