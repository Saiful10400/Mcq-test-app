import { useContext, useEffect } from "react";
import { tExam } from "../pages/Exam";
import { tSingleQuestion } from "../pages/Question";
import Button from "../Ui/Button";

import QuestionCard from "../Ui/QuestionCard";
import { appContext } from "../contextApi/context";
import TimeOutGif from "../Ui/TimeOutGif";

const Exampapper = ({ data }: { data: tExam }) => {
  const context = useContext(appContext);


  useEffect(() => {
    const handleBeforeUnload = (event:BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "সতর্কতা!! সতর্কতা!! সতর্কতা!!  তুমি এই পেজ থেকে বের হয়ে গেলে যে গুলো দাগিয়েছ সেগুলর উপর ভিত্তি করে ফলাফল গননা করা হবে।";
      context?.examSubmitHandle()
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

if(context?.exam.isSubmited) window.removeEventListener("beforeunload", handleBeforeUnload);


    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [context]);







  if (context?.exam.timeOut) {
    return <TimeOutGif/>
  } else {
    return (
      <div className="flex flex-col gap-2 px-2">
        {data?.questionPapper?.questions?.map(
          (item: tSingleQuestion, index: number) => (
            <QuestionCard key={item._id} index={++index} data={item} />
          )
        )}

        <Button
          fn={context?.examSubmitHandle}
          active
          text="জমা দাও"
          type="primary"
        />
      </div>
    );
  }
};

export default Exampapper;
