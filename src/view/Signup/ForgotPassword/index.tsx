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
  const [loginError, setLoginError] = useState("");
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
        setLoginError("Địa chỉ email không tồn tại");
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
                status={loginError ? "error" : ""}
              />
            </div>
            {loginError && (
              <p className="login__error d-flex mt-10">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_83731_3505)">
                      <path
                        d="M10.228 18.8327C14.8304 18.8327 18.5613 15.1017 18.5613 10.4993C18.5613 5.89698 14.8304 2.16602 10.228 2.16602C5.62561 2.16602 1.89465 5.89698 1.89465 10.4993C1.89465 15.1017 5.62561 18.8327 10.228 18.8327Z"
                        stroke="#E73F3F"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.228 13.834H10.2364"
                        stroke="#E73F3F"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.228 7.16602V10.4993"
                        stroke="#E73F3F"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_83731_3505">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(0.228027 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="ms-5">{loginError}</div>
              </p>
            )}

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
