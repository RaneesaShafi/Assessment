import React, { useState, useEffect } from 'react';
import { useSeason } from '../context/SeasonContext';

const Drivers = () => {
    const { selectedSeason } = useSeason();
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await fetch(`https://api.jolpi.ca/ergast/f1/${selectedSeason}/drivers`);
                if (!response.ok) {
                    throw new Error('Failed to fetch drivers data');
                }
                const data = await response.json();
                setDrivers(data.MRData.DriverTable.Drivers);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDrivers();
    }, [selectedSeason]);

    if (loading) {
        return <div className="text-gray-200 p-4">Loading drivers...</div>;
    }

    if (error) {
        return <div className="text-red-500 p-4">Error: {error}</div>;
    }


    const getDriverProperty = (property, value) => {
        return value || <span className="text-red-500 text-sm italic">Not Found</span>;
    };

    return (
        <div className='drivers mt-18'>
            <div className='driver-wrapper text-lg font-bold text-gray-200 mb-4'>
                <h2 className="driver-title">Drivers</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {drivers.map((driver) => (
                    <div 
                        key={driver.driverId} 
                        className="relative border border-gray-700 rounded-lg p-4 shadow-lg overflow-hidden
                                transition-all duration-300 ease-in-out
                                hover:scale-105 hover:shadow-2xl hover:border-[#FF8700] hover:z-10
                                group" 
                    >
                        <div 
                            className="absolute inset-0 bg-cover bg-center opacity-20 z-0
                                    transition-all duration-500 ease-in-out
                                    group-hover:opacity-30 group-hover:scale-110"
                            style={{
                                backgroundImage: "url('/src/assets/racer-bg.png')",
                                backgroundPosition: 'center'
                            }}
                        ></div>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 
                                    group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                        
                        <div className="relative z-10 transition-all duration-300 group-hover:-translate-y-1">
                            <div className="flex justify-between items-start">
                                <div className="transition-all duration-300 group-hover:translate-x-1">
                                    <h3 className="text-xl font-bold text-white group-hover:text-[#FF8700] transition-colors">
                                        {getDriverProperty('familyName', driver.familyName)}
                                    </h3>
                                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                                        {getDriverProperty('code', driver.code)}
                                    </p>
                                </div>
                                <span className="text-8xl font-bold text-[#FF8700] opacity-80 
                                            transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                                    {getDriverProperty('permanentNumber', driver.permanentNumber)}
                                </span>
                            </div>
                            <div className="mt-4 transition-all duration-300 group-hover:translate-x-1">
                                <p className="text-gray-200 uppercase text-sm group-hover:text-white">
                                    {getDriverProperty('nationality', driver.nationality)}
                                </p>
                                <p className="text-gray-300 group-hover:text-white transition-colors">
                                    {getDriverProperty('givenName', driver.givenName)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Drivers;