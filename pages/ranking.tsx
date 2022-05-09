import { FC, useEffect, useState } from "react";

import { Team } from "./_app";

interface LocalTeam extends Team {
	index: number;
}

const Ranking: FC = () => {
	const [ranking, setRanking] = useState<Team[]>([
		{
			name: "The Pink Team",
			number: 233,
			rankingPoints: 40,
		},
		{
			name: "S.W.A.M.P",
			number: 179,
			rankingPoints: 46,
		},
	]);

	useEffect(
		() => setRanking(ranking.sort((a, b) => b.rankingPoints - a.rankingPoints)),
		[ranking]
	);

	return (
		<div>
			<div className="flex w-full justify-center mt-5">
				<h1 className="text-6xl font-bold font-mono">Ranking</h1>
			</div>

			<div className="flex w-full justify-center mt-20">
				<div className="flex flex-col space-y-5 w-80">
					{ranking.map((props, index) => (
						<Team {...props} index={index} />
					))}
				</div>
			</div>
		</div>
	);
};

const Team: FC<LocalTeam> = (team: LocalTeam) => {
	return (
		<div className="flex bg-slate-200 p-4 border rounded-lg">
			<span className="flex space-x-3 my-auto mr-auto">
				<h2 className="text-3xl font-semibold">{team.number}</h2>
				<h1 className="text-xl mt-1 font-semibold">{team.name}</h1>
			</span>
			<h2 className="text-5xl font-semibold">#{team.index + 1}</h2>
		</div>
	);
};

export default Ranking;
