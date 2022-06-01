import { createContext, useState } from 'react';

export const DrawerContext = createContext();

function DrawerContextProvider({ children }) {
    const [open, setOpen] = useState(true);

    return <DrawerContext.Provider value={{ open, setOpen }}>{children}</DrawerContext.Provider>;
}

export default DrawerContextProvider;
