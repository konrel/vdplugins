import { after } from "@vendetta/patcher";

export const patchIfExists = <T>(
  label: string,
  patchFn: () => T | undefined
): T | undefined => {
  try {
    return patchFn();
  } catch (e) {
    console.warn(`[HideCallButtons] Failed patch: ${label}`, e);
    return undefined;
  }
};