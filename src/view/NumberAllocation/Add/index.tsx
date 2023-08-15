import React, { useState, useEffect } from "react";
import "../Add/style.css";
import { Col, Modal, Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import { DocumentData, addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";

const NumberAdd = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const breadcrumbPaths = [
    { label: "Cấp số" },
    { label: "Danh sách cấp số" },
    { label: "Cấp số mới" },
  ];

  const [serviceData, setServiceData] = useState<DocumentData[]>([]);
  const [autocrement, setAutocrement] = useState(() => {
    const storedAutocrement = localStorage.getItem("autocrement");
    return storedAutocrement ? parseInt(storedAutocrement) : 1;
  });

  const [numberInfo, setNumberInfo] = useState<DocumentData>({
    // number: "",
    name: "Lê Thị Nga",
    email: "mm@mm.com",
    active: "Đang chờ",
    // endTime: "18:00",
    // endDate: "16/07/2023",
    // startDate: "16/07/2023",
    // startTime: "8:00",
    phone: "43543543345",
    serviceName: "",
    supply: "Kiosk",
  });

  const generateSequentialNumber = (
    prefix: string,
    autocrement: number,
    surfix: string
  ) => {
    const formattedAuto = String(autocrement).padStart(4, "0");
    return `${prefix}${formattedAuto}${surfix}`;
  };

  const handleNumberService = async () => {
    try {
      const serviceRules = serviceData.find(
        (data) => data.serviceName === numberInfo.serviceName
      );
      if (!serviceRules) {
        console.log("Không tìm thấy quy tắc dịch vụ. Không thể tạo số.");
        return;
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
        prefix, // prefix
        autocrement,
        surfix // surfix
      );

      const currentTime = new Date();
      const endTime = new Date(currentTime.getTime() + 8 * 60 * 60 * 1000); // 8 hours later

      const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear());
        return `${day}/${month}/${year}`;
      };

      const formatTime = (date: Date) => {
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
      };

      const docRef = await addDoc(numberDocRef, {
        ...numberInfo,
        number: generatedNumber,
        startTime: formatTime(currentTime),
        startDate: formatDate(currentTime),
        endTime: formatTime(endTime),
        endDate: formatDate(endTime),
      });

      setAutocrement((prev) => (prev >= 9999 ? 1 : prev + 1));
      setNumberInfo((prevData) => ({
        ...prevData,
        number: generatedNumber,
        startTime: formatTime(currentTime),
        startDate: formatDate(currentTime),
        endTime: formatTime(endTime),
        endDate: formatDate(endTime),
      }));
      setIsSuccessModalOpen(true);
      localStorage.setItem("autocrement", String(autocrement));
      return docRef.id;
    } catch (error) {
      console.error("Lỗi khi tạo tài khoản:", error);
    }
  };

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const serviceRef = collection(db, "services");
        const snapshot = await getDocs(serviceRef);
        const serviceData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServiceData(serviceData);
      } catch (error) {
        console.log("Có lỗi xảy ra", error);
      }
    };
    fetchServiceData();
  }, []);

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
                value={numberInfo.serviceName}
                onChange={(e) =>
                  setNumberInfo((prevData) => ({
                    ...prevData,
                    serviceName: e.target.value,
                  }))
                }
              >
                <option value="">Chọn dịch vụ</option>
                {serviceData.map((data) => (
                  <option value={data.serviceName}>{data.serviceName}</option>
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
              <button className="cancel__button button w-115">Hủy bỏ</button>
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
          DV: {numberInfo.serviceName}
          <span className="modal__text__4"> (tại quầy số 1)</span>
        </div>
        <div className="custom__modal__footer mt-70">
          <div className="modal__text__5">
            Thời gian cấp: {numberInfo.startTime} {numberInfo.startDate}
          </div>
          <div className="modal__text__5 mt-5">
            Hạn sử dụng: {numberInfo.endTime} {numberInfo.endDate}
          </div>
        </div>
      </Modal>
    </Row>
  );
};

export default NumberAdd;
