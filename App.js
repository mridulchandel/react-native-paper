import React, { useState, useContext } from 'react';

import Paper from './src/theme/Paper';
import { StateProvider } from './src/contextStore/StateProvider';
import contextReducer, {
  initialState,
} from './src/contextStore/contextReducer';

export default function App() {
  return (
    <StateProvider initialState={initialState} reducer={contextReducer}>
      <Paper />
    </StateProvider>
  );
}
