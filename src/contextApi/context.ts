import { createContext } from "react";
import { tStarExamContext } from "./AppContext";

type ExamContextType = {
    exam: tStarExamContext;
    setExam: React.Dispatch<React.SetStateAction<tStarExamContext>>;
  };

export const appContext = createContext<ExamContextType|null>(null);