import React, { useState } from "react";
import AltaLogo from "../../../assets/images/Logo alta.png";
import ResetImg from "../../../assets/images/Frame.png";
import { Input, Row, Col } from "antd";
import "../ForgotPassword/style.css";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setEmailForgot } from "../../../redux/slice/ForgotPassword/forgotSlice";
import { db } from "../../../config/firebase";

const ForgotPassowrd = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleForgotPassword = async () => {
    try {
      const usersRef = collection(db, "users");
      const emailQuery = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(emailQuery);
      if (email.trim() === "") {
        console.log("Vui lòng nhập địa chỉ email.");
      } else if (!querySnapshot.empty) {
        dispatch(setEmailForgot(email));
        navigate("/newpassword");
      } else {
        console.log("Địa chỉ email không tồn tại trong hệ thống.");
      }
    } catch (error) {
      console.log(
        "Đã có lỗi xảy ra. Vui lòng kiểm tra địa chỉ email và thử lại."
      );
    }
  };
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
              <Input
                className="login__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="reset__button__box mt-45">
              <button className="reset__button button">Hủy</button>
              <button
                className="login__button button ms-20"
                onClick={handleForgotPassword}
              >
                Tiếp tục
              </button>
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

export default ForgotPassowrd;
