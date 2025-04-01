import { useState } from "react";
import { tSingleQuestion } from "../pages/Question";

const QuestionCard = ({
  data,
  index,
  fn
}: {
  index: number;
  data: tSingleQuestion;
  fn:React.Dispatch<React.SetStateAction<{index:number,ans:string}[]>>
}) => {
  const options = ["A", "B", "C", "D"];

  // selected option text.
  const [selectedAns, setSelectedAns] = useState<string | null>(null);

  const ansSelecteHandle=(arg:string)=>{
    setSelectedAns(arg)
    fn(p=>{
        if(p.find(item=>item.index===index-1)){
            return p
        } else{
           return ([...p,{ans:arg,index:index-1}])
        }
    })
  }

  return (
    <div className="bg-gray-200 rounded-md p-3">
      <h1 className="font-semibold text-xl mb-4">
        {index}. {data.question}
      </h1>

      {/* options. */}

      <div className="flex flex-col gap-2">
        {data?.options?.map((item, idx) => {
          return (
            <button
              onClick={() => ansSelecteHandle(item)}
              className={`${
                selectedAns === item
                  ? " border-[#f66b30] bg-white "
                  : "border-transparent"
              } border-2 rounded-md p-1 flex items-center gap-2`}
            >
              <span
                className={`${
                  selectedAns === item
                    ? "bg-[#f66b30] text-white border-[#f66b30]"
                    : "border-black"
                } rounded-full border flex justify-center items-center  h-[20px] w-[20px]`}
              >
                {options[idx]}
              </span>
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
