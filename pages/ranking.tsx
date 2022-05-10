import { FC, useEffect, useState } from "react";
import create from "zustand";

import { socket, Team } from "./_app";

interface LocalTeam extends Team {
	index: number;
}

export const SERVER_EVENTS = {
	UPDATE_MATCHES: "update_matches",
	UPDATE_RANKS: "update_ranks",
};

type State = {
	teams: Team[];
	update: (t: Team[]) => void;
};

const state = create<State>((set) => ({
	teams: [],
	update: (teams) =>
		set({ teams: teams.sort((a, b) => b.rankingPoints - a.rankingPoints) }),
}));

const Ranking: FC = () => {
	const { teams, update } = state();

	useEffect(() => {
		socket.on(SERVER_EVENTS.UPDATE_RANKS, ({ ranking }) => {
			update(ranking);
		});

		socket.emit("update");
	}, []);

	return (
		<div>
			<div className="absolute top-3 right-3">
				<button
					onClick={() => socket.emit("update", {})}
					className="p-5 text-center transition-all duration-700 bg-gray-200 border rounded-lg hover:bg-gray-400 focus:bg-gray-600 focus:text-white"
					title="Refresh"
				>
					Refresh
				</button>
			</div>

			<div className="flex justify-center w-full mt-5">
				<h1 className="font-mono text-6xl font-bold">Ranking</h1>
			</div>

			<div className="flex justify-center w-full mt-20">
				<div className="flex flex-col space-y-5 w-96">
					{teams != null && teams.length > 0 ? (
						teams.map((props, index) => <Team {...props} index={index} />)
					) : (
						<div className="text-center">OFFLINE {":("}</div>
					)}
				</div>
			</div>
		</div>
	);
};

const Team: FC<LocalTeam> = (team: LocalTeam) => {
	return (
		<div className="flex p-4 border rounded-lg bg-slate-200">
			<span className="flex my-auto mr-auto space-x-3">
				<h2 className="text-3xl font-semibold">{team.id}</h2>
				<h1 className="mt-1 text-xl font-semibold">{team.name}</h1>
			</span>
			<h2 className="text-5xl font-semibold">#{team.index + 1}</h2>
		</div>
	);
};

export default Ranking;
