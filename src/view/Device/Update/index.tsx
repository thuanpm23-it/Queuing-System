import React, { useEffect, useState } from "react";
import "../Update/style.css";
import { Col, Input } from "antd";
import { Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../../config/firebase";

const DeviceUpdate = () => {
  const breadcrumbPaths = [
    { label: "Thiết bị" },
    { label: "Danh sách thiết bị" },
    { label: "Cập nhật thiết bị" },
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
    active: "Ngưng hoạt động",
    connect: "Kết nối",
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

  const handleUpdateDevice = async () => {
    try {
      const deviceCollectionRef = collection(db, "devices");
      const deviceRef = doc(deviceCollectionRef, id);
      await updateDoc(deviceRef, deviceInfo);
      console.log("Account updated successfully");
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  return (
    <Row className="main__wrapper">
      <MenuPage />
      <Col span={20} className="main__bg">
        <Header breadcrumbPaths={breadcrumbPaths} />
        <Col span={24} className="ms-30">
          <div>
            <span className="title__text">Quản lý thiết bị</span>
          </div>
          <div className="device__add__border mt-10">
            <p className="add__title pt-15 ms-15">Thông tin thiết bị</p>
            <div className="d-flex content-center mt-20">
              <div>
                <div className="device__add__box">
                  <label className="device__add__label">
                    Mã thiết bị: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <Input
                    className="device__add__input mt-5"
                    placeholder="Nhập mã thiết bị"
                    value={deviceInfo.deviceCode}
                    onChange={(e) =>
                      setDeviceInfo((prevData) => ({
                        ...prevData,
                        deviceCode: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="device__add__box mt-15">
                  <label className="device__add__label">
                    Tên thiết bị: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <Input
                    className="device__add__input mt-5"
                    placeholder="Nhập tên thiết bị"
                    value={deviceInfo.deviceName}
                    onChange={(e) =>
                      setDeviceInfo((prevData) => ({
                        ...prevData,
                        deviceName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="device__add__box mt-15">
                  <label className="device__add__label">
                    Địa chỉ IP: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <Input
                    className="device__add__input mt-5"
                    placeholder="Nhập địa chỉ IP"
                    value={deviceInfo.ipAddress}
                    onChange={(e) =>
                      setDeviceInfo((prevData) => ({
                        ...prevData,
                        ipAddress: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="ms-20">
                <div className="device__add__box">
                  <label className="device__add__label">
                    Loại thiết bị: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <Input
                    className="device__add__input mt-5"
                    placeholder="Chọn loại thiết bị"
                    value={deviceInfo.deviceType}
                    onChange={(e) =>
                      setDeviceInfo((prevData) => ({
                        ...prevData,
                        deviceType: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="device__add__box mt-15">
                  <label className="device__add__label">
                    Tên đăng nhập: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <Input
                    className="device__add__input mt-5"
                    placeholder="Nhập tài khoản"
                    value={deviceInfo.username}
                    onChange={(e) =>
                      setDeviceInfo((prevData) => ({
                        ...prevData,
                        username: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="device__add__box mt-15">
                  <label className="device__add__label">
                    Mật khẩu: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <Input.Password
                    className="device__add__input mt-5"
                    placeholder="Nhập mật khẩu"
                    value={deviceInfo.password}
                    onChange={(e) =>
                      setDeviceInfo((prevData) => ({
                        ...prevData,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="device__add__box mt-15 ms-15">
              <label className="device__add__label">
                Dịch vụ sử dụng: <span className="text-danger">*</span>
              </label>
              <br />
              <Input
                className="device__add__input w-100 mt-5"
                placeholder="Nhập dịch vụ sử dụng"
                value={deviceInfo.service}
                onChange={(e) =>
                  setDeviceInfo((prevData) => ({
                    ...prevData,
                    service: e.target.value,
                  }))
                }
              />
              <p className="required__text mt-15">
                <strong className="text-danger">*</strong> Là trường thông tin
                bắt buộc
              </p>
            </div>
          </div>

          <div className="d-flex ms-410 mt-30">
            <button className="cancel__button button">Hủy bỏ</button>
            <button
              className="add__button button ms-20"
              onClick={handleUpdateDevice}
            >
              Cập nhật
            </button>
          </div>
        </Col>
      </Col>
    </Row>
  );
};

export default DeviceUpdate;
