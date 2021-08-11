import React, { createContext, useContext, useState, useEffect } from "react";
import action from './action';

export const AppContext = createContext();

const AppUserStore = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
  const [count, setCount] = useState(1);

  const handleClickCount = () => {
    action.setGlobalState({ count: count + 1 });
    setCount(count + 1);
  };

  useEffect(() => {
    action.onGlobalStateChange((newState, prev) => {
      console.log('App1', JSON.stringify(newState), JSON.stringify(prev));
      setCount(newState.count);
    }, true);
  }, []);

  return (
    <AppContext.Provider
      value={{
        count, handleClickCount
      }}
    >
      {children}
    </AppContext.Provider>
  )
};

export default AppContextProvider;
