export const AVAILABLE_ITEM_SUB_TYPE = [
	"HOURGLASS",
	"AP_STONE",
	"SCROLL",
	"CIRCLE",
] as const;
export type ItemSubType = (typeof AVAILABLE_ITEM_SUB_TYPE)[number];
