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

const ServiceList = () => {
  const breadcrumbPaths = [
    { label: "Dịch vụ" },
    { label: "Danh sách dịch vụ" },
  ];

  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedActive, setSelectedActive] = useState("");

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

  const filteredData = serviceData.filter(
    (data) =>
      data.serviceName.toLowerCase().includes(searchKeyword.toLowerCase()) &&
      (selectedActive === "" || data.active === selectedActive)
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
          <div className="d-flex mt-15 mb-10">
            <div className="device__list__box">
              <label className="device__list__label">
                Trạng thái hoạt động
              </label>
              <br />
              <div className="select__custom">
                <select
                  className="device__list__select"
                  value={selectedActive}
                  onChange={(e) => setSelectedActive(e.target.value)}
                >
                  <option value="">Tất cả</option>
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Ngưng hoạt động">Ngưng hoạt động</option>
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
            <div className="device__list__box ms-20">
              <label className="device__list__label">Chọn thời gian</label>
              <br />
              <div className="d-flex items-center">
                <Input type="date" className="date__input" />
                <CaretRightOutlined className="date__icon" />
                <Input type="date" className="date__input" />
              </div>
            </div>
            <div className="device__list__box ms-190">
              <label className="device__list__label">Từ khóa</label>
              <br />
              <Input
                placeholder="Nhập từ khóa"
                className="device__list__select pe-35"
                value={searchKeyword}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <img src={SearchIcon} className="search__icon" alt="" />
            </div>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Mã dịch vụ</th>
                  <th>Tên dịch vụ</th>
                  <th>Mô tả</th>
                  <th>Trạng hoạt động</th>
                  <th></th>
                  <th></th>
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
