import React, { useEffect, useState } from "react";
import "../List/style.css";
import { Col, DatePicker, Input, Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import SearchIcon from "../../../assets/images/fi_search.svg";
import AddIcon from "../../../assets/images/add-square.svg";
import { CaretRightOutlined } from "@ant-design/icons";
import usePagination from "../../../components/Pagination/Use";
import { ITEMS_PER_PAGE } from "../../../components/Pagination/Contants";
import Pagination from "../../../components/Pagination/Pagination";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchserviceData,
  selectserviceData,
} from "../../../redux/slice/Service/serviceSlice";
import {
  fetchnumberData,
  selectnumberData,
} from "../../../redux/slice/Number/saveNumberSlice";
import { format } from "date-fns";
import dayjs, { Dayjs } from "dayjs";
import CustomDatePicker from "../../../components/DatePicker";
import CustomSearchInput from "../../../components/SearchBar";
import SelectCustom from "../../../components/Select";

const NumberList = () => {
  const breadcrumbPaths = [{ label: "Cấp số" }, { label: "Danh sách cấp số" }];
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedSupply, setSelectedSupply] = useState("");
  const [selectedActive, setSelectedActive] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const serviceData = useSelector(selectserviceData);

  const numberData = useSelector(selectnumberData);

  useEffect(() => {
    dispatch(fetchserviceData());
    dispatch(fetchnumberData());
  }, [dispatch]);

  const { currentPage, totalPages, startIndex, endIndex, handlePageChange } =
    usePagination(numberData.length, ITEMS_PER_PAGE);

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

  const filteredData = numberData.filter(
    (data) =>
      (data.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
        (selectedActive === "" || data.active === selectedActive) &&
        (selectedService === "" || data.serviceId === selectedService) &&
        (selectedSupply === "" || data.supply === selectedSupply) &&
        startDate === "" &&
        endDate === "") ||
      (startDate &&
        endDate &&
        data.startDate >= startDate &&
        data.endDate <= endDate)
  );

  const currentNumberData = filteredData.slice(startIndex, endIndex);

  const serviceOptions = [
    { label: "Tất cả", value: "" },
    ...serviceData.map((data) => ({
      label: data.serviceName,
      value: data.id,
    })),
  ];

  const activeOptions = [
    { value: "", label: "Tất cả" },
    { value: "Đang chờ", label: "Đang chờ" },
    { value: "Đã sử dụng", label: "Đã sử dụng" },
    { value: "Bỏ qua", label: "Bỏ qua" },
  ];

  const supplyOptions = [
    { value: "", label: "Tất cả" },
    { value: "Kiosk", label: "Kiosk" },
    { value: "Hệ thống", label: "Hệ thống" },
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
          <div className="d-flex mt-15 mb-10">
            <div className="device__list__box">
              <label className="device__list__label">Tên dịch vụ</label>
              <br />
              <SelectCustom
                selectedValue={selectedService}
                options={serviceOptions}
                onSelectChange={setSelectedService}
                selectClassName="w-150"
              />
            </div>
            <div className="device__list__box ms-15">
              <label className="device__list__label">Tình trạng</label>
              <br />
              <SelectCustom
                selectedValue={selectedActive}
                options={activeOptions}
                onSelectChange={setSelectedActive}
                selectClassName="w-150"
              />
            </div>
            <div className="device__list__box ms-15">
              <label className="device__list__label">Nguồn cấp</label>
              <br />
              <SelectCustom
                selectedValue={selectedSupply}
                options={supplyOptions}
                onSelectChange={setSelectedSupply}
                selectClassName="w-150"
              />
            </div>
            <div className="device__list__box ms-15">
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

            <div className="device__list__box ms-15">
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
                  <th>STT</th>
                  <th>Tên khách hàng</th>
                  <th>Tên dịch vụ</th>
                  <th>Thời gian cấp</th>
                  <th>Hạn sử dụng</th>
                  <th>Trạng thái</th>
                  <th>Nguồn cấp</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentNumberData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.number}</td>
                    <td>{data.name}</td>
                    <td>
                      {
                        serviceData.find(
                          (service) => service.id === data.serviceId
                        )?.serviceName
                      }
                    </td>
                    <td>
                      {data.startTime} -{" "}
                      {format(new Date(data.startDate), "dd/MM/yyyy")}
                    </td>
                    <td>
                      {data.endTime} -{" "}
                      {format(new Date(data.endDate), "dd/MM/yyyy")}
                    </td>
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
                    <td>{data.supply}</td>
                    <td>
                      <Link to={`/numberallocaiton/detail/${data.id}`}>
                        Chi tiết
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/numberallocaiton/add">
              <div className="add__border">
                <img src={AddIcon} alt="Add Icon" />
                <p className="add__text">
                  Thêm <br /> số mới
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

export default NumberList;
