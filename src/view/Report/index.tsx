import React from "react";
import "../Report/style.css";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Col, Input, Row } from "antd";
import MenuPage from "../../layout/Menu";
import Header from "../../layout/Header";

const ReportList = () => {
  const breadcrumbPaths = [{ label: "Báo cáo" }, { label: "Lập báo cáo" }];
  return (
    <Row className="main__wrapper">
      <MenuPage />
      <Col span={20} className="main__bg">
        <Header breadcrumbPaths={breadcrumbPaths} />
        <Col span={24} className="ms-30">
          <div className="mt-15 mb-10">
            <div className="device__list__box">
              <label className="device__list__label">Chọn thời gian</label>
              <br />
              <div className="d-flex items-center">
                <Input type="date" className="date__input" />
                <CaretRightOutlined className="date__icon" />
                <Input type="date" className="date__input" />
              </div>
            </div>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên dịch vụ</th>
                  <th>Thời gian cấp</th>
                  <th>Tình trạng</th>
                  <th>Nguồn cấp</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2012001</td>
                  <td>Khám tim mạch</td>
                  <td>7:20 - 7/10/2021</td>
                  <td>Đang chờ</td>
                  <td>Kiosk</td>
                </tr>
                <tr>
                  <td>2012001</td>
                  <td>Khám tim mạch</td>
                  <td>7:20 - 7/10/2021</td>
                  <td>Đang chờ</td>
                  <td>Kiosk</td>
                </tr>
                <tr>
                  <td>2012001</td>
                  <td>Khám tim mạch</td>
                  <td>7:20 - 7/10/2021</td>
                  <td>Đang chờ</td>
                  <td>Kiosk</td>
                </tr>
                <tr>
                  <td>2012001</td>
                  <td>Khám tim mạch</td>
                  <td>7:20 - 7/10/2021</td>
                  <td>Đang chờ</td>
                  <td>Kiosk</td>
                </tr>
                <tr>
                  <td>2012001</td>
                  <td>Khám tim mạch</td>
                  <td>7:20 - 7/10/2021</td>
                  <td>Đang chờ</td>
                  <td>Kiosk</td>
                </tr>
                <tr>
                  <td>2012001</td>
                  <td>Khám tim mạch</td>
                  <td>7:20 - 7/10/2021</td>
                  <td>Đang chờ</td>
                  <td>Kiosk</td>
                </tr>
                <tr>
                  <td>2012001</td>
                  <td>Khám tim mạch</td>
                  <td>7:20 - 7/10/2021</td>
                  <td>Đang chờ</td>
                  <td>Kiosk</td>
                </tr>
                <tr>
                  <td>2012001</td>
                  <td>Khám tim mạch</td>
                  <td>7:20 - 7/10/2021</td>
                  <td>Đang chờ</td>
                  <td>Kiosk</td>
                </tr>
                <tr>
                  <td>2012001</td>
                  <td>Khám tim mạch</td>
                  <td>7:20 - 7/10/2021</td>
                  <td>
                    <span className="word__svg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="9"
                        viewBox="0 0 8 9"
                        fill="none"
                      >
                        <circle cx="4" cy="4.5" r="4" fill="#34CD26" />
                      </svg>
                    </span>
                    <span className="ms-5">Đang chờ</span>
                  </td>
                  <td>Kiosk</td>
                </tr>
              </tbody>
            </table>
            <div className="add__border report__down">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path
                    d="M23.9166 11.888H20.545C17.78 11.888 15.5283 9.63634 15.5283 6.87134V3.49967C15.5283 2.85801 15.0033 2.33301 14.3616 2.33301H9.41496C5.82163 2.33301 2.91663 4.66634 2.91663 8.83134V19.168C2.91663 23.333 5.82163 25.6663 9.41496 25.6663H18.585C22.1783 25.6663 25.0833 23.333 25.0833 19.168V13.0547C25.0833 12.413 24.5583 11.888 23.9166 11.888ZM14.3266 18.4097L11.9933 20.743C11.9116 20.8247 11.8066 20.8947 11.7016 20.9297C11.5966 20.9763 11.4916 20.9997 11.375 20.9997C11.2583 20.9997 11.1533 20.9763 11.0483 20.9297C10.955 20.8947 10.8616 20.8247 10.7916 20.7547C10.78 20.743 10.7683 20.743 10.7683 20.7313L8.43496 18.398C8.09663 18.0597 8.09663 17.4997 8.43496 17.1613C8.77329 16.823 9.33329 16.823 9.67163 17.1613L10.5 18.013V13.1247C10.5 12.6463 10.8966 12.2497 11.375 12.2497C11.8533 12.2497 12.25 12.6463 12.25 13.1247V18.013L13.09 17.173C13.4283 16.8347 13.9883 16.8347 14.3266 17.173C14.665 17.5113 14.665 18.0713 14.3266 18.4097Z"
                    fill="#FF7506"
                  />
                  <path
                    d="M20.335 10.2779C21.4434 10.2896 22.9834 10.2896 24.3017 10.2896C24.9667 10.2896 25.3167 9.50792 24.85 9.04125C23.17 7.34958 20.16 4.30458 18.4334 2.57792C17.955 2.09958 17.1267 2.42625 17.1267 3.09125V7.16292C17.1267 8.86625 18.5734 10.2779 20.335 10.2779Z"
                    fill="#FF7506"
                  />
                </svg>
              </div>
              <p className="add__text">Tải về</p>
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

export default ReportList;
