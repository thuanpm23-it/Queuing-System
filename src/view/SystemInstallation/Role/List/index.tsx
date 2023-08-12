import React, { useState, useEffect } from "react";
import "../List/style.css";
import { Col, Input, Row } from "antd";
import MenuPage from "../../../../layout/Menu";
import Header from "../../../../layout/Header";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import Pagination from "../../../../components/Pagination/Pagination";
import { ITEMS_PER_PAGE } from "../../../../components/Pagination/Contants";
import usePagination from "../../../../components/Pagination/Use";
import { Link } from "react-router-dom";

interface UserCountsData {
  [key: string]: number;
}

const RoleList = () => {
  const [rolesList, setRolesList] = useState<DocumentData[]>([]);
  const [userCounts, setUserCounts] = useState<UserCountsData>({});

  useEffect(() => {
    const getRolesFromFirestore = async () => {
      try {
        const rolesCollectionRef = collection(db, "roles");
        const rolesSnapshot = await getDocs(rolesCollectionRef);
        const rolesList = rolesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRolesList(rolesList);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách vai trò:", error);
      }
    };

    getRolesFromFirestore();
  }, []);

  useEffect(() => {
    const getUserCounts = async () => {
      try {
        const usersCollectionRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollectionRef);

        const userCountsData: UserCountsData = {};
        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          const role = userData.role;

          if (userCountsData[role]) {
            userCountsData[role]++;
          } else {
            userCountsData[role] = 1;
          }
        });

        setUserCounts(userCountsData);
      } catch (error) {
        console.error("Lỗi khi lấy số lượng người dùng:", error);
      }
    };

    getUserCounts();
  }, []);

  const { currentPage, totalPages, startIndex, endIndex, handlePageChange } =
    usePagination(rolesList.length, ITEMS_PER_PAGE);

  const currentRoleData = rolesList.slice(startIndex, endIndex);
  const breadcrumbPaths = [
    { label: "Cài đặt hệ thống" },
    { label: "Quản lý vai trò" },
  ];
  return (
    <Row className="main__wrapper">
      <MenuPage />
      <Col span={20} className="main__bg">
        <Header breadcrumbPaths={breadcrumbPaths} />
        <Col span={24} className="ms-30">
          <div>
            <span className="title__text">Danh sách vai trò</span>
          </div>
          <div className="mb-10">
            <div className="device__list__box ms-400">
              <label className="device__list__label">Từ khóa</label>
              <br />
              <Input
                placeholder="Nhập từ khóa"
                className="device__list__select pe-35"
              />
              <div className="search__icon search__role">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                    stroke="#FF7506"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.5 17.5L13.875 13.875"
                    stroke="#FF7506"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Tên vai trò</th>
                  <th>Số người dùng</th>
                  <th>Mô tả</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentRoleData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.roleName}</td>
                    <td>{userCounts[data.roleName] || 0}</td>
                    <td>{data.roleDescription}</td>

                    <td>
                      <Link to={`/role/update/${data.id}`}>Cập nhật</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/role/add">
              <div className="add__border add__role">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    <path
                      d="M18.8884 2.3335H9.11171C4.86504 2.3335 2.33337 4.86516 2.33337 9.11183V18.8768C2.33337 23.1352 4.86504 25.6668 9.11171 25.6668H18.8767C23.1234 25.6668 25.655 23.1352 25.655 18.8885V9.11183C25.6667 4.86516 23.135 2.3335 18.8884 2.3335ZM18.6667 14.8752H14.875V18.6668C14.875 19.1452 14.4784 19.5418 14 19.5418C13.5217 19.5418 13.125 19.1452 13.125 18.6668V14.8752H9.33337C8.85504 14.8752 8.45837 14.4785 8.45837 14.0002C8.45837 13.5218 8.85504 13.1252 9.33337 13.1252H13.125V9.3335C13.125 8.85516 13.5217 8.4585 14 8.4585C14.4784 8.4585 14.875 8.85516 14.875 9.3335V13.1252H18.6667C19.145 13.1252 19.5417 13.5218 19.5417 14.0002C19.5417 14.4785 19.145 14.8752 18.6667 14.8752Z"
                      fill="#FF9138"
                    />
                  </svg>
                </div>

                <p className="add__text">
                  Thêm <br /> Vai trò
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

export default RoleList;
