import React from "react";
import "../Login/style.css";
import AltaLogo from "../../../assets/images/Logo alta.png";
import GroupImg from "../../../assets/images/Group 341.png";
import { Input, Row, Col } from "antd";

const Login = () => {
  return (
    <div>
      <Row className="login__wrapper">
        <Col span={9} className="login__box__1">
          <div>
            <img src={AltaLogo} alt="Alta Logo" className="ms-120" />
            <div className="login__box mt-50">
              <label className="login__label">Tên đăng nhập *</label> <br />
              <Input className="login__input" />
            </div>
            <div className="login__box mt-15">
              <label className="login__label">Mật khẩu *</label> <br />
              <Input.Password className="login__input" />
            </div>

            <button className="login__button button mt-45 ms-120">
              Đăng nhập
            </button>
            <p className="forgot__text mt-15">Quên mật khẩu?</p>
          </div>
        </Col>
        <Col span={15} className="login__box__2">
          <img src={GroupImg} alt="Group" className="login__img__2" />
          <div className="login__text__box">
            <div className="login__text__1">Hệ thống</div>
            <div className="login__text__2">QUẢN LÝ XẾP HÀNG</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
