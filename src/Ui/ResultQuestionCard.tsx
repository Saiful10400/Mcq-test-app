import { tSingleQuestion } from "../pages/Question";

const ResultQuestionCard = ({
  correctAns,
  question,
  index,
  selections,
}: {
  selections: { index: number; ans: string }[];
  correctAns: { index: number; ans: string }[];
  question: tSingleQuestion;
  index: number;
}) => {
  const isCorrect: { index: number; ans: string } | undefined = correctAns.find(
    (item) => item.index === index
  );

  const options = ["A", "B", "C", "D"];
  return (
    <div
      className={`${isCorrect ? "bg-green-300" : "bg-red-300"} rounded-md p-3`}
    >
      <h1 className="font-semibold text-xl mb-4">
        {index + 1}. {question.question}
      </h1>

      {/* options. */}

      <div className="flex flex-col gap-2">
        {question?.options?.map((item, idx) => {
          return (
            <div
              className={`${
                isCorrect && selections.find((sitem) => sitem.ans === item && sitem.index===index)
                  ? " border-white bg-green-700 text-white font-semibold "
                  : !isCorrect && selections.find((sitem) => sitem.ans === item && sitem.index===index)
                  ? " border-white bg-red-700 text-white font-semibold "
                  :!isCorrect && item===question.correctAns
                  ? " border-white bg-green-700 text-white font-semibold "
                  : "border-transparent"
              } border-2 rounded-md  p-1 flex items-center gap-2`}
            >
              <span
                className={`${
                  options
                    ? "bg-[#f66b30] text-white border-[#f66b30]"
                    : "border-black"
                } rounded-full border flex justify-center items-center  h-[20px] w-[20px]`}
              >
                {options[idx]}
              </span>
              {item}
            </div>
          );
        })}
      </div>

<div className="mt-5 bg-white rounded-md p-1">
    <h1 className="font-semibold text-lg mb-1 text-[#f66b30]">explanation:</h1>
    <p>{question.explanation}</p>
</div>


    </div>
  );
};

export default ResultQuestionCard;
