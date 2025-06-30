import patchProfile from "./profile";

const patches: Array<() => void> = [];

export const onLoad = () => {
  const patch = patchProfile();
  if (patch) patches.push(patch);
};

export const onUnload = () => {
  for (const unpatch of patches) unpatch();
};
