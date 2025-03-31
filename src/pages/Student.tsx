import { FormEvent, useEffect, useState } from "react";
import Button from "../Ui/Button";
import axios from "axios";

export type tStudent = {
  _id: string;
  name: string;
  class: number;
  gender: "male" | "female" | "other";
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

const Student = () => {
  const [allStudent, setAllStudent] = useState<tStudent[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/auth")
      .then((res) => setAllStudent(res.data?.data));
  }, [refetch]);

  const formHandle = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement; // Explicitly cast to HTMLFormElement
  const name = (form.elements.namedItem("name") as HTMLInputElement)?.value;
  const Class = (form.elements.namedItem("class") as HTMLInputElement)?.value;
  const gender = (form.elements.namedItem("gender") as HTMLInputElement)?.value;

axios.post("http://localhost:8000/api/auth/create-student",{name,class:Number(Class),gender}).then(res=>{
  if(res.data?.statusCode===200){
    alert("New student created.")
    setRefetch(p=>!p)
  }
})
  };

  return (
    <div className="px-2">
      <form onSubmit={formHandle}>
        <h1 className="text-2xl">Create a Student</h1>
        <div className="mt-2 ml-3 px-3 flex flex-col gap-1">
          <input name="name"
            className="w-full border-black border text-lg py-1 pl-2 rounded-md"
            type="text"
            placeholder="Student Name"
          />
          <input name="class"
            className="w-full border-black border text-lg py-1 pl-2 rounded-md"
            type="text"
            placeholder="Student className"
          />
          <select defaultValue={"female"} name="gender" className="w-full border-black border text-lg py-1 pl-2 rounded-md">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <Button text="Create" type="primary" />
        </div>
      </form>

      <h1 className="text-2xl mt-5">All Students</h1>

      <table className="w-full border-collapse border border-gray-300 mt-3">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left border">Name</th>
            <th className="py-3 px-6 text-left border">Class</th>
            <th className="py-3 px-6 text-center border">Gender</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {allStudent?.map((item: tStudent) => {
            return (
              <tr key={item._id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6 text-left border">{item.name}</td>
                <td className="py-3 px-6 text-left border">{item.class}</td>
                <td className="py-3 px-6 text-center border">
                  <span className="bg-green-200 text-green-700 py-1 px-3 rounded-full text-xs">
                    {item.gender}
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

export default Student;
