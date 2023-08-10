import React from "react";
import Gruop from "../../assets/images/Group.png";
import Img1 from "../../assets/images/element-4.svg";
import Img2 from "../../assets/images/monitor.svg";
import Img3 from "../../assets/images/fi_layers.svg";
import Img5 from "../../assets/images/Frame.svg";
import Img4 from "../../assets/images/Group 304.svg";
import Img6 from "../../assets/images/setting.svg";
import "../Menu/style.css";
import { Col, Menu } from "antd";

const MenuPage = () => {
  return (
    <Col span={4}>
      <Menu mode="vertical">
        <img src={Gruop} alt="Group" className="mt-30 ms-85 mb-40" />

        <Menu.Item
          icon={<img src={Img1} alt="Some Alt Text" />}
          className="nav__text"
        >
          Dashboard
        </Menu.Item>

        <Menu.Item
          icon={<img src={Img2} alt="Some Alt Text" />}
          className="nav__text"
        >
          Thiết bị
        </Menu.Item>

        <Menu.Item
          icon={<img src={Img3} alt="Some Alt Text" />}
          className="nav__text"
        >
          Dịch vụ
        </Menu.Item>

        <Menu.Item
          icon={<img src={Img4} alt="Some Alt Text" />}
          className="nav__text"
        >
          Cấp số
        </Menu.Item>

        <Menu.Item
          icon={<img src={Img5} alt="Some Alt Text" />}
          className="nav__text"
        >
          Báo cáo
        </Menu.Item>

        <Menu.Item
          icon={<img src={Img6} alt="Some Alt Text" />}
          className="nav__text"
        >
          Cài đặt hệ thống
        </Menu.Item>
      </Menu>
    </Col>
  );
};

export default MenuPage;
