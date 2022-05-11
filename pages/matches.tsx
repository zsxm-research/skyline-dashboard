import { FC, useEffect } from "react";
import create from "zustand";
import { SERVER_EVENTS } from "./ranking";
import { Match, socket } from "./_app";

type State = {
	matches: Match[];
	update: (t: Match[]) => void;
};

const state = create<State>((set) => ({
	matches: [],
	update: (matches) => set({ matches: matches.sort((a, b) => b.id - a.id) }),
}));

const Matches: FC = () => {
	const { matches, update } = state();

	useEffect(() => {
		socket.on(SERVER_EVENTS.UPDATE_MATCHES, ({ matches }) => {
			update(matches);
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
				<h1 className="font-mono text-6xl font-bold">Matches</h1>
			</div>

			<div className="flex justify-center w-full mt-20">
				<div className="flex flex-col space-y-5 w-[100]">
					{matches != null && matches.length > 0 ? (
						matches.map((props, index) => <Match {...props} />)
					) : (
						<div className="text-center">OFFLINE {":("}</div>
					)}
				</div>
			</div>
		</div>
	);
};

const Match: FC<Match> = (match: Match) => {
	return (
		<div className="p-6 text-white rounded-xl bg-slate-300">
			<p className="mb-3 text-4xl font-bold text-left text-black">
				Qual {match.id}
			</p>

			<div className="flex space-x-3">
				<div className="flex p-4 bg-blue-600 border border-none rounded-lg max-h-96 w-96">
					{/* <h2 className="text-5xl font-semibold">#{match.index + 1}</h2> */}

					<h2 className="mt-2 mr-auto text-3xl font-semibold">
						{match.blueAlliance.map((team, index) => {
							if (index > match.blueAlliance.length - 2) {
								return team;
							} else {
								return team + ", ";
							}
						})}
					</h2>

					<h2 className="mt-2 ml-auto text-3xl font-semibold">
						{match.blueScore}
					</h2>
				</div>

				<div className="flex p-4 bg-red-600 border border-none rounded-lg max-h-96 w-96">
					<h2 className="mt-2 mr-auto text-3xl font-semibold">
						{match.redAlliance.map((team, index) => {
							if (index > match.redAlliance.length - 2) {
								return team;
							} else {
								return team + ", ";
							}
						})}
					</h2>

					<h2 className="mt-2 ml-auto text-3xl font-semibold">
						{match.redScore}
					</h2>
				</div>
			</div>
		</div>
	);
};

export default Matches;
