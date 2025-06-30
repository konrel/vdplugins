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
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
    let buttons = (_f = (_e = (_d = (_c = (_b = (_a = comp == null ? void 0 : comp.props) == null ? void 0 : _a.children) == null ? void 0 : _b.props) == null ? void 0 : _c.children) == null ? void 0 : _d[1]) == null ? void 0 : _e.props) == null ? void 0 : _f.children;
    if ((_g = buttons == null ? void 0 : buttons.props) == null ? void 0 : _g.children) buttons = buttons.props.children;
    if (!Array.isArray(buttons)) return;
    const filtered = buttons.filter(
      (btn) => {
        var _a2, _b2;
        return ((_a2 = btn == null ? void 0 : btn.props) == null ? void 0 : _a2.icon) !== voiceIcon && ((_b2 = btn == null ? void 0 : btn.props) == null ? void 0 : _b2.icon) !== videoIcon;
      }
    );
    if (Array.isArray((_o = (_n = (_m = (_l = (_k = (_j = (_i = (_h = comp == null ? void 0 : comp.props) == null ? void 0 : _h.children) == null ? void 0 : _i.props) == null ? void 0 : _j.children) == null ? void 0 : _k[1]) == null ? void 0 : _l.props) == null ? void 0 : _m.children) == null ? void 0 : _n.props) == null ? void 0 : _o.children)) {
      comp.props.children.props.children[1].props.children.props.children = filtered;
    } else {
      comp.props.children.props.children[1].props.children = filtered;
    }
  });
};

// src/dm.ts
var import_metro2 = require("@vendetta/metro");
var import_patcher2 = require("@vendetta/patcher");
var import_assets2 = require("@vendetta/ui/assets");
var dm_default = () => {
  const PrivateChannelButtons = (0, import_metro2.find)((x) => {
    var _a;
    return ((_a = x == null ? void 0 : x.type) == null ? void 0 : _a.name) === "PrivateChannelButtons";
  });
  const vcCallIcon = (0, import_assets2.getAssetIDByName)("nav_header_connect");
  const vcVideoIcon = (0, import_assets2.getAssetIDByName)("video");
  const voiceIcon = (0, import_assets2.getAssetIDByName)("ic_audio") ?? (0, import_assets2.getAssetIDByName)("PhoneCallIcon");
  const videoIcon = (0, import_assets2.getAssetIDByName)("ic_video") ?? (0, import_assets2.getAssetIDByName)("VideoIcon");
  if (!PrivateChannelButtons) return;
  return (0, import_patcher2.after)("type", PrivateChannelButtons, (_, comp) => {
    var _a, _b, _c;
    let buttons = (_a = comp == null ? void 0 : comp.props) == null ? void 0 : _a.children;
    if (!Array.isArray(buttons)) buttons = (_c = (_b = buttons == null ? void 0 : buttons[0]) == null ? void 0 : _b.props) == null ? void 0 : _c.children;
    if (!Array.isArray(buttons)) return;
    comp.props.children = buttons.filter(
      (btn) => {
        var _a2, _b2, _c2, _d;
        return ((_a2 = btn == null ? void 0 : btn.props) == null ? void 0 : _a2.source) !== vcCallIcon && ((_b2 = btn == null ? void 0 : btn.props) == null ? void 0 : _b2.source) !== vcVideoIcon && ((_c2 = btn == null ? void 0 : btn.props) == null ? void 0 : _c2.source) !== voiceIcon && ((_d = btn == null ? void 0 : btn.props) == null ? void 0 : _d.source) !== videoIcon;
      }
    );
  });
};

// src/vc.ts
var import_metro3 = require("@vendetta/metro");
var import_patcher3 = require("@vendetta/patcher");
var import_assets3 = require("@vendetta/ui/assets");
var vc_default = () => {
  const VideoButton = (0, import_metro3.findByProps)("VideoButton");
  const vcVideoIcon = (0, import_assets3.getAssetIDByName)("video");
  if (!VideoButton) return;
  return (0, import_patcher3.after)("default", VideoButton, (_, comp) => {
    var _a, _b, _c, _d, _e;
    const buttonList = (_e = (_d = (_c = (_b = (_a = comp == null ? void 0 : comp.props) == null ? void 0 : _a.children) == null ? void 0 : _b.props) == null ? void 0 : _c.children) == null ? void 0 : _d.props) == null ? void 0 : _e.children;
    if (!Array.isArray(buttonList)) return;
    comp.props.children.props.children.props.children = buttonList.filter(
      (btn) => {
        var _a2;
        return ((_a2 = btn == null ? void 0 : btn.props) == null ? void 0 : _a2.icon) !== vcVideoIcon;
      }
    );
  });
};

// src/index.ts
var patches = [];
var onLoad = () => {
  for (const patch of [profile_default, dm_default, vc_default]) {
    const result = patch();
    if (result) patches.push(result);
  }
};
var onUnload = () => {
  for (const unpatch of patches) unpatch();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  onLoad,
  onUnload
});
