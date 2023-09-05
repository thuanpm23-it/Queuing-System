import React, { useEffect, useState } from "react";
import "../List/style.css";
import { Col, Row } from "antd";
import MenuPage from "../../../../layout/Menu/index";
import Header from "../../../../layout/Header";
import { Link } from "react-router-dom";
import Pagination from "../../../../components/Pagination/Pagination";
import usePagination from "../../../../components/Pagination/Use";
import { ITEMS_PER_PAGE } from "../../../../components/Pagination/Contants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import {
  fetchAccountData,
  selectAccountData,
} from "../../../../redux/slice/Account/accountSlice";
import {
  fetchRoleData,
  selectRoleData,
} from "../../../../redux/slice/Role/slice";
import CustomSearchInput from "../../../../components/SearchBar";
import SelectCustom from "../../../../components/Select";

const AccountList = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const accountData = useSelector(selectAccountData);
  const roleData = useSelector(selectRoleData);

  useEffect(() => {
    dispatch(fetchAccountData());
    dispatch(fetchRoleData());
  }, [dispatch]);

  const { currentPage, totalPages, startIndex, endIndex, handlePageChange } =
    usePagination(accountData.length, ITEMS_PER_PAGE);

  const handleSearch = (keyword: any) => {
    setSearchKeyword(keyword);
    handlePageChange(1);
  };

  const filteredData = accountData.filter(
    (data) =>
      data.fullName.toLowerCase().includes(searchKeyword.toLowerCase()) &&
      (selectedRole === "" || data.role === selectedRole)
  );
  const currentAccountData = filteredData.slice(startIndex, endIndex);

  const breadcrumbPaths = [
    { label: "Cài đặt hệ thống" },
    { label: "Quản lý tài khoản" },
  ];

  const roleOptions = [
    { label: "Tất cả", value: "" },
    ...roleData.map((data) => ({
      label: data.roleName,
      value: data.id,
    })),
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
              <label className="device__list__label">Tên vài trò</label>
              <br />

              <SelectCustom
                selectedValue={selectedRole}
                options={roleOptions}
                onSelectChange={setSelectedRole}
              />
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
                  <th>Họ tên</th>
                  <th>Số điện thoại</th>
                  <th>Email</th>
                  <th>Vai trò</th>
                  <th>Trạng thái hoạt động</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentAccountData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.username}</td>
                    <td>{data.fullName}</td>
                    <td>{data.phoneNumber}</td>
                    <td>{data.email}</td>
                    <td>
                      {roleData.find((role) => role.id === data.role)?.roleName}
                    </td>
                    <td>
                      <span className="word__svg">
                        {data.status === "Hoạt động" ? (
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
                      <span className="ms-5">{data.status}</span>
                    </td>
                    <td>
                      <Link to={`/setting/account/update/${data.id}`}>
                        Cập nhật
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/setting/account/add">
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
                  Thêm <br /> tài khoản
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

export default AccountList;
