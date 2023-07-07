import { createContext, useState } from "react";

export const BusesContext = createContext();

export const BusesProvider = ({ children }) => {
    const [buses, setBuses] = useState([]);

    const saveBuses = (buses) => {
        setBuses(buses);
    }

    const getBuses = () => buses;
    
    const getBusById = (Id) => {
      return (buses.find(x => x._id === Id));

    };

    return (
        <BusesContext.Provider
          value={{
            saveBuses,
            getBuses,
            getBusById
          }}
        >
          {children}
        </BusesContext.Provider>
    );
}