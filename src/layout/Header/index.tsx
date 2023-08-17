import React from "react";
import { Col } from "antd";
import "../Header/style.css";
import Breadcrumb from "../../components/Breadcrums";
import User from "../../components/User";

interface HeaderProps {
  breadcrumbPaths: Array<{ label: string; link?: string }>;
}
const Header: React.FC<HeaderProps> = ({ breadcrumbPaths }) => {
  return (
    <Col span={24} className="top__wrapper d-flex">
      <Breadcrumb paths={breadcrumbPaths} />
      <div className="d-flex items-center">
        <User />
      </div>
    </Col>
  );
};

export default Header;
