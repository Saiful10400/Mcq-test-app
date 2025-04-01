import { FormEvent, useEffect, useState } from "react";
import Button from "../Ui/Button";
import axios from "axios";
import { tQuestion } from "./Question";
import { Link2 } from "lucide-react";
import dateFormate from "../utils/dateFormate";

export type tStudent = {
  _id: string;
  name: string;
  class: number;
  gender: "male" | "female" | "other";
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type tExam = {
  slug: string;
  student: tStudent;
  questionPapper: tQuestion;
  result: string;
  time: number;
  createdAt: string;
};

const Exam = () => {
  const [allStudent, setAllStudent] = useState<tStudent[]>([]);
  const [allQuestion, setAllQuestion] = useState<tQuestion[]>([]);
  const [allExam, setAllExam] = useState<tExam[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/auth")
      .then((res) => setAllStudent(res.data?.data));
    axios
      .get("http://localhost:8000/api/question-papper/all-questionPappers")
      .then((res) => setAllQuestion(res.data?.data));
    axios
      .get("http://localhost:8000/api/exam")
      .then((res) => setAllExam(res.data?.data));
  }, [refetch]);

  const formHandle = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement; // Explicitly cast to HTMLFormElement
    const student = (form.elements.namedItem("student") as HTMLInputElement)
      ?.value;
    const questionPapper = (
      form.elements.namedItem("questionPapper") as HTMLInputElement
    )?.value;
    const time = (form.elements.namedItem("time") as HTMLInputElement)?.value;

    axios
      .post("http://localhost:8000/api/exam/create-one", {
        student,
        time: Number(time),
        questionPapper,
      })
      .then((res) => {
        if (res.data?.statusCode === 200) {
          alert("New exam created.");
          setRefetch((p) => !p);
        }
      });
  };

  return (
    <div className="px-2">
      <form onSubmit={formHandle}>
        <h1 className="text-2xl">Create a Exam</h1>
        <div className="mt-2 ml-3 px-3 flex flex-col gap-1">
          <input
            name="time"
            className="w-full border-black border text-lg py-1 pl-2 rounded-md"
            type="number"
            placeholder="Time"
          />
          <select
            defaultValue={""}
            name="student"
            className="w-full border-black border text-lg py-1 pl-2 rounded-md"
          >
            <option hidden value="">
              Select student
            </option>

            {allStudent?.map((item: tStudent) => (
              <option value={item._id}>
                {item.name}(c-{item.class})
              </option>
            ))}
          </select>
          <select
            defaultValue={""}
            name="questionPapper"
            className="w-full border-black border text-lg py-1 pl-2 rounded-md"
          >
            <option hidden value="">
              Select question paper
            </option>

            {allQuestion?.map((item: tQuestion) => (
              <option value={item._id}>
                {item.name}(s-{item.subject})(c-{item.class})(tq-{item.questions.length})
              </option>
            ))}
          </select>

          <Button active={true} text="Create" type="primary" />
        </div>
      </form>

      <h1 className="text-2xl mt-5">All Exams</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 mt-3">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left border">Link</th>
              <th className="py-3 px-6 text-left border">Date</th>
              <th className="py-3 px-6 text-left border">Student</th>
              <th className="py-3 px-6 text-center border">Class</th>
              <th className="py-3 px-6 text-center border">Subject</th>
              <th className="py-3 px-6 text-left border">Question</th>
              <th className="py-3 px-6 text-left border">Total mcq</th>
              <th className="py-3 px-6 text-left border">Duration</th>
              <th className="py-3 px-6 text-left border">Result</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {allExam?.map((item: tExam) => {
              // link copy handle.
              const linkCopyHandle = async () => {
                try {
                  await navigator.clipboard.writeText(
                    `http://localhost:5173/${item.slug}`
                  );
                  alert("Link copyed");
                } catch (err) {
                  alert("Failed to copy:" + err);
                }
              };

              return (
                <tr key={item.slug} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6 text-left border">
                    <button onClick={linkCopyHandle}>
                      <Link2 />
                    </button>
                  </td>
                  <td className="py-3 px-6 text-left border">
                    {dateFormate(item.createdAt)}
                  </td>
                  <td className="py-3 px-6 text-left border">
                    {item?.student?.name}
                  </td>
                  <td className="py-3 px-6 text-left border">
                    {item?.questionPapper?.class}
                  </td>
                  <td className="py-3 px-6 text-left border">
                    {item?.questionPapper?.subject}
                  </td>
                  <td className="py-3 px-6 text-left border">
                    {item?.questionPapper?.name}
                  </td>
                  <td className="py-3 px-6 text-left border">
                    {item?.questionPapper?.questions?.length}
                  </td>
                  <td className="py-3 px-6 text-left border">
                    {item?.time} minuts
                  </td>
                  <td className="py-3 px-6 text-center border">
                    <span className="bg-green-200 text-green-700 py-1 px-3 text-xs">
                      {item.result}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Exam;
