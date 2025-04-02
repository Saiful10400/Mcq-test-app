import { Outlet } from "react-router";
import Nav from "./components/Nav";

 

const App = () => {
  return (
    <div className=" bg-gray-100 min-h-screen flex flex-col justify-between">
      <div className="min-h-[80vh] mb-24"><Outlet/></div>
      <div className="fixed bottom-0 w-full"><Nav/></div>
    </div>
  );
};

export default App;