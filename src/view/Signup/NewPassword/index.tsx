import React, { useState } from "react";
import "../NewPassword/style.css";
import AltaLogo from "../../../assets/images/Logo alta.png";
import ResetImg from "../../../assets/images/Frame.png";
import { Input, Row, Col } from "antd";
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

interface RootState {
  forgot: {
    email: string;
  };
}
const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
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
        } else {
          console.log("Địa chỉ email không tồn tại trong hệ thống.");
        }
      } catch (error) {
        console.log("Đã có lỗi xảy ra khi thay đổi mật khẩu.", error);
      }
    } else {
      console.log("Mật khẩu mới và xác nhận mật khẩu không khớp hoặc rỗng.");
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
              />
            </div>
            <div className="login__box mt-10">
              <label className="login__label">Nhập lại mật khẩu</label> <br />
              <Input.Password
                className="login__input"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
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
