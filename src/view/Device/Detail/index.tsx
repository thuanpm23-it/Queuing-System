import React from "react";
import "../Detail/style.css";
import { Row, Col } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import UpdateIcon from "../../../assets/images/Edit Square.svg";

const DeviceDetail = () => {
  return (
    <Row className="main__wrapper">
      <MenuPage />
      <Col span={20} className="main__bg">
        <Header />
        <Col span={24} className="ms-30">
          <div>
            <span className="title__text">Quản lý thiết bị</span>
          </div>
          <div className="device__detail__border mt-10">
            <p className="add__title pt-15 ms-15">Thông tin thiết bị</p>
            <div className="d-flex ms-15">
              <div>
                <div>
                  <span className="detail__text__1">Mã thiết bị:</span>
                  <span className="detail__text__2 ms-89">KIO_01</span>
                </div>
                <div className="mt-20">
                  <span className="detail__text__1">Tên thiết bị:</span>
                  <span className="detail__text__2 ms-85">Kiosk</span>
                </div>
                <div className="mt-20">
                  <span className="detail__text__1">Địa chỉ IP:</span>
                  <span className="detail__text__2 ms-98">128.172.308</span>
                </div>
              </div>
              <div className="ms-250">
                <div>
                  <span className="detail__text__1">Loại thiết bị:</span>
                  <span className="detail__text__2 ms-107">Kiosk</span>
                </div>
                <div className="mt-20">
                  <span className="detail__text__1">Tên đăng nhập:</span>
                  <span className="detail__text__2 ms-85">Linhkyo011</span>
                </div>
                <div className="mt-20">
                  <span className="detail__text__1">Mật khẩu:</span>
                  <span className="detail__text__2 ms-125">CMS</span>
                </div>
              </div>
            </div>
            <div className="ms-15 mt-20">
              <span className="detail__text__1">Dịch vụ sử dụng:</span>
              <br />
              <p className="detail__text__2 mt-5">
                Khám tim mạch, Khám sản - Phụ khoa, Khám răng hàm mặt, Khám tai
                mũi họng, Khám hô hấp, Khám tổng quát.
              </p>
            </div>
          </div>
          <div className="add__border">
            <img src={UpdateIcon} alt="Add Icon" />
            <p className="add__text">
              Cập nhật
              <br /> thiết bị
            </p>
          </div>
        </Col>
      </Col>
    </Row>
  );
};

export default DeviceDetail;
