import React, { useEffect, useState } from "react";
import { Col, Input, Row } from "antd";
import "../Profile/style.css";
import MenuPage from "../../layout/Menu";
import Header from "../../layout/Header";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const Profile = () => {
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    const fetchRoleName = async () => {
      if (userData && userData.role) {
        try {
          const roleDocRef = doc(db, "roles", userData.role);
          const roleDocSnap = await getDoc(roleDocRef);
          if (roleDocSnap.exists()) {
            const roleData = roleDocSnap.data();
            setRoleName(roleData.roleName);
          }
        } catch (error) {
          console.error("Error fetching role name:", error);
        }
      }
    };

    fetchRoleName();
  }, [userData]);

  const breadcrumbPaths = [{ label: "Thông tin người dùng" }];
  return (
    <Row className="main__wrapper">
      <MenuPage />
      <Col span={20} className="main__bg">
        <Header breadcrumbPaths={breadcrumbPaths} />
        <Row>
          <div className="profile__main__box ms-30 d-flex content-center">
            <div className="text-center">
              <img
                src={userData.userImg}
                alt="Profile"
                className="profile__img"
              />
              <p className="profile__name mt-15">{userData.fullName}</p>
            </div>
            <div className="ms-20">
              <div className="profile__box">
                <label className="profile__label">Tên người dùng</label>
                <br />
                <Input
                  className="profile__input"
                  value={userData.fullName}
                  disabled
                />
              </div>
              <div className="profile__box mt-20">
                <label className="profile__label">Số diện thoại</label>
                <br />
                <Input
                  className="profile__input"
                  value={userData.phoneNumber}
                  disabled
                />
              </div>
              <div className="profile__box mt-20">
                <label className="profile__label">Email</label>
                <br />
                <Input
                  className="profile__input"
                  value={userData.email}
                  disabled
                />
              </div>
            </div>
            <div className="ms-20">
              <div className="profile__box">
                <label className="profile__label">Tên đăng nhập</label>
                <br />
                <Input
                  className="profile__input"
                  value={userData.username}
                  disabled
                />
              </div>
              <div className="profile__box mt-20">
                <label className="profile__label">Mật khẩu</label>
                <br />
                <Input
                  className="profile__input"
                  value={userData.password}
                  disabled
                />
              </div>
              <div className="profile__box mt-20">
                <label className="profile__label">Vai trò</label>
                <br />
                <Input className="profile__input" value={roleName} disabled />
              </div>
            </div>
          </div>
        </Row>
      </Col>
    </Row>
  );
};

export default Profile;
