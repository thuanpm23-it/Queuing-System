import React, { useEffect, useState } from "react";
import "../Detail/style.css";
import { Row, Col } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import UpdateIcon from "../../../assets/images/Edit Square.svg";
import { DocumentData, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useParams } from "react-router-dom";

const DeviceDetail = () => {
  const breadcrumbPaths = [
    { label: "Thiết bị" },
    { label: "Danh sách thiết bị" },
    { label: "Chi tiết thiết bị" },
  ];
  const { id } = useParams();

  const [deviceInfo, setDeviceInfo] = useState<DocumentData>({
    deviceCode: "",
    deviceName: "",
    ipAddress: "",
    deviceType: "",
    username: "",
    password: "",
    service: "",
  });

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const deviceRef = doc(collection(db, "devices"), id);
        const deviceSnapshot = await getDoc(deviceRef);
        if (deviceSnapshot.exists()) {
          const data = deviceSnapshot.data();
          setDeviceInfo(data);
        }
      } catch (error) {
        console.error("Error fetching account:", error);
      }
    };

    fetchDevice();
  }, [id]);

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
                    {deviceInfo.deviceCode}
                  </span>
                </div>
                <div className="mt-20">
                  <span className="detail__text__1">Tên thiết bị:</span>
                  <span className="detail__text__2 ms-85">
                    {deviceInfo.deviceName}
                  </span>
                </div>
                <div className="mt-20">
                  <span className="detail__text__1">Địa chỉ IP:</span>
                  <span className="detail__text__2 ms-98">
                    {deviceInfo.ipAddress}
                  </span>
                </div>
              </div>
              <div className="ms-250">
                <div>
                  <span className="detail__text__1">Loại thiết bị:</span>
                  <span className="detail__text__2 ms-107">
                    {deviceInfo.deviceType}
                  </span>
                </div>
                <div className="mt-20">
                  <span className="detail__text__1">Tên đăng nhập:</span>
                  <span className="detail__text__2 ms-85">
                    {deviceInfo.username}
                  </span>
                </div>
                <div className="mt-20">
                  <span className="detail__text__1">Mật khẩu:</span>
                  <span className="detail__text__2 ms-125">
                    {deviceInfo.password}
                  </span>
                </div>
              </div>
            </div>
            <div className="ms-15 mt-20">
              <span className="detail__text__1">Dịch vụ sử dụng:</span>
              <br />
              <p className="detail__text__2 mt-5">{deviceInfo.service}</p>
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
