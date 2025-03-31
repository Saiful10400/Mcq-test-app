import { useNavigate } from "react-router";
import Button from "../Ui/Button";

const Role = () => {

    const move=useNavigate()

const makeTeacher=()=>{
localStorage.setItem("role","teacher")
move("/")
}

const removeTeacher=()=>{
localStorage.removeItem("role")
move("/")
}



  return (
    <div className=" p-4">
      <h1>Teacher mode:</h1>
      <div className="flex items-center justify-start gap-2 ml-3 mt-3">
        <Button fn={makeTeacher} type="primary" text="turn on" />
        <Button fn={removeTeacher} type="secondary" text="turn off" />
      </div>
    </div>
  );
};

export default Role;
