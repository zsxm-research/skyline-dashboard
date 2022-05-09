import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import { Manager } from "socket.io-client";

import type { AppProps } from "next/app";

export type Team = {
	number: number;
	name: string;
	rankingPoints: number;
};

export const socket = new Manager("http://cloud.storagesmash.com:8999", {
	autoConnect: true,
});

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default MyApp;
