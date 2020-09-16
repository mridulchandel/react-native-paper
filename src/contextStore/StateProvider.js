import React, { useReducer, useContext } from "react";

const StateContext = React.createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useAppState = () => useContext(StateContext);
