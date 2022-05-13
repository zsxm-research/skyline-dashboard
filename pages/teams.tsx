import { FC, useEffect } from "react";
import { v4 } from "uuid";
import create from "zustand";
import { SERVER_EVENTS } from "./ranking";
import { rankingState, socket, Team } from "./_app";

const Teams: FC = () => {
	const { teams, update } = rankingState();

	const reload = () => {
		socket.emit("update");
	};

	useEffect(() => {
		socket.emit("update");
	}, []);

	socket.on(SERVER_EVENTS.UPDATE_RANKS, ({ ranking }: { ranking: Team[] }) => {
		update(ranking);
	});

	return (
		<div>
			<div className="mt-3">
				<div className="px-4 sm:px-6 lg:px-8">
					<div className="sm:flex sm:items-center">
						<div className="sm:flex-auto">
							<h1 className="text-2xl font-semibold text-gray-900">
								Team List
							</h1>
						</div>
						<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
							<button
								onClick={() => socket.emit("update")}
								type="button"
								className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-white border rounded-md shadow-sm border-grey-300 hover:bg-grey-400 focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 sm:w-auto"
							>
								Reload
							</button>
						</div>
					</div>
					<div className="flex flex-col mt-8">
						<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
								<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
									<table className="min-w-full divide-y divide-gray-300">
										<thead className="bg-gray-50">
											<tr>
												<th
													scope="col"
													className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
												>
													Team Number
												</th>
												<th
													scope="col"
													className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
												>
													Win
												</th>
												<th
													scope="col"
													className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
												>
													Loss
												</th>
												<th
													scope="col"
													className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
												>
													Total Scored Points
												</th>
												<th
													scope="col"
													className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
												>
													Average Scored Points
												</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{teams.map((team) => (
												<tr key={team.id}>
													<td className="py-2 pl-4 pr-3 text-sm text-gray-500 whitespace-nowrap sm:pl-6">
														{team.id}
													</td>
													<td className="px-2 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">
														{team.won}
													</td>
													<td className="px-2 py-2 text-sm text-gray-900 whitespace-nowrap">
														{team.loss}
													</td>
													<td className="px-2 py-2 text-sm text-gray-500 whitespace-nowrap">
														{team.totalPoints}
													</td>
													<td className="px-2 py-2 text-sm text-gray-500 whitespace-nowrap">
														{team.ap}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Teams;
