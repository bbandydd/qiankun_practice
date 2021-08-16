import React, { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import action from './action';

export const AppContext = createContext();

const AppUserStore = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
  const [count, setCount] = useState(1);
  const [locale, setLocale] = useState('en-US');
  const { i18n } = useTranslation();

  useEffect(() => {
    action.onGlobalStateChange((newState, prev) => {
      console.log('App', JSON.stringify(newState), JSON.stringify(prev));
      setCount(newState.count);
      loadLocales(newState.locale);
    }, true);
  }, []);

  const handleClickCount = () => {
    action.setGlobalState({ count: count + 1 });
    setCount(count + 1);
  };

  const loadLocales = (key) => {
    i18n.changeLanguage(key);
    setLocale(key);
  };

  return (
    <AppContext.Provider
      value={{
        count, handleClickCount, locale, loadLocales
      }}
    >
      {children}
    </AppContext.Provider>
  )
};

export default AppContextProvider;
