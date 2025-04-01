import   { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../Ui/Button";
import axios from "axios";
import * as z from "zod";


export type tSingleQuestion = {
    _id: string;
    question: string;
    options: string[];
    correctAns: string;
    explaination?: string; // Optional field
  };
  
 export type tQuestion = {
    _id: string;
    name: string;
    class: number;
    subject: string;
    questions: tSingleQuestion[];
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string
    __v: number;
  };
  
 
const Question = () => {
  const [allQuestion, setAllQuestion] = useState<tQuestion[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);
 
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/question-papper/all-questionPappers")
      .then((res) => setAllQuestion(res.data?.data));
  }, [refetch]);
 
  const schema = z.array(
    z.object({
      question: z.string().min(1, "Question is required"), // Ensure non-empty question
      options: z.array(z.string()).length(4, "Exactly 4 options are required"), // Ensure 4 options
      correctAns: z.string().min(1, "Correct answer is required"), // Ensure correct answer exists
      explaination: z.string().optional(), // Make explanation optional
    })
  );

  const [errors, setErrors] = useState<string | null>(null);
  const [valid, setValid] = useState<string | null>(null);
  const textareaOnChangeHandle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValid(null);

    try {
      const jsonInput = JSON.parse(e.currentTarget.value);
      schema.parse(jsonInput); // Validate against schema
      setErrors(null); // No errors, validation passed
      setValid("valid");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.errors.map((e) => e.message).join(", ")); // Show validation errors
      } else {
        setErrors("Invalid JSON format");
      }
    }
  };

  const formHandle = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement; // Explicitly cast to HTMLFormElement
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value;
    const Class = (form.elements.namedItem("class") as HTMLInputElement)?.value;
    const subject = (form.elements.namedItem("subject") as HTMLInputElement)?.value;
     const questions=JSON.parse((form.elements.namedItem("questions") as HTMLInputElement)?.value)

    axios
      .post("http://localhost:8000/api/question-papper/create-one", {
        name,
        class: Number(Class),
        subject,
        questions
      })
      .then((res) => {
        if (res.data?.statusCode === 200) {
          alert("New Question created.");
          setRefetch((p) => !p);
        }
      });
  };

  return (
    <div className="px-2">
      <form onSubmit={formHandle}>
        <h1 className="text-2xl">Create a Question</h1>
        <div className="mt-2 ml-3 px-3 flex flex-col gap-1">
          <input
            name="name"
            className="w-full border-black border text-lg py-1 pl-2 rounded-md"
            type="text"
            placeholder="Question papper Name"
          />
          <input
            name="class"
            className="w-full border-black border text-lg py-1 pl-2 rounded-md"
            type="number"
            placeholder="For which Class?"
          />
          <input
            name="subject"
            className="w-full border-black border text-lg py-1 pl-2 rounded-md"
            type="text"
            placeholder="From which subject"
          />
          <h1 className="font-semibold text-red-600">{errors}</h1>
          <textarea 
            onChange={textareaOnChangeHandle}
            className={
              valid === "valid"
                ? "border-2 border-green-500 p-2 outline-green-500 rounded-md"
                : "border-2 p-2 border-black rounded-md"
            }
            rows={3}
            name="questions"
            placeholder="Past all the question according schema."
          ></textarea>

          <Button active={errors ? false : true} text="Create" type="primary" />
        </div>
      </form>

      <h1 className="text-2xl mt-5">All Questions</h1>

      <table className="w-full border-collapse border border-gray-300 mt-3">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left border">Name</th>
            <th className="py-3 px-6 text-left border">Class</th>
            <th className="py-3 px-6 text-center border">Subject</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {allQuestion?.map((item: tQuestion) => {
            return (
              <tr key={item._id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6 text-left border">{item.name}</td>
                <td className="py-3 px-6 text-left border">{item.class}</td>
                <td className="py-3 px-6 text-center border">
                  <span className="bg-green-200 text-green-700 py-1 px-3 rounded-full text-xs">
                    {item.subject}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Question;
