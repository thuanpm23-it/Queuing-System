import React, { useState, useEffect } from "react";
import { Col, Input, Modal, Row } from "antd";
import "../Add/style.css";
import MenuPage from "../../../../layout/Menu";
import TextArea from "antd/es/input/TextArea";
import Header from "../../../../layout/Header";
import CheckBox from "../../../../components/Checkbox";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchUserIPAsync,
  selectUserIP,
} from "../../../../redux/slice/UserLog/userlogSlice";
import { AppDispatch } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import UserDataUtil from "../../../../components/UserData";
import { format } from "date-fns";

const RoleAdd = () => {
  const breadcrumbPaths = [
    { label: "Cài đặt hệ thống" },
    { label: "Quản lý vai trò" },
    { label: "Thêm vai trò" },
  ];

  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [selectedGroupA, setSelectedGroupA] = useState<string[]>([]);
  const [selectedGroupB, setSelectedGroupB] = useState<string[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const userIP = useSelector(selectUserIP);
  const userData1 = UserDataUtil();
  const navigate = useNavigate();

  const [selectAll, setSelectAll] = useState(false);
  const [selectAllB, setSelectAllB] = useState(false);
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: "Checkbox 1", checked: false },
    { id: 2, label: "Checkbox 2", checked: false },
    { id: 3, label: "Checkbox 3", checked: false },
  ]);
  const [checkboxesB, setCheckboxesB] = useState([
    { id: 1, label: "Checkbox 1", checked: false },
    { id: 2, label: "Checkbox 2", checked: false },
    { id: 3, label: "Checkbox 3", checked: false },
  ]);

  const handleCheckboxChange = (id: any) => {
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === id
        ? { ...checkbox, checked: !checkbox.checked }
        : checkbox
    );
    setCheckboxes(updatedCheckboxes);
    setSelectAll(updatedCheckboxes.every((checkbox) => checkbox.checked));
    const selectedValues = updatedCheckboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.label);
    setSelectedGroupA(selectedValues);
  };

  const handleCheckboxBChange = (id: any) => {
    const updatedCheckboxesB = checkboxesB.map((checkbox) =>
      checkbox.id === id
        ? { ...checkbox, checked: !checkbox.checked }
        : checkbox
    );
    setCheckboxesB(updatedCheckboxesB);
    setSelectAllB(updatedCheckboxesB.every((checkbox) => checkbox.checked));

    const selectedValuesB = updatedCheckboxesB
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.label);
    setSelectedGroupB(selectedValuesB);
  };

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const updatedCheckboxes = checkboxes.map((checkbox) => ({
      ...checkbox,
      checked: newSelectAll,
    }));
    setCheckboxes(updatedCheckboxes);

    const selectedValues = updatedCheckboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.label);
    setSelectedGroupA(selectedValues);
  };

  const handleSelectAllBChange = () => {
    const newSelectAllB = !selectAllB;
    setSelectAllB(newSelectAllB);

    const updatedCheckboxesB = checkboxesB.map((checkbox) => ({
      ...checkbox,
      checked: newSelectAllB,
    }));
    setCheckboxesB(updatedCheckboxesB);

    const selectedValuesB = updatedCheckboxesB
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.label);
    setSelectedGroupB(selectedValuesB);
  };

  useEffect(() => {
    dispatch(fetchUserIPAsync());
  }, [dispatch]);
  const handleAddRole = async () => {
    try {
      if (!roleName || !roleDescription) {
        Modal.error({ content: "Vui lòng điền đầy đủ thông tin." });
        return;
      }
      const newRole = {
        roleName,
        roleDescription,
        selectedGroupA,
        selectedGroupB,
      };
      const docRef = await addDoc(collection(db, "roles"), newRole);
      console.log("Vai trò đã được thêm vào Firestore với ID:", docRef.id);
      Modal.success({ content: "Thêm vai trò thành công." });
      const userLogDocRef = collection(db, "userlogs");
      const logInfo = {
        userId: userData1.id,
        time: format(new Date(new Date().getTime()), "HH:mm"),
        date: format(new Date(), "yyyy-MM-dd"),
        userIP: userIP,
        comment: `Thêm vai trò ${roleName}`,
      };
      await addDoc(userLogDocRef, logInfo);
      navigate("/setting/role");
    } catch (error) {
      console.error("Lỗi khi thêm vai trò:", error);
    }
  };

  return (
    <Row className="main__wrapper">
      <MenuPage />
      <Col span={20} className="main__bg">
        <Header breadcrumbPaths={breadcrumbPaths} />
        <Col span={24} className="ms-30">
          <div>
            <span className="title__text">Quản lý vai trò</span>
          </div>
          <div className="device__add__border mt-10">
            <p className="add__title pt-15 ms-15">Thông tin vai trò</p>
            <div className="d-flex content-center mt-20">
              <div>
                <div className="device__add__box">
                  <label className="device__add__label">
                    Tên vài trò: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <Input
                    className="device__add__input mt-5"
                    placeholder="Nhập tên vài trò"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                  />
                </div>
                <div className="device__add__box mt-15">
                  <label className="device__add__label">Mô tả:</label>
                  <br />
                  <TextArea
                    className="service__textarea device__add__input mt-5"
                    placeholder="Mô tả dịch vụ"
                    value={roleDescription}
                    onChange={(e) => setRoleDescription(e.target.value)}
                  />
                </div>
                <div className="device__add__box mt-15 ">
                  <p className="required__text mt-15">
                    <strong className="text-danger">*</strong> Là trường thông
                    tin bắt buộc
                  </p>
                </div>
              </div>
              <div className="ms-20">
                <div className="device__add__box">
                  <label className="device__add__label">
                    Phân quyền chức năng <span className="text-danger">*</span>
                  </label>
                  <br />
                  <div className="role__border mt-5 pt-15">
                    <div className="ms-20">
                      <div>
                        <div className="role__text__1">Nhóm chức năng A</div>
                        <div className="d-flex items-center mt-10">
                          <CheckBox
                            label="Tất cả"
                            checked={selectAll}
                            onChange={handleSelectAllChange}
                          />
                        </div>
                        {checkboxes.map((checkbox) => (
                          <div
                            key={checkbox.id}
                            className="d-flex items-center mt-10"
                          >
                            <CheckBox
                              label={checkbox.label}
                              checked={checkbox.checked}
                              onChange={() => handleCheckboxChange(checkbox.id)}
                            />
                          </div>
                        ))}
                        <div className="mt-20">
                          <div className="role__text__1">Nhóm chức năng B</div>
                          <div className="d-flex items-center mt-10">
                            <CheckBox
                              label="Select All (Group B)"
                              checked={selectAllB}
                              onChange={handleSelectAllBChange}
                            />
                          </div>
                          {checkboxesB.map((checkbox) => (
                            <div
                              key={checkbox.id}
                              className="d-flex items-center mt-10"
                            >
                              <CheckBox
                                label={checkbox.label}
                                checked={checkbox.checked}
                                onChange={() =>
                                  handleCheckboxBChange(checkbox.id)
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex ms-410 mt-30">
            <Link to="/setting/role" className="link">
              <button className="cancel__button button">Hủy bỏ</button>
            </Link>
            <button
              className="add__button button ms-20"
              onClick={handleAddRole}
            >
              Thêm
            </button>
          </div>
        </Col>
      </Col>
    </Row>
  );
};

export default RoleAdd;
