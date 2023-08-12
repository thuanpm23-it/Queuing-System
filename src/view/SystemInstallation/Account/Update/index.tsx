import React, { useState, useEffect } from "react";
import { Col, Input, Row } from "antd";
import MenuPage from "../../../../layout/Menu";
import Header from "../../../../layout/Header";
import { useParams } from "react-router-dom";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../config/firebase";

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
  const [rolesList, setRolesList] = useState<DocumentData[]>([]);

  useEffect(() => {
    const getRolesFromFirestore = async () => {
      try {
        const rolesCollectionRef = collection(db, "roles");
        const rolesSnapshot = await getDocs(rolesCollectionRef);
        const rolesList = rolesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRolesList(rolesList);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách vai trò:", error);
      }
    };

    getRolesFromFirestore();
  }, []);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const accountRef = doc(collection(db, "users"), id);
        const accountSnapshot = await getDoc(accountRef);
        if (accountSnapshot.exists()) {
          const data = accountSnapshot.data();
          setAccountData(data);
        }
      } catch (error) {
        console.error("Error fetching account:", error);
      }
    };

    fetchAccount();
  }, [id]);

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
                    <option value="">Chọn vai trò</option>
                    {rolesList.map((role) => (
                      <option key={role.id} value={role.roleName}>
                        {role.roleName}
                      </option>
                    ))}
                  </select>
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
