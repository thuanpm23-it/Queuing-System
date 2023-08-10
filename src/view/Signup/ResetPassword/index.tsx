import React from "react";
import AltaLogo from "../../../assets/images/Logo alta.png";
import ResetImg from "../../../assets/images/Frame.png";
import { Input, Row, Col } from "antd";
import "../ResetPassword/style.css";

const ResetPassword = () => {
  return (
    <div>
      <Row className="login__wrapper">
        <Col span={9} className="login__box__1">
          <div>
            <img src={AltaLogo} alt="Alta Logo" className="ms-120" />
            <div className="login__box mt-100">
              <div className="reset__text text-center mb-10">
                Đặt lại mật khẩu
              </div>
              <label className="login__label">
                Vui lòng nhập email để đặt lại mật khẩu của bạn *
              </label>
              <br />
              <Input className="login__input" />
            </div>
            <div className="reset__button__box mt-45">
              <button className="reset__button button">Hủy</button>
              <button className="login__button button ms-20">Tiếp tục</button>
            </div>
          </div>
        </Col>
        <Col span={15} className="login__box__2">
          <img src={ResetImg} alt="Group" className="reset__img" />
        </Col>
      </Row>
    </div>
  );
};

export default ResetPassword;
