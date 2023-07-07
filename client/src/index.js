import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { StopsProvider} from "./contexts/stops.context";
import { BusesProvider } from "./contexts/buses.context";
import { DriversProvider } from "./contexts/drivers.context"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StopsProvider>
      <BusesProvider>
        <DriversProvider>
          <App/>
        </DriversProvider>
      </BusesProvider>
  </StopsProvider>
  </React.StrictMode>
);