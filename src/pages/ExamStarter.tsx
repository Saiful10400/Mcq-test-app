import { useLoaderData } from "react-router";
import { tExam } from "./Exam";
import ExamStartConfirmation from "../components/ExamStartConfirmation";
import { useContext } from "react";
import { appContext } from "../contextApi/context";
import Exampapper from "../components/Exampapper";

const ExamStarter = () => {
  // context.
  const context = useContext(appContext);
 

  const data: tExam | null = useLoaderData();

  if (context?.exam.start && data) {
    return <Exampapper data={data}/>
  } else {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <ExamStartConfirmation data={data} />
      </div>
    );
  }
};

export default ExamStarter;
