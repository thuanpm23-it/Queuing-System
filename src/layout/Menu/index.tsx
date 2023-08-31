import React, { useState } from "react";
import Gruop from "../../assets/images/Group.png";
import Img1 from "../../assets/images/element-4.svg";
import Img2 from "../../assets/images/monitor.svg";
import Img3 from "../../assets/images/fi_layers.svg";
import Img5 from "../../assets/images/Frame.svg";
import Img4 from "../../assets/images/Group 304.svg";
import Img6 from "../../assets/images/setting.svg";
import "../Menu/style.css";
import { Col } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import UserDataUtil from "../../components/UserData";

const MenuPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };
  const userData = UserDataUtil();
  return (
    <Col span={4}>
      <img src={Gruop} alt="Group" className="mt-30 ms-85 mb-40" />

      {userData ? (
        <>
          <NavLink to="/dashboard" className="menu__text d-flex">
            <div>
              <img src={Img1} alt="" />
            </div>
            <div className="ms-5">Dashboard</div>
          </NavLink>
          <NavLink to="/device" className="menu__text d-flex">
            <div>
              <img src={Img2} alt="" />
            </div>
            <div className="ms-5">Thiết bị</div>
          </NavLink>
          <NavLink to="/service" className="menu__text d-flex">
            <div>
              <img src={Img4} alt="" />
            </div>
            <div className="ms-5">Dịch vụ</div>
          </NavLink>
          <NavLink to="/numberallocaiton" className="menu__text d-flex">
            <div>
              <img src={Img3} alt="" />
            </div>
            <div className="ms-5">Cấp số</div>
          </NavLink>
          <NavLink to="/report" className="menu__text d-flex">
            <div>
              <img src={Img5} alt="" />
            </div>
            <div className="ms-5">Báo cáo</div>
          </NavLink>
          <div className="navigation">
            <li className="has-sub">
              <NavLink to="/setting" className="menu__text d-flex">
                <div>
                  <img src={Img6} alt="" />
                </div>
                <div className="menu__t ms-5">Cài đặt hệ thống</div>
              </NavLink>
              <ul className="drop">
                <li>
                  <NavLink to="/setting/role" className="a__text menu__text">
                    Quản lý vai trò
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/setting/account" className="a__text menu__text">
                    Quản lý tài khoản
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/setting/userlog" className="a__text menu__text">
                    Nhật ký hoạt động
                  </NavLink>
                </li>
              </ul>
            </li>
          </div>

          <div className="logout" onClick={handleLogout}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M13.3333 14.1663L17.5 9.99967L13.3333 5.83301"
                  stroke="#FF7506"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.5 10H7.5"
                  stroke="#FF7506"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5"
                  stroke="#FF7506"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div>Đăng xuất</div>
          </div>
        </>
      ) : (
        <NavLink to="/numberallocaiton/add" className="menu__text d-flex">
          <div>
            <img src={Img3} alt="" />
          </div>
          <div className="ms-5">Cấp số</div>
        </NavLink>
      )}
    </Col>
  );
};

export default MenuPage;
