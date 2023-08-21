import React, { useState, useEffect } from "react";
import "../Detail/style.css";
import { Col, Input } from "antd";
import { Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import UpdateIcon from "../../../assets/images/Edit Square.svg";
import BackIcon from "../../../assets/images/back-square.svg";
import SearchIcon from "../../../assets/images/fi_search.svg";
import { CaretRightOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import usePagination from "../../../components/Pagination/Use";
import { ITEMS_PER_PAGE } from "../../../components/Pagination/Contants";
import Pagination from "../../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNumbersList,
  fetchserviceDetail,
  selectNumbersList,
  selectserviceDetail,
} from "./../../../redux/slice/Service/serviceSlice";
import { AppDispatch } from "../../../redux/store";
import { Link } from "react-router-dom";
import { Dayjs } from "dayjs";
import CustomDatePicker from "../../../components/DatePicker";
import CustomSearchInput from "../../../components/SearchBar";

const ServiceDetail = () => {
  const breadcrumbPaths = [
    { label: "Dịch vụ" },
    { label: "Danh sách dịch vụ" },
    { label: "Chi tiết" },
  ];

  const { id } = useParams();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedActive, setSelectedActive] = useState("");
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchserviceDetail(id));
      dispatch(fetchNumbersList(id));
    }
  }, [dispatch, id]);

  const numbersList = useSelector(selectNumbersList);
  const serviceInfo = useSelector(selectserviceDetail);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { currentPage, totalPages, startIndex, endIndex, handlePageChange } =
    usePagination(numbersList.length, ITEMS_PER_PAGE);

  const handleSearch = (keyword: any) => {
    setSearchKeyword(keyword);
    handlePageChange(1);
  };

  const handleStartDateChange = (date: Dayjs | null) => {
    const formattedDate = date ? date.format("YYYY-MM-DD") : "";
    setStartDate(formattedDate);
    handlePageChange(1);
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    const formattedDate = date ? date.format("YYYY-MM-DD") : "";
    setEndDate(formattedDate);
    handlePageChange(1);
  };

  const filteredData = numbersList.filter(
    (data) =>
      (data.number.toLowerCase().includes(searchKeyword.toLowerCase()) &&
        (selectedActive === "" || data.active === selectedActive) &&
        startDate === "" &&
        endDate === "") ||
      (startDate &&
        endDate &&
        data.startDate >= startDate &&
        data.endDate <= endDate)
  );

  const currentServiceData = filteredData.slice(startIndex, endIndex);

  return (
    <Row className="main__wrapper">
      <MenuPage />
      <Col span={20} className="main__bg">
        <Header breadcrumbPaths={breadcrumbPaths} />
        <Col span={24} className="ms-30">
          <div>
            <span className="title__text">Quản lý dịch vụ</span>
          </div>
          <div className="d-flex">
            <div className="service__detail__border mt-10">
              <p className="add__title pt-15 ms-15">Thông tin dịch vụ</p>
              <div className="d-flex ms-15 mt-20">
                <div>
                  <div className="device__add__box">
                    <label className="device__add__label">Mã dịch vụ:</label>
                    <span className="ms-30">{serviceInfo?.serviceCode}</span>
                  </div>
                  <div className="device__add__box mt-15">
                    <label className="device__add__label">Tên dịch vụ:</label>
                    <span style={{ marginLeft: "25px" }}>
                      {serviceInfo?.serviceName}
                    </span>
                  </div>
                  <div className="device__add__box mt-15">
                    <label className="device__add__label">Mô tả:</label>
                    <span style={{ marginLeft: "65px" }}>
                      {serviceInfo?.serviceDescription}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-15 ms-15">
                <p className="add__title">Quy tắc cấp số</p>
                {serviceInfo?.autoIncrement && (
                  <div className="d-flex items-center">
                    <div className="d-flex items-center">
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
                )}
                {serviceInfo?.hasPrefix && (
                  <div className="d-flex items-center mt-10">
                    <div className="d-flex items-center">
                      <div className="number__text">Prefix:</div>
                      <div className="number__box d-flex items-center content-center ms-85">
                        0001
                      </div>
                    </div>
                  </div>
                )}
                {serviceInfo?.hasSuffix && (
                  <div className="d-flex items-center mt-10">
                    <div className="d-flex items-center">
                      <div className="number__text">Surfix:</div>
                      <div className="number__box d-flex items-center content-center ms-85">
                        0001
                      </div>
                    </div>
                  </div>
                )}
                {serviceInfo?.resetDaily && (
                  <div className="d-flex items-center mt-15">
                    <div className="d-flex items-center">
                      <div className="number__text">Reset mỗi ngày</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="service__detail__border mt-10 ms-20 w-718 pt-15">
              <div className="ms-20">
                <div className="d-flex">
                  <div className="device__list__box">
                    <label className="device__list__label">Trạng thái</label>
                    <br />
                    <div className="select__custom">
                      <select
                        className="device__list__select w-160"
                        value={selectedActive}
                        onChange={(e) => setSelectedActive(e.target.value)}
                      >
                        <option value="">Tất cả</option>
                        <option value="Đang chờ">Đang chờ</option>
                        <option value="Đã sử dụng">Đã sử dụng</option>
                        <option value="Bỏ qua">Bỏ qua</option>
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
                  <div className="device__list__box ms-15">
                    <label className="device__list__label">
                      Chọn thời gian
                    </label>
                    <br />
                    <div className="d-flex items-center">
                      <CustomDatePicker
                        value={startDate}
                        onChange={handleStartDateChange}
                        className="w-130"
                      />
                      <CaretRightOutlined className="date__icon" />
                      <CustomDatePicker
                        value={endDate}
                        onChange={handleEndDateChange}
                        startDate={startDate}
                        className="w-130"
                      />
                    </div>
                  </div>
                  <div className="device__list__box ms-15">
                    <label className="device__list__label">Từ khóa</label>
                    <br />
                    <CustomSearchInput
                      className="w-200"
                      value={searchKeyword}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                </div>
                <table className="w-669 mt-15">
                  <thead>
                    <tr>
                      <th>Số thứ tự</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentServiceData.map((data, index) => (
                      <tr key={index}>
                        <td>{data.number}</td>
                        <td>
                          <span className="word__svg">
                            {data.active === "Đang chờ" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="9"
                                viewBox="0 0 8 9"
                                fill="none"
                              >
                                <circle cx="4" cy="4.5" r="4" fill="#4277FF" />
                              </svg>
                            ) : data.active === "Bỏ qua" ? (
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
                          <span className="ms-5">{data.active}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                style={{ marginRight: "30px" }}
              />
            </div>
          </div>
          <Link to={`/service/update/${id}`}>
            <div className="update__border">
              <img src={UpdateIcon} alt="Add Icon" />
              <p className="add__text">
                Cập nhật <br /> danh sách
              </p>
            </div>
          </Link>
          <Link to="/service">
            <div className="back__border">
              <img src={BackIcon} alt="Add Icon" />
              <p className="add__text">Quay lại</p>
            </div>
          </Link>
        </Col>
      </Col>
    </Row>
  );
};

export default ServiceDetail;
