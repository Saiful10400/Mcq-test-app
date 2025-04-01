import { FlaskConical, ScrollText, Trophy, User } from "lucide-react";
import { NavLink } from "react-router";
import "./index.css";
import { useContext, useEffect, useState } from "react";
import { appContext } from "../contextApi/context";
import timeFormate from "../utils/timeFormate";

const Nav = () => {
  const teacherRoutes = (
    <>
      <NavLink
        className={`${({ isActive }: { isActive: boolean }) =>
          isActive ? "active" : ""} flex items-center flex-col `}
        to={"/student"}
      >
        <div className="icon border p-2 rounded-full">
          <User height={22} width={22} />
        </div>
        <span className="text-sm font-thin">Student</span>
      </NavLink>

      <NavLink
        className={`${({ isActive }: { isActive: boolean }) =>
          isActive ? "active" : ""} flex items-center flex-col `}
        to={"/question"}
      >
        <div className="icon border p-2 rounded-full">
          <ScrollText height={22} width={22} />
        </div>
        <span className="text-sm font-thin">Questions</span>
      </NavLink>

      <NavLink
        className={`${({ isActive }: { isActive: boolean }) =>
          isActive ? "active" : ""} flex items-center flex-col `}
        to={"/exam"}
      >
        <div className="icon border p-2 rounded-full">
          <FlaskConical height={22} width={22} />
        </div>
        <span className="text-sm font-thin">Exam</span>
      </NavLink>
    </>
  );

  const context = useContext(appContext);

  // timer.
  const [timeLeft, setTimeLeft] = useState<null | number>(null);

  useEffect(() => {
    if (context?.exam.examDuration) setTimeLeft(context.exam.examDuration * 60);
  }, [context?.exam.examDuration]);

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      context?.setExam((p) => ({ ...p, timeOut: true }));
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev as number) - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft,context]);

  // ui.

  if (context?.exam.start) {
    return (
      <div className="bg-white rounded-t-xl flex justify-between px-3 items-end  pt-3 fixed bottom-0 left-0 w-full">
        <h1 className="text-base font-semibold">
          Time remaining: <span>{timeFormate(timeLeft as number)}</span>
        </h1>
        <h1 className="text-base font-semibold">
          Question remaining:{" "}
          <span>
            {context?.exam?.totalQuestion
              ? context?.exam?.totalQuestion - context.exam?.selectedAns?.length
              : 0}
          </span>
        </h1>
      </div>
    );
  }

  //

  return (
    <div className="bg-white rounded-t-xl flex justify-evenly items-end  pt-3 ">
      {/* show only this route to the student. */}
      <NavLink
        className={`${({ isActive }: { isActive: boolean }) =>
          isActive ? "active" : ""} flex items-center flex-col `}
        to={"/leader-board"}
      >
        <div className="icon border p-2 rounded-full">
          <Trophy height={22} width={22} />
        </div>
        <span className="text-sm font-thin">Leaderboard</span>
      </NavLink>

      {/* show only to the teacher. */}
      {localStorage.getItem("role") === "teacher" && teacherRoutes}
    </div>
  );
};

export default Nav;
