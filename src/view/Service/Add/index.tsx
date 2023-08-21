import React, { useState, useEffect } from "react";
import "../Add/style.css";
import { Col, Input, Modal } from "antd";
import { Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import TextArea from "antd/es/input/TextArea";
import { DocumentData, addDoc, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  fetchUserIPAsync,
  selectUserIP,
} from "../../../redux/slice/UserLog/userlogSlice";
import UserDataUtil from "../../../components/UserData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";

const ServiceAdd = () => {
  const breadcrumbPaths = [
    { label: "Dịch vụ" },
    { label: "Danh sách dịch vụ" },
    { label: "Thêm dịch vụ" },
  ];

  const formattedDate = format(new Date(), "yyyy-MM-dd");
  const navigate = useNavigate();
  const userIP = useSelector(selectUserIP);
  const userData = UserDataUtil();
  const dispatch: AppDispatch = useDispatch();
  const [serviceInfo, setServiceInfo] = useState<DocumentData>({
    serviceCode: "",
    serviceName: "",
    serviceDescription: "",
    active: "Hoạt động",
    autoIncrement: true,
    hasPrefix: false,
    hasSuffix: false,
    resetDaily: false,
    creationDate: formattedDate,
  });

  useEffect(() => {
    dispatch(fetchUserIPAsync());
  }, [dispatch]);

  const handleAddService = async () => {
    try {
      for (const key in serviceInfo) {
        if (serviceInfo[key] === "") {
          Modal.error({ content: "Vui lòng điền đầy đủ thông tin." });
          return;
        }
      }
      const serviceDocRef = collection(db, "services");
      const docRef = await addDoc(serviceDocRef, serviceInfo);
      Modal.success({ content: "Thêm dịch vụ thành công." });
      const userLogDocRef = collection(db, "userlogs");
      const logInfo = {
        userId: userData.id,
        time: format(new Date(new Date().getTime()), "HH:mm"),
        date: format(new Date(), "yyyy-MM-dd"),
        userIP: userIP,
        comment: `Thêm dịch vụ ${serviceInfo.serviceCode}`,
      };
      await addDoc(userLogDocRef, logInfo);
      navigate("/service");
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
            <span className="title__text">Quản lý dịch vụ</span>
          </div>
          <div className="device__add__border mt-10">
            <p className="add__title pt-15 ms-15">Thông tin dịch vụ</p>
            <div className="d-flex content-center mt-20">
              <div>
                <div className="device__add__box">
                  <label className="device__add__label">
                    Mã dịch vụ: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <Input
                    className="device__add__input mt-5"
                    placeholder="Nhập mã thiết bị"
                    value={serviceInfo.serviceCode}
                    onChange={(e) =>
                      setServiceInfo((prevData) => ({
                        ...prevData,
                        serviceCode: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="device__add__box mt-15">
                  <label className="device__add__label">
                    Tên dịch vụ: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <Input
                    className="device__add__input mt-5"
                    placeholder="Nhập tên thiết bị"
                    value={serviceInfo.serviceName}
                    onChange={(e) =>
                      setServiceInfo((prevData) => ({
                        ...prevData,
                        serviceName: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="ms-20">
                <div className="device__add__box">
                  <label className="device__add__label">Mô tả:</label>
                  <br />
                  <TextArea
                    className="service__textarea device__add__input mt-5"
                    placeholder="Mô tả dịch vụ"
                    value={serviceInfo.serviceDescription}
                    onChange={(e) =>
                      setServiceInfo((prevData) => ({
                        ...prevData,
                        serviceDescription: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="device__add__box mt-15 ms-15">
              <p className="add__title">Quy tắc cấp số</p>
              <div className="d-flex items-center">
                <input
                  className="checkbox__custom"
                  type="checkbox"
                  checked={serviceInfo.autoIncrement}
                />
                <div className="ms-10 d-flex items-center">
                  <div className="number__text">Tăng tự động từ:</div>
                  <div className="number__box d-flex items-center content-center ms-10">
                    0001
                  </div>
                  <div className="number__text ms-10">đến</div>
                  <div className="number__box d-flex items-center content-center ms-10">
                    9999
                  </div>
                </div>
              </div>
              <div className="d-flex items-center mt-10">
                <input
                  className="checkbox__custom"
                  type="checkbox"
                  checked={serviceInfo.hasPrefix}
                  onChange={(e) =>
                    setServiceInfo((prevData) => ({
                      ...prevData,
                      hasPrefix: e.target.checked,
                    }))
                  }
                />
                <div className="ms-10 d-flex items-center">
                  <div className="number__text">Prefix:</div>
                  <div className="number__box d-flex items-center content-center ms-85">
                    0001
                  </div>
                </div>
              </div>
              <div className="d-flex items-center mt-10">
                <input
                  className="checkbox__custom"
                  type="checkbox"
                  checked={serviceInfo.hasSuffix}
                  onChange={(e) =>
                    setServiceInfo((prevData) => ({
                      ...prevData,
                      hasSuffix: e.target.checked,
                    }))
                  }
                />
                <div className="ms-10 d-flex items-center">
                  <div className="number__text">Surfix:</div>
                  <div className="number__box d-flex items-center content-center ms-85">
                    0001
                  </div>
                </div>
              </div>
              <div className="d-flex items-center mt-10">
                <input
                  className="checkbox__custom"
                  type="checkbox"
                  checked={serviceInfo.resetDaily}
                  onChange={(e) =>
                    setServiceInfo((prevData) => ({
                      ...prevData,
                      resetDaily: e.target.checked,
                    }))
                  }
                />
                <div className="ms-10 d-flex items-center">
                  <div className="number__text">Reset mỗi ngày</div>
                </div>
              </div>
              <p className="required__text mt-15">
                <strong className="text-danger">*</strong> Là trường thông tin
                bắt buộc
              </p>
            </div>
          </div>

          <div className="d-flex ms-410 mt-30">
            <Link to="/service" className="link">
              <button className="cancel__button button">Hủy bỏ</button>
            </Link>
            <button
              className="add__button button ms-20"
              onClick={handleAddService}
            >
              Thêm dịch vụ
            </button>
          </div>
        </Col>
      </Col>
    </Row>
  );
};

export default ServiceAdd;
