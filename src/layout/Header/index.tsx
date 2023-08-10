import React from "react";
import { Col } from "antd";
import "../Header/style.css";
import Img7 from "../../assets/images/notification.svg";
import Img8 from "../../assets/images/profile__img.jpg";

const Header = () => {
  return (
    <Col span={24} className="top__wrapper d-flex">
      <div className="readcrumb">Thông tin cá nhân</div>
      <div className="d-flex items-center">
        <div className="notification__box">
          <img src={Img7} alt="Notification" />
        </div>
        <div className="ms-20">
          <img src={Img8} alt="Profile" className="profile__img__icon" />
        </div>
        <div className="ms-10">
          <span className="profile__text__1">Xin chào</span>
          <br />
          <span className="profile__text__2">Lê Quỳnh Ái Vân</span>
        </div>
      </div>
    </Col>
  );
};

export default Header;
