import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import { Manager } from "socket.io-client";

import type { AppProps } from "next/app";

export type Team = {
	id: number;
	name: string;
	rankingPoints: number;
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
