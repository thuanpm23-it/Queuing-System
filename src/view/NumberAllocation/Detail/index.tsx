import React, { useEffect } from "react";
import "../Detail/style.css";
import { Col, Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import BackIcon from "../../../assets/images/back-square.svg";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServiceNumberDetail,
  fetchnumberDetail,
  selectServiceNumber,
  selectnumberDetail,
} from "../../../redux/slice/Number/saveNumberSlice";
import { Link } from "react-router-dom";

const NumberDetail = () => {
  const breadcrumbPaths = [
    { label: "Cấp số" },
    { label: "Danh sách cấp số" },
    { label: "Chi tiết" },
  ];

  return (
    <Row className="main__wrapper">
      <MenuPage />
      <Col span={20} className="main__bg">
        <Header breadcrumbPaths={breadcrumbPaths} />
        <Col span={24} className="ms-30">
          <div>
            <span className="title__text">Quản lý cấp số</span>
          </div>
          <div className="device__detail__border mt-10">
            <p className="add__title pt-15 ms-15">Thông tin cấp số</p>
            <div className="d-flex ms-15">
              <div>
                <div>
                  <span className="detail__text__1">Họ Tên:</span>
                  <span className="detail__text__2 ms-89">
                    {numberData?.name}
                  </span>
                </div>
                <div className="mt-20">
                  <span className="detail__text__1">Tên dịch vụ:</span>
                  <span className="detail__text__2 ms-60">
                    {serviceNumber?.serviceName}
                  </span>
                </div>
                <div className="mt-20">
                  <span className="detail__text__1">Số thứ tự:</span>
                  <span className="detail__text__2 ms-75">
                    {numberData?.number}
                  </span>
                </div>
                <div className="mt-20">
                  <span className="detail__text__1">Thời gian cấp:</span>
                  <span className="detail__text__2 ms-45">
                    {numberData?.startTime} - {numberData?.startDate}
                  </span>
                </div>
                <div className="mt-20">
                  <span className="detail__text__1">Hạn sử dụng:</span>
                  <span className="detail__text__2 ms-50">
                    {numberData?.endTime} - {numberData?.endDate}
                  </span>
                </div>
              </div>
              <div className="ms-250">
                <div>
                  <span className="detail__text__1">Nguồn cấp:</span>
                  <span className="detail__text__2 ms-80">
                    {numberData?.supply}
                  </span>
                </div>
                <div className="mt-20">
                  <span className="detail__text__1">Trạng thái:</span>
                  <span className="detail__text__2 ms-85">
                    {numberData?.active}
                  </span>
                </div>
                <div className="mt-20">
                  <span className="detail__text__1">Số điện thoại:</span>
                  <span className="detail__text__2 ms-62">
                    {numberData?.phone}
                  </span>
                </div>
                <div className="mt-20">
                  <span className="detail__text__1">Địa chỉ email:</span>
                  <span className="detail__text__2 ms-65">
                    {numberData?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Link to="/numberallocaiton">
            <div className="update__border">
              <img src={BackIcon} alt="Add Icon" />
              <p className="add__text">Quay lại</p>
            </div>
          </Link>
        </Col>
      </Col>
    </Row>
  );
};

export default NumberDetail;
