import React from "react";
import "../List/style.css";
import { Col, Input, Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import SearchIcon from "../../../assets/images/fi_search.svg";
import AddIcon from "../../../assets/images/add-square.svg";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";

const DeviceList = () => {
  const breadcrumbPaths = [
    { label: "Thiết bị" },
    { label: "Danh sách thiết bị" },
  ];
  return (
    <Row className="main__wrapper">
      <MenuPage />
      <Col span={20} className="main__bg">
        <Header breadcrumbPaths={breadcrumbPaths} />
        <Col span={24} className="ms-30">
          <div>
            <span className="title__text">Danh sách thiết bị</span>
          </div>
          <div className="d-flex mt-15 mb-10">
            <div className="device__list__box">
              <label className="device__list__label">
                Trạng thái hoạt động
              </label>
              <br />
              <select className="device__list__select">
                <option value="">Tất cả</option>
                <option value="1">Lựa chọn 1</option>
                <option value="2">Lựa chọn 2</option>
                <option value="3">Lựa chọn 3</option>
              </select>
            </div>
            <div className="device__list__box ms-20">
              <label className="device__list__label">Trạng thái kết nối</label>
              <br />
              <select className="device__list__select">
                <option value="">Tất cả</option>
                <option value="1">Lựa chọn 1</option>
                <option value="2">Lựa chọn 2</option>
                <option value="3">Lựa chọn 3</option>
              </select>
            </div>
            <div className="device__list__box ms-190">
              <label className="device__list__label">Từ khóa</label>
              <br />
              <Input
                placeholder="Nhập từ khóa"
                className="device__list__select pe-35"
              />
              <img src={SearchIcon} className="search__icon" alt="" />
            </div>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Mã thiết bị</th>
                  <th>Tên thiết bị</th>
                  <th>Địa chỉ IP</th>
                  <th>Trạng hoạt động</th>
                  <th>Trạng thái kết nối</th>
                  <th>Dịch vụ sử dụng</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>KIO_01</td>
                  <td>Kiosk</td>
                  <td>192.168.1.10</td>
                  <td>Ngưng hoạt động</td>
                  <td>Mất kết nối</td>
                  <td>Khám tiêm mạch, Khám mắt...</td>
                  <td>
                    <a href="/#">Chi tiết</a>
                  </td>

                  <td>
                    <a href="/#">Cập nhật</a>
                  </td>
                </tr>
                <tr>
                  <td>KIO_01</td>
                  <td>Kiosk</td>
                  <td>192.168.1.10</td>
                  <td>Ngưng hoạt động</td>
                  <td>Mất kết nối</td>
                  <td>Khám tiêm mạch, Khám mắt...</td>
                  <td>
                    <a href="/#">Chi tiết</a>
                  </td>

                  <td>
                    <a href="/#">Cập nhật</a>
                  </td>
                </tr>
                <tr>
                  <td>KIO_01</td>
                  <td>Kiosk</td>
                  <td>192.168.1.10</td>
                  <td>Ngưng hoạt động</td>
                  <td>Mất kết nối</td>
                  <td>Khám tiêm mạch, Khám mắt...</td>
                  <td>
                    <a href="/#">Chi tiết</a>
                  </td>

                  <td>
                    <a href="/#">Cập nhật</a>
                  </td>
                </tr>
                <tr>
                  <td>KIO_01</td>
                  <td>Kiosk</td>
                  <td>192.168.1.10</td>
                  <td>Ngưng hoạt động</td>
                  <td>Mất kết nối</td>
                  <td>Khám tiêm mạch, Khám mắt...</td>
                  <td>
                    <a href="/#">Chi tiết</a>
                  </td>

                  <td>
                    <a href="/#">Cập nhật</a>
                  </td>
                </tr>
                <tr>
                  <td>KIO_01</td>
                  <td>Kiosk</td>
                  <td>192.168.1.10</td>
                  <td>Ngưng hoạt động</td>
                  <td>Mất kết nối</td>
                  <td>Khám tiêm mạch, Khám mắt...</td>
                  <td>
                    <a href="/#">Chi tiết</a>
                  </td>

                  <td>
                    <a href="/#">Cập nhật</a>
                  </td>
                </tr>
                <tr>
                  <td>KIO_01</td>
                  <td>Kiosk</td>
                  <td>192.168.1.10</td>
                  <td>Ngưng hoạt động</td>
                  <td>Mất kết nối</td>
                  <td>Khám tiêm mạch, Khám mắt...</td>
                  <td>
                    <a href="/#">Chi tiết</a>
                  </td>

                  <td>
                    <a href="/#">Cập nhật</a>
                  </td>
                </tr>
                <tr>
                  <td>KIO_01</td>
                  <td>Kiosk</td>
                  <td>192.168.1.10</td>
                  <td>Ngưng hoạt động</td>
                  <td>Mất kết nối</td>
                  <td>Khám tiêm mạch, Khám mắt...</td>
                  <td>
                    <a href="/#">Chi tiết</a>
                  </td>

                  <td>
                    <a href="/#">Cập nhật</a>
                  </td>
                </tr>
                <tr>
                  <td>KIO_01</td>
                  <td>Kiosk</td>
                  <td>192.168.1.10</td>
                  <td>Ngưng hoạt động</td>
                  <td>Mất kết nối</td>
                  <td>Khám tiêm mạch, Khám mắt...</td>
                  <td>
                    <a href="/#">Chi tiết</a>
                  </td>

                  <td>
                    <a href="/#">Cập nhật</a>
                  </td>
                </tr>
                <tr>
                  <td>KIO_01</td>
                  <td>Kiosk</td>
                  <td>192.168.1.10</td>
                  <td>Ngưng hoạt động</td>
                  <td>Mất kết nối</td>
                  <td>Khám tiêm mạch, Khám mắt...</td>
                  <td>
                    <a href="/#">Chi tiết</a>
                  </td>

                  <td>
                    <a href="/#">Cập nhật</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="add__border">
              <img src={AddIcon} alt="Add Icon" />
              <p className="add__text">
                Thêm <br /> thiết bị
              </p>
            </div>
          </div>
          <div className="pagination mt-15">
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
        </Col>
      </Col>
    </Row>
  );
};

export default DeviceList;
