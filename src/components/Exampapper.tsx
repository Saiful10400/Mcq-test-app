import { useContext } from "react";
import { tExam } from "../pages/Exam";
import { tSingleQuestion } from "../pages/Question";
import Button from "../Ui/Button";

import QuestionCard from "../Ui/QuestionCard";
import { appContext } from "../contextApi/context";
import TimeOutGif from "../Ui/TimeOutGif";

const Exampapper = ({ data }: { data: tExam }) => {
  const context = useContext(appContext);

  if (context?.exam.timeOut) {
    return <TimeOutGif />;
  } else {
    return (
      <div className="flex flex-col gap-2 px-2 mb-20">
        {data?.questionPapper?.questions?.map(
          (item: tSingleQuestion, index: number) => (
            <QuestionCard key={item._id} index={++index} data={item} />
          )
        )}

        <Button
          fn={context?.examSubmitHandle}
          active
          text="Submit"
          type="primary"
        />
      </div>
    );
  }
};

export default Exampapper;
