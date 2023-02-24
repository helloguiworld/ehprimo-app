import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

import usersServices from '../services/usersServices';

export function UserContextProvider(props) {
    const [user, setUser] = useState({});

    useEffect(() => {
        usersServices.readStoragedUser().then((storagedUser) => {
            if (storagedUser != null) setUser(storagedUser);
        });
    }, []);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider >
    )
}

export default UserContext;