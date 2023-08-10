import React from "react";
import "../NewPassword/style.css";
import AltaLogo from "../../../assets/images/Logo alta.png";
import ResetImg from "../../../assets/images/Frame.png";
import { Input, Row, Col } from "antd";

const NewPassword = () => {
  return (
    <div>
      <Row className="login__wrapper">
        <Col span={9} className="login__box__1">
          <div>
            <img src={AltaLogo} alt="Alta Logo" className="ms-120" />
            <div className="login__box mt-70">
              <div className="reset__text text-center mb-10">
                Đặt lại mật khẩu mới
              </div>
              <label className="login__label">Mật khẩu</label> <br />
              <Input.Password className="login__input" />
            </div>
            <div className="login__box mt-15">
              <label className="login__label">Nhập lại mật khẩu</label> <br />
              <Input.Password className="login__input" />
            </div>
            <button className="login__button button mt-45 ms-120">
              Xác nhận
            </button>
          </div>
        </Col>
        <Col span={15} className="login__box__2">
          <img src={ResetImg} alt="Group" className="reset__img" />
        </Col>
      </Row>
    </div>
  );
};

export default NewPassword;
