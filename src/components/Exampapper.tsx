import { useContext, useEffect, useState } from "react";
import { tExam } from "../pages/Exam";
import { tSingleQuestion } from "../pages/Question";

import QuestionCard from "../Ui/QuestionCard";
import { appContext } from "../contextApi/context";
import TimeOutGif from "../Ui/TimeOutGif";

const Exampapper = ({ data }: { data: tExam }) => {
  const context = useContext(appContext);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue =
        "সতর্কতা!! সতর্কতা!! সতর্কতা!!  তুমি এই পেজ থেকে বের হয়ে গেলে যে গুলো দাগিয়েছ সেগুলর উপর ভিত্তি করে ফলাফল গননা করা হবে।";
      context?.examSubmitHandle();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    if (context?.exam.isSubmited)
      window.removeEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [context]);

  const [submitDisable, setSubmitDisable] = useState<boolean>(false);

  if (context?.exam.timeOut) {
    return <TimeOutGif />;
  } else {
    const buttonSubmithandle = () => {
      let timerId: ReturnType<typeof setTimeout>;

      return () => {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(() => {
          setSubmitDisable(true);
          context?.examSubmitHandle();
        }, 800);
      };
    };

    return (
      <div className="flex flex-col gap-2 px-2">
        {data?.questionPapper?.questions?.map(
          (item: tSingleQuestion, index: number) => (
            <QuestionCard key={item._id} index={++index} data={item} />
          )
        )}

        <button
          disabled={submitDisable}
          onClick={buttonSubmithandle()}
          className="bg-[#f66b30] text-white font-semibold rounded-md text-xl py-2 px-2"
        >
          {submitDisable ? "একটু অপেক্ষা করো" : "জমা দাও"}
        </button>
      </div>
    );
  }
};

export default Exampapper;
