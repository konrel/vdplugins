import { find, findByName, findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { getAssetIDByName } from "@vendetta/ui/assets";

let patches = [];

export default {
  onLoad() {
    const voiceIcon = getAssetIDByName("ic_audio") ?? getAssetIDByName("PhoneCallIcon");
    const videoIcon = getAssetIDByName("ic_video") ?? getAssetIDByName("VideoIcon");

    // 1. User Profile (Modern)
    const UserProfileActions = findByName("UserProfileActions", false);
    if (UserProfileActions) {
      patches.push(after("default", UserProfileActions, (_, comp) => {
        try {
          let buttons = comp?.props?.children?.props?.children?.[1]?.props?.children;
          if (!Array.isArray(buttons)) return;

          comp.props.children.props.children[1].props.children = buttons.filter(
            (btn) =>
              !(btn?.props?.icon === voiceIcon) &&
              !(btn?.props?.icon === videoIcon)
          );
        } catch (e) {
          console.warn("UserProfileActions patch failed:", e);
        }
      }));
    }

    // 2. Private DM Header
    const PrivateChannelButtons = find(x => x?.type?.name === "PrivateChannelButtons");
    if (PrivateChannelButtons) {
      patches.push(after("type", PrivateChannelButtons, (_, comp) => {
        try {
          let buttons = comp?.props?.children;
          if (!Array.isArray(buttons)) return;

          comp.props.children = buttons.filter(
            (btn) =>
              !(btn?.props?.source === voiceIcon) &&
              !(btn?.props?.source === videoIcon)
          );
        } catch (e) {
          console.warn("PrivateChannelButtons patch failed:", e);
        }
      }));
    }

    // 3. Legacy DM Header
    const ChannelButtons = findByProps("ChannelButtons");
    if (ChannelButtons?.ChannelButtons) {
      patches.push(after("ChannelButtons", ChannelButtons, (_, comp) => {
        try {
          let buttons = comp?.props?.children;
          if (!Array.isArray(buttons)) return;

          comp.props.children = buttons.filter((btn) => {
            const icon = btn?.props?.children?.[0]?.props?.source;
            return !(icon === voiceIcon || icon === videoIcon);
          });
        } catch (e) {
          console.warn("ChannelButtons patch failed:", e);
        }
      }));
    }
  },

  onUnload() {
    for (const unpatch of patches) unpatch();
  }
};
