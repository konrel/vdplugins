import { after } from "@vendetta/patcher";

export const safePatch = (label: string, fn: () => any): any => {
    try {
        return fn();
    } catch (err) {
        console.warn(`[HideCallButtons] Patch failed: ${label}`, err);
        return undefined;
    }
};