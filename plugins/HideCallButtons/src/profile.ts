import { findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { getAssetIDByName } from "@vendetta/ui/assets";

export default () => {
  const UserProfileActions = findByName("UserProfileActions", false);
  const voiceIcon = getAssetIDByName("ic_audio") ?? getAssetIDByName("PhoneCallIcon");
  const videoIcon = getAssetIDByName("ic_video") ?? getAssetIDByName("VideoIcon");

  if (!UserProfileActions) return;

  return after("default", UserProfileActions, (_, comp) => {
    let buttons = comp?.props?.children?.props?.children?.[1]?.props?.children;
    if (buttons?.props?.children) buttons = buttons.props.children;
    if (!Array.isArray(buttons)) return;

    comp.props.children.props.children[1].props.children = buttons.filter(
      (btn: any) =>
        btn?.props?.icon !== voiceIcon &&
        btn?.props?.icon !== videoIcon
    );
  });
};