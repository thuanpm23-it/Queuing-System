import React from "react";
import { Col, Input, Row } from "antd";
import Img8 from "../../assets/images/profile__img.jpg";
import "../Profile/style.css";
import MenuPage from "../../layout/Menu";
import Header from "../../layout/Header";

const Profile = () => {
  return (
    <Row className="main__wrapper">
      <MenuPage />
      <Col span={20} className="main__bg">
        <Header />
        <Row>
          <div className="profile__main__box ms-30 d-flex content-center">
            <div className="text-center">
              <img src={Img8} alt="Profile" className="profile__img" />
              <p className="profile__name mt-15">Lê Quỳnh Ái Vân</p>
            </div>
            <div className="ms-20">
              <div className="profile__box">
                <label className="profile__label">Tên người dùng</label>
                <br />
                <Input
                  className="profile__input"
                  value="Lê Quỳnh Ái Vân"
                  disabled
                />
              </div>
              <div className="profile__box mt-20">
                <label className="profile__label">Số diện thoại</label>
                <br />
                <Input className="profile__input" value="0767375921" disabled />
              </div>
              <div className="profile__box mt-20">
                <label className="profile__label">Email</label>
                <br />
                <Input
                  className="profile__input"
                  value="adminSSO1@domain.com"
                  disabled
                />
              </div>
            </div>
            <div className="ms-20">
              <div className="profile__box">
                <label className="profile__label">Tên đăng nhập</label>
                <br />
                <Input
                  className="profile__input"
                  value="lequynhaivan01"
                  disabled
                />
              </div>
              <div className="profile__box mt-20">
                <label className="profile__label">Mật khẩu</label>
                <br />
                <Input className="profile__input" value="311940211" disabled />
              </div>
              <div className="profile__box mt-20">
                <label className="profile__label">Vai trò</label>
                <br />
                <Input className="profile__input" value="Kế toán" disabled />
              </div>
            </div>
          </div>
        </Row>
      </Col>
    </Row>
  );
};

export default Profile;
