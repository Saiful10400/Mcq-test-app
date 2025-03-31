import { createBrowserRouter } from "react-router";
import App from "./App";
import Role from "./pages/Role";
import LeaderBoard from "./pages/LeaderBoard";
import Student from "./pages/Student";
import Question from "./pages/Question";
import Exam from "./pages/Exam";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
      },
    ],
  },
  {
    path: "/role",
    element: <Role />,
  },
]);

export default routes;
