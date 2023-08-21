import React, { useEffect, useState } from "react";
import "../List/style.css";
import { Col, Input, Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import SearchIcon from "../../../assets/images/fi_search.svg";
import AddIcon from "../../../assets/images/add-square.svg";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination/Pagination";
import usePagination from "../../../components/Pagination/Use";
import { ITEMS_PER_PAGE } from "../../../components/Pagination/Contants";
import { AppDispatch } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchdeviceData,
  selectdeviceData,
} from "../../../redux/slice/Device/deviceSlice";
import {
  fetchserviceData,
  selectserviceData,
} from "../../../redux/slice/Service/serviceSlice";
import CustomSearchInput from "../../../components/SearchBar";
import SelectCustom from "../../../components/Select";

const DeviceList = () => {
  const breadcrumbPaths = [
    { label: "Thiết bị" },
    { label: "Danh sách thiết bị" },
  ];

  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedActive, setSelectedActive] = useState("");
  const [selectedConnect, setSelectedConnect] = useState("");
  const [expandedDeviceId, setExpandedDeviceId] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const deviceData = useSelector(selectdeviceData);
  const serviceData = useSelector(selectserviceData);

  useEffect(() => {
    dispatch(fetchdeviceData());
    dispatch(fetchserviceData());
  }, [dispatch]);

  const handleToggleService = (deviceId: string) => {
    if (expandedDeviceId === deviceId) {
      setExpandedDeviceId("");
    } else {
      setExpandedDeviceId(deviceId);
    }
  };

  const { currentPage, totalPages, startIndex, endIndex, handlePageChange } =
    usePagination(deviceData.length, ITEMS_PER_PAGE);

  const handleSearch = (keyword: any) => {
    setSearchKeyword(keyword);
    handlePageChange(1);
  };

  const filteredData = deviceData.filter(
    (data) =>
      data.deviceName.toLowerCase().includes(searchKeyword.toLowerCase()) &&
      (selectedActive === "" || data.active === selectedActive) &&
      (selectedConnect === "" || data.connect === selectedConnect)
  );
  const currentAccountData = filteredData.slice(startIndex, endIndex);

  const options = [
    { value: "", label: "Tất cả" },
    { value: "Kết nối", label: "Kết nối" },
    { value: "Mất kết nối", label: "Mất kết nối" },
  ];

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
            <span className="title__text">Danh sách thiết bị</span>
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
              <label className="device__list__label">Trạng thái kết nối</label>
              <br />
              <SelectCustom
                selectedValue={selectedConnect}
                options={options}
                onSelectChange={setSelectedConnect}
              />
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
                  <th>Mã thiết bị</th>
                  <th>Tên thiết bị</th>
                  <th>Địa chỉ IP</th>
                  <th>Trạng hoạt động</th>
                  <th>Trạng thái kết nối</th>
                  <th>Dịch vụ sử dụng</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentAccountData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.deviceCode}</td>
                    <td>{data.deviceName}</td>
                    <td>{data.ipAddress}</td>
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
                      <span className="word__svg">
                        {data.connect === "Kết nối" ? (
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
                      <span className="ms-5">{data.connect}</span>
                    </td>
                    <td style={{ width: "280px" }}>
                      {data.service.length > 2 &&
                      data.id === expandedDeviceId ? (
                        <>
                          {data.service.map(
                            (serviceId: string, index: number) => (
                              <span key={serviceId}>
                                {serviceData
                                  .filter((service) => service.id === serviceId)
                                  .map((service) => service.serviceName)}
                                {index !== data.service.length - 1 && ", "}
                              </span>
                            )
                          )}
                          <br />
                          <span
                            className="show__more"
                            onClick={() => handleToggleService(data.id)}
                          >
                            Ẩn đi
                          </span>
                        </>
                      ) : (
                        <>
                          {data.service
                            .slice(0, 2)
                            .map((serviceId: string, index: number) => (
                              <span key={serviceId}>
                                {serviceData
                                  .filter((service) => service.id === serviceId)
                                  .map((service) => service.serviceName)}
                                {index !== data.service.length - 1 && ", "}
                              </span>
                            ))}
                          {data.service.length > 2 && (
                            <>
                              {"..."}
                              <br />
                              <span
                                className="show__more"
                                onClick={() => handleToggleService(data.id)}
                              >
                                Xem thêm
                              </span>
                            </>
                          )}
                        </>
                      )}
                    </td>

                    <td>
                      <Link to={`/device/detail/${data.id}`}>Chi tiết</Link>
                    </td>
                    <td>
                      <Link to={`/device/update/${data.id}`}>Cập nhật</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/device/add">
              <div className="add__border">
                <img src={AddIcon} alt="Add Icon" />
                <p className="add__text">
                  Thêm <br /> thiết bị
                </p>
              </div>
            </Link>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            style={{ marginTop: "45px" }}
          />
        </Col>
      </Col>
    </Row>
  );
};

export default DeviceList;
