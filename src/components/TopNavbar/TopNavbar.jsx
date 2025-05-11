import React, { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { FaAngleDown } from "react-icons/fa6";
import { useSeason } from '../../context/SeasonContext';

const TopNavbar = ({ isSidebarOpen }) => {
  const [isSeasonDropdownOpen, setIsSeasonDropdownOpen] = useState(false);
  const [seasons, setSeasons] = useState([]);
  const {selectedSeason, setSelectedSeason} = useSeason();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchSeasons = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://api.jolpi.ca/ergast/f1/seasons/?limit=30&offset=60");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();


        const seasonYears = data.MRData.SeasonTable.Seasons.map(
          (season) => season.season
        );
        setSeasons(seasonYears.reverse());

        if (seasonYears.length > 0) {
          setSelectedSeason(seasonYears[0]);
        }
      } catch (err) {
        console.error("Error fetching seasons:", err);
        setError("Failed to load seasons");
      } finally {
        setLoading(false);
      }
    };

    fetchSeasons();
  }, []);

  const toggleSeasonDropdown = () => {
    setIsSeasonDropdownOpen(!isSeasonDropdownOpen);
  };

  const handleSeasonSelect = (year) => {
    setSelectedSeason(year);
    setIsSeasonDropdownOpen(false);
    console.log(`Season changed to: ${year}`);
  };

  return (
    <div
      className={`top-nav fixed h-[55px] top-0 z-[999] transition-all duration-300 ${
        isSidebarOpen 
          ? 'left-[250px] w-[calc(100%-250px)]' 
          : 'left-0 w-full md:left-[250px] md:w-[calc(100%-250px)]'
      }`}
      style={{ backgroundColor: "var(--primary-color)" }}
    >
      <div className="top_nav_wrapper flex items-center justify-between h-full px-16 md:px-8 transition-all duration-300">
        <div className="search_box flex items-center">
          <input
            type="text"
            placeholder="search or type"
            className="px-4 py-1 text-gray-500 rounded-md bg-amber-50 w-[160px] md:w-[200px] focus:outline-none transition-all duration-300"
          />
          <span className="ml-[-25px] md:ml-[-30px]">
            <GoSearch className="text-gray-500 text-lg" />
          </span>
        </div>

        <div className="top_nav_right flex items-center gap-2 md:gap-4 relative">
          <div
            className="season flex items-center gap-2 text-gray-400 text-sm font-medium cursor-pointer hover:bg-white/10 px-2 py-1 md:px-3 rounded-md transition-all"
            onClick={toggleSeasonDropdown}
          >
            <span className="hidden sm:inline">Season:</span> {selectedSeason}
            <FaAngleDown
              className={`text-white text-xs transition-transform ${
                isSeasonDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Season Dropdown */}
          
          {isSeasonDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-md shadow-lg z-50 overflow-hidden max-h-60 overflow-y-auto">
              {loading ? (
                <div className="px-4 py-2 text-sm text-gray-700">
                  Loading seasons...
                </div>
              ) : error ? (
                <div className="px-4 py-2 text-sm text-red-500">{error}</div>
              ) : (
                seasons.map((year) => (
                  <div
                    key={year}
                    className={`px-4 py-2 text-sm cursor-pointer ${
                      year === selectedSeason
                        ? "bg-blue-100 text-blue-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleSeasonSelect(year)}
                  >
                    {year}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;