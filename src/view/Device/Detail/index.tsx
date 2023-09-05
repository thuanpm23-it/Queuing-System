import React, { useEffect } from "react";
import "../Detail/style.css";
import { Row, Col } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchdeviceDetail,
  selectdeviceDetail,
} from "../../../redux/slice/Device/deviceSlice";
import { Link } from "react-router-dom";
import {
  fetchserviceData,
  selectserviceData,
} from "../../../redux/slice/Service/serviceSlice";

const DeviceDetail = () => {
  const breadcrumbPaths = [
    { label: "Thiết bị" },
    { label: "Danh sách thiết bị" },
    { label: "Chi tiết thiết bị" },
  ];
  const { id } = useParams();

  const dispatch: AppDispatch = useDispatch();

  const deviceData = useSelector(selectdeviceDetail);

  const serviceData = useSelector(selectserviceData);

  useEffect(() => {
    dispatch(fetchserviceData());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchdeviceDetail(id));
    }
  }, [dispatch, id]);

  return (
    <Row className="main__wrapper">
      <MenuPage />
      <Col span={20} className="main__bg">
        <Header breadcrumbPaths={breadcrumbPaths} />
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
                  <span className="detail__text__2 ms-89">
                    {deviceData?.deviceCode}
                  </span>
                </div>
                <div className="mt-20">
                  <span className="detail__text__1">Tên thiết bị:</span>
                  <span className="detail__text__2 ms-85">
                    {deviceData?.deviceName}
                  </span>
                </div>
                <div className="mt-20">
                  <span className="detail__text__1">Địa chỉ IP:</span>
                  <span className="detail__text__2 ms-98">
                    {deviceData?.ipAddress}
                  </span>
                </div>
              </div>
              <div className="ms-250">
                <div>
                  <span className="detail__text__1">Loại thiết bị:</span>
                  <span className="detail__text__2 ms-107">
                    {deviceData?.deviceType}
                  </span>
                </div>
                <div className="mt-20">
                  <span className="detail__text__1">Tên đăng nhập:</span>
                  <span className="detail__text__2 ms-85">
                    {deviceData?.username}
                  </span>
                </div>
                <div className="mt-20">
                  <span className="detail__text__1">Mật khẩu:</span>
                  <span className="detail__text__2 ms-125">
                    {deviceData?.password}
                  </span>
                </div>
              </div>
            </div>
            <div className="ms-15 mt-20">
              <span className="detail__text__1">Dịch vụ sử dụng:</span>
              <br />
              <p className="detail__text__2 mt-5">
                {deviceData?.service.map((serviceId: string, index: number) => (
                  <span key={serviceId}>
                    {serviceData
                      .filter((service) => service.id === serviceId)
                      .map((service) => service.serviceName)}
                    {index !== deviceData.service.length - 1 && ", "}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <Link to={`/device/update/${id}`}>
            <div className="add__border">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.443 0.345066C19.1213 0.240174 20.7762 0.822905 22.0233 1.96506C23.1655 3.2121 23.7482 4.86705 23.655 6.55697V17.4424C23.7599 19.1323 23.1655 20.7873 22.035 22.0343C20.7879 23.1764 19.1213 23.7592 17.443 23.6543H6.55751C4.86758 23.7592 3.21261 23.1764 1.96556 22.0343C0.823397 20.7873 0.240662 19.1323 0.345554 17.4424V6.55697C0.240662 4.86705 0.823397 3.2121 1.96556 1.96506C3.21261 0.822905 4.86758 0.240174 6.55751 0.345066H17.443ZM10.8115 17.6522L18.6551 9.7853C19.366 9.06271 19.366 7.89725 18.6551 7.18632L17.14 5.67122C16.4174 4.94864 15.2519 4.94864 14.5293 5.67122L13.7485 6.46374C13.6319 6.58028 13.6319 6.77841 13.7485 6.89496C13.7485 6.89496 15.6016 8.73638 15.6365 8.783C15.7647 8.92286 15.8463 9.10933 15.8463 9.31911C15.8463 9.73868 15.5083 10.0883 15.0771 10.0883C14.879 10.0883 14.6925 10.0067 14.5643 9.87854L12.618 7.94387C12.5247 7.85063 12.3616 7.85063 12.2683 7.94387L6.70902 13.5031C6.32442 13.8877 6.10298 14.4005 6.09132 14.9483L6.02139 17.7104C6.02139 17.8619 6.06801 18.0018 6.17291 18.1067C6.2778 18.2116 6.41765 18.2699 6.56917 18.2699H9.30802C9.86745 18.2699 10.4036 18.0484 10.8115 17.6522Z"
                    fill="#FF9138"
                  />
                </svg>
              </div>
              <p className="add__text">
                Cập nhật
                <br /> thiết bị
              </p>
            </div>
          </Link>
        </Col>
      </Col>
    </Row>
  );
};

export default DeviceDetail;
