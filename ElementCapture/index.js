"use strict";

// src/index.ts
var { after } = globalThis.vendetta.patcher;
var { findByProps } = globalThis.vendetta.metro;
var unpatches = [];
exports.default = {
  onLoad: () => {
    const Button = findByProps("IconButton", "TextButton", "Button");
    if (!Button) {
      console.log("[ClickLogger] Button module not found");
      return;
    }
    const patch = after("default", Button, ([props], ret) => {
      if (!(props == null ? void 0 : props.onPress) || props.__clickLoggerPatched) return;
      props.__clickLoggerPatched = true;
      const original = props.onPress;
      props.onPress = (...args) => {
        try {
          const name = props.accessibilityLabel || props.testID || "Unnamed Button";
          console.log(`[ClickLogger] Button clicked: ${name}`);
        } catch (e) {
          console.warn("[ClickLogger] Error logging click:", e);
        }
        original == null ? void 0 : original(...args);
      };
    });
    unpatches.push(patch);
    console.log("[ClickLogger] Logging hook installed.");
  },
  onUnload: () => {
    for (const un of unpatches) un();
    console.log("[ClickLogger] Logging hook removed.");
  }
};
