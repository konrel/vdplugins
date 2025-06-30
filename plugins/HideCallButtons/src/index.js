const { findByName } = globalThis.vendetta.metro;
const { after } = globalThis.vendetta.patcher;
const { getAssetIDByName } = globalThis.vendetta.ui.assets;

let unpatch;

exports.default = {
    onLoad: () => {
        const voiceIcon = getAssetIDByName("ic_audio") ?? getAssetIDByName("PhoneCallIcon");
        const videoIcon = getAssetIDByName("ic_video") ?? getAssetIDByName("VideoIcon");

        const UserProfileActions = findByName("UserProfileActions", false);
        if (!UserProfileActions) return;

        unpatch = after("default", UserProfileActions, (_, comp) => {
            const row = comp?.props?.children?.props?.children?.[1]?.props;
            if (!row || !Array.isArray(row.children)) return;

            row.children = row.children.filter((btn) =>
                btn?.props?.icon !== voiceIcon && btn?.props?.icon !== videoIcon
            );
        });
    },
    onUnload: () => {
        unpatch?.();
    }
};