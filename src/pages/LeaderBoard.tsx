import { useLoaderData } from "react-router";
import crownImg from "../assets/crown.png";
type Student = {
  _id: string;
  name: string;
  image: string;
  class: number;
  gender: "male" | "female";
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type tRank = {
  totalExam: number;
  TotalMark: number;
  student: Student;
};

const LeaderBoard = () => {
  const loaderData: tRank[] | null = useLoaderData();

  let data = loaderData?.sort((a, b) => {
    if (Number(a.TotalMark) > Number(b.TotalMark)) return -1;
    else if (Number(a.TotalMark) < Number(b.TotalMark)) return 1;
    else return 0;
  });

  if (data === undefined) data = loaderData as tRank[];



if(data.length==0){
  return <div><h1>No one still participate any exam.</h1></div>
}


 


  return (
    <div>
      {/* top 3 rank photos. */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 py-4 pt-1 min-h-[50vh] rounded-b-3xl">
        {/* <h1 className="text-center font-medium py-4 text-xl text-white italic">
          Leader board
        </h1> */}

        {/* top 2photos divs. */}

        <div className="mt-[190px] flex justify-center scale-95 gap-5">
          {/* 2 */}
          {data.length >= 2 && (
            <div className="flex flex-col justify-center items-center relative">
              <div className=" absolute -top-[10px] flex flex-col justify-center items-center">
                <span className="text-white font-semibold italic text-2xl">
                  #2
                </span>
              </div>
              <img
                className="w-[80px] h-[80px] border-2 border-white object-cover rounded-full"
                src={data[1].student.image}
                alt=""
              />
              <h1 className="text-white text-center font-normal text-lg mt-2">
                {data[1].student.name}
              </h1>
              <h1 className=" text-center text-2xl text-white font-bold italic  mt-1 ">
                {data[1].TotalMark} <span className="text-sm">({data[1].totalExam})</span>
              </h1>
            </div>
          )}

          {/* 1 */}
          <div className="flex flex-col bottom-[80px] justify-center items-center relative">
            <div className=" absolute  -top-[110px] flex flex-col justify-center items-center">
              <span className="text-white font-semibold italic text-2xl">
                #1
              </span>
              <img className="w-[110px]" src={crownImg} alt="" />
            </div>
            <img
              className="w-[150px] h-[150px] border-2 border-white  object-cover rounded-full"
              src={data[0].student.image}
              alt=""
            />
            <h1 className="text-white text-center font-normal text-lg mt-2">
              {data[0].student.name}
            </h1>
            <h1 className=" text-center text-3xl text-white font-bold italic  mt-1 ">
              {data[0].TotalMark} <span className="text-sm">({data[0].totalExam})</span>
            </h1>
          </div>

          {/* 3 */}
          {data.length >= 3 && (
            <div className="flex flex-col justify-center items-center relative">
              <div className=" absolute -top-[10px] flex flex-col justify-center items-center">
                <span className="text-white font-semibold italic text-2xl">
                  #3
                </span>
              </div>
              <img
                className="w-[80px] h-[80px] border-2 border-white object-cover rounded-full"
                src={data[2].student.image}
                alt=""
              />
              <h1 className="text-white text-center font-normal text-lg mt-2">
                {data[2].student.name}
              </h1>
              <h1 className=" text-center text-2xl text-white font-bold italic  mt-1 ">
                {data[2].TotalMark} <span className="text-sm">({data[2].totalExam})</span>
              </h1>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4 px-2">
        {data.slice(3)?.map((item, idx) => {
          return (
            <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex justify-between items-center">
              <span className="text-xl font-bold italic text-white">
                #{idx + 4}
              </span>
              <img
                className="w-[50px] h-[50px] border border-white rounded-full object-cover"
                src={item.student.image}
                alt=""
              />
              <span className="text-base font-medium  text-white min-w-[60%]">
                {item.student.name}
              </span>
              <span className="text-xl font-bold italic text-white">
                {item.TotalMark} <span className="text-sm">({item.totalExam})</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderBoard;
