import React, { useState } from "react";
import "../Add/style.css";
import { Col, Input } from "antd";
import { Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import { DocumentData, addDoc, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";

const DeviceAdd = () => {
  const breadcrumbPaths = [
    { label: "Thiết bị" },
    { label: "Danh sách thiết bị" },
    { label: "Thêm thiết bị" },
  ];

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

  const handleAddDevice = async () => {
    try {
      for (const key in deviceInfo) {
        if (deviceInfo[key] === "") {
          console.error("Vui lòng điền đầy đủ thông tin.");
          return;
        }
      }
      const deviceDocRef = collection(db, "devices");
      const docRef = await addDoc(deviceDocRef, deviceInfo);
      return docRef.id;
    } catch (error) {
      console.error("Lỗi khi tạo tài khoản:", error);
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
                  <div className="select__custom">
                    <select
                      className="device__add__input mt-5"
                      value={deviceInfo.deviceType}
                      onChange={(e) =>
                        setDeviceInfo((prevData) => ({
                          ...prevData,
                          deviceType: e.target.value,
                        }))
                      }
                    >
                      <option value="">Chọn loại thiết bị</option>
                      <option value="Kiosk">Kiosk</option>
                      <option value="Display counter">Display counter</option>
                    </select>
                    <div className="select-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path d="M6 9L12 15L18 9" fill="#FF7506" />
                        <path
                          d="M6 9L12 15L18 9H6Z"
                          stroke="#FF7506"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
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
              onClick={handleAddDevice}
            >
              Thêm thiết bị
            </button>
          </div>
        </Col>
      </Col>
    </Row>
  );
};

export default DeviceAdd;
