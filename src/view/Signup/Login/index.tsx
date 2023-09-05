import React, { useEffect, useState } from "react";
import "../Login/style.css";
import { Input, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { AppDispatch } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchImageData,
  selectImgData,
} from "../../../redux/slice/Image/slice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const image = useSelector(selectImgData);

  useEffect(() => {
    dispatch(fetchImageData());
  }, [dispatch]);

  const handleLogin = async () => {
    if (!username || !password) {
      setLoginError("Vui lòng điền thông tin");
      return;
    }
    try {
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("username", "==", username),
        where("password", "==", password)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          const userData = {
            ...user,
            id: doc.id,
          };
          localStorage.setItem("userData", JSON.stringify(userData));
          console.log("Login successful:", user);
          navigate("/profile");
        });
      } else {
        console.log("Login failed");
        setLoginError("Sai mật khẩu hoặc tên đăng nhập");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <Row className="login__wrapper">
        <Col span={9} className="login__box__1">
          <div>
            <img src={image?.logo} alt="Alta Logo" className="ms-120" />
            <div className="login__box mt-50">
              <label className="login__label">Tên đăng nhập *</label> <br />
              <Input
                className="login__input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                status={loginError ? "error" : ""}
              />
            </div>
            <div className="login__box mt-10">
              <label className="login__label">Mật khẩu *</label> <br />
              <Input.Password
                className="login__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <button
              className="login__button button mt-30 ms-120"
              onClick={handleLogin}
            >
              Đăng nhập
            </button>
            <Link to="/forgotpassword" style={{ textDecoration: "none" }}>
              <div className="forgot__text mt-15">Quên mật khẩu?</div>
            </Link>
          </div>
        </Col>
        <Col span={15} className="login__box__2">
          <img src={image?.bg1} alt="Group" className="login__img__2" />
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
