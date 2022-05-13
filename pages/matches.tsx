import { FC, useEffect } from "react";
import { Award } from "react-feather";
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

function classNames(...classes: any) {
	return classes.filter(Boolean).join(" ");
}

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
			<div className="flex justify-center w-full mt-5">
				{/* <h1 className="text-6xl font-bold">Matches</h1> */}
			</div>

			<div className="flex justify-center w-full mt-20">
				<div className="flex flex-col space-y-5 w-[120]">
					<MatchesTable Matches={matches} />
				</div>
			</div>
		</div>
	);
};

const MatchesTable: FC<{ Matches: Match[] }> = ({ Matches }) => {
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-3xl font-semibold text-gray-900">Matches</h1>
				</div>
				<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
					<button
						onClick={() => socket.emit("update")}
						type="button"
						className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-white border rounded-md shadow-sm border-grey-200 hover:bg-grey-300 focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 sm:w-auto"
					>
						Reload
					</button>
				</div>
			</div>
			<div className="mt-10 -mx-4 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
				<table className="min-w-full divide-y divide-gray-300">
					<thead>
						<tr>
							<th
								scope="col"
								className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
							>
								Match ID
							</th>
							<th
								scope="col"
								className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
							>
								Blue Alliance
							</th>
							<th
								scope="col"
								className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
							>
								Red Alliance
							</th>
							<th
								scope="col"
								className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
							>
								Blue Alliance Score
							</th>
							<th
								scope="col"
								className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
							>
								Red Alliance Score
							</th>
							<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
								<span className="sr-only">Select</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{Matches.map((match, planIdx) => (
							<tr key={match.id}>
								<td
									className={classNames(
										planIdx === 0 ? "" : "border-t border-transparent",
										"relative py-4 pl-4 sm:pl-6 pr-3 text-sm"
									)}
								>
									<div className="font-medium text-gray-900">#{match.id}</div>
								</td>
								<td
									className={classNames(
										planIdx === 0 ? "" : "border-t border-gray-200",
										"hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
									)}
								>
									{match.blueAlliance.map((team, index) => {
										if (index > match.redAlliance.length - 2) {
											return team;
										} else {
											return team + ", ";
										}
									})}
								</td>
								<td
									className={classNames(
										planIdx === 0 ? "" : "border-t border-gray-200",
										"hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
									)}
								>
									{match.redAlliance.map((team, index) => {
										if (index > match.redAlliance.length - 2) {
											return team;
										} else {
											return team + ", ";
										}
									})}
								</td>
								<td
									className={classNames(
										planIdx === 0 ? "" : "border-t border-gray-200",
										"hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
									)}
								>
									{match.blueScore}
								</td>
								<td
									className={classNames(
										planIdx === 0 ? "" : "border-t border-gray-200",
										"px-3 py-3.5 text-sm text-gray-500"
									)}
								>
									{match.redScore}
								</td>
								<td
									className={classNames(
										planIdx === 0 ? "" : "border-t border-transparent",
										"relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium"
									)}
								>
									<div
										className={`inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-700 ${
											match.redScore > match.blueScore
												? "bg-red-500"
												: "bg-blue-500"
										} border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30`}
									>
										<Award className="text-white" />
									</div>

									{/* <button
										type="button"
										className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
										disabled={match.isCurrent}
									>
										Select<span className="sr-only">, {match.name}</span>
									</button> */}
								</td>
							</tr>
						))}
					</tbody>
				</table>
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
