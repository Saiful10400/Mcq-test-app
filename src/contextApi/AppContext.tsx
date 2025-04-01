import React, { useState } from "react";
import { appContext } from "./context";
import axios from "axios";
export type tStarExamContext={
    start:boolean,
    examDuration:number|null,
    totalQuestion:number|null,
    selectedAns:{ index: number; ans: string }[],
    examSlug:string|null;
    timeOut:boolean;
   
}
const AppContext = ({ children }: { children: React.ReactNode }) => {

// exam starting.
const[exam,setExam]=useState<tStarExamContext>({start:false,examDuration:null,selectedAns:[],totalQuestion:null,examSlug:null,timeOut:false})

// submit exam papper.
const examSubmitHandle=()=>{
axios.post("https://mcq-test-server.vercel.app/api/result/create",{examSlug:exam.examSlug,selectedAns:exam.selectedAns})
.then(res=>{
  if(res.data?.statusCode===200){
    window.location.reload()
  }
})
}
 


  const value = {exam,setExam,examSubmitHandle};

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppContext;
