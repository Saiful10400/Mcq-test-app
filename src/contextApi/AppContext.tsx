import React from "react";
import { appContext } from "./context";

const AppContext = ({ children }: { children: React.ReactNode }) => {
  const value = {};

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppContext;
