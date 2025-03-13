import { createSignal } from "solid-js";

// Available currencies
export const CURRENCIES = ["KRW", "USD"] as const;
export type CurrencyType = (typeof CURRENCIES)[number];

// Provider component
export const [currency, setCurrency] = createSignal<CurrencyType>(
	CURRENCIES[0],
);
