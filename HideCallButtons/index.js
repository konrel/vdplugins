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
  onLoad: () => onLoad4,
  onUnload: () => onUnload4
});
module.exports = __toCommonJS(index_exports);

// src/vc.ts
var import_metro = require("@vendetta/metro");
var import_patcher = require("@vendetta/patcher");
var unpatch;
var onLoad = () => {
  const vcButtons = (0, import_metro.find)(
    (x) => typeof (x == null ? void 0 : x.default) === "function" && x.default.toString().includes("Start Voice Call")
  );
  if (!vcButtons) return;
  unpatch = (0, import_patcher.before)("default", vcButtons, (args) => {
    var _a, _b, _c;
    if ((_a = args[0]) == null ? void 0 : _a.children) {
      args[0].children = (_c = (_b = args[0].children).filter) == null ? void 0 : _c.call(
        _b,
        (c) => {
          var _a2, _b2, _c2, _d, _e, _f;
          return !((_c2 = (_b2 = (_a2 = c == null ? void 0 : c.props) == null ? void 0 : _a2["aria-label"]) == null ? void 0 : _b2.toLowerCase) == null ? void 0 : _c2.call(_b2).includes("call")) && !((_f = (_e = (_d = c == null ? void 0 : c.props) == null ? void 0 : _d.tooltip) == null ? void 0 : _e.toLowerCase) == null ? void 0 : _f.call(_e).includes("call"));
        }
      );
    }
  });
};
var onUnload = () => {
  unpatch == null ? void 0 : unpatch();
};

// src/dm.ts
var import_metro2 = require("@vendetta/metro");
var import_patcher2 = require("@vendetta/patcher");
var unpatch2;
var onLoad2 = () => {
  const dmHeader = (0, import_metro2.find)(
    (m) => {
      var _a;
      return (_a = m == null ? void 0 : m.default) == null ? void 0 : _a.toString().includes("Start Video Call");
    }
  );
  if (!dmHeader) return;
  unpatch2 = (0, import_patcher2.before)("default", dmHeader, (args) => {
    var _a, _b;
    const props = args[0];
    if ((_b = (_a = props == null ? void 0 : props.children) == null ? void 0 : _a.props) == null ? void 0 : _b.children) {
      props.children.props.children = props.children.props.children.filter(
        (c) => {
          var _a2, _b2, _c;
          return !((_c = (_b2 = (_a2 = c == null ? void 0 : c.props) == null ? void 0 : _a2["aria-label"]) == null ? void 0 : _b2.toLowerCase) == null ? void 0 : _c.call(_b2).includes("call"));
        }
      );
    }
  });
};
var onUnload2 = () => {
  unpatch2 == null ? void 0 : unpatch2();
};

// src/profile.ts
var import_metro3 = require("@vendetta/metro");
var import_patcher3 = require("@vendetta/patcher");
var unpatch3;
var onLoad3 = () => {
  const profileActions = (0, import_metro3.find)(
    (x) => typeof (x == null ? void 0 : x.default) === "function" && x.default.toString().includes("Start Voice Call")
  );
  if (!profileActions) return;
  unpatch3 = (0, import_patcher3.before)("default", profileActions, (args) => {
    var _a, _b;
    const props = args[0];
    if (props == null ? void 0 : props.children) {
      props.children = (_b = (_a = props.children).filter) == null ? void 0 : _b.call(
        _a,
        (c) => {
          var _a2, _b2, _c, _d, _e, _f;
          return !((_c = (_b2 = (_a2 = c == null ? void 0 : c.props) == null ? void 0 : _a2["aria-label"]) == null ? void 0 : _b2.toLowerCase) == null ? void 0 : _c.call(_b2).includes("call")) && !((_f = (_e = (_d = c == null ? void 0 : c.props) == null ? void 0 : _d.tooltip) == null ? void 0 : _e.toLowerCase) == null ? void 0 : _f.call(_e).includes("call"));
        }
      );
    }
  });
};
var onUnload3 = () => {
  unpatch3 == null ? void 0 : unpatch3();
};

// src/index.ts
var onLoad4 = () => {
  onLoad();
  onLoad2();
  onLoad3();
};
var onUnload4 = () => {
  onUnload();
  onUnload2();
  onUnload3();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  onLoad,
  onUnload
});
