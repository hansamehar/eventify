import React, { createContext, useEffect, useState } from "react";

export const Authcontext = createContext()

const ContextAPI=({ children })=>{
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userdata = sessionStorage.getItem('user');
        if (userdata) {
            setUser(JSON.parse(userdata));
        }
        setLoading(false);
    },[])
    
    return (
        <Authcontext.Provider value={{user, setUser,loading}}>
            {children}
        </Authcontext.Provider>
    )
}
export default ContextAPI
