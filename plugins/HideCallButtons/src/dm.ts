import { find } from "@vendetta/metro";
import { before } from "@vendetta/patcher";

let unpatch: () => void;

export const onLoad = () => {
  const dmHeader = find((m) =>
    m?.default?.toString().includes("Start Video Call")
  );
  if (!dmHeader) return;

  unpatch = before("default", dmHeader, (args) => {
    const props = args[0];
    if (props?.children?.props?.children) {
      props.children.props.children = props.children.props.children.filter(
        (c) => !c?.props?.["aria-label"]?.toLowerCase?.().includes("call")
      );
    }
  });
};

export const onUnload = () => {
  unpatch?.();
};