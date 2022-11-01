import { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";

const App = () => {
	const [query, setQuery] = useState("");
	const [weather, setWeather] = useState({});

	const search = async (e) => {
		if (e.key === "Enter") {
			const data = await fetchWeather(query);

			setWeather(data);
			setQuery("");
		}
	};

	return (
		<div className="gradient-bg-welcome justify-center flex-col outline-none items-center flex">
			<input
				type="text"
				className="p-2 w-72 h-[40px] rounded-full text-center"
				placeholder="Search..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyPress={search}
			/>
			{weather.main && (
				<div className="city flex items-center justify-center flex-col mt-5 text-white">
					<h2 className="city-name items-center justify-center text-white">
						<span>{weather.name}</span>
						<sup>{weather.sys.country}</sup>
					</h2>
					<div className="text-3xl font-bold mt-[10px] text-white text-center">
						{Math.round(weather.main.temp)}{" "}
						<sup>&deg;C</sup>
					</div>
					<div className="flex flex-col items-center">
						<img
							className="mt-[10px] w-[100px] h-[100px]"
							src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
							alt={weather.weather[0].description}
						/>
						<p>{weather.weather[0].description}</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default App;