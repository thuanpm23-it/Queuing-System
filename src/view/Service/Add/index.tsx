import React from "react";
import "../Add/style.css";
import { Col, Input } from "antd";
import { Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import TextArea from "antd/es/input/TextArea";

const ServiceAdd = () => {
  const breadcrumbPaths = [
    { label: "Dịch vụ" },
    { label: "Danh sách dịch vụ" },
    { label: "Thêm dịch vụ" },
  ];
  return (
    <Row className="main__wrapper">
      <MenuPage />
      <Col span={20} className="main__bg">
        <Header breadcrumbPaths={breadcrumbPaths} />
        <Col span={24} className="ms-30">
          <div>
            <span className="title__text">Quản lý dịch vụ</span>
          </div>
          <div className="device__add__border mt-10">
            <p className="add__title pt-15 ms-15">Thông tin dịch vụ</p>
            <div className="d-flex content-center mt-20">
              <div>
                <div className="device__add__box">
                  <label className="device__add__label">
                    Mã dịch vụ: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <Input
                    className="device__add__input mt-5"
                    placeholder="Nhập mã thiết bị"
                  />
                </div>
                <div className="device__add__box mt-15">
                  <label className="device__add__label">
                    Tên dịch vụ: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <Input
                    className="device__add__input mt-5"
                    placeholder="Nhập tên thiết bị"
                  />
                </div>
              </div>
              <div className="ms-20">
                <div className="device__add__box">
                  <label className="device__add__label">Mô tả:</label>
                  <br />
                  <TextArea
                    className="service__textarea device__add__input mt-5"
                    placeholder="Mô tả dịch vụ"
                  />
                </div>
              </div>
            </div>
            <div className="device__add__box mt-15 ms-15">
              <p className="add__title">Quy tắc cấp số</p>
              <div className="d-flex items-center">
                <input className="checkbox__custom" readOnly />
                <div className="ms-10 d-flex items-center">
                  <div className="number__text">Tăng tự động từ:</div>
                  <div className="number__box d-flex items-center content-center ms-10">
                    0001
                  </div>
                  <div className="number__text ms-10">đến</div>
                  <div className="number__box d-flex items-center content-center ms-10">
                    9999
                  </div>
                </div>
              </div>
              <div className="d-flex items-center mt-10">
                <input className="checkbox__custom" readOnly />
                <div className="ms-10 d-flex items-center">
                  <div className="number__text">Prefix:</div>
                  <div className="number__box d-flex items-center content-center ms-85">
                    0001
                  </div>
                </div>
              </div>
              <div className="d-flex items-center mt-10">
                <input className="checkbox__custom" readOnly />
                <div className="ms-10 d-flex items-center">
                  <div className="number__text">Surfix:</div>
                  <div className="number__box d-flex items-center content-center ms-85">
                    0001
                  </div>
                </div>
              </div>
              <div className="d-flex items-center mt-10">
                <input className="checkbox__custom" readOnly />
                <div className="ms-10 d-flex items-center">
                  <div className="number__text">Reset mỗi ngày</div>
                </div>
              </div>
              <p className="required__text mt-15">
                <strong className="text-danger">*</strong> Là trường thông tin
                bắt buộc
              </p>
            </div>
          </div>

          <div className="d-flex ms-410 mt-30">
            <button className="cancel__button button">Hủy bỏ</button>
            <button className="add__button button ms-20">Thêm dịch vụ</button>
          </div>
        </Col>
      </Col>
    </Row>
  );
};

export default ServiceAdd;
