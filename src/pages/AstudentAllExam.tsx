import { Link, useLoaderData } from "react-router";

type tStudentExams = {
  _id: {
    name: string;
    image: string;
    class: number;
  };
  exams: {
    result: number;
    routeSlug: string;
  }[];
};

const AstudentAllExam = () => {
  const dataArray = useLoaderData<tStudentExams[]>();

  const data: tStudentExams = dataArray[0];

  return (
    <div>
      <div className="bg-gradient-to-r from-red-500 to-orange-500 py-4 pt-6 min-h-[20vh] rounded-b-3xl">
        {/* <h1 className="text-center font-medium py-4 text-xl text-white italic">
          Leader board
        </h1> */}

        <div className="flex flex-col justify-center items-center ">
          <img
            className="w-[150px] h-[150px] border-2 border-white  object-cover rounded-full"
            src={data._id.image}
            alt=""
          />
          <h1 className="text-white text-center font-normal text-lg mt-2">
            {data._id.name}
          </h1>
          <h1 className=" text-center text-3xl text-white font-bold italic  mt-1 ">
            Class {data._id.class}
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4 px-2">
        {data.exams?.map((item, idx) => {
          return (
            <Link
              to={`/${item.routeSlug}`}
              className="px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex justify-between items-center"
            >
              <span className="text-xl font-bold italic text-white">
                Exam-{idx + 1}
              </span>

              <span className="text-xl font-bold italic text-white">
                <span className="text-sm">({item.result})</span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AstudentAllExam;
