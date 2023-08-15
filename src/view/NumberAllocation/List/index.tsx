import React, { useEffect, useState } from "react";
import "../List/style.css";
import { Col, Input, Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import SearchIcon from "../../../assets/images/fi_search.svg";
import AddIcon from "../../../assets/images/add-square.svg";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import usePagination from "../../../components/Pagination/Use";
import { ITEMS_PER_PAGE } from "../../../components/Pagination/Contants";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import Pagination from "../../../components/Pagination/Pagination";
import { Link } from "react-router-dom";

const NumberList = () => {
  const breadcrumbPaths = [{ label: "Cấp số" }, { label: "Danh sách cấp số" }];
  const [numberData, setNumberData] = useState<DocumentData[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedSupply, setSelectedSupply] = useState("");
  const [selectedActive, setSelectedActive] = useState("");
  const [serviceData, setServiceData] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const serviceRef = collection(db, "services");
        const snapshot = await getDocs(serviceRef);
        const serviceData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServiceData(serviceData);
      } catch (error) {
        console.log("Có lỗi xảy ra", error);
      }
    };
    fetchServiceData();
  }, []);

  useEffect(() => {
    const fetchNumberData = async () => {
      try {
        const numberRef = collection(db, "numbers");
        const snapshot = await getDocs(numberRef);
        const numberData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNumberData(numberData);
      } catch (error) {
        console.log("Có lỗi xảy ra", error);
      }
    };
    fetchNumberData();
  }, []);

  const { currentPage, totalPages, startIndex, endIndex, handlePageChange } =
    usePagination(numberData.length, ITEMS_PER_PAGE);

  const handleSearch = (keyword: any) => {
    setSearchKeyword(keyword);
    handlePageChange(1);
  };

  const filteredData = numberData.filter(
    (data) =>
      data.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
      (selectedActive === "" || data.active === selectedActive) &&
      (selectedService === "" || data.serviceName === selectedService) &&
      (selectedSupply === "" || data.supply === selectedSupply)
  );

  const currentNumberData = filteredData.slice(startIndex, endIndex);

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
              <div className="select__custom">
                <select
                  className="device__list__select w-150"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option value="">Tất cả</option>
                  {serviceData.map((data) => (
                    <option value={data.serviceName}>{data.serviceName}</option>
                  ))}
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
              <label className="device__list__label">Tình trạng</label>
              <br />
              <div className="select__custom">
                <select
                  className="device__list__select w-150"
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
              <label className="device__list__label">Nguồn cấp</label>
              <br />
              <div className="select__custom">
                <select
                  className="device__list__select w-150"
                  value={selectedSupply}
                  onChange={(e) => setSelectedSupply(e.target.value)}
                >
                  <option value="">Tất cả</option>
                  <option value="Kiosk">Kiosk</option>
                  <option value="Hệ thống">Hệ thống</option>
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
              <label className="device__list__label">Chọn thời gian</label>
              <br />
              <div className="d-flex items-center">
                <Input type="date" className="date__input" />
                <CaretRightOutlined className="date__icon" />
                <Input type="date" className="date__input" />
              </div>
            </div>

            <div className="device__list__box ms-15">
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
                    <td>{data.serviceName}</td>
                    <td>
                      {data.startTime} - {data.startDate}
                    </td>
                    <td>
                      {data.endTime} - {data.endDate}
                    </td>
                    <td>
                      {" "}
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
            <div className="add__border">
              <img src={AddIcon} alt="Add Icon" />
              <p className="add__text">
                Thêm <br /> số mới
              </p>
            </div>
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
