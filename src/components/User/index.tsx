import React from "react";
import Img7 from "../../assets/images/notification.svg";
import Img8 from "../../assets/images/profile__img.jpg";

const User = () => {
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  return (
    <>
      <div className="notification__box">
        <img src={Img7} alt="Notification" />
      </div>
      <div className="ms-20">
        <img
          src={userData.userImg}
          alt="Profile"
          className="profile__img__icon"
        />
      </div>
      <div className="ms-10">
        <span className="profile__text__1">Xin chào</span>
        <br />
        <span className="profile__text__2">{userData.fullName}</span>
      </div>
    </>
  );
};

export default User;
