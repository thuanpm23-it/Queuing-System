import React, { useEffect, useState } from "react";
import "../Update/style.css";
import { Col, Input, Modal, Select } from "antd";
import { Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../config/firebase";
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
import {
  fetchUserIPAsync,
  selectUserIP,
} from "../../../redux/slice/UserLog/userlogSlice";
import UserDataUtil from "../../../components/UserData";
import { format } from "date-fns";

const DeviceUpdate = () => {
  const breadcrumbPaths = [
    { label: "Thiết bị" },
    { label: "Danh sách thiết bị" },
    { label: "Cập nhật thiết bị" },
  ];

  const { id } = useParams();
  const [deviceInfo, setDeviceInfo] = useState<DocumentData>({
    deviceCode: "",
    deviceType: "",
    deviceName: "",
    username: "",
    ipAddress: "",
    password: "",
  });

  const dispatch: AppDispatch = useDispatch();
  const deviceData = useSelector(selectdeviceDetail);
  const userIP = useSelector(selectUserIP);
  const userData = UserDataUtil();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchdeviceDetail(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(fetchUserIPAsync());
  }, [dispatch]);

  useEffect(() => {
    if (deviceData) {
      setDeviceInfo(deviceData);
    }
  }, [deviceData]);

  const handleUpdateDevice = async () => {
    try {
      for (const key in deviceInfo) {
        if (deviceInfo[key] === "") {
          Modal.error({ content: "Vui lòng điền đầy đủ thông tin!" });
          return;
        }
      }
      const deviceCollectionRef = collection(db, "devices");
      const deviceRef = doc(deviceCollectionRef, id);
      await updateDoc(deviceRef, deviceInfo);
      Modal.success({ content: "Cập nhật thiết bị thành công!" });
      const userLogDocRef = collection(db, "userlogs");
      const logInfo = {
        userId: userData.id,
        time: format(new Date(new Date().getTime()), "HH:mm"),
        date: format(new Date(), "yyyy-MM-dd"),
        userIP: userIP,
        comment: `Cập nhật thiết bị ${deviceInfo.deviceCode}`,
      };
      await addDoc(userLogDocRef, logInfo);
      navigate("/device");
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  const serviceData = useSelector(selectserviceData);

  useEffect(() => {
    dispatch(fetchserviceData());
  }, [dispatch]);

  const options = [
    { label: "Tất cả", value: "all" },
    ...serviceData.map((data) => ({
      label: data.serviceName,
      value: data.id,
    })),
  ];

  const handleSelectService = (value: string[]) => {
    if (value.includes("all")) {
      const allServices = options.slice(1).map((option) => option.value);
      setDeviceInfo({
        ...deviceInfo,
        service: allServices,
      });
    } else {
      setDeviceInfo({
        ...deviceInfo,
        service: value,
      });
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
                      placeholder="Chọn loại thiết bị"
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
              <Select
                mode="multiple"
                style={{ width: 1100 }}
                className="mt-5"
                placeholder="Hãy chọn dịch vụ"
                value={deviceInfo.service}
                onChange={handleSelectService}
                options={options}
                suffixIcon={false}
              />
              <p className="required__text mt-15">
                <strong className="text-danger">*</strong> Là trường thông tin
                bắt buộc
              </p>
            </div>
          </div>

          <div className="d-flex ms-410 mt-30">
            <Link to="/device" className="link">
              <button className="cancel__button button">Hủy bỏ</button>
            </Link>
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
