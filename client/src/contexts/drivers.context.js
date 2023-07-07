import { createContext, useState } from "react";

export const DriversContext = createContext();

export const DriversProvider = ({ children }) => {
    
    const [drivers, setDrivers] = useState([]);

    const saveDrivers = (drivers) => {
        setDrivers(drivers);
    }

    const getDrivers = () => drivers;
    
    const getDriverById = (Id) => {
      return (drivers.find(x => x._id === Id));
    };

    return (
        <DriversContext.Provider
          value={{
            saveDrivers,
            getDrivers,
            getDriverById
          }}
        >
          {children}
        </DriversContext.Provider>
    );

}