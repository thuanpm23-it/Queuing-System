import React, { useEffect, useState } from "react";
import { Col, Input, Row } from "antd";
import "../Add/style.css";
import MenuPage from "../../../../layout/Menu";
import TextArea from "antd/es/input/TextArea";
import Header from "../../../../layout/Header";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { useParams } from "react-router-dom";
import CheckBox from "../../../../components/Checkbox";

const RoleUpdate = () => {
  const breadcrumbPaths = [
    { label: "Cài đặt hệ thống" },
    { label: "Quản lý vai trò" },
    { label: "Cập nhật vai trò" },
  ];

  const { id } = useParams();
  const [roleData, setRoleData] = useState<DocumentData>({
    roleName: "",
    roleDescription: "",
  });

  const [selectedGroupA, setSelectedGroupA] = useState<string[]>([]);
  const [selectedGroupB, setSelectedGroupB] = useState<string[]>([]);

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

  const handleUpdateRole = async () => {
    try {
      const roleColection = collection(db, "roles");
      const roleRef = doc(roleColection, id);
      await updateDoc(roleRef, {
        roleName: roleData.roleName,
        roleDescription: roleData.roleDescription,
        selectedGroupA,
        selectedGroupB,
      });

      console.log("Vai trò đã được cập nhật trong Firestore với ID:", id);
    } catch (error) {
      console.error("Lỗi khi cập nhật vai trò:", error);
    }
  };

  useEffect(() => {
    const getRoleFromFirestore = async () => {
      try {
        const roleCollection = collection(db, "roles");
        const roleRef = doc(roleCollection, id);
        const roleSnapshot = await getDoc(roleRef);
        if (roleSnapshot.exists()) {
          const data = roleSnapshot.data();
          setRoleData(data);
          setSelectedGroupA(data.selectedGroupA);
          setSelectedGroupB(data.selectedGroupB);
          const updatedCheckboxes = checkboxes.map((checkbox) => ({
            ...checkbox,
            checked: data.selectedGroupA.includes(checkbox.label),
          }));
          setCheckboxes(updatedCheckboxes);
          setSelectAll(updatedCheckboxes.every((checkbox) => checkbox.checked));
          const updatedCheckboxesB = checkboxesB.map((checkbox) => ({
            ...checkbox,
            checked: data.selectedGroupB.includes(checkbox.label),
          }));
          setCheckboxesB(updatedCheckboxesB);
          setSelectAllB(
            updatedCheckboxesB.every((checkbox) => checkbox.checked)
          );
        }
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };

    getRoleFromFirestore();
  }, [id]);

  return (
    <Row className="main__wrapper">
      <MenuPage />
      <Col span={20} className="main__bg">
        <Header breadcrumbPaths={breadcrumbPaths} />
        <Col span={24} className="ms-30">
          <div>
            <span className="title__text">Cập nhật vai trò</span>
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
                    value={roleData.roleName}
                    onChange={(e) =>
                      setRoleData((prevData) => ({
                        ...prevData,
                        roleName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="device__add__box mt-15">
                  <label className="device__add__label">Mô tả:</label>
                  <br />
                  <TextArea
                    className="service__textarea device__add__input mt-5"
                    placeholder="Mô tả dịch vụ"
                    value={roleData.roleDescription}
                    onChange={(e) =>
                      setRoleData((prevData) => ({
                        ...prevData,
                        roleDescription: e.target.value,
                      }))
                    }
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
            <button className="cancel__button button">Hủy bỏ</button>
            <button
              className="add__button button ms-20"
              onClick={handleUpdateRole}
            >
              Cập nhật
            </button>
          </div>
        </Col>
      </Col>
    </Row>
  );
};

export default RoleUpdate;
