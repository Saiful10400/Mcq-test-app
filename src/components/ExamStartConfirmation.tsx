import { useContext } from "react";
import { tExam } from "../pages/Exam";
import Button from "../Ui/Button";
import { appContext } from "../contextApi/context";
import { tStarExamContext } from "../contextApi/AppContext";

const ExamStartConfirmation = ({ data }: { data: tExam | null }) => {
  const context = useContext(appContext);

  const startExamHandle = () => {
    if(data?.time)
    context?.setExam((p: tStarExamContext) => ({ ...p, start: true,examDuration:data?.time }));
  };
 
  return (
    <div className="bg-gray-200 rounded-md shadow-lg p-5 w-[80vw]">
      <h1 className="flex border-b border-gray-100 py-1 justify-between items-center">
        <span className="font-semibold">Student Name:</span>
        <span>{data?.student?.name}</span>
      </h1>
      <h1 className="flex border-b border-gray-100 py-1 justify-between items-center">
        <span className="font-semibold">Class:</span>
        <span>{data?.student?.class}</span>
      </h1>
      <h1 className="flex border-b border-gray-100 py-1 justify-between items-center">
        <span className="font-semibold">Subject:</span>
        <span>{data?.questionPapper?.subject}</span>
      </h1>
      <h1 className="flex border-b border-gray-100 py-1 justify-between items-center">
        <span className="font-semibold">Topic:</span>
        <span>{data?.questionPapper?.name}</span>
      </h1>
      <h1 className="flex border-b border-gray-100 py-1 justify-between items-center">
        <span className="font-semibold">Total question:</span>
        <span>{data?.questionPapper?.questions?.length}</span>
      </h1>
      <h1 className="flex border-b border-gray-100 py-1 justify-between items-center">
        <span className="font-semibold">Total time:</span>
        <span>{data?.time} minutes</span>
      </h1>

      <div className="flex justify-center items-center mt-4">
        {" "}
        <Button
          fn={startExamHandle}
          active
          text="Start exam"
          type="secondary"
        />
      </div>
      <h1 className="text-red-500 mt-4 font-semibold">
        Warning: after clicking "Start Exam" button your exam will be
        started.you no longer stop it.
      </h1>
    </div>
  );
};

export default ExamStartConfirmation;
