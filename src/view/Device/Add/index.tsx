import React, { useEffect, useState } from "react";
import "../Add/style.css";
import { Col, Input, Modal, Select } from "antd";
import { Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import {
  DocumentData,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchserviceData,
  selectserviceData,
} from "../../../redux/slice/Service/serviceSlice";
import UserDataUtil from "../../../components/UserData";
import {
  fetchUserIPAsync,
  selectUserIP,
} from "../../../redux/slice/UserLog/userlogSlice";
import { format } from "date-fns";

const DeviceAdd = () => {
  const breadcrumbPaths = [
    { label: "Thiết bị" },
    { label: "Danh sách thiết bị" },
    { label: "Thêm thiết bị" },
  ];

  const navigate = useNavigate();
  const userData = UserDataUtil();
  const [deviceInfo, setDeviceInfo] = useState<DocumentData>({
    deviceCode: "",
    deviceType: "",
    deviceName: "",
    username: "",
    ipAddress: "",
    password: "",
    active: "Ngưng hoạt động",
    connect: "Kết nối",
  });
  const dispatch: AppDispatch = useDispatch();
  const userIP = useSelector(selectUserIP);
  const serviceData = useSelector(selectserviceData);

  useEffect(() => {
    dispatch(fetchserviceData());
    dispatch(fetchUserIPAsync());
  }, [dispatch]);

  const handleAddDevice = async () => {
    try {
      const deviceQuery = query(
        collection(db, "devices"),
        where("deviceCode", "==", deviceInfo.deviceCode)
      );
      const querySnapshot = await getDocs(deviceQuery);

      if (!querySnapshot.empty) {
        Modal.error({ content: "Mã thiết bị đã tồn tại!" });
        return;
      }
      for (const key in deviceInfo) {
        if (deviceInfo[key] === "") {
          Modal.error({ content: "Vui lòng điền đầy đủ thông tin!" });
          return;
        }
      }
      const deviceDocRef = collection(db, "devices");
      const docRef = await addDoc(deviceDocRef, deviceInfo);
      Modal.success({ content: "Thêm thiết bị thành công!" });
      const userLogDocRef = collection(db, "userlogs");
      const logInfo = {
        userId: userData.id,
        time: format(new Date(new Date().getTime()), "HH:mm"),
        date: format(new Date(), "yyyy-MM-dd"),
        userIP: userIP,
        comment: `Thêm thiết bị ${deviceInfo.deviceCode}`,
      };
      await addDoc(userLogDocRef, logInfo);
      navigate("/device");
      return docRef.id;
    } catch (error) {
      console.error("Lỗi khi tạo tài khoản:", error);
    }
  };

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
