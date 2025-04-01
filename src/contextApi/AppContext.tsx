import React, { useState } from "react";
import { appContext } from "./context";
export type tStarExamContext={
    start:boolean,
    examDuration:number|null
}
const AppContext = ({ children }: { children: React.ReactNode }) => {

// exam starting.
const[exam,setExam]=useState<tStarExamContext>({start:false,examDuration:null})





  const value = {exam,setExam};

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppContext;
