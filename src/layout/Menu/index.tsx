import React, { useState } from "react";
import Gruop from "../../assets/images/Group.png";
import Img1 from "../../assets/images/element-4.svg";
import Img2 from "../../assets/images/monitor.svg";
import Img3 from "../../assets/images/fi_layers.svg";
import Img5 from "../../assets/images/Frame.svg";
import Img4 from "../../assets/images/Group 304.svg";
import Img6 from "../../assets/images/setting.svg";
import "../Menu/style.css";
import { Col, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const MenuPage = () => {
  return (
    <Col span={4}>
      <img src={Gruop} alt="Group" className="mt-30 ms-85 mb-40" />

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
    </Col>
  );
};

export default MenuPage;
