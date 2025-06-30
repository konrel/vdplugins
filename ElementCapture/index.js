"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  onLoad: () => onLoad,
  onUnload: () => onUnload
});
module.exports = __toCommonJS(index_exports);
var import_patcher = require("@vendetta/patcher");
var import_metro = require("@vendetta/metro");
var unpatch;
var onLoad = () => {
  const Button = (0, import_metro.findByProps)("Button", "IconButton");
  if (!(Button == null ? void 0 : Button.default)) {
    console.warn("[ClickLogger] Button component not found");
    return;
  }
  unpatch = (0, import_patcher.after)("default", Button, ([props], comp) => {
    const orig = props.onPress;
    props.onPress = (...args) => {
      var _a;
      try {
        const label = (props == null ? void 0 : props.accessibilityLabel) || ((_a = props == null ? void 0 : props.children) == null ? void 0 : _a.toString()) || "Unnamed button";
        const icon = (props == null ? void 0 : props.icon) || (props == null ? void 0 : props.source);
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
var onUnload = () => {
  if (unpatch) unpatch();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  onLoad,
  onUnload
});
