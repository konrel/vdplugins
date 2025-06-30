import { find } from "@vendetta/metro";
import { before } from "@vendetta/patcher";

let unpatch: () => void;

export const onLoad = () => {
  const profileActions = find((x) =>
    typeof x?.default === "function" &&
    x.default.toString().includes("Start Voice Call")
  );
  if (!profileActions) return;

  unpatch = before("default", profileActions, (args) => {
    const props = args[0];
    if (props?.children) {
      props.children = props.children.filter?.(
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