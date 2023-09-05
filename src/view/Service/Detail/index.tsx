import React, { useState, useEffect } from "react";
import "../Detail/style.css";
import { Col } from "antd";
import { Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
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
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.443 0.345066C19.1213 0.240174 20.7762 0.822905 22.0233 1.96506C23.1655 3.2121 23.7482 4.86705 23.655 6.55697V17.4424C23.7599 19.1323 23.1655 20.7873 22.035 22.0343C20.7879 23.1764 19.1213 23.7592 17.443 23.6543H6.55751C4.86758 23.7592 3.21261 23.1764 1.96556 22.0343C0.823397 20.7873 0.240662 19.1323 0.345554 17.4424V6.55697C0.240662 4.86705 0.823397 3.2121 1.96556 1.96506C3.21261 0.822905 4.86758 0.240174 6.55751 0.345066H17.443ZM10.8115 17.6522L18.6551 9.7853C19.366 9.06271 19.366 7.89725 18.6551 7.18632L17.14 5.67122C16.4174 4.94864 15.2519 4.94864 14.5293 5.67122L13.7485 6.46374C13.6319 6.58028 13.6319 6.77841 13.7485 6.89496C13.7485 6.89496 15.6016 8.73638 15.6365 8.783C15.7647 8.92286 15.8463 9.10933 15.8463 9.31911C15.8463 9.73868 15.5083 10.0883 15.0771 10.0883C14.879 10.0883 14.6925 10.0067 14.5643 9.87854L12.618 7.94387C12.5247 7.85063 12.3616 7.85063 12.2683 7.94387L6.70902 13.5031C6.32442 13.8877 6.10298 14.4005 6.09132 14.9483L6.02139 17.7104C6.02139 17.8619 6.06801 18.0018 6.17291 18.1067C6.2778 18.2116 6.41765 18.2699 6.56917 18.2699H9.30802C9.86745 18.2699 10.4036 18.0484 10.8115 17.6522Z"
                    fill="#FF9138"
                  />
                </svg>
              </div>
              <p className="add__text">
                Cập nhật <br /> danh sách
              </p>
            </div>
          </Link>
          <Link to="/service">
            <div className="back__border">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="29"
                  viewBox="0 0 28 29"
                  fill="none"
                >
                  <path
                    d="M18.8885 2.54004H9.1235C4.86516 2.54004 2.3335 5.07171 2.3335 9.31837V19.0834C2.3335 23.33 4.86516 25.8617 9.11183 25.8617H18.8768C23.1235 25.8617 25.6552 23.33 25.6552 19.0834V9.31837C25.6668 5.07171 23.1352 2.54004 18.8885 2.54004Z"
                    fill="#FF7506"
                  />
                  <path
                    d="M16.2398 10.1H10.2315L10.6165 9.71503C10.9548 9.37669 10.9548 8.81669 10.6165 8.47836C10.2782 8.14003 9.71818 8.14003 9.37985 8.47836L7.54818 10.31C7.20985 10.6484 7.20985 11.2084 7.54818 11.5467L9.37985 13.3784C9.55485 13.5534 9.77652 13.635 9.99818 13.635C10.2198 13.635 10.4415 13.5534 10.6165 13.3784C10.9548 13.04 10.9548 12.48 10.6165 12.1417L10.3132 11.8384H16.2398C17.7332 11.8384 18.9582 13.0517 18.9582 14.5567C18.9582 16.0617 17.7448 17.275 16.2398 17.275H10.4998C10.0215 17.275 9.62485 17.6717 9.62485 18.15C9.62485 18.6284 10.0215 19.025 10.4998 19.025H16.2398C18.7015 19.025 20.7082 17.0184 20.7082 14.5567C20.7082 12.095 18.7015 10.1 16.2398 10.1Z"
                    fill="#FFF2E7"
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

export default ServiceDetail;
