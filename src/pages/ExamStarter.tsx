import { useLoaderData } from "react-router";
import { tExam } from "./Exam";
import ExamStartConfirmation from "../components/ExamStartConfirmation";
import { useContext } from "react";
import { appContext } from "../contextApi/context";
import Exampapper from "../components/Exampapper";
import AfterExamResult from "../components/AfterExamResult";

// after taing the exam , api response will be like below.

type SelectedAnswer = {
  index: number;
  ans: string;
  _id: string;
};

export type tExamResult = {
  _id: string;
  totalQuestion: number;
  exam: tExam;
  correctQuestionIndex: { index: number; ans: string }[];
  incorrectQuestionIndex: { index: number; ans: string }[];
  selectedAns: SelectedAnswer[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const ExamStarter = () => {
  // context.
  const context = useContext(appContext);

  const data = useLoaderData<null | Partial<tExamResult & tExam>>();
  console.log(data);
  if (data?.exam?.hasTaken) {
    return <AfterExamResult data={data as tExamResult} />;
  } else if (context?.exam.start && !data?.hasTaken) {
    return <Exampapper data={data as tExam} />;
  } else {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <ExamStartConfirmation data={data as tExam} />
      </div>
    );
  }
};

export default ExamStarter;
