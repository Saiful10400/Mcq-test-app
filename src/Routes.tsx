import { createBrowserRouter } from "react-router";
import App from "./App";
import Role from "./pages/Role";
import LeaderBoard from "./pages/LeaderBoard";
import Student from "./pages/Student";
import Question from "./pages/Question";
import Exam from "./pages/Exam";
import ExamStarter from "./pages/ExamStarter";
import axios from "axios";
import AstudentAllExam from "./pages/AstudentAllExam";
import Ai from "./pages/Ai";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/:slug",
        element: <ExamStarter />,
        loader: async ({ params }) => {
          const data = await axios.get(
            `https://mcq-test-server.vercel.app/api/exam/${params.slug}`
          );
          return data?.data?.data;
        },
      },
      {
        path: "/leader-board",
        element: <LeaderBoard />,
        loader: async () => {
          const data = await axios.get(
            `https://mcq-test-server.vercel.app/api/result/leader-board-rank`
          );
          return data?.data?.data;
        },
      },
      {
        path: "/student/exam/:id",
        element: <AstudentAllExam />,
        loader: async ({ params }) => {
          const data = await axios.get(
            `https://mcq-test-server.vercel.app/api/result/aStudentAllResult/${params.id}`
          );
          return data?.data?.data;
        },
      },
      {
        path: "/student",
        element: <Student />,
      },
      {
        path: "/ai",
        element: <Ai />,
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
