import { findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { getAssetIDByName } from "@vendetta/ui/assets";

export default () => {
    const VideoButton = findByProps("VideoButton");
    const vcVideoIcon = getAssetIDByName("video");

    if (!VideoButton) return;

    return after("default", VideoButton, (_, comp) => {
        const buttonList = comp?.props?.children?.props?.children?.props?.children;
        if (!Array.isArray(buttonList)) return;

        comp.props.children.props.children.props.children = buttonList.filter(
            (btn: any) => btn?.props?.icon !== vcVideoIcon
        );
    });
};