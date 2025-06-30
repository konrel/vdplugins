const { find, findByName, findByProps } = globalThis.vendetta.metro;
const { after } = globalThis.vendetta.patcher;
const { getAssetIDByName } = globalThis.vendetta.ui.assets;
const { storage } = globalThis.vendetta.plugin;

let patches = [];

exports.default = {
    onLoad: () => {
        storage.upHideVoiceButton ??= true;
        storage.upHideVideoButton ??= true;
        storage.dmHideCallButton ??= false;
        storage.dmHideVideoButton ??= false;
        storage.hideVCVideoButton ??= false;

        const voiceIcon = getAssetIDByName("ic_audio") ?? getAssetIDByName("PhoneCallIcon");
        const videoIcon = getAssetIDByName("ic_video") ?? getAssetIDByName("VideoIcon");
        const vcCallIcon = getAssetIDByName("nav_header_connect");
        const vcVideoIcon = getAssetIDByName("video");

        const UserProfileActions = findByName("UserProfileActions", false);
        const SimplifiedUserProfileContactButtons = findByName("SimplifiedUserProfileContactButtons", false);
        const PrivateChannelButtons = find(x => x?.type?.name === "PrivateChannelButtons");
        const ChannelButtons = findByProps("ChannelButtons");
        const VideoButton = findByProps("VideoButton");

        if (UserProfileActions) {
            patches.push(after("default", UserProfileActions, (_, comp) => {
                let buttons = comp?.props?.children?.props?.children?.[1]?.props?.children
                           ?? comp?.props?.children?.[1]?.props?.children;

                if (buttons?.props?.children) buttons = buttons.props.children;
                if (!Array.isArray(buttons)) return;

                comp.props.children.props.children[1].props.children = buttons.filter(btn =>
                    !(btn?.props?.icon === voiceIcon && storage.upHideVoiceButton) &&
                    !(btn?.props?.icon === videoIcon && storage.upHideVideoButton)
                );
            }));
        }

        if (SimplifiedUserProfileContactButtons) {
            patches.push(after("default", SimplifiedUserProfileContactButtons, (_, comp) => {
                if (!Array.isArray(comp?.props?.children)) return;
                const filtered = comp.props.children.filter((_, i) => {
                    if (i === 1 && storage.upHideVoiceButton) return false;
                    if (i === 2 && storage.upHideVideoButton) return false;
                    return true;
                });
                comp.props.children = filtered;
            }));
        }

        if (VideoButton) {
            patches.push(after("default", VideoButton, (_, comp) => {
                const buttons = comp?.props?.children?.props?.children?.props?.children;
                if (!Array.isArray(buttons) || !storage.hideVCVideoButton) return;
                comp.props.children.props.children.props.children = buttons.filter(btn =>
                    btn?.props?.icon !== vcVideoIcon
                );
            }));
        }

        if (PrivateChannelButtons) {
            patches.push(after("type", PrivateChannelButtons, (_, comp) => {
                let buttons = comp?.props?.children;
                if (!buttons) return;
                if (!Array.isArray(buttons)) buttons = buttons[0]?.props?.children;
                if (!Array.isArray(buttons)) return;

                comp.props.children = buttons.filter(btn =>
                    !(btn?.props?.source === vcCallIcon && storage.dmHideCallButton) &&
                    !(btn?.props?.source === vcVideoIcon && storage.dmHideVideoButton) &&
                    !(btn?.props?.source === voiceIcon && storage.dmHideCallButton) &&
                    !(btn?.props?.source === videoIcon && storage.dmHideVideoButton)
                );
            }));
        }

        if (ChannelButtons?.ChannelButtons) {
            patches.push(after("ChannelButtons", ChannelButtons, (_, comp) => {
                if (!Array.isArray(comp?.props?.children)) return;
                const filtered = comp.props.children.filter(btn => {
                    const icon = btn?.props?.children?.[0]?.props?.source;
                    return !(
                        (icon === vcCallIcon && storage.dmHideCallButton) ||
                        (icon === vcVideoIcon && storage.dmHideVideoButton)
                    );
                });
                comp.props.children = filtered;
            }));
        }
    },

    onUnload: () => {
        for (const unpatch of patches) unpatch();
    }
};