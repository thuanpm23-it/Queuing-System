import React, { useEffect, useState } from "react";
import "../List/style.css";
import { Col, Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
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
import { Dayjs } from "dayjs";
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
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    <path
                      d="M18.8884 2.33301H9.11171C4.86504 2.33301 2.33337 4.86467 2.33337 9.11134V18.8763C2.33337 23.1347 4.86504 25.6663 9.11171 25.6663H18.8767C23.1234 25.6663 25.655 23.1347 25.655 18.888V9.11134C25.6667 4.86467 23.135 2.33301 18.8884 2.33301ZM18.6667 14.8747H14.875V18.6663C14.875 19.1447 14.4784 19.5413 14 19.5413C13.5217 19.5413 13.125 19.1447 13.125 18.6663V14.8747H9.33337C8.85504 14.8747 8.45837 14.478 8.45837 13.9997C8.45837 13.5213 8.85504 13.1247 9.33337 13.1247H13.125V9.33301C13.125 8.85467 13.5217 8.45801 14 8.45801C14.4784 8.45801 14.875 8.85467 14.875 9.33301V13.1247H18.6667C19.145 13.1247 19.5417 13.5213 19.5417 13.9997C19.5417 14.478 19.145 14.8747 18.6667 14.8747Z"
                      fill="#FF9138"
                    />
                  </svg>
                </div>
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
