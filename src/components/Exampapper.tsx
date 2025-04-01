import { useState } from "react";
import { tExam } from "../pages/Exam";
import { tSingleQuestion } from "../pages/Question";

import QuestionCard from "../Ui/QuestionCard";

const Exampapper = ({ data }: { data: tExam }) => {

const[selectedAnswers,setSelectedAnswers]=useState<{index:number,ans:string}[]>([])


console.log(selectedAnswers)

  return (
    <div className="flex flex-col gap-2 px-2">
      {data?.questionPapper?.questions?.map(
        (item: tSingleQuestion, index: number) => (
          <QuestionCard fn={setSelectedAnswers} key={item._id} index={++index} data={item} />
        )
      )}
    </div>
  );
};

export default Exampapper;
