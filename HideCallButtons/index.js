export default {
  onLoad() {
    try {
      const find = globalThis.metro.find;
      const findByName = globalThis.metro.findByName;
      const findByProps = globalThis.metro.findByProps;
      const getAssetIDByName = globalThis.vendetta.ui.assets.getAssetIDByName;

      const voiceIcon = getAssetIDByName("ic_audio") ?? getAssetIDByName("PhoneCallIcon");
      const videoIcon = getAssetIDByName("ic_video") ?? getAssetIDByName("VideoIcon");

      const patches = [];

      // User Profile
      const UserProfileActions = findByName("UserProfileActions", false);
      if (UserProfileActions) {
        patches.push(globalThis.vendetta.patcher.after("default", UserProfileActions, (_, comp) => {
          try {
            const buttons = comp?.props?.children?.props?.children?.[1]?.props?.children;
            if (!Array.isArray(buttons)) return;
            comp.props.children.props.children[1].props.children = buttons.filter(
              (btn) =>
                !(btn?.props?.icon === voiceIcon) &&
                !(btn?.props?.icon === videoIcon)
            );
          } catch (e) {
            console.error("Patch UserProfileActions failed:", e);
          }
        }));
      }

      // DM Header
      const PrivateChannelButtons = find((x) => x?.type?.name === "PrivateChannelButtons");
      if (PrivateChannelButtons) {
        patches.push(globalThis.vendetta.patcher.after("type", PrivateChannelButtons, (_, comp) => {
          try {
            let buttons = comp?.props?.children;
            if (!Array.isArray(buttons)) return;
            comp.props.children = buttons.filter(
              (btn) =>
                !(btn?.props?.source === voiceIcon) &&
                !(btn?.props?.source === videoIcon)
            );
          } catch (e) {
            console.error("Patch PrivateChannelButtons failed:", e);
          }
        }));
      }

      // Legacy DM Header
      const ChannelButtons = findByProps("ChannelButtons");
      if (ChannelButtons?.ChannelButtons) {
        patches.push(globalThis.vendetta.patcher.after("ChannelButtons", ChannelButtons, (_, comp) => {
          try {
            const buttons = comp?.props?.children;
            if (!Array.isArray(buttons)) return;
            comp.props.children = buttons.filter((btn) => {
              const icon = btn?.props?.children?.[0]?.props?.source;
              return !(icon === voiceIcon || icon === videoIcon);
            });
          } catch (e) {
            console.error("Patch ChannelButtons failed:", e);
          }
        }));
      }

      this._unpatches = patches;
    } catch (err) {
      console.error("Plugin load failed:", err);
    }
  },

  onUnload() {
    this._unpatches?.forEach((unpatch) => unpatch());
  }
};