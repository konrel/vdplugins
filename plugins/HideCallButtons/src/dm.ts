import { find } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { getAssetIDByName } from "@vendetta/ui/assets";

export default () => {
    const PrivateChannelButtons = find((x) => x?.type?.name === "PrivateChannelButtons");
    const vcCallIcon = getAssetIDByName("nav_header_connect");
    const vcVideoIcon = getAssetIDByName("video");
    const voiceIcon = getAssetIDByName("ic_audio") ?? getAssetIDByName("PhoneCallIcon");
    const videoIcon = getAssetIDByName("ic_video") ?? getAssetIDByName("VideoIcon");

    if (!PrivateChannelButtons) return;

    return after("type", PrivateChannelButtons, (_, comp) => {
        let buttons = comp?.props?.children;
        if (!Array.isArray(buttons)) buttons = buttons?.[0]?.props?.children;
        if (!Array.isArray(buttons)) return;

        comp.props.children = buttons.filter(
            (btn: any) =>
                btn?.props?.source !== vcCallIcon &&
                btn?.props?.source !== vcVideoIcon &&
                btn?.props?.source !== voiceIcon &&
                btn?.props?.source !== videoIcon
        );
    });
};