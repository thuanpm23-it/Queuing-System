import React, { useState, useEffect } from "react";
import "../Add/style.css";
import { Col, Input, Modal, Row } from "antd";
import MenuPage from "../../../../layout/Menu";
import Header from "../../../../layout/Header";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { AppDispatch } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRoleData,
  selectRoleData,
} from "../../../../redux/slice/Role/slice";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import UserDataUtil from "../../../../components/UserData";
import {
  fetchUserIPAsync,
  selectUserIP,
} from "../../../../redux/slice/UserLog/userlogSlice";

const AccountAdd = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userImg, setUserImg] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const userIP = useSelector(selectUserIP);
  const userData1 = UserDataUtil();
  const navigate = useNavigate();
  const roleData = useSelector(selectRoleData);

  useEffect(() => {
    dispatch(fetchRoleData());
    dispatch(fetchUserIPAsync());
  }, [dispatch]);

  const handleAddAccount = async () => {
    try {
      if (
        !fullName ||
        !phoneNumber ||
        !email ||
        !role ||
        !username ||
        !password ||
        !confirmPassword ||
        !status
      ) {
        Modal.error({ content: "Vui lòng điền đầy đủ thông tin." });
        return;
      }
      if (password !== confirmPassword) {
        Modal.error({ content: "Mật khẩu nhập lại không khớp." });
        return;
      }
      const userData = {
        fullName,
        phoneNumber,
        email,
        role,
        username,
        password,
        status,
        userImg: "",
      };

      const userDocRef = collection(db, "users");
      const docRef = await addDoc(userDocRef, userData);
      Modal.success({ content: "Thêm tài khoản thành công." });
      const userLogDocRef = collection(db, "userlogs");
      const logInfo = {
        userId: userData1.id,
        time: format(new Date(new Date().getTime()), "HH:mm"),
        date: format(new Date(), "yyyy-MM-dd"),
        userIP: userIP,
        comment: `Thêm tài khoản ${username}`,
      };
      await addDoc(userLogDocRef, logInfo);
      navigate("/setting/account");
      return docRef.id;
    } catch (error) {
      console.error("Lỗi khi tạo tài khoản:", error);
    }
  };

  const breadcrumbPaths = [
    { label: "Cài đặt hệ thống" },
    { label: "Quản lý tài khoản" },
    { label: "Thêm tài khoản" },
  ];

  return (
    <Row className="main__wrapper">
      <MenuPage />
      <Col span={20} className="main__bg">
        <Header breadcrumbPaths={breadcrumbPaths} />
        <Col span={24} className="ms-30">
          <div>
            <span className="title__text">Quản lý tài khoản</span>
          </div>
          <div className="device__add__border mt-10">
            <p className="add__title pt-15 ms-15">Thông tin tài khoản</p>
            <div className="d-flex content-center mt-20">
              <div>
                <div className="device__add__box">
                  <label className="device__add__label">
                    Họ tên: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <Input
                    className="device__add__input mt-5"
                    placeholder="Nhập họ tên"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="device__add__box mt-15">
                  <label className="device__add__label">
                    Số điện thoại: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <Input
                    className="device__add__input mt-5"
                    placeholder="Nhập số điện thoại"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="device__add__box mt-15">
                  <label className="device__add__label">
                    Email: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <Input
                    className="device__add__input mt-5"
                    placeholder="Nhập email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="device__add__box mt-15">
                  <label className="device__add__label">
                    Vai trò: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <div className="select__custom">
                    <select
                      className="account__select mt-5"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Chọn vài trò</option>
                      {roleData.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.roleName}
                        </option>
                      ))}
                    </select>
                    <div className="select-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path d="M6 9L12 15L18 9" fill="#FF7506" />
                        <path
                          d="M6 9L12 15L18 9H6Z"
                          stroke="#FF7506"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ms-20">
                <div className="device__add__box">
                  <label className="device__add__label">
                    Tên đăng nhập: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <Input
                    className="device__add__input mt-5"
                    placeholder="Nhập tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="device__add__box mt-15">
                  <label className="device__add__label">
                    Mật khẩu: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <Input.Password
                    className="device__add__input mt-5"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="device__add__box mt-15">
                  <label className="device__add__label">
                    Nhập lại mật khẩu: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <Input.Password
                    className="device__add__input mt-5"
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="device__add__box mt-15">
                  <label className="device__add__label">
                    Tình trạng: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <div className="select__custom">
                    <select
                      className="account__select mt-5"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Chọn tình trạng</option>
                      <option value="Hoạt động">Hoạt động</option>
                      <option value="Ngưng hoạt động">Không hoạt động</option>
                    </select>
                    <div className="select-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path d="M6 9L12 15L18 9" fill="#FF7506" />
                        <path
                          d="M6 9L12 15L18 9H6Z"
                          stroke="#FF7506"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="device__add__box mt-15 ms-15">
              <p className="required__text mt-15">
                <strong className="text-danger">*</strong> Là trường thông tin
                bắt buộc
              </p>
            </div>
          </div>

          <div className="d-flex ms-410 mt-30">
            <Link to="/setting/account" className="link">
              <button className="cancel__button button">Hủy bỏ</button>
            </Link>
            <button
              className="add__button button ms-20"
              onClick={handleAddAccount}
            >
              Thêm
            </button>
          </div>
        </Col>
      </Col>
    </Row>
  );
};

export default AccountAdd;
