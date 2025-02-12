import React, { createContext, useContext, useEffect, useState } from "react";

import users from './Backend/users';

// create 2 part context: provider and context
const UserContext = createContext();

/* create the provider and export it. It will use useState to save the initial users in userList. 
setUserList is used to update the userList context */
export const UserProvider = ({ children }) => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        // get all users when component mounts
        setUserList(users);
    }, []);

    // this gives access to all wrapped components.
    return (
        <UserContext.Provider value={{ userList, setUserList }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
}