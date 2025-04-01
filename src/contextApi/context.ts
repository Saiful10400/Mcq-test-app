import { createContext } from "react";
import { tStarExamContext } from "./AppContext";

type ExamContextType = {
    exam: tStarExamContext;
    setExam: React.Dispatch<React.SetStateAction<tStarExamContext>>;
    examSubmitHandle:()=>void
  };

export const appContext = createContext<ExamContextType|null>(null);