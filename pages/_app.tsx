import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import { Manager } from "socket.io-client";

import type { AppProps } from "next/app";
import create from "zustand";
import { useLayoutEffect } from "react";
import { SERVER_EVENTS } from "./ranking";

export type Team = {
	id: string;
	name: string;
	iconUrl: string;
	ap: number;
	rankingPoints: number;
	won: number;
	loss: number;
	createdAt: Date | null;
	totalPoints: number;
};

export type Match = {
	id: number;
	createdAt: Date | null;
	blueAlliance: string[];
	redAlliance: string[];
	blueScore: number;
	redScore: number;
	blueAutoScore: number;
	redAutoScore: number;
	blueTeleScore: number;
	redTeleScore: number;
	redHangTraverse: boolean;
	blueHangTraverse: boolean;
	redHangHigh: boolean;
	blueHangHigh: boolean;
	redHangMid: boolean;
	blueHangMid: boolean;
	redHangLow: boolean;
	blueHangLow: boolean;
	blueEndScore: number;
	redEndScore: number;
};

type RankingState = {
	teams: Team[];
	update: (t: Team[]) => void;
};

const sort = (a: Team, b: Team): number => {
	const bRatio = b.won / b.loss;
	const aRatio = a.won / a.loss;

	return bRatio === aRatio ? bRatio - aRatio : b.totalPoints - a.totalPoints;
};

export const rankingState = create<RankingState>((set) => ({
	teams: [],
	update: (teams) =>
		set({
			teams: teams.sort((a, b) => sort(a, b)),
		}),
}));

export const socket = new Manager(
	process.env.WS_URL || "http://localhost:3001",
	{
		autoConnect: true,
	}
).socket("/");

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default MyApp;
