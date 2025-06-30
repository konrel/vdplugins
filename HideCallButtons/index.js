const { find, findByName, findByProps } = globalThis.vendetta.metro;
const { after } = globalThis.vendetta.patcher;
const { getAssetIDByName } = globalThis.vendetta.ui.assets;
const { findInReactTree } = globalThis.vendetta.utils;
const { storage } = globalThis.vendetta.plugin;

let patches = [];

exports.default = {
    onLoad: () => {
        storage.upHideVoiceButton ??= true;
        storage.upHideVideoButton ??= true;
        storage.dmHideCallButton ??= false;
        storage.dmHideVideoButton ??= false;
        storage.hideVCVideoButton ??= false;

        let videoCallAsset = getAssetIDByName("ic_video") ?? getAssetIDByName("VideoIcon");
        let voiceCallAsset = getAssetIDByName("ic_audio") ?? getAssetIDByName("PhoneCallIcon");
        const videoAsset = getAssetIDByName("video");
        const callAsset = getAssetIDByName("nav_header_connect");

        const UserProfileActions = findByName("UserProfileActions", false);
        const SimplifiedUserProfileContactButtons = findByName("SimplifiedUserProfileContactButtons", false);
        const PrivateChannelButtons = find(x => x?.type?.name == "PrivateChannelButtons");
        const ChannelButtons = findByProps("ChannelButtons");
        const VideoButton = findByProps("VideoButton");

        // User Profile
        patches.push(after("default", UserProfileActions, (_, component) => {
            if (!storage.upHideVideoButton && !storage.upHideVoiceButton) return;

            let buttons = component?.props?.children?.props?.children?.[1]?.props?.children
                      ?? component?.props?.children?.[1]?.props?.children;

            if (buttons?.props?.children !== undefined)
                buttons = buttons?.props?.children;

            if (!buttons) return;

            for (const idx in buttons) {
                const button = buttons[idx];
                if (button?.props?.children) {
                    const buttonContainer = button.props.children;
                    for (const idx2 in buttonContainer) {
                        const btn = buttonContainer[idx2];
                        if (
                            (btn?.props?.icon === voiceCallAsset && storage.upHideVoiceButton) ||
                            (btn?.props?.icon === videoCallAsset && storage.upHideVideoButton)
                        ) {
                            delete buttonContainer[idx2];
                        }
                    }
                }
                if (button?.props?.IconComponent) {
                    if (storage.upHideVoiceButton) delete buttons[1];
                    if (storage.upHideVideoButton) delete buttons[2];
                }
                if (
                    (button?.props?.icon === voiceCallAsset && storage.upHideVoiceButton) ||
                    (button?.props?.icon === videoCallAsset && storage.upHideVideoButton)
                ) {
                    delete buttons[idx];
                }
            }
        }));

        // Simplified user profile
        patches.push(after("default", SimplifiedUserProfileContactButtons, (_, component) => {
            const buttons = component?.props?.children;
            if (!buttons) return;
            if (storage.upHideVoiceButton) delete buttons[1];
            if (storage.upHideVideoButton) delete buttons[2];
        }));

        // VC
        patches.push(after("default", VideoButton, (_, component) => {
            if (!storage.hideVCVideoButton) return;
            const buttons = component?.props?.children?.props?.children?.props?.children;
            if (!buttons) return;
            delete buttons[0];
        }));

        // Tabs V2 DM Header
        patches.push(after("type", PrivateChannelButtons, (_, component) => {
            if (!storage.dmHideCallButton && !storage.dmHideVideoButton) return;

            let buttons = component?.props?.children;
            if (!buttons) return;
            if (buttons[0]?.props?.source === undefined)
                buttons = buttons[0]?.props?.children;
            if (!buttons) return;

            for (const idx in buttons) {
                const button = buttons[idx];
                const source = button?.props?.source;
                if (
                    (source === callAsset && storage.dmHideCallButton) ||
                    (source === videoAsset && storage.dmHideVideoButton) ||
                    (source === voiceCallAsset && storage.dmHideCallButton) ||
                    (source === videoCallAsset && storage.dmHideVideoButton)
                ) {
                    delete buttons[idx];
                }
            }
        }));

        // Legacy UI DM Header
        patches.push(after("ChannelButtons", ChannelButtons, (_, component) => {
            if (!storage.dmHideCallButton && !storage.dmHideVideoButton) return;

            const buttons = component?.props?.children;
            if (!buttons) return;

            for (const idx in buttons) {
                const button = buttons[idx]?.props?.children?.[0];
                if (!button) continue;
                const source = button?.props?.source;
                if (
                    (source === callAsset && storage.dmHideCallButton) ||
                    (source === videoAsset && storage.dmHideVideoButton)
                ) {
                    delete buttons[idx];
                }
            }
        }));
    },

    onUnload: () => {
        for (const unpatch of patches) unpatch();
    }
};