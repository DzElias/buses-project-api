import React, {useContext, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import PrivateRoute from "./pages/PrivateRoute.page";
import { socket } from './socket';

import Stops from "./pages/Stops.page";
import StopPage from "./pages/Stop.page";
import NewStop from './pages/NewStop.page';

import Buses from "./pages/Buses.page";
import BusPage from "./pages/Bus.page"
import NewBus from './pages/NewBus.page';

import Drivers from './pages/Drivers.page';
import DriverPage from './pages/Driver.page';
import NewDriver from './pages/NewDriver.page';

import Login from "./pages/Login.page";
import Home from "./pages/Home.page";

import { StopsContext } from "./contexts/stops.context";
import { BusesContext } from './contexts/buses.context';
import { DriversContext } from "./contexts/drivers.context";
import { UserProvider } from "./contexts/user.context";

function App() {
  socket.connect();

  const { saveStops } = useContext(StopsContext);
  const { saveBuses } = useContext(BusesContext);
  const { saveDrivers } = useContext(DriversContext);

  useEffect(() => {
    socket.on('loadStops', saveStops);
    socket.on('loadBuses', saveBuses);
    socket.on('loadDrivers', saveDrivers);

    return () => {
      socket.off('loadStops', saveStops);
      socket.off('loadBuses', saveBuses);
      socket.off('loadDrivers', saveDrivers);
    };

  }, []);

  return (
    <BrowserRouter>
      {/* We are wrapping our whole app with UserProvider so that */}
      {/* our user is accessible through out the app from any page*/}
      
      <UserProvider>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          
          {/* We are protecting our Home Page from unauthenticated */}
          {/* users by wrapping it with PrivateRoute here. */}
          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />

            <Route path="/stops" element={<Stops/>}/>
            <Route path='/buses' element={<Buses/>}/>
            <Route path='/drivers' element={<Drivers/>}/>

            <Route path="/stops/:id" element={<StopPage/>}/>
            <Route path="/buses/:id" element={<BusPage/>}/>
            <Route path="/drivers/:id" element={<DriverPage/>}/>
            
            <Route path="/stops/new" element={<NewStop/>}/>
            <Route path="/drivers/new" element={<NewDriver/>}/>
            <Route path="/buses/new" element={<NewBus/>}/>

          </Route>
        </Routes>
      </UserProvider>
      
    </BrowserRouter>
  );
}

export default App;
