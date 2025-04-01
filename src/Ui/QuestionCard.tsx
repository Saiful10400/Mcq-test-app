import { useContext, useState } from "react";
import { tSingleQuestion } from "../pages/Question";
import { appContext } from "../contextApi/context";

const QuestionCard = ({
  data,
  index,
  
}: {
  index: number;
  data: tSingleQuestion;
}) => {
  const options = ["A", "B", "C", "D"];

  // selected option text.
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const context=useContext(appContext)

  const ansSelecteHandle=(arg:string)=>{
    setSelectedAns(arg)
    context?.setExam(p=>{
        if(p.selectedAns.find(item=>item.index===index-1)){
       
          
          if(p.selectedAns.find(item=>item.ans===arg)){
            return p
          } else{
            return ({...p,selectedAns:[...(p.selectedAns.filter(item=>item.index!==index-1)),{index:index-1,ans:arg}]})
          }



          
          // if(p.selectedAns.find(item=>item.ans===arg)){
          //   return p
          // } else{
          //   return ({...p,selectedAns:p.selectedAns.filter(item=>item.index!==index-1).push({index:index,ans:arg})})
          // }



        } else{
           return ({...p,selectedAns:[...p.selectedAns,{ans:arg,index:index-1}]})
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
