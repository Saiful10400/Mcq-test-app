import { FlaskConical, ScrollText, Trophy, User } from "lucide-react";
import { NavLink } from "react-router";
import "./index.css";

const Nav = () => {
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
        to={"/question"}
      >
        <div className="icon border p-2 rounded-full">
          <FlaskConical height={22} width={22} />
        </div>
        <span className="text-sm font-thin">Exam</span>
      </NavLink>
    </div>
  );
};

export default Nav;
