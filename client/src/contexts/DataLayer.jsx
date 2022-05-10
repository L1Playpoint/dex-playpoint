import React from "react";
import Reducer, { initialState } from "./Reducer";

export const DataLayerContext = React.createContext();

export default function DataLayerProvider({ children }) {
  const [state, dispatch] = React.useReducer(Reducer, initialState);

  return (
    <DataLayerContext.Provider value={[state, dispatch]}>
      {children}
    </DataLayerContext.Provider>
  );
}

export const useDataLayerValue = () => React.useContext(DataLayerContext);
