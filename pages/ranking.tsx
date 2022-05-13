import { FC, useEffect, useState } from "react";
import create from "zustand";

import { rankingState, socket, Team } from "./_app";

interface LocalTeam extends Team {
	index: number;
}

export const SERVER_EVENTS = {
	UPDATE_MATCHES: "update_matches",
	UPDATE_RANKS: "update_ranks",
};

const Ranking: FC = () => {
	const { teams, update } = rankingState();

	socket.on(SERVER_EVENTS.UPDATE_RANKS, ({ ranking }) => {
		update(ranking);
	});
	
	useEffect(() => {
		socket.emit("update");
	}, []);

	return (
		<div>
			<div className="absolute top-3 right-3">
				<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
					<button
						onClick={() => socket.emit("update", {})}
						type="button"
						className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-500 border border-transparent rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:w-auto"
					>
						Reload
					</button>
				</div>
			</div>

			<div className="flex justify-center w-full mt-5">
				<h1 className="text-6xl font-bold">Ranking</h1>
			</div>

			<div className="flex justify-center w-full mt-20">
				<div className="flex flex-col space-y-5 w-96">
					{teams != null && teams.length > 0 ? (
						teams.map((props, index) => (
							<TeamComponent {...props} index={index} key={props.id} />
						))
					) : (
						<div className="text-center">OFFLINE {":("}</div>
					)}
				</div>
			</div>
		</div>
	);
};

const TeamComponent: FC<LocalTeam> = (team: LocalTeam) => {
	const checkName = (name: string): string => {
		if (name.length > 20) {
			return name.slice(0, 20) + "...";
		}
		return name;
	};

	return (
		<div className="flex p-4 border rounded-lg bg-slate-200">
			<span className="flex my-auto mr-auto space-x-3">
				<h2 className="text-3xl font-semibold">{team.id}</h2>
				<h1 className="mt-1 text-xl overflow-x-clip">{checkName(team.name)}</h1>
			</span>
			<h2 className="text-5xl font-semibold">#{team.index + 1}</h2>
		</div>
	);
};

export default Ranking;
