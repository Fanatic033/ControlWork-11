import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./app/store.ts";
import {Provider} from "react-redux";
import {CssBaseline} from "@mui/material";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <BrowserRouter>
        <CssBaseline/>
  <StrictMode>
    <App />
  </StrictMode>,
    </BrowserRouter>
    </PersistGate>
    </Provider>
)
