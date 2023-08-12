import React from "react";
import "../Detail/style.css";
import { Col, Input } from "antd";
import { Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import UpdateIcon from "../../../assets/images/Edit Square.svg";
import BackIcon from "../../../assets/images/back-square.svg";
import SearchIcon from "../../../assets/images/fi_search.svg";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

const ServiceDetail = () => {
  const breadcrumbPaths = [
    { label: "Dịch vụ" },
    { label: "Danh sách dịch vụ" },
    { label: "Chi tiết" },
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
          <div className="d-flex">
            <div className="service__detail__border mt-10">
              <p className="add__title pt-15 ms-15">Thông tin dịch vụ</p>
              <div className="d-flex ms-15 mt-20">
                <div>
                  <div className="device__add__box">
                    <label className="device__add__label">Mã dịch vụ:</label>
                  </div>
                  <div className="device__add__box mt-15">
                    <label className="device__add__label">Tên dịch vụ:</label>
                  </div>
                  <div className="device__add__box mt-15">
                    <label className="device__add__label">Mô tả:</label>
                  </div>
                </div>
              </div>
              <div className="mt-15 ms-15">
                <p className="add__title">Quy tắc cấp số</p>
                <div className="d-flex items-center">
                  <div className="d-flex items-center">
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
                  <div className="d-flex items-center">
                    <div className="number__text">Prefix:</div>
                    <div className="number__box d-flex items-center content-center ms-85">
                      0001
                    </div>
                  </div>
                </div>
                <div className="d-flex items-center mt-15">
                  <div className="d-flex items-center">
                    <div className="number__text">Reset mỗi ngày</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="service__detail__border mt-10 ms-20 w-718 pt-15">
              <div className="ms-20">
                <div className="d-flex">
                  <div className="device__list__box">
                    <label className="device__list__label">Trạng thái</label>
                    <br />
                    <select className="device__list__select w-160">
                      <option value="">Tất cả</option>
                      <option value="1">Lựa chọn 1</option>
                      <option value="2">Lựa chọn 2</option>
                      <option value="3">Lựa chọn 3</option>
                    </select>
                  </div>
                  <div className="device__list__box ms-15">
                    <label className="device__list__label">
                      Chọn thời gian
                    </label>
                    <br />
                    <div className="d-flex items-center">
                      <Input type="date" className="date__input w-130" />
                      <CaretRightOutlined className="date__icon" />
                      <Input type="date" className="date__input w-130" />
                    </div>
                  </div>
                  <div className="device__list__box ms-15">
                    <label className="device__list__label">Từ khóa</label>
                    <br />
                    <Input
                      placeholder="Nhập từ khóa"
                      className="device__list__select pe-35 w-200"
                    />
                    <img
                      src={SearchIcon}
                      className="search__icon search__icon__service"
                      alt=""
                    />
                  </div>
                </div>
                <table className="w-669 h-441 mt-15">
                  <thead>
                    <tr>
                      <th>Mã dịch vụ</th>
                      <th>Tên dịch vụ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>KIO_01</td>
                      <td>Kiosk</td>
                    </tr>
                    <tr>
                      <td>KIO_01</td>
                      <td>Kiosk</td>
                    </tr>
                    <tr>
                      <td>KIO_01</td>
                      <td>Kiosk</td>
                    </tr>
                    <tr>
                      <td>KIO_01</td>
                      <td>Kiosk</td>
                    </tr>
                    <tr>
                      <td>KIO_01</td>
                      <td>Kiosk</td>
                    </tr>
                    <tr>
                      <td>KIO_01</td>
                      <td>Kiosk</td>
                    </tr>
                    <tr>
                      <td>KIO_01</td>
                      <td>Kiosk</td>
                    </tr>
                    <tr>
                      <td>KIO_01</td>
                      <td>Kiosk</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="pagination mt-15 me-30">
                <a href="/#">
                  <CaretLeftOutlined />
                </a>
                <a href="/#" className="active">
                  1
                </a>
                <a href="/#">2</a>
                <a href="/#">3</a>
                <a href="/#">4</a>
                <a href="/#">...</a>
                <a href="/#">10</a>
                <a href="/#">
                  <CaretRightOutlined />
                </a>
              </div>
            </div>
          </div>
          <div className="update__border">
            <img src={UpdateIcon} alt="Add Icon" />
            <p className="add__text">
              Cập nhật <br /> danh sách
            </p>
          </div>

          <div className="back__border">
            <img src={BackIcon} alt="Add Icon" />
            <p className="add__text">Quay lại</p>
          </div>
        </Col>
      </Col>
    </Row>
  );
};

export default ServiceDetail;
