import React, { createContext, useState, useContext } from "react";


export const TicketContext = createContext();
const TicketDetailsContext = ({ children }) => {
  const [BookingDetails, setBookingDetails] = useState(null);

  return (
    <TicketContext.Provider value={{ BookingDetails, setBookingDetails }}>
      {children}
    </TicketContext.Provider>
  );
};
export default TicketDetailsContext