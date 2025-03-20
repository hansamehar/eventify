import React, { createContext, useEffect, useState } from "react";

export const EventContext = createContext()

const ResponseContext=({ children })=>{
    const [eventResponse, setEventResponse] = useState("")
    return (
        <EventContext.Provider value={{eventResponse, setEventResponse}}>
            {children}
        </EventContext.Provider>
    )
}
export default ResponseContext
