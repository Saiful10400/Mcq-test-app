import { tExamResult } from "../pages/ExamStarter";
import { tSingleQuestion } from "../pages/Question";
import ResultQuestionCard from "../Ui/ResultQuestionCard";
import dateFormate from "../utils/dateFormate";

const AfterExamResult = ({ data }: { data: tExamResult }) => {
  const questionNotConducted =
    -(
      data.totalQuestion -
      (data.correctQuestionIndex.length + data.incorrectQuestionIndex.length)
    ) / 10;
  const correctAns = data.correctQuestionIndex.length * 1;
  const incorrectAnswers = -data.incorrectQuestionIndex.length * 0.25;

  const result = (incorrectAnswers + correctAns + questionNotConducted).toFixed(
    2
  );

  return (
    <div className="px-2 pt-2">
      <div className="bg-[#e6632bef] rounded-md pt-3 text-white">
        <h1 className="text-center text-xl font-medium">ফলাফল বিবরনি</h1>
        <div className="px-12 py-4 mt-4">
          <h1 className="flex border-b border-gray-100 px-2 py-1 justify-between font-medium text-lg">
            ফলাফল প্রকাশ:{" "}
            <span className="text-base">
              {dateFormate(data.createdAt as string)}
            </span>
          </h1>
          <h1 className="flex border-b border-gray-100 px-2 py-1 justify-between font-medium text-lg">
            পরীক্ষার্থীর নাম:{" "}
            <span className="text-base">{data?.exam?.student?.name}</span>
          </h1>
          <h1 className="flex border-b border-gray-100 px-2 py-1 justify-between font-medium text-lg">
            শ্রেনী:{" "}
            <span className="text-base">{data?.exam?.student?.class}</span>
          </h1>
          <h1 className="flex border-b border-gray-100 px-2 py-1 justify-between font-medium text-lg">
            বিষয়:{" "}
            <span className="text-base">
              {data?.exam?.questionPapper?.subject}
            </span>
          </h1>
          <h1 className="flex  border-gray-100 px-2 py-1 justify-between font-medium text-lg">
            অধ্যায়:{" "}
            <span className="text-base">
              {data?.exam?.questionPapper?.name}
            </span>
          </h1>

          <h1 className="flex border-t border-gray-100 px-2 py-1 justify-between font-medium text-lg mt-4">
            মোট প্রশ্ন:{" "}
            <span className="text-base">{data?.totalQuestion} টি</span>
          </h1>
          <h1 className="flex border-t border-gray-100 px-2 py-1 justify-between font-medium text-lg">
            সঠিক :{" "}
            <span className="text-base">
              {data?.correctQuestionIndex?.length} টি
            </span>
          </h1>
          <h1 className="flex border-t border-gray-100 px-2 py-1 justify-between font-medium text-lg">
            ভুল:{" "}
            <span className="text-base">
              {data?.incorrectQuestionIndex?.length} টি
            </span>
          </h1>
          <h1 className="flex border-t border-gray-100 px-2 py-1 justify-between font-medium text-lg">
            এড়িয়ে গেছো:{" "}
            <span className="text-base">
              {data?.totalQuestion -
                (data?.incorrectQuestionIndex?.length +
                  data?.correctQuestionIndex?.length)}{" "}
              টি
            </span>
          </h1>

          <h1 className="flex border-t border-gray-100 px-2 py-1 justify-between font-medium text-lg">
            ফলাফল:{" "}
            <span className="text-base">
              {result} / {data.totalQuestion}
            </span>
          </h1>
        </div>
      </div>

      <h1 className="font-medium text-xl mt-8 mb-4 text-center ">
        তোমার উত্তর পত্র :
      </h1>

      <div className=" flex flex-col gap-3">
        {data?.exam?.questionPapper?.questions.map(
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

      <div className="bg-[#e6632bef] text-white rounded-md shadow-lg p-5   mt-6">
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
          <span className="font-medium text-sm">
            প্রতি ১০ টি প্রশ্ন এড়িয়ে গেলে
          </span>
          <span>-1</span>
        </h1>
      </div>
    </div>
  );
};

export default AfterExamResult;
