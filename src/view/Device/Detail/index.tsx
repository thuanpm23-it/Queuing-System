import React, { useEffect } from "react";
import "../Detail/style.css";
import { Row, Col } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import UpdateIcon from "../../../assets/images/Edit Square.svg";
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
              <img src={UpdateIcon} alt="Add Icon" />
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
