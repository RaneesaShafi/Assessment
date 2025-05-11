import React, { useState, useEffect } from "react";
import { FaCar } from "react-icons/fa";
import TeamCard from "../components/Reusable/TeamCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSeason } from '../context/SeasonContext';



const Dashboard = () => {
  const { selectedSeason } = useSeason();
  const [teams, setTeams] = useState([]);
  const [driverStandings, setDriverStandings] = useState([]);
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [loading, setLoading] = useState({
    teams: true,
    standings: true,
    constructorStandings: true
  });
  const [error, setError] = useState({
    teams: null,
    standings: null,
    constructorStandings: null
  });

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          `https://api.jolpi.ca/ergast/f1/${selectedSeason}/constructors`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTeams(data.MRData.ConstructorTable.Constructors);
      } catch (err) {
        setError(prev => ({...prev, teams: err.message}));
      } finally {
        setLoading(prev => ({...prev, teams: false}));
      }
    };

    const fetchDriverStandings = async () => {
      try {
        const response = await fetch(
          `https://api.jolpi.ca/ergast/f1/${selectedSeason}/driverStandings.json`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const processedData = processDriverStandingsData(data);
        setDriverStandings(processedData);
      } catch (err) {
        console.error("Error fetching driver standings:", err);
        setError(prev => ({...prev, standings: err.message}));
      } finally {
        setLoading(prev => ({...prev, standings: false}));
      }
    };

    const fetchConstructorStandings = async () => {
      try {
        const response = await fetch(
          `https://api.jolpi.ca/ergast/f1/${selectedSeason}/constructorStandings.json`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const processedData = processConstructorStandingsData(data);
        setConstructorStandings(processedData);
      } catch (err) {
        console.error("Error fetching constructor standings:", err);
        setError(prev => ({...prev, constructorStandings: err.message}));
      } finally {
        setLoading(prev => ({...prev, constructorStandings: false}));
      }
    };

    fetchTeams();
    fetchDriverStandings();
    fetchConstructorStandings();
  }, [selectedSeason]);

  const processDriverStandingsData = (apiData) => {
    try {
      if (!apiData?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings) {
        throw new Error("Invalid API response structure");
      }

      const standings = apiData.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      
      return standings.map(driver => ({
        name: driver.Driver.code || driver.Driver.driverId,
        position: parseInt(driver.position),
        points: parseInt(driver.points),
        constructor: driver.Constructors?.[0]?.name || "Unknown"
      }));
    } catch (err) {
      console.error("Error processing driver standings:", err);
      return [];
    }
  };

  const processConstructorStandingsData = (apiData) => {
    try {
      if (!apiData?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings) {
        throw new Error("Invalid API response structure");
      }

      return apiData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(team => ({
        position: parseInt(team.position),
        constructor: team.Constructor.name,
        points: parseInt(team.points),
        wins: parseInt(team.wins),

        evolution: team.positionText && team.positionText.includes('+') ? 
                 team.positionText.replace('+', '') : 
                 (team.positionText && team.positionText.includes('-') ? 
                 team.positionText : "—")
      }));
    } catch (err) {
      console.error("Error processing constructor standings:", err);
      return [];
    }
  };

  if (loading.teams || loading.standings || loading.constructorStandings) {
    return (
      <div className="mt-16 text-center text-gray-300">Loading data...</div>
    );
  }

  if (error.teams || error.standings || error.constructorStandings) {
    return (
      <div className="mt-16 text-center text-red-500">
        Error: {error.teams || error.standings || error.constructorStandings}
      </div>
    );
  }

  return (
    <div className="dashboard mt-16">
      <div className="dashboard_wrapper">
        <div className="dashboard_cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {teams.slice(0, 8).map((team) => (
            <TeamCard
              key={team.constructorId}
              item={{
                title: team.name,
                nationality: team.nationality,
                icon: <FaCar />,
              }}
            />
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          <div className="driver_evolution sm:w-[60%] w-full h-full  rounded-lg p-2">
            <h2 className="text-2xl font-bold text-white mb-4">
              Driver Standings evolution
            </h2>
            <div className="h-[450px]">
              {driverStandings.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={driverStandings}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis reversed={true} domain={[1, 20]} stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "gray",
                        borderColor: "#374151",
                      }}
                      itemStyle={{ color: "white" }}
                    />
                    
                    {/* <Legend /> */}
                    {driverStandings.map((driver) => (
                      <Line
                        key={driver.name}
                        type="monotone"
                        dataKey="position"
                        name={driver.name}
                        stroke={
                          driver.constructor === "McLaren" ? "#FF8700" :
                          driver.constructor === "Red Bull Racing" ? "#0600EF" :
                          driver.constructor === "Mercedes" ? "#00D2BE" :
                          driver.constructor === "Ferrari" ? "#DC0000" :
                          "#FFFFFF"
                        }
                        strokeWidth={2}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  {error.standings ? "Failed to load driver standings" : "No driver standings data available"}
                </div>
              )}
            </div>
          </div>

          <div className="constructor-standings border border-gray-500 rounded-lg p-4 flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">
                Constructor Standings
              </h2>
              <button className="text-blue-400 hover:text-blue-300 text-sm">
                Full Standings →
              </button>
            </div>
            <div className="overflow-x-hidden">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 text-sm text-left border-b border-gray-500">
                    <th className="pb-2">POS.</th>
                    <th className="pb-2">CONSTRUCTOR</th>
                    <th className="pb-2 text-right">POINTS</th>
                    <th className="pb-2 text-right">EVO.</th>
                  </tr>
                </thead>
                <tbody>
                {constructorStandings.slice(0, 10).map((team) => (
                    <tr
                      key={`${team.constructor}-${team.position}`}
                      className="border-b border-gray-700 hover:bg-gray-700/50"
                    >
                      <td className="py-3 text-gray-200">{team.position}</td>
                      <td className="py-3 font-medium text-gray-200">
                        {team.constructor}
                      </td>
                      <td className="py-3 text-right text-gray-200">
                        {team.points}
                      </td>
                      <td className="py-3 text-right">
                        {team.evolution !== "—" ? (
                          <span className="text-green-400">
                            {team.evolution}
                          </span>
                        ) : (
                          <span className="text-gray-400">
                            {team.evolution}
                          </span>
                        )}
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
  );
};

export default Dashboard;