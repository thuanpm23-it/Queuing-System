import React, { useState, useEffect } from "react";
import "../Add/style.css";
import { Col, Modal, Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import { DocumentData, addDoc, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";
import {
  fetchserviceData,
  selectserviceData,
} from "../../../redux/slice/Service/serviceSlice";
import { AppDispatch } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  fetchUserIPAsync,
  selectUserIP,
} from "../../../redux/slice/UserLog/userlogSlice";
import UserDataUtil from "../../../components/UserData";

const NumberAdd = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const breadcrumbPaths = [
    { label: "Cấp số" },
    { label: "Danh sách cấp số" },
    { label: "Cấp số mới" },
  ];

  const [numberInfo, setNumberInfo] = useState<DocumentData>({
    name: "Lê Thị Nga",
    email: "mm@mm.com",
    active: "Đang chờ",
    phone: "43543543345",
    supply: "Kiosk",
  });

  const dispatch: AppDispatch = useDispatch();
  const userIP = useSelector(selectUserIP);
  const userData = UserDataUtil();
  const serviceData = useSelector(selectserviceData);

  useEffect(() => {
    dispatch(fetchserviceData());
    dispatch(fetchUserIPAsync());
  }, [dispatch]);

  const generateSequentialNumber = (
    prefix: string,
    autoValue: number,
    surfix: string
  ) => {
    const formattedAuto = String(autoValue).padStart(4, "0");
    return `${prefix}${formattedAuto}${surfix}`;
  };

  const formatDate = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };

  const formatTime = (date: Date) => {
    return format(date, "HH:mm");
  };

  const handleNumberService = async () => {
    try {
      const serviceRules = serviceData.find(
        (data) => data.id === numberInfo.serviceId
      );
      if (!serviceRules) {
        console.log("Không tìm thấy quy tắc dịch vụ. Không thể tạo số.");
        return;
      }
      const storedServiceNumber = localStorage.getItem(
        `service_${numberInfo.serviceId}`
      );
      let autoValue = storedServiceNumber ? parseInt(storedServiceNumber) : 1;

      if (serviceRules.resetDaily) {
        const storedTime = localStorage.getItem(
          `service_time_${numberInfo.serviceId}`
        );
        if (!storedTime) {
          localStorage.setItem(
            `service_time_${numberInfo.serviceId}`,
            String(new Date().getTime())
          );
        } else {
          const firstPressTime = parseInt(storedTime, 10);
          const currentTime = new Date().getTime();
          console.log("First Press Time:", firstPressTime);
          console.log("Current Time:", currentTime);

          if (currentTime - firstPressTime >= 24 * 60 * 60 * 1000) {
            console.log("Removing Data from localStorage...");
            localStorage.removeItem(`service_${numberInfo.serviceId}`);
            localStorage.removeItem(`service_time_${numberInfo.serviceId}`);
            autoValue = 1;
          }
        }
      }

      if (serviceRules.autoIncrement) {
        localStorage.setItem(
          `service_${numberInfo.serviceId}`,
          String(autoValue >= 9999 ? 1 : autoValue + 1)
        );
        const storedTime = localStorage.getItem(
          `service_time_${numberInfo.serviceId}`
        );
        if (!storedTime) {
          localStorage.setItem(
            `service_time_${numberInfo.serviceId}`,
            String(new Date().getTime())
          );
        }
      }

      const numberDocRef = collection(db, "numbers");
      let prefix = "";
      let surfix = "";

      if (serviceRules.hasPrefix) {
        prefix = "0001";
      }

      if (serviceRules.hasSuffix) {
        surfix = "0001";
      }

      const generatedNumber = generateSequentialNumber(
        prefix,
        autoValue,
        surfix
      );

      const currentTime = new Date();
      const endTime = new Date(currentTime.getTime() + 8 * 60 * 60 * 1000);

      const docRef = await addDoc(numberDocRef, {
        ...numberInfo,
        number: generatedNumber,
        startTime: formatTime(currentTime),
        startDate: formatDate(currentTime),
        endTime: formatTime(endTime),
        endDate: formatDate(endTime),
      });

      setNumberInfo((prevData) => ({
        ...prevData,
        number: generatedNumber,
        startTime: formatTime(currentTime),
        startDate: formatDate(currentTime),
        endTime: formatTime(endTime),
        endDate: formatDate(endTime),
      }));
      setIsSuccessModalOpen(true);
      const userLogDocRef = collection(db, "userlogs");
      const logInfo = {
        userId: userData.id,
        time: format(new Date(new Date().getTime()), "HH:mm"),
        date: format(new Date(), "yyyy-MM-dd"),
        userIP: userIP,
        comment: `Cấp số ${generatedNumber}`,
      };
      await addDoc(userLogDocRef, logInfo);
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
            <span className="title__text">Quản lý cấp số</span>
          </div>
          <div className="number__border mt-15">
            <div className="number__text__1 mt-20">CẤP SỐ MỚI</div>
            <div className="number__text__2 mt-30 mb-10">
              Dịch vụ khách hàng lựa chọn
            </div>

            <div className="select__custom">
              <select
                className="device__list__select  w-400"
                value={numberInfo.serviceId}
                onChange={(e) =>
                  setNumberInfo((prevData) => ({
                    ...prevData,
                    serviceId: e.target.value,
                  }))
                }
              >
                <option value="">Chọn dịch vụ</option>
                {serviceData.map((data) => (
                  <option value={data.id} key={data.id}>
                    {data.serviceName}
                  </option>
                ))}
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
            <div className="d-flex mt-100">
              <Link to="/numberallocaiton" className="link">
                <button className="cancel__button button w-115">Hủy bỏ</button>
              </Link>
              <button
                className="add__button button ms-20 w-115"
                onClick={handleNumberService}
              >
                In số
              </button>
            </div>
          </div>
        </Col>
      </Col>
      <Modal
        open={isSuccessModalOpen}
        onCancel={() => setIsSuccessModalOpen(false)}
        footer={null}
        className="custom__modal text-center"
      >
        <div className="modal__text__1 mt-30">Số thứ tự được cấp</div>
        <div className="modal__text__2 mt-20">{numberInfo.number}</div>
        <div className="modal__text__3 mt-20">
          DV: &nbsp;
          {
            serviceData.find((service) => service.id === numberInfo.serviceId)
              ?.serviceName
          }
          <span className="modal__text__4"> (tại quầy số 1)</span>
        </div>
        <div className="custom__modal__footer mt-70">
          <div className="modal__text__5">
            Thời gian cấp: {numberInfo.startTime}{" "}
            {numberInfo.startDate &&
              format(new Date(numberInfo.startDate), "dd/MM/yyyy")}
          </div>
          <div className="modal__text__5 mt-5">
            Hạn sử dụng: {numberInfo.endTime}{" "}
            {numberInfo.endDate &&
              format(new Date(numberInfo.endDate), "dd/MM/yyyy")}
          </div>
        </div>
      </Modal>
    </Row>
  );
};

export default NumberAdd;
