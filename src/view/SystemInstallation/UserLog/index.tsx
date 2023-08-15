import React from "react";
import "../UserLog/style.css";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Col, Input, Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";

const UserLogList = () => {
  const breadcrumbPaths = [
    { label: "Cài đặt hệ thống" },
    { label: "Nhật ký hoạt động" },
  ];
  return (
    <Row className="main__wrapper">
      <MenuPage />
      <Col span={20} className="main__bg">
        <Header breadcrumbPaths={breadcrumbPaths} />
        <Col span={24} className="ms-30">
          <div className="d-flex mt-15 mb-10">
            <div className="device__list__box">
              <label className="device__list__label">Chọn thời gian</label>
              <br />
              <div className="d-flex items-center">
                <Input type="date" className="date__input" />
                <CaretRightOutlined className="date__icon" />
                <Input type="date" className="date__input" />
              </div>
            </div>
            <div className="device__list__box ms-510">
              <label className="device__list__label">Từ khóa</label>
              <br />
              <Input
                placeholder="Nhập từ khóa"
                className="device__list__select pe-35"
              />
              <div className="search__icon search__userlog">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                    stroke="#FF7506"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.5 17.5L13.875 13.875"
                    stroke="#FF7506"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Tên đăng nhập</th>
                  <th>Thời gian tác động</th>
                  <th>IP thực hiện</th>
                  <th>Thao tác thực hiện</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>tuyennguyen@12</td>
                  <td>01/12/2021 15:12:17</td>
                  <td>192.168.3.1</td>
                  <td>Cập nhật thông tin dịch vụ DV_01</td>
                </tr>
                <tr>
                  <td>tuyennguyen@12</td>
                  <td>01/12/2021 15:12:17</td>
                  <td>192.168.3.1</td>
                  <td>Cập nhật thông tin dịch vụ DV_01</td>
                </tr>
                <tr>
                  <td>tuyennguyen@12</td>
                  <td>01/12/2021 15:12:17</td>
                  <td>192.168.3.1</td>
                  <td>Cập nhật thông tin dịch vụ DV_01</td>
                </tr>
                <tr>
                  <td>tuyennguyen@12</td>
                  <td>01/12/2021 15:12:17</td>
                  <td>192.168.3.1</td>
                  <td>Cập nhật thông tin dịch vụ DV_01</td>
                </tr>
                <tr>
                  <td>tuyennguyen@12</td>
                  <td>01/12/2021 15:12:17</td>
                  <td>192.168.3.1</td>
                  <td>Cập nhật thông tin dịch vụ DV_01</td>
                </tr>
                <tr>
                  <td>tuyennguyen@12</td>
                  <td>01/12/2021 15:12:17</td>
                  <td>192.168.3.1</td>
                  <td>Cập nhật thông tin dịch vụ DV_01</td>
                </tr>
                <tr>
                  <td>tuyennguyen@12</td>
                  <td>01/12/2021 15:12:17</td>
                  <td>192.168.3.1</td>
                  <td>Cập nhật thông tin dịch vụ DV_01</td>
                </tr>
                <tr>
                  <td>tuyennguyen@12</td>
                  <td>01/12/2021 15:12:17</td>
                  <td>192.168.3.1</td>
                  <td>Cập nhật thông tin dịch vụ DV_01</td>
                </tr>
                <tr>
                  <td>tuyennguyen@12</td>
                  <td>01/12/2021 15:12:17</td>
                  <td>192.168.3.1</td>
                  <td>Cập nhật thông tin dịch vụ DV_01</td>
                </tr>
              </tbody>
            </table>
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

export default UserLogList;
