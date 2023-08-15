import React, { useState, useEffect } from "react";
import { Col, Input, Row } from "antd";
import MenuPage from "../../../../layout/Menu";
import Header from "../../../../layout/Header";
import { useParams } from "react-router-dom";
import { DocumentData, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import {
  fetchRoleData,
  selectRoleData,
} from "../../../../redux/slice/Role/slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import {
  fetchAccountDetail,
  selectAccountDetail,
} from "../../../../redux/slice/Account/accountSlice";

const AccountUpdate = () => {
  const { id } = useParams();
  const [accountData, setAccountData] = useState<DocumentData>({
    fullName: "",
    phoneNumber: "",
    email: "",
    role: "",
    username: "",
    password: "",
    confirmPassword: "",
    status: "",
  });
  const dispatch: AppDispatch = useDispatch();

  const roleData = useSelector(selectRoleData);
  const accountDetails = useSelector(selectAccountDetail);

  useEffect(() => {
    dispatch(fetchRoleData());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchAccountDetail(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (accountDetails) {
      setAccountData(accountDetails);
    }
  }, [accountDetails]);

  const handleUpdate = async () => {
    try {
      if (accountData.password !== accountData.confirmPassword) {
        console.log("Passwords do not match");
        return;
      }
      const accountCollectionRef = collection(db, "users");
      const accountRef = doc(accountCollectionRef, id);
      const { confirmPassword, ...dataWithoutConfirmPassword } = accountData;
      await updateDoc(accountRef, dataWithoutConfirmPassword);
      console.log("Account updated successfully");
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  const breadcrumbPaths = [
    { label: "Cài đặt hệ thống" },
    { label: "Quản lý tài khoản" },
    { label: "Cập nhật tài khoản" },
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
                    value={accountData.fullName}
                    onChange={(e) =>
                      setAccountData((prevData) => ({
                        ...prevData,
                        fullName: e.target.value,
                      }))
                    }
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
                    value={accountData.phoneNumber}
                    onChange={(e) =>
                      setAccountData((prevData) => ({
                        ...prevData,
                        phoneNumber: e.target.value,
                      }))
                    }
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
                    value={accountData.email}
                    onChange={(e) =>
                      setAccountData((prevData) => ({
                        ...prevData,
                        email: e.target.value,
                      }))
                    }
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
                      value={accountData.role}
                      onChange={(e) =>
                        setAccountData((prevData) => ({
                          ...prevData,
                          role: e.target.value,
                        }))
                      }
                    >
                      <option value="">Chọn vài trò</option>
                      {roleData.map((role) => (
                        <option key={role.id} value={role.roleName}>
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
                    value={accountData.username}
                    onChange={(e) =>
                      setAccountData((prevData) => ({
                        ...prevData,
                        username: e.target.value,
                      }))
                    }
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
                    value={accountData.password}
                    onChange={(e) =>
                      setAccountData((prevData) => ({
                        ...prevData,
                        password: e.target.value,
                      }))
                    }
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
                    value={accountData.confirmPassword}
                    onChange={(e) =>
                      setAccountData((prevData) => ({
                        ...prevData,
                        confirmPassword: e.target.value,
                      }))
                    }
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
                      value={accountData.status}
                      onChange={(e) =>
                        setAccountData((prevData) => ({
                          ...prevData,
                          status: e.target.value,
                        }))
                      }
                    >
                      <option value="">Chọn tình trạng</option>
                      <option value="Hoạt động">Hoạt động</option>
                      <option value="Ngưng hoạt động">Ngưng hoạt động</option>
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
            <button className="cancel__button button">Hủy bỏ</button>
            <button className="add__button button ms-20" onClick={handleUpdate}>
              Cập nhật
            </button>
          </div>
        </Col>
      </Col>
    </Row>
  );
};

export default AccountUpdate;
