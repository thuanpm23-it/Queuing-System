import React, { useState } from "react";
import "../NewPassword/style.css";
import AltaLogo from "../../../assets/images/Logo alta.png";
import ResetImg from "../../../assets/images/Frame.png";
import { Input, Row, Col, Modal } from "antd";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";

interface RootState {
  forgot: {
    email: string;
  };
}
const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const forgotEmail = useSelector((state: RootState) => state.forgot.email);

  const handleChangePassword = async () => {
    if (newPassword === confirmNewPassword && newPassword !== "") {
      try {
        const usersRef = collection(db, "users");
        const emailQuery = query(usersRef, where("email", "==", forgotEmail));
        const querySnapshot = await getDocs(emailQuery);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userDocRef = doc(db, "users", userDoc.id);

          await updateDoc(userDocRef, { password: newPassword });

          console.log("Mật khẩu đã được thay đổi.");
          Modal.success({ content: "Mật khẩu đã được thay đổi thành công." });
          navigate("/");
        } else {
          console.log("Địa chỉ email không tồn tại trong hệ thống.");
        }
      } catch (error) {
        console.log("Đã có lỗi xảy ra khi thay đổi mật khẩu.", error);
      }
    } else {
      console.log("Mật khẩu mới và xác nhận mật khẩu không khớp hoặc rỗng.");
      setLoginError("Mật khẩu mới và xác nhận mật khẩu không khớp");
    }
  };
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
              <Input.Password
                className="login__input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                status={loginError ? "error" : ""}
              />
            </div>
            <div className="login__box mt-10">
              <label className="login__label">Nhập lại mật khẩu</label> <br />
              <Input.Password
                className="login__input"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
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
              onClick={handleChangePassword}
            >
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
