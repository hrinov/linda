import { FC } from "react";
import "./index.sass";
import Logout from "./../../../../assets/icons/logout.svg?react";

export const Header: FC<HeaderProps> = ({ rows, setRows }) => {
  return (
    <header>
      <div className="logout-btn">
        <Logout />
      </div>
      <div className="switchers-holder">
        <div
          className={rows == 3 ? "active" : ""}
          onClick={() => rows !== 3 && setRows(3)}
        >
          |||
        </div>
        <div
          className={rows == 5 ? "active" : ""}
          onClick={() => rows !== 5 && setRows(5)}
        >
          |||||
        </div>
      </div>
      <div />
    </header>
  );
};
