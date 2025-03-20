import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ContextAPI from "./context/contextAPI.jsx";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TicketDetailsContext from "./context/TicketDetailsContext.jsx";
import ResponseContext from "./context/ResponseContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextAPI>
    <ResponseContext>
       <TicketDetailsContext>
          <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <App />
              </LocalizationProvider>
          </BrowserRouter>
       </TicketDetailsContext>
    </ResponseContext>
    </ContextAPI>
  </StrictMode>
);
