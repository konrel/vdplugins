import patchProfile from "./profile";
import patchDM from "./dm";
import patchVC from "./vc";

const patches: Array<() => void> = [];

export const onLoad = () => {
    for (const patch of [patchProfile, patchDM, patchVC]) {
        const result = patch();
        if (result) patches.push(result);
    }
};

export const onUnload = () => {
    for (const unpatch of patches) unpatch();
};