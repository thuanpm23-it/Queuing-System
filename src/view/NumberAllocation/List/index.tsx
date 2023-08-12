import React from "react";
import "../List/style.css";
import { Col, Input, Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import SearchIcon from "../../../assets/images/fi_search.svg";
import AddIcon from "../../../assets/images/add-square.svg";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";

const NumberList = () => {
  const breadcrumbPaths = [{ label: "Cấp số" }, { label: "Danh sách cấp số" }];
  return (
    <Row className="main__wrapper">
      <MenuPage />
      <Col span={20} className="main__bg">
        <Header breadcrumbPaths={breadcrumbPaths} />
        <Col span={24} className="ms-30">
          <div>
            <span className="title__text">Quản lý cấp số</span>
          </div>
          <div className="d-flex mt-15 mb-10">
            <div className="device__list__box">
              <label className="device__list__label">Tên dịch vụ</label>
              <br />
              <select className="device__list__select w-150">
                <option value="">Tất cả</option>
                <option value="1">Lựa chọn 1</option>
                <option value="2">Lựa chọn 2</option>
                <option value="3">Lựa chọn 3</option>
              </select>
            </div>
            <div className="device__list__box ms-15">
              <label className="device__list__label">Tình trạng</label>
              <br />
              <select className="device__list__select w-150">
                <option value="">Tất cả</option>
                <option value="1">Lựa chọn 1</option>
                <option value="2">Lựa chọn 2</option>
                <option value="3">Lựa chọn 3</option>
              </select>
            </div>
            <div className="device__list__box ms-15">
              <label className="device__list__label">Nguồn cấp</label>
              <br />
              <select className="device__list__select w-150">
                <option value="">Tất cả</option>
                <option value="1">Lựa chọn 1</option>
                <option value="2">Lựa chọn 2</option>
                <option value="3">Lựa chọn 3</option>
              </select>
            </div>
            <div className="device__list__box ms-15">
              <label className="device__list__label">Chọn thời gian</label>
              <br />
              <div className="d-flex items-center">
                <Input type="date" className="date__input" />
                <CaretRightOutlined className="date__icon" />
                <Input type="date" className="date__input" />
              </div>
            </div>

            <div className="device__list__box ms-15">
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
                  <th>STT</th>
                  <th>Tên khách hàng</th>
                  <th>Tên dịch vụ</th>
                  <th>Thời gian cấp</th>
                  <th>Hạn sử dụng</th>
                  <th>Trạng thái</th>
                  <th>Nguồn cấp</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2012001</td>
                  <td>Lê Huỳnh Ái Vân</td>
                  <td>Khám tim mạch</td>
                  <td>14:35 - 12/11/2021</td>
                  <td>14:35 - 12/11/2021</td>
                  <td>Đang chờ</td>
                  <td>Kiosk</td>
                  <td>
                    <a href="/#">Chi tiết</a>
                  </td>
                </tr>
                <tr>
                  <td>2012001</td>
                  <td>Lê Huỳnh Ái Vân</td>
                  <td>Khám tim mạch</td>
                  <td>14:35 - 12/11/2021</td>
                  <td>14:35 - 12/11/2021</td>
                  <td>Đang chờ</td>
                  <td>Kiosk</td>
                  <td>
                    <a href="/#">Chi tiết</a>
                  </td>
                </tr>
                <tr>
                  <td>2012001</td>
                  <td>Lê Huỳnh Ái Vân</td>
                  <td>Khám tim mạch</td>
                  <td>14:35 - 12/11/2021</td>
                  <td>14:35 - 12/11/2021</td>
                  <td>Đang chờ</td>
                  <td>Kiosk</td>
                  <td>
                    <a href="/#">Chi tiết</a>
                  </td>
                </tr>
                <tr>
                  <td>2012001</td>
                  <td>Lê Huỳnh Ái Vân</td>
                  <td>Khám tim mạch</td>
                  <td>14:35 - 12/11/2021</td>
                  <td>14:35 - 12/11/2021</td>
                  <td>Đang chờ</td>
                  <td>Kiosk</td>
                  <td>
                    <a href="/#">Chi tiết</a>
                  </td>
                </tr>
                <tr>
                  <td>2012001</td>
                  <td>Lê Huỳnh Ái Vân</td>
                  <td>Khám tim mạch</td>
                  <td>14:35 - 12/11/2021</td>
                  <td>14:35 - 12/11/2021</td>
                  <td>Đang chờ</td>
                  <td>Kiosk</td>
                  <td>
                    <a href="/#">Chi tiết</a>
                  </td>
                </tr>
                <tr>
                  <td>2012001</td>
                  <td>Lê Huỳnh Ái Vân</td>
                  <td>Khám tim mạch</td>
                  <td>14:35 - 12/11/2021</td>
                  <td>14:35 - 12/11/2021</td>
                  <td>Đang chờ</td>
                  <td>Kiosk</td>
                  <td>
                    <a href="/#">Chi tiết</a>
                  </td>
                </tr>
                <tr>
                  <td>2012001</td>
                  <td>Lê Huỳnh Ái Vân</td>
                  <td>Khám tim mạch</td>
                  <td>14:35 - 12/11/2021</td>
                  <td>14:35 - 12/11/2021</td>
                  <td>Đang chờ</td>
                  <td>Kiosk</td>
                  <td>
                    <a href="/#">Chi tiết</a>
                  </td>
                </tr>
                <tr>
                  <td>2012001</td>
                  <td>Lê Huỳnh Ái Vân</td>
                  <td>Khám tim mạch</td>
                  <td>14:35 - 12/11/2021</td>
                  <td>14:35 - 12/11/2021</td>
                  <td>Đang chờ</td>
                  <td>Kiosk</td>
                  <td>
                    <a href="/#">Chi tiết</a>
                  </td>
                </tr>
                <tr>
                  <td>2012001</td>
                  <td>Lê Huỳnh Ái Vân</td>
                  <td>Khám tim mạch</td>
                  <td>14:35 - 12/11/2021</td>
                  <td>14:35 - 12/11/2021</td>
                  <td>Đang chờ</td>
                  <td>Kiosk</td>
                  <td>
                    <a href="/#">Chi tiết</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="add__border">
              <img src={AddIcon} alt="Add Icon" />
              <p className="add__text">
                Thêm <br /> số mới
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

export default NumberList;
