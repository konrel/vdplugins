import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";

let unpatch: () => void;

export const onLoad = () => {
  const Button = findByProps("Button", "IconButton");

  if (!Button?.default) {
    console.warn("[ClickLogger] Button component not found");
    return;
  }

  unpatch = after("default", Button, ([props], comp) => {
    const orig = props.onPress;

    props.onPress = (...args) => {
      try {
        const label = props?.accessibilityLabel || props?.children?.toString() || "Unnamed button";
        const icon = props?.icon || props?.source;
        console.log(`[ClickLogger] Button clicked: ${label}`, { icon, props });
      } catch (e) {
        console.warn("[ClickLogger] Logging failed", e);
      }

      if (typeof orig === "function") orig(...args);
    };

    return comp;
  });

  console.log("[ClickLogger] Hooked into global Button onPress");
};

export const onUnload = () => {
  if (unpatch) unpatch();
};