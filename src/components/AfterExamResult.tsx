import { tExamResult } from "../pages/ExamStarter";
import { tSingleQuestion } from "../pages/Question";
import ResultQuestionCard from "../Ui/ResultQuestionCard";

const AfterExamResult = ({ data }: { data: tExamResult }) => {
  return (
    <div className="px-2 pt-2">
      <div className="bg-[#e6632bef] rounded-md pt-3 text-white">
        <h1 className="text-center text-xl font-medium">Result summery</h1>
        <div className="px-12 py-4 mt-4">
          <h1 className="flex border-b border-gray-100 px-2 py-1 justify-between font-medium text-lg">
            Student Name:{" "}
            <span className="text-base">{data.exam.student.name}</span>
          </h1>
          <h1 className="flex border-b border-gray-100 px-2 py-1 justify-between font-medium text-lg">
            Class: <span className="text-base">{data.exam.student.class}</span>
          </h1>
          <h1 className="flex border-b border-gray-100 px-2 py-1 justify-between font-medium text-lg">
            Subject:{" "}
            <span className="text-base">
              {data.exam.questionPapper.subject}
            </span>
          </h1>
          <h1 className="flex  border-gray-100 px-2 py-1 justify-between font-medium text-lg">
            Topic:{" "}
            <span className="text-base">{data.exam.questionPapper.name}</span>
          </h1>

          <h1 className="flex border-t border-gray-100 px-2 py-1 justify-between font-medium text-lg mt-4">
            Total: <span className="text-base">{data.totalQuestion}</span>
          </h1>
          <h1 className="flex border-t border-gray-100 px-2 py-1 justify-between font-medium text-lg">
            Correct:{" "}
            <span className="text-base">
              {data.correctQuestionIndex.length}
            </span>
          </h1>
          <h1 className="flex border-t border-gray-100 px-2 py-1 justify-between font-medium text-lg">
            Incorrect:{" "}
            <span className="text-base">
              {data.incorrectQuestionIndex.length}
            </span>
          </h1>
        </div>
      </div>

      <h1 className="font-medium text-xl mt-4">Your selections</h1>

      <div className=" flex flex-col gap-3">
        {data?.exam.questionPapper.questions.map(
          (item: tSingleQuestion, index: number) => (
            <ResultQuestionCard
              selections={data.selectedAns}
              correctAns={data.correctQuestionIndex}
              question={item}
              index={index}
            />
          )
        )}
      </div>
    </div>
  );
};

export default AfterExamResult;
