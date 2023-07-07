import { createContext, useState } from "react";

export const StopsContext = createContext();

export const StopsProvider = ({ children }) => {
    const [stops, setStops] = useState([]);

    const saveStops = (stops) => {
        setStops(stops);
    }

    const getStops = () => stops;
    
    const getStopById = (Id) => {
      return (stops.find(x => x._id === Id));

    };

    return (
        <StopsContext.Provider
          value={{
            saveStops,
            getStops,
            getStopById
          }}
        >
          {children}
        </StopsContext.Provider>
    );
}