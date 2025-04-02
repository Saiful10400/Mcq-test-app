import { useContext, useEffect } from "react";
import gif from "../assets/stop.gif";
import { appContext } from "../contextApi/context";

const TimeOutGif = () => {
  const context = useContext(appContext);



  useEffect(() => {
 
  
 if(!context?.exam.timeOut || !context?.examSubmitHandle) return
    const timeout = setTimeout(() => {
      context?.examSubmitHandle();
      
    }, 4000);
    return () => clearTimeout(timeout);

  }, [context]);

  return (
    <div className="h-[80vh] flex justify-center items-center flex-col gap-3">
      <h1 className="text-red-500 font-semibold text-xl">Your Time out !!</h1>
      <img className="w-[45%] rounded-md" src={gif} alt="" />
    </div>
  );
};

export default TimeOutGif;
