import React, { createContext, useContext, useState } from 'react';


// Create the context
const AppContext = createContext();

// Custom hook to access the context
export const useAppContext = () => {
    return useContext(AppContext);
};

// AppContextProvider Component
export const AppContextProvider = ({ children }) => {
    // Sidebar states
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenProfile, setIsOpenProfile] = useState(false);

    // Provide all states and functions
    return (
        <AppContext.Provider
            value={{
                // Sidebar states
                isOpen,
                setIsOpen,
                isOpenProfile,
                setIsOpenProfile,

            }}
        >
            {children}
        </AppContext.Provider>
    );
};
