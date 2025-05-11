import React, { useState, useEffect } from 'react';
import { useSeason } from '../context/SeasonContext';


const Races = () => {
    const { selectedSeason } = useSeason();
   const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/${selectedSeason}/races/`);
        if (!response.ok) {
          throw new Error('Failed to fetch races data');
        }
        const data = await response.json();
        setRaces(data.MRData.RaceTable.Races);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, [selectedSeason]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatTime = (timeString) => {
    const time = timeString.split('Z')[0];
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm} UTC`;
  };

  if (loading) {
    return <div className="text-gray-200 p-4">Loading races...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="races mt-18 px-2 sm:px-4">
      <div className="race-wrapper text-lg font-bold text-gray-200 mb-4">
        <h2 className="race-title text-xl sm:text-2xl">Races</h2>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full text-sm sm:text-base text-gray-200">
          <thead>
            <tr className="border-b border-gray-700 ">
              <th className="px-2 py-3 sm:px-4 text-left whitespace-nowrap">Race Name</th>
              <th className="px-2 py-3 sm:px-4 text-left whitespace-nowrap">Date</th>
              <th className="px-2 py-3 sm:px-4 text-left whitespace-nowrap">Time (UTC)</th>
              <th className="px-2 py-3 sm:px-4 text-left whitespace-nowrap">Circuit ID</th>
              <th className="px-2 py-3 sm:px-4 text-left whitespace-nowrap">Circuit Name</th>
              <th className="px-2 py-3 sm:px-4 text-left whitespace-nowrap">Country</th>
            </tr>
          </thead>
          <tbody>
            {races.map((race) => (
              <tr key={race.round} className="border-b border-gray-700 hover:bg-[#181b3a]">
                <td className="px-2 py-2 sm:px-4">{race.raceName}</td>
                <td className="px-2 py-2 sm:px-4">{formatDate(race.date)}</td>
                <td className="px-2 py-2 sm:px-4">{formatTime(race.time)}</td>
                <td className="px-2 py-2 sm:px-4">{race.Circuit.circuitId}</td>
                <td className="px-2 py-2 sm:px-4">{race.Circuit.circuitName}</td>
                <td className="px-2 py-2 sm:px-4">{race.Circuit.Location.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Races;
