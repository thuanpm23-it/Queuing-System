import React from "react";
import Img7 from "../../assets/images/notification.svg";
import { Link } from "react-router-dom";
import "../User/style.css";
import UserDataUtil from "../UserData";

const User = () => {
  const userData = UserDataUtil();

  return (
    <>
      <div className="notification__box">
        <img src={Img7} alt="Notification" />
        <div className="notificantion__main"></div>
      </div>
      <div className="ms-20">
        <Link to="/profile">
          {userData.userImg ? (
            <img
              src={userData.userImg}
              alt="Profile"
              className="profile__img__icon"
            />
          ) : (
            <div className="user__icon"></div>
          )}
        </Link>
      </div>
      <div className="ms-10">
        <span className="profile__text__1">Xin chào</span>
        <br />
        <Link to="/profile" className="link">
          <span className="profile__text__2">{userData.fullName}</span>
        </Link>
      </div>
    </>
  );
};

export default User;
