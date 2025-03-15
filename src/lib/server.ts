import { cookieStorage, makePersisted } from "@solid-primitives/storage";
import { action, query } from "@solidjs/router";
import { createSignal } from "solid-js";
import { useSession } from "vinxi/http";

async function useCurrencySession() {
	"use server";

	const session = await useSession<{ currency: "KRW" | "USD" }>({
		password: process.env.SESSION_SECRET as string,
		name: "currency",
		cookie: {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7, // 1 week
		},
	});

	if (!session.data.currency) {
		await session.update({
			currency: "USD",
		});
	}

	return session;
}

async function getCurrencySession() {
	"use server";
	const session = await useCurrencySession();
	return session.data.currency;
}

async function updateCurrencySession(currency: "KRW" | "USD") {
	"use server";
	const session = await useCurrencySession();
	const ret = await session.update({
		currency,
	});

	return ret;
}

export const getCurrency = query(async () => {
	"use server";
	return await getCurrencySession();
}, "currency");

export const updateCurrency = action(async (currency: "KRW" | "USD") => {
	"use server";
	await updateCurrencySession(currency);
});

async function useNetworkSession() {
	"use server";

	const session = await useSession<{ network: "odin" | "heimdall" }>({
		password: process.env.SESSION_SECRET as string,
		name: "network",
		cookie: {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7, // 1 week
		},
	});

	if (!session.data.network) {
		await session.update({
			network: "odin",
		});
	}

	return session;
}

async function getNetworkSession() {
	"use server";
	const session = await useNetworkSession();
	return session.data.network;
}

async function updateNetworkSession(network: "odin" | "heimdall") {
	"use server";
	const session = await useNetworkSession();
	const ret = await session.update({
		network,
	});

	return ret;
}

export const getNetwork = query(async () => {
	"use server";
	return await getNetworkSession();
}, "network");

export const updateNetwork = action(async (network: "odin" | "heimdall") => {
	"use server";
	await updateNetworkSession(network);
});
