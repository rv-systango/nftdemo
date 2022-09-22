import React, { useState } from "react";
import "./App.css";
import "./asstes/css/styles.scss";
import Homepage from "./component/homepage";

export const AppContext = React.createContext();
export default function App() {

  const [appstate, setAppstate] = useState({ connected: false, connectedAddress: "", });

  return (
    <AppContext.Provider value={{appstate, setAppstate}}>
      <Homepage />
    </AppContext.Provider>
  );
}
