import React from "react";
import "./style.css";
import { DocumentData } from "firebase/firestore";
import { format } from "date-fns";
interface NotProps {
  not: DocumentData;
}

const Notification: React.FC<NotProps> = ({ not }) => {
  const formattedStartDate = format(new Date(not.startDate), "dd/MM/yyyy");
  return (
    <>
      <div className="not__main">
        <div className="not__title">Người dùng: {not.name}</div>
        <div className="not__t">
          Thời gian nhận số: {not.startTime} ngày {formattedStartDate}
        </div>
        <div
          className="border-line"
          style={{
            height: "2px",
            backgroundColor: "#D4D4D7",
            marginTop: "15px",
            width: "320px",
          }}
        ></div>
      </div>
    </>
  );
};

export default Notification;
