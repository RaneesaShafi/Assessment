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

const Dashboard = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          "https://api.jolpi.ca/ergast/f1/2024/constructors"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTeams(data.MRData.ConstructorTable.Constructors);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="mt-16 text-center text-gray-300">Loading teams...</div>
    );
  }

  if (error) {
    return <div className="mt-16 text-center text-red-500">Error: {error}</div>;
  }

  //Sample data for the teams object
  // const teamObj = {
  //   title: "McLaren",
  //   nationality: "French",
  //   icon: <FaCar />,
  // };

  // Sample data for driver standings
  const driverStandingsData = [
    {
      name: "KOR",
      NOR: 1,
      VER: 2,
      PIA: 3,
      RUS: 4,
      ART: 5,
      LEC: 6,
      ALB: 7,
      HAM: 8,
      OCO: 9,
      STR: 10,
    },
    {
      name: "VER",
      NOR: 2,
      VER: 1,
      PIA: 4,
      RUS: 3,
      ART: 6,
      LEC: 5,
      ALB: 8,
      HAM: 7,
      OCO: 10,
      STR: 9,
    },
    {
      name: "PIA",
      NOR: 1,
      VER: 2,
      PIA: 3,
      RUS: 5,
      ART: 4,
      LEC: 6,
      ALB: 7,
      HAM: 8,
      OCO: 9,
      STR: 10,
    },
    {
      name: "RUS",
      NOR: 1,
      VER: 2,
      PIA: 4,
      RUS: 3,
      ART: 5,
      LEC: 6,
      ALB: 7,
      HAM: 8,
      OCO: 10,
      STR: 9,
    },
    {
      name: "ART",
      NOR: 1,
      VER: 2,
      PIA: 3,
      RUS: 4,
      ART: 5,
      LEC: 6,
      ALB: 7,
      HAM: 8,
      OCO: 9,
      STR: 10,
    },
  ];

  // Sample data for constructor standings
  const constructorStandingsData = [
    { position: 1, constructor: "McLaren", points: 151, evolution: "—" },
    { position: 2, constructor: "Mercedes", points: 93, evolution: "—" },
    { position: 3, constructor: "Red Bull Racing", points: 71, evolution: "—" },
    { position: 4, constructor: "Ferrari", points: 57, evolution: "—" },
    { position: 5, constructor: "Haas", points: 20, evolution: "1" },
    { position: 6, constructor: "Williams", points: 19, evolution: "1" },
    { position: 7, constructor: "Aston Martin", points: 10, evolution: "—" },
    { position: 8, constructor: "RB", points: 7, evolution: "—" },
    { position: 9, constructor: "Alpine", points: 6, evolution: "1" },
    { position: 10, constructor: "Kok Sauber", points: 6, evolution: "1" },
  ];

  return (
    <div className="dashboard  mt-16">
      <div className="dashboard_wrapper">
        <div className="dashboard_cards  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* <TeamCard item={teamObj} />
          <TeamCard item={teamObj} />
          <TeamCard item={teamObj} />
          <TeamCard item={teamObj} /> */}

          {teams.map((team) => (
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

        {/* Driving Standings */}
        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          <div className="driver_evolution sm:w-[60%]  w-full  h-full bg-gray-800 rounded-lg p-2 ">
            <h2 className="text-2xl font-bold text-white mb-4">
              Driver Standings evolution
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={driverStandingsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis reversed={true} domain={[1, 20]} stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      borderColor: "#374151",
                    }}
                    itemStyle={{ color: "#FFFFFF" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="NOR"
                    stroke="#FF8700"
                    strokeWidth={2}
                    name="Norris"
                  />
                  <Line
                    type="monotone"
                    dataKey="VER"
                    stroke="#0600EF"
                    strokeWidth={2}
                    name="Verstappen"
                  />
                  <Line
                    type="monotone"
                    dataKey="PIA"
                    stroke="#FF8700"
                    strokeWidth={2}
                    name="Praktri"
                  />
                  <Line
                    type="monotone"
                    dataKey="RUS"
                    stroke="#00D2BE"
                    strokeWidth={2}
                    name="Russell"
                  />
                  <Line
                    type="monotone"
                    dataKey="ART"
                    stroke="#00D2BE"
                    strokeWidth={2}
                    name="Antonelli"
                  />
                  <Line
                    type="monotone"
                    dataKey="LEC"
                    stroke="#DC0000"
                    strokeWidth={2}
                    name="Leclerc"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Constructor Standings */}
          <div className="constructor-standings bg-gray-800 rounded-lg p-4 flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">
                Constructor Standings
              </h2>
            </div>
            <div className="overflow-x-hidden">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 text-sm  text-left border-b border-gray-500">
                    <th className="pb-2">POS.</th>
                    <th className="pb-2">CONSTRUCTOR</th>
                    <th className="pb-2 text-right">POINTS</th>
                    <th className="pb-2 text-right">EVO.</th>
                  </tr>
                </thead>
                <tbody>
                  {constructorStandingsData.map((team) => (
                    <tr
                      key={team.position}
                      className="border-b  border-gray-700 hover:bg-gray-700/50"
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
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    Full Standings →
                  </button>
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
