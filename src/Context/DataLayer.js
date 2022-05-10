import React from 'react'
import { reducer, initialState } from './Reducer';

const DataContext = React.createContext();

export default function DataLayer({ children }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <DataContext.Provider value={[state, dispatch]}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataLayer = () => {
    const [data, dispatch] = React.useContext(DataContext);
    return [data, dispatch];
}