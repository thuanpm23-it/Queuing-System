import React, { useEffect } from "react";
import "../Detail/style.css";
import { Col, Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServiceNumberDetail,
  fetchnumberDetail,
  selectnumberDetail,
} from "../../../redux/slice/Number/saveNumberSlice";
import { Link } from "react-router-dom";
import {
  fetchserviceData,
  selectserviceData,
} from "../../../redux/slice/Service/serviceSlice";

const NumberDetail = () => {
  const breadcrumbPaths = [
    { label: "Cấp số" },
    { label: "Danh sách cấp số" },
    { label: "Chi tiết" },
  ];

  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const numberData = useSelector(selectnumberDetail);
  const serviceData = useSelector(selectserviceData);

  useEffect(() => {
    if (id) {
      dispatch(fetchnumberDetail(id));
      dispatch(fetchServiceNumberDetail(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchserviceData());
  }, [dispatch]);

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
                    {
                      serviceData.find(
                        (service) => service.id === numberData?.serviceId
                      )?.serviceName
                    }
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
                    <span className="word__svg">
                      {numberData?.active === "Đang chờ" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="9"
                          viewBox="0 0 8 9"
                          fill="none"
                        >
                          <circle cx="4" cy="4.5" r="4" fill="#4277FF" />
                        </svg>
                      ) : numberData?.active === "Bỏ qua" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="9"
                          viewBox="0 0 8 9"
                          fill="none"
                        >
                          <circle cx="4" cy="4.5" r="4" fill="#E73F3F" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="9"
                          viewBox="0 0 8 9"
                          fill="none"
                        >
                          <circle cx="4" cy="4.5" r="4" fill="#7E7D88" />
                        </svg>
                      )}
                    </span>
                    <span className="ms-5">{numberData?.active}</span>
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
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path
                    d="M18.8885 2.33301H9.11183C4.86516 2.33301 2.3335 4.86467 2.3335 9.11134V18.8763C2.3335 23.1347 4.86516 25.6663 9.11183 25.6663H18.8768C23.1235 25.6663 25.6552 23.1347 25.6552 18.888V9.11134C25.6668 4.86467 23.1352 2.33301 18.8885 2.33301ZM16.2402 18.818H10.5002C10.0218 18.818 9.62516 18.4213 9.62516 17.943C9.62516 17.4647 10.0218 17.068 10.5002 17.068H16.2402C17.7335 17.068 18.9585 15.8547 18.9585 14.3497C18.9585 12.8447 17.7452 11.6313 16.2402 11.6313H10.3252L10.6285 11.9347C10.9668 12.2847 10.9668 12.833 10.6168 13.183C10.4418 13.358 10.2202 13.4397 9.9985 13.4397C9.77683 13.4397 9.55516 13.358 9.38016 13.183L7.5485 11.3397C7.21016 11.0013 7.21016 10.4413 7.5485 10.103L9.38016 8.27134C9.7185 7.93301 10.2785 7.93301 10.6168 8.27134C10.9552 8.60967 10.9552 9.16967 10.6168 9.50801L10.2318 9.89301H16.2402C18.7018 9.89301 20.7085 11.8997 20.7085 14.3613C20.7085 16.823 18.7018 18.818 16.2402 18.818Z"
                    fill="#FF9138"
                  />
                </svg>
              </div>
              <p className="add__text">Quay lại</p>
            </div>
          </Link>
        </Col>
      </Col>
    </Row>
  );
};

export default NumberDetail;
