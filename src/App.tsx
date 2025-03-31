import { Outlet } from "react-router";
import Nav from "./components/Nav";

 

const App = () => {
  return (
    <div className=" bg-gray-500 min-h-screen flex flex-col justify-between">
      <div className="min-h-[80vh]"><Outlet/></div>
      <div><Nav/></div>
    </div>
  );
};

export default App;