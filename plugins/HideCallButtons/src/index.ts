import { after } from "@vendetta/patcher";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { find, findByName, findByProps } from "@vendetta/metro";
import { storage } from "@vendetta/plugin";
import Settings from "./settings";

let patches: (() => void)[] = [];

export default {
  onLoad() {
    // Default values for toggles
    storage.upHideVoiceButton ??= true;
    storage.upHideVideoButton ??= true;
    storage.dmHideCallButton ??= false;
    storage.dmHideVideoButton ??= false;
    storage.hideVCVideoButton ??= false;

    // Asset fallback logic
    let videoCallAsset = getAssetIDByName("ic_video") ?? getAssetIDByName("VideoIcon");
    let voiceCallAsset = getAssetIDByName("ic_audio") ?? getAssetIDByName("PhoneCallIcon");

    const videoAsset = getAssetIDByName("video");
    const callAsset = getAssetIDByName("nav_header_connect");

    const UserProfileActions = findByName("UserProfileActions", false);
    const SimplifiedUserProfileContactButtons = findByName("SimplifiedUserProfileContactButtons", false);
    const PrivateChannelButtons = find(x => x?.type?.name === "PrivateChannelButtons");
    const ChannelButtons = findByProps("ChannelButtons");
    const VideoButton = findByProps("VideoButton");

    // User profile patch
    patches.push(after("default", UserProfileActions, (_, component) => {
      console.log("Patch triggered: UserProfileActions");

      if (!storage.upHideVideoButton && !storage.upHideVoiceButton) return;

      let buttons = component?.props?.children?.props?.children[1]?.props?.children ??
                    component?.props?.children[1]?.props?.children;

      if (buttons?.props?.children) buttons = buttons.props.children;
      if (!buttons) return;

      for (const [idx, button] of Object.entries(buttons)) {
        // Nested container
        if (button?.props?.children) {
          const inner = button.props.children;
          for (const [j, btn] of Object.entries(inner)) {
            if ((storage.upHideVoiceButton && [voiceCallAsset].includes(btn?.props?.icon)) ||
                (storage.upHideVideoButton && [videoCallAsset].includes(btn?.props?.icon))) {
              delete inner[j];
            }
          }
        }

        // Flat icons
        if ((storage.upHideVoiceButton && button?.props?.icon === voiceCallAsset) ||
            (storage.upHideVideoButton && button?.props?.icon === videoCallAsset)) {
          delete buttons[idx];
        }
      }
    }));

    // Simplified UserProfile
    patches.push(after("default", SimplifiedUserProfileContactButtons, (_, component) => {
      console.log("Patch triggered: SimplifiedUserProfileContactButtons");

      const buttons = component?.props?.children;
      if (!buttons) return;

      if (storage.upHideVoiceButton) delete buttons[1];
      if (storage.upHideVideoButton) delete buttons[2];
    }));

    // VC top bar
    patches.push(after("default", VideoButton, (_, component) => {
      console.log("Patch triggered: VideoButton");

      if (!storage.hideVCVideoButton) return;

      const buttons = component?.props?.children?.props?.children?.props?.children;
      if (buttons) delete buttons[0];
    }));

    // DM Header - Tabs V2
    patches.push(after("type", PrivateChannelButtons, (_, component) => {
      console.log("Patch triggered: PrivateChannelButtons");

      let buttons = component?.props?.children;
      if (!buttons) return;

      if (buttons[0]?.props?.source === undefined) {
        buttons = buttons[0]?.props?.children;
      }

      if (!buttons) return;

      for (const [idx, btn] of Object.entries(buttons)) {
        if ((storage.dmHideCallButton && [callAsset, getAssetIDByName("PhoneCallIcon")].includes(btn?.props?.source)) ||
            (storage.dmHideVideoButton && [videoAsset, getAssetIDByName("VideoIcon")].includes(btn?.props?.source))) {
          delete buttons[idx];
        }
      }
    }));

    // Legacy UI DM Header
    patches.push(after("ChannelButtons", ChannelButtons, (_, component) => {
      console.log("Patch triggered: ChannelButtons");

      const buttons = component?.props?.children;
      if (!buttons) return;

      for (const [idx, container] of Object.entries(buttons)) {
        const btn = container?.props?.children?.[0];
        if (!btn) continue;

        if ((storage.dmHideCallButton && btn.props?.source === callAsset) ||
            (storage.dmHideVideoButton && btn.props?.source === videoAsset)) {
          delete buttons[idx];
        }
      }
    }));
  },

  onUnload() {
    for (const unpatch of patches) unpatch();
    patches = [];
  },

  settings: Settings
};