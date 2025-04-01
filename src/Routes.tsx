import { createBrowserRouter } from "react-router";
import App from "./App";
import Role from "./pages/Role";
import LeaderBoard from "./pages/LeaderBoard";
import Student from "./pages/Student";
import Question from "./pages/Question";
import Exam from "./pages/Exam";
import ExamStarter from "./pages/ExamStarter";
import axios from "axios";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/:slug",
        element: <ExamStarter />,
        loader:async({params})=>{
          const data=await axios.get(`https://mcq-test-server.vercel.app/api/exam/${params.slug}`)
          return data?.data?.data
        }
      },
      { path: "/leader-board",
       element: <LeaderBoard />
      },
      {
        path: "/student",
        element: <Student />,
      },
      {
        path: "/question",
        element: <Question />,
      },
      {
        path: "/exam",
        element: <Exam />,
      }
      
    ],
  },
  {
    path: "/role",
    element: <Role />,
  },
]);

export default routes;
