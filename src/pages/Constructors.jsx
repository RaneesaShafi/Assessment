import React, { useState, useEffect } from 'react';
import { useSeason } from '../context/SeasonContext';

const Constructors = () => {
    const { selectedSeason } = useSeason();
    const [constructors, setConstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConstructors = async () => {
            try {
                const response = await fetch(`https://api.jolpi.ca/ergast/f1/${selectedSeason}/constructors`);
                if (!response.ok) {
                    throw new Error('Failed to fetch constructors data');
                }
                const data = await response.json();
                console.log(data);
                setConstructors(data.MRData.ConstructorTable.Constructors);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchConstructors();
    }, [selectedSeason]);


    const getConstructorProperty = (property, value) => {
        return value || <span className="text-gray-500 italic">Not Found</span>;
    };

    if (loading) {
        return <div className="text-gray-200 p-4">Loading constructors...</div>;
    }

    if (error) {
        return <div className="text-red-500 p-4">Error: {error}</div>;
    }

    return (
        <div className='constructors mt-18'> 
            <div className='constructor-wrapper text-lg font-bold text-gray-200 mb-4'>
                <h2 className="constructor-title">Constructors</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {constructors.map((constructor) => (
                    <div 
                        key={constructor.constructorId} 
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
                                backgroundImage: "url('/src/assets/car.jpg')",
                                backgroundPosition: 'center'
                            }}
                        ></div>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 
                                    group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                        
                        <div className="relative mt-5 z-10 transition-all duration-300 group-hover:-translate-y-1">
                            <div className="flex justify-between items-start">
                                <div className="transition-all duration-300 group-hover:translate-x-1">
                                    <h3 className="text-xl font-bold text-white group-hover:text-[#FF8700] transition-colors">
                                        {getConstructorProperty('constructorId', constructor.constructorId?.substring(0, 3).toUpperCase())}
                                    </h3>
                                    <p className="text-gray-400 text-sm mt-8 group-hover:text-gray-300 transition-colors">
                                        {getConstructorProperty('nationality', constructor.nationality)}
                                    </p>
                                </div>
                                <span className="text-3xl font-bold text-[#FF8700] mt-8 opacity-80 
                                            transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                                    {getConstructorProperty('name', constructor.name)}
                                </span>
                            </div>
                            <div className="mt-6 transition-all duration-300 group-hover:translate-x-1">
                             
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Constructors;