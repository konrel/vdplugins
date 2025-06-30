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
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_patcher = require("@vendetta/patcher");
var import_assets = require("@vendetta/ui/assets");
var import_toasts = require("@vendetta/ui/toasts");
var import_metro = require("@vendetta/metro");
var import_plugin = require("@vendetta/plugin");
var patches = [];
var index_default = {
  onLoad() {
    (0, import_toasts.showToast)("\u{1F525} HideCallButtons plugin loaded", (0, import_assets.getAssetIDByName)("ic_message"));
    import_plugin.storage.upHideVoiceButton ??= true;
    import_plugin.storage.upHideVideoButton ??= true;
    import_plugin.storage.dmHideCallButton ??= false;
    import_plugin.storage.dmHideVideoButton ??= false;
    import_plugin.storage.hideVCVideoButton ??= false;
    let videoCallAsset = (0, import_assets.getAssetIDByName)("ic_video") ?? (0, import_assets.getAssetIDByName)("VideoIcon");
    let voiceCallAsset = (0, import_assets.getAssetIDByName)("ic_audio") ?? (0, import_assets.getAssetIDByName)("PhoneCallIcon");
    const videoAsset = (0, import_assets.getAssetIDByName)("video");
    const callAsset = (0, import_assets.getAssetIDByName)("nav_header_connect");
    const show = (msg) => (0, import_toasts.showToast)(`\u{1F527} ${msg}`, (0, import_assets.getAssetIDByName)("ic_settings"));
    if (!videoCallAsset || !voiceCallAsset || !videoAsset || !callAsset)
      (0, import_toasts.showToast)("\u26A0\uFE0F Asset ID missing", (0, import_assets.getAssetIDByName)("Small"));
    const UserProfileActions = (0, import_metro.findByName)("UserProfileActions", false);
    const SimplifiedUserProfileContactButtons = (0, import_metro.findByName)("SimplifiedUserProfileContactButtons", false);
    const PrivateChannelButtons = (0, import_metro.find)((x) => {
      var _a;
      return ((_a = x == null ? void 0 : x.type) == null ? void 0 : _a.name) === "PrivateChannelButtons";
    });
    const ChannelButtons = (0, import_metro.findByProps)("ChannelButtons");
    const VideoButton = (0, import_metro.findByProps)("VideoButton");
    patches.push((0, import_patcher.after)("default", UserProfileActions, (_, comp) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      show("Patch: UserProfileActions");
      if (!import_plugin.storage.upHideVideoButton && !import_plugin.storage.upHideVoiceButton) return;
      let buttons = ((_e = (_d = (_c = (_b = (_a = comp == null ? void 0 : comp.props) == null ? void 0 : _a.children) == null ? void 0 : _b.props) == null ? void 0 : _c.children[1]) == null ? void 0 : _d.props) == null ? void 0 : _e.children) ?? ((_h = (_g = (_f = comp == null ? void 0 : comp.props) == null ? void 0 : _f.children[1]) == null ? void 0 : _g.props) == null ? void 0 : _h.children);
      if ((_i = buttons == null ? void 0 : buttons.props) == null ? void 0 : _i.children) buttons = buttons.props.children;
      if (!buttons) return;
      for (const [i, btn] of Object.entries(buttons)) {
        if ((_j = btn == null ? void 0 : btn.props) == null ? void 0 : _j.children) {
          for (const [j, innerBtn] of Object.entries(btn.props.children)) {
            const icon2 = (_k = innerBtn == null ? void 0 : innerBtn.props) == null ? void 0 : _k.icon;
            if (import_plugin.storage.upHideVoiceButton && icon2 === voiceCallAsset || import_plugin.storage.upHideVideoButton && icon2 === videoCallAsset) {
              delete btn.props.children[j];
            }
          }
        }
        const icon = (_l = btn == null ? void 0 : btn.props) == null ? void 0 : _l.icon;
        if (import_plugin.storage.upHideVoiceButton && icon === voiceCallAsset || import_plugin.storage.upHideVideoButton && icon === videoCallAsset) {
          delete buttons[i];
        }
      }
    }));
    patches.push((0, import_patcher.after)("default", SimplifiedUserProfileContactButtons, (_, comp) => {
      var _a;
      show("Patch: SimplifiedUserProfileContactButtons");
      const buttons = (_a = comp == null ? void 0 : comp.props) == null ? void 0 : _a.children;
      if (!buttons) return;
      if (import_plugin.storage.upHideVoiceButton) delete buttons[1];
      if (import_plugin.storage.upHideVideoButton) delete buttons[2];
    }));
    patches.push((0, import_patcher.after)("default", VideoButton, (_, comp) => {
      var _a, _b, _c, _d, _e;
      show("Patch: VideoButton");
      if (!import_plugin.storage.hideVCVideoButton) return;
      const vcButtons = (_e = (_d = (_c = (_b = (_a = comp == null ? void 0 : comp.props) == null ? void 0 : _a.children) == null ? void 0 : _b.props) == null ? void 0 : _c.children) == null ? void 0 : _d.props) == null ? void 0 : _e.children;
      if (vcButtons) delete vcButtons[0];
    }));
    patches.push((0, import_patcher.after)("type", PrivateChannelButtons, (_, comp) => {
      var _a, _b, _c, _d, _e, _f;
      show("Patch: PrivateChannelButtons");
      let buttons = (_a = comp == null ? void 0 : comp.props) == null ? void 0 : _a.children;
      if (!buttons) return;
      if (((_c = (_b = buttons[0]) == null ? void 0 : _b.props) == null ? void 0 : _c.source) === void 0)
        buttons = (_e = (_d = buttons[0]) == null ? void 0 : _d.props) == null ? void 0 : _e.children;
      if (!buttons) return;
      for (const [i, btn] of Object.entries(buttons)) {
        const src = (_f = btn == null ? void 0 : btn.props) == null ? void 0 : _f.source;
        if (import_plugin.storage.dmHideCallButton && [callAsset, (0, import_assets.getAssetIDByName)("PhoneCallIcon")].includes(src) || import_plugin.storage.dmHideVideoButton && [videoAsset, (0, import_assets.getAssetIDByName)("VideoIcon")].includes(src)) {
          delete buttons[i];
        }
      }
    }));
    patches.push((0, import_patcher.after)("ChannelButtons", ChannelButtons, (_, comp) => {
      var _a, _b, _c, _d;
      show("Patch: ChannelButtons");
      const buttons = (_a = comp == null ? void 0 : comp.props) == null ? void 0 : _a.children;
      if (!buttons) return;
      for (const [i, btnWrapper] of Object.entries(buttons)) {
        const btn = (_c = (_b = btnWrapper == null ? void 0 : btnWrapper.props) == null ? void 0 : _b.children) == null ? void 0 : _c[0];
        if (!btn) continue;
        const src = (_d = btn == null ? void 0 : btn.props) == null ? void 0 : _d.source;
        if (import_plugin.storage.dmHideCallButton && src === callAsset || import_plugin.storage.dmHideVideoButton && src === videoAsset) {
          delete buttons[i];
        }
      }
    }));
  },
  onUnload() {
    for (const unpatch of patches) unpatch();
    patches = [];
  }
};
