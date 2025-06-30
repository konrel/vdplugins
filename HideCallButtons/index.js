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

// src/profile.ts
var import_metro = require("@vendetta/metro");
var import_patcher = require("@vendetta/patcher");
var import_assets = require("@vendetta/ui/assets");
var profile_default = () => {
  const UserProfileActions = (0, import_metro.findByName)("UserProfileActions", false);
  const voiceIcon = (0, import_assets.getAssetIDByName)("ic_audio") ?? (0, import_assets.getAssetIDByName)("PhoneCallIcon");
  const videoIcon = (0, import_assets.getAssetIDByName)("ic_video") ?? (0, import_assets.getAssetIDByName)("VideoIcon");
  if (!UserProfileActions) return;
  return (0, import_patcher.after)("default", UserProfileActions, (_, comp) => {
    var _a, _b, _c, _d, _e, _f, _g;
    let buttons = (_f = (_e = (_d = (_c = (_b = (_a = comp == null ? void 0 : comp.props) == null ? void 0 : _a.children) == null ? void 0 : _b.props) == null ? void 0 : _c.children) == null ? void 0 : _d[1]) == null ? void 0 : _e.props) == null ? void 0 : _f.children;
    if ((_g = buttons == null ? void 0 : buttons.props) == null ? void 0 : _g.children) buttons = buttons.props.children;
    if (!Array.isArray(buttons)) return;
    comp.props.children.props.children[1].props.children = buttons.filter(
      (btn) => {
        var _a2, _b2;
        return ((_a2 = btn == null ? void 0 : btn.props) == null ? void 0 : _a2.icon) !== voiceIcon && ((_b2 = btn == null ? void 0 : btn.props) == null ? void 0 : _b2.icon) !== videoIcon;
      }
    );
  });
};

// src/index.ts
var patches = [];
var onLoad = () => {
  const patch = profile_default();
  if (patch) patches.push(patch);
};
var onUnload = () => {
  for (const unpatch of patches) unpatch();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  onLoad,
  onUnload
});
