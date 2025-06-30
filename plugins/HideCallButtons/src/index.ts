import { onLoad as patchVC, onUnload as unpatchVC } from "./vc";
import { onLoad as patchDM, onUnload as unpatchDM } from "./dm";
import { onLoad as patchProfile, onUnload as unpatchProfile } from "./profile";

export const onLoad = () => {
  patchVC();
  patchDM();
  patchProfile();
};

export const onUnload = () => {
  unpatchVC();
  unpatchDM();
  unpatchProfile();
};