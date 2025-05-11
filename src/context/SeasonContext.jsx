import React, {useState, createContext, useContext} from "react";

const SeasonContext = createContext();

export const SeasonProvider = ({children}) => {
  
const [selectedSeason, setSelectedSeason] = useState("2025");

return (

    <SeasonContext.Provider value= {{selectedSeason, setSelectedSeason}}> 
       {children} 
    </SeasonContext.Provider>

);
   
    
}

export function useSeason() {
    const context = useContext(SeasonContext);
    if (!context) {
      throw new Error('useSeason must be used within a SeasonProvider');
    }
    return context;
  }