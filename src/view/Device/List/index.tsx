import React, { useEffect, useState } from "react";
import "../List/style.css";
import { Col, Input, Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import SearchIcon from "../../../assets/images/fi_search.svg";
import AddIcon from "../../../assets/images/add-square.svg";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination/Pagination";
import usePagination from "../../../components/Pagination/Use";
import { ITEMS_PER_PAGE } from "../../../components/Pagination/Contants";

const DeviceList = () => {
  const breadcrumbPaths = [
    { label: "Thiết bị" },
    { label: "Danh sách thiết bị" },
  ];

  const [deviceData, setDeviceData] = useState<DocumentData[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedActive, setSelectedActive] = useState("");
  const [selectedConnect, setSelectedConnect] = useState("");
  const [showFullService, setShowFullService] = useState(false);

  const handleToggleService = () => {
    setShowFullService(!showFullService);
  };

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        const deviceRef = collection(db, "devices");
        const snapshot = await getDocs(deviceRef);
        const deviceData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDeviceData(deviceData);
      } catch (error) {
        console.log("Có lỗi xảy ra", error);
      }
    };
    fetchDeviceData();
  }, []);

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
              <label className="device__list__label">Trạng thái kết nối</label>
              <br />
              <div className="select__custom">
                <select
                  className="device__list__select"
                  value={selectedConnect}
                  onChange={(e) => setSelectedConnect(e.target.value)}
                >
                  <option value="">Tất cả</option>
                  <option value="Kết nối">Kết nối</option>
                  <option value="Mất kết nối">Mất kết nối</option>
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
                      {data.service.length > 30 && !showFullService ? (
                        <>
                          {data.service.substring(0, 30)} ...
                          <br />
                          <span
                            className="show__more"
                            onClick={handleToggleService}
                          >
                            Xem thêm
                          </span>
                        </>
                      ) : (
                        data.service
                      )}
                      <br />
                      {showFullService && (
                        <span
                          className="show__more"
                          onClick={handleToggleService}
                        >
                          Ẩn đi
                        </span>
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
          />
        </Col>
      </Col>
    </Row>
  );
};

export default DeviceList;
