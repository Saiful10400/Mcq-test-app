import { useContext } from "react";
import { tExam } from "../pages/Exam";
import Button from "../Ui/Button";
import { appContext } from "../contextApi/context";
import { tStarExamContext } from "../contextApi/AppContext";

const ExamStartConfirmation = ({ data }: { data: tExam | null }) => {
  const context = useContext(appContext);

  const startExamHandle = () => {
    if (data?.time)
      context?.setExam((p: tStarExamContext) => ({
        ...p,
        start: true,
        examDuration: data?.time,
        totalQuestion: data?.questionPapper?.questions?.length,
        examSlug: data?.slug,
      }));
  };

  return (
    <div>
    <div className="bg-gray-200 rounded-md shadow-lg p-5 w-[80vw]">
      <h1 className="flex border-b border-gray-100 py-1 justify-between items-center">
        <span className="font-normal">পরীক্ষার্থীর নাম:</span>
        <span className="font-medium text-sm">{data?.student?.name}</span>
      </h1>
      <h1 className="flex border-b border-gray-100 py-1 justify-between items-center">
        <span className="font-normal">শ্রেণি:</span>
        <span className="font-medium text-sm">{data?.student?.class}</span>
      </h1>
      <h1 className="flex border-b border-gray-100 py-1 justify-between items-center">
        <span className="font-normal">বিষয়:</span>
        <span className="font-medium text-sm">{data?.questionPapper?.subject}</span>
      </h1>
      <h1 className="flex border-b border-gray-100 py-1 justify-between items-center">
        <span className="font-normal">অধ্যায়:</span>
        <span className="font-medium text-sm">{data?.questionPapper?.name}</span>
      </h1>
      <h1 className="flex border-b border-gray-100 py-1 justify-between items-center">
        <span className="font-normal">মোট প্রশ্ন:</span>
        <span className="font-medium text-sm">{data?.questionPapper?.questions?.length} টি</span>
      </h1>
      <h1 className="flex border-b border-gray-100 py-1 justify-between items-center">
        <span className="font-normal">মোট সময়:</span>
        <span className="font-medium text-sm">{data?.time} মিনিট</span>
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
      <h1 className="text-red-500 mt-4 font-medium">
        সতর্কতা :-   "Start Exam" বাটনে চাপ দিলে পরীক্ষা শুরু হয়ে যাবে, সকল প্রকার প্রস্তুতি নিয়ে পরিক্ষা শুরু করবে।
      </h1>
    </div>


    <div className="bg-gray-200 rounded-md shadow-lg p-5   mt-6">
    
    <h1 className="text-center font-semibold text-lg">মান বণ্টন</h1>


      <h1 className="flex border-b border-gray-100 py-1 mt-6 justify-between items-center">
        <span className="font-medium text-sm">প্রতিটি সঠিক উত্তর:</span>
        <span>+1</span>
      </h1>

      <h1 className="flex border-b border-gray-100 py-1 justify-between items-center">
        <span className="font-medium text-sm">প্রতি ৪ টি ভুল উত্তর</span>
        <span>-1</span>
      </h1>

      <h1 className="flex border-b border-gray-100 py-1 justify-between items-center">
        <span className="font-medium text-sm">প্রতি ১০ টি প্রশ্ন এড়িয়ে গেলে</span>
        <span>-1</span>
      </h1>
     
      


    </div>
    </div>
  );
};

export default ExamStartConfirmation;
