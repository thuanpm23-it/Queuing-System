import React, { useState, useEffect } from "react";
import "../List/style.css";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import SearchIcon from "../../../assets/images/fi_search.svg";
import AddIcon from "../../../assets/images/add-square.svg";
import { CaretRightOutlined } from "@ant-design/icons";
import { Col, Input, Row } from "antd";
import usePagination from "../../../components/Pagination/Use";
import { ITEMS_PER_PAGE } from "../../../components/Pagination/Contants";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination/Pagination";
import { AppDispatch } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchserviceData,
  selectserviceData,
} from "../../../redux/slice/Service/serviceSlice";
import { Dayjs } from "dayjs";
import CustomDatePicker from "../../../components/DatePicker";
import CustomSearchInput from "../../../components/SearchBar";
import SelectCustom from "../../../components/Select";

const ServiceList = () => {
  const breadcrumbPaths = [
    { label: "Dịch vụ" },
    { label: "Danh sách dịch vụ" },
  ];

  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedActive, setSelectedActive] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const serviceData = useSelector(selectserviceData);

  useEffect(() => {
    dispatch(fetchserviceData());
  }, [dispatch]);

  const { currentPage, totalPages, startIndex, endIndex, handlePageChange } =
    usePagination(serviceData.length, ITEMS_PER_PAGE);

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
  const filteredData = serviceData.filter(
    (data) =>
      data.serviceName.toLowerCase().includes(searchKeyword.toLowerCase()) &&
      (selectedActive === "" || data.active === selectedActive) &&
      ((startDate === "" && endDate === "") ||
        (startDate &&
          endDate &&
          data.creationDate >= startDate &&
          data.creationDate <= endDate))
  );

  const currentServiceData = filteredData.slice(startIndex, endIndex);
  const activeOptions = [
    { value: "", label: "Tất cả" },
    { value: "Hoạt động", label: "Hoạt động" },
    { value: "Ngưng hoạt động", label: "Ngưng hoạt động" },
  ];

  return (
    <Row className="main__wrapper">
      <MenuPage />
      <Col span={20} className="main__bg">
        <Header breadcrumbPaths={breadcrumbPaths} />
        <Col span={24} className="ms-30">
          <div>
            <span className="title__text">Quản lý dịch vụ</span>
          </div>
          <div className="d-flex mt-15 mb-10">
            <div className="device__list__box">
              <label className="device__list__label">
                Trạng thái hoạt động
              </label>
              <br />
              <SelectCustom
                selectedValue={selectedActive}
                options={activeOptions}
                onSelectChange={setSelectedActive}
              />
            </div>
            <div className="device__list__box ms-20">
              <label className="device__list__label">Chọn thời gian</label>
              <br />
              <div className="d-flex items-center">
                <CustomDatePicker
                  value={startDate}
                  onChange={handleStartDateChange}
                />
                <CaretRightOutlined className="date__icon" />
                <CustomDatePicker
                  value={endDate}
                  onChange={handleEndDateChange}
                  startDate={startDate}
                />
              </div>
            </div>
            <div className="device__list__box ms-190">
              <label className="device__list__label">Từ khóa</label>
              <br />
              <CustomSearchInput
                value={searchKeyword}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th style={{ width: "100px" }}>Mã dịch vụ</th>
                  <th style={{ width: "150px" }}>Tên dịch vụ</th>
                  <th>Mô tả</th>
                  <th style={{ width: "150px" }}>Trạng hoạt động</th>
                  <th style={{ width: "100px" }}></th>
                  <th style={{ width: "100px" }}></th>
                </tr>
              </thead>
              <tbody>
                {currentServiceData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.serviceCode}</td>
                    <td>{data.serviceName}</td>
                    <td>{data.serviceDescription}</td>
                    <td>
                      <span className="word__svg">
                        {data.active === "Hoạt động" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="8"
                            height="9"
                            viewBox="0 0 8 9"
                            fill="none"
                          >
                            <circle cx="4" cy="4.5" r="4" fill="#34CD26" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="8"
                            height="9"
                            viewBox="0 0 8 9"
                            fill="none"
                          >
                            <circle cx="4" cy="4.5" r="4" fill="#EC3740" />
                          </svg>
                        )}
                      </span>
                      <span className="ms-5">{data.active}</span>
                    </td>

                    <td>
                      <Link to={`/service/detail/${data.id}`}>Chi tiết</Link>
                    </td>
                    <td>
                      <Link to={`/service/update/${data.id}`}>Cập nhật</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/service/add">
              <div className="add__border">
                <img src={AddIcon} alt="Add Icon" />
                <p className="add__text">
                  Thêm
                  <br /> Dịch vụ
                </p>
              </div>
            </Link>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Col>
    </Row>
  );
};

export default ServiceList;
