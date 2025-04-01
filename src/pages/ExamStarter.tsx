import { useLoaderData } from "react-router";
import { tExam } from "./Exam";

 

const ExamStarter = () => {

    const data:tExam|null=useLoaderData()
   


    return (
        <div>
            start exam
        </div>
    );
};

export default ExamStarter;