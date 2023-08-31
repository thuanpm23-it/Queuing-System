import React, { useState, useEffect } from "react";
import "../UserLog/style.css";
import { CaretRightOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";
import CustomDatePicker from "../../../components/DatePicker";
import CustomSearchInput from "../../../components/SearchBar";
import {
  fetchUserLogData,
  selectUserLogData,
} from "../../../redux/slice/UserLog/userlogSlice";
import { AppDispatch } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import usePagination from "../../../components/Pagination/Use";
import { ITEMS_PER_PAGE } from "../../../components/Pagination/Contants";
import {
  fetchAccountData,
  selectAccountData,
} from "../../../redux/slice/Account/accountSlice";
import Pagination from "../../../components/Pagination/Pagination";
import { format } from "date-fns";
import { Dayjs } from "dayjs";

const UserLogList = () => {
  const breadcrumbPaths = [
    { label: "Cài đặt hệ thống" },
    { label: "Nhật ký hoạt động" },
  ];

  const [searchKeyword, setSearchKeyword] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const userlogData = useSelector(selectUserLogData);
  const accountData = useSelector(selectAccountData);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    dispatch(fetchUserLogData());
    dispatch(fetchAccountData());
  }, [dispatch]);

  const { currentPage, totalPages, startIndex, endIndex, handlePageChange } =
    usePagination(userlogData.length, ITEMS_PER_PAGE);

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

  const filteredData = userlogData.filter((data) => {
    const user = accountData.find((user) => user.id === data.userId);
    const username = user?.username || "";

    return (
      (username.toLowerCase().includes(searchKeyword.toLowerCase()) &&
        startDate === "" &&
        endDate === "") ||
      (startDate && endDate && data.date >= startDate && data.date <= endDate)
    );
  });

  const currentAccountData = filteredData.slice(startIndex, endIndex);
  return (
    <Row className="main__wrapper">
      <MenuPage />
      <Col span={20} className="main__bg">
        <Header breadcrumbPaths={breadcrumbPaths} />
        <Col span={24} className="ms-30">
          <div className="d-flex mt-15 mb-10">
            <div className="device__list__box">
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
            <div className="device__list__box ms-510">
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
                  <th>Tên đăng nhập</th>
                  <th>Thời gian tác động</th>
                  <th>IP thực hiện</th>
                  <th>Thao tác thực hiện</th>
                </tr>
              </thead>
              <tbody>
                {currentAccountData.map((data, index) => (
                  <tr key={index}>
                    <td>
                      {
                        accountData.find((user) => user.id === data.userId)
                          ?.username
                      }
                    </td>
                    <td>
                      {format(new Date(data.date), "dd/MM/yyyy")} {data.time}
                    </td>
                    <td>{data.userIP}</td>
                    <td>{data.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default UserLogList;
