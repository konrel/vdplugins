import { after } from "@vendetta/patcher";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { find, findByName, findByProps } from "@vendetta/metro";
import { storage } from "@vendetta/plugin";

let patches: (() => void)[] = [];

export default {
  onLoad() {
    console.log("🔥 HideCallButtons plugin loaded");

    storage.upHideVoiceButton ??= true;
    storage.upHideVideoButton ??= true;
    storage.dmHideCallButton ??= false;
    storage.dmHideVideoButton ??= false;
    storage.hideVCVideoButton ??= false;

    let videoCallAsset = getAssetIDByName("ic_video") ?? getAssetIDByName("VideoIcon");
    let voiceCallAsset = getAssetIDByName("ic_audio") ?? getAssetIDByName("PhoneCallIcon");
    const videoAsset = getAssetIDByName("video");
    const callAsset = getAssetIDByName("nav_header_connect");

    console.log("📦 Asset IDs:", {
      videoCallAsset,
      voiceCallAsset,
      videoAsset,
      callAsset
    });

    const UserProfileActions = findByName("UserProfileActions", false);
    const SimplifiedUserProfileContactButtons = findByName("SimplifiedUserProfileContactButtons", false);
    const PrivateChannelButtons = find(x => x?.type?.name === "PrivateChannelButtons");
    const ChannelButtons = findByProps("ChannelButtons");
    const VideoButton = findByProps("VideoButton");

    // Patch: User Profile
    patches.push(after("default", UserProfileActions, (_, comp) => {
      console.log("🧩 Patch triggered: UserProfileActions", comp);

      if (!storage.upHideVideoButton && !storage.upHideVoiceButton) return;

      let buttons = comp?.props?.children?.props?.children[1]?.props?.children ??
                    comp?.props?.children[1]?.props?.children;
      if (buttons?.props?.children) buttons = buttons.props.children;
      if (!buttons) return;

      for (const [i, btn] of Object.entries(buttons)) {
        if (btn?.props?.children) {
          for (const [j, innerBtn] of Object.entries(btn.props.children)) {
            const icon = innerBtn?.props?.icon;
            if ((storage.upHideVoiceButton && icon === voiceCallAsset) ||
                (storage.upHideVideoButton && icon === videoCallAsset)) {
              delete btn.props.children[j];
            }
          }
        }

        const icon = btn?.props?.icon;
        if ((storage.upHideVoiceButton && icon === voiceCallAsset) ||
            (storage.upHideVideoButton && icon === videoCallAsset)) {
          delete buttons[i];
        }
      }
    }));

    // Patch: Simplified User Profile
    patches.push(after("default", SimplifiedUserProfileContactButtons, (_, comp) => {
      console.log("🧩 Patch triggered: SimplifiedUserProfileContactButtons", comp);

      const buttons = comp?.props?.children;
      if (!buttons) return;

      if (storage.upHideVoiceButton) delete buttons[1];
      if (storage.upHideVideoButton) delete buttons[2];
    }));

    // Patch: Video Call (VC)
    patches.push(after("default", VideoButton, (_, comp) => {
      console.log("🧩 Patch triggered: VideoButton", comp);

      if (!storage.hideVCVideoButton) return;

      const vcButtons = comp?.props?.children?.props?.children?.props?.children;
      if (vcButtons) delete vcButtons[0];
    }));

    // Patch: DM Header (Tabs V2)
    patches.push(after("type", PrivateChannelButtons, (_, comp) => {
      console.log("🧩 Patch triggered: PrivateChannelButtons", comp);

      let buttons = comp?.props?.children;
      if (!buttons) return;

      if (buttons[0]?.props?.source === undefined)
        buttons = buttons[0]?.props?.children;
      if (!buttons) return;

      for (const [i, btn] of Object.entries(buttons)) {
        const src = btn?.props?.source;
        if ((storage.dmHideCallButton && [callAsset, getAssetIDByName("PhoneCallIcon")].includes(src)) ||
            (storage.dmHideVideoButton && [videoAsset, getAssetIDByName("VideoIcon")].includes(src))) {
          delete buttons[i];
        }
      }
    }));

    // Patch: DM Header (Legacy UI)
    patches.push(after("ChannelButtons", ChannelButtons, (_, comp) => {
      console.log("🧩 Patch triggered: ChannelButtons", comp);

      const buttons = comp?.props?.children;
      if (!buttons) return;

      for (const [i, btnWrapper] of Object.entries(buttons)) {
        const btn = btnWrapper?.props?.children?.[0];
        if (!btn) continue;

        const src = btn?.props?.source;
        if ((storage.dmHideCallButton && src === callAsset) ||
            (storage.dmHideVideoButton && src === videoAsset)) {
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