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

const NumberAdd = () => {
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
