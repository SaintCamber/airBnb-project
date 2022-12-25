import { useContext } from "react";
export function Context(){
let bookingsContext = createContext()

    return (
        <>
          <bookingsContext.Provider value={contextValue}>
            {children}
          </bookingsContext.Provider>
        </>
      );
}
