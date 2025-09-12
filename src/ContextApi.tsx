import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your context
interface AppContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenProfile: boolean;
  setIsOpenProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with a default (undefined so we force provider usage)
const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook to access the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

// Props for provider
interface AppContextProviderProps {
  children: ReactNode;
}

// AppContextProvider Component
export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  return (
    <AppContext.Provider
      value={{
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
