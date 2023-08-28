import React, { useState, useEffect } from "react";
import { Col, Input, Modal, Row } from "antd";
import "../Add/style.css";
import MenuPage from "../../../../layout/Menu";
import TextArea from "antd/es/input/TextArea";
import Header from "../../../../layout/Header";
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
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Checkbox } from "antd";

const CheckboxGroup = Checkbox.Group;
const plainOptions = ["Chức năng x", "Chức năng y", "Chức năng z"];

const RoleAdd = () => {
  const breadcrumbPaths = [
    { label: "Cài đặt hệ thống" },
    { label: "Quản lý vai trò" },
    { label: "Thêm vai trò" },
  ];

  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const userIP = useSelector(selectUserIP);
  const userData1 = UserDataUtil();
  const navigate = useNavigate();
  const [checkedLists, setCheckedLists] = useState({
    groupA: [],
    groupB: [],
    groupC: [],
  });

  const onChange = (group: string, list: CheckboxValueType[]) => {
    setCheckedLists((prevState) => ({
      ...prevState,
      [group]: list,
    }));
  };
  const onCheckAllChange = (e: CheckboxChangeEvent, group: string) => {
    setCheckedLists((prevState) => ({
      ...prevState,
      [group]: e.target.checked ? plainOptions : [],
    }));
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
        checkedListA: checkedLists.groupA,
        checkedListB: checkedLists.groupB,
        checkedListC: checkedLists.groupC,
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
                        <div className="d-flex items-center">
                          <Checkbox
                            indeterminate={
                              checkedLists.groupA.length > 0 &&
                              checkedLists.groupA.length < plainOptions.length
                            }
                            onChange={(e) => onCheckAllChange(e, "groupA")}
                            checked={
                              checkedLists.groupA.length === plainOptions.length
                            }
                          >
                            Tất cả
                          </Checkbox>
                        </div>
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedLists.groupA}
                          onChange={(list) => onChange("groupA", list)}
                        />

                        <div
                          style={{ marginBottom: "15px", marginTop: "15px" }}
                        >
                          <div className="role__text__1">Nhóm chức năng B</div>
                          <div className="d-flex items-center">
                            <Checkbox
                              indeterminate={
                                checkedLists.groupB.length > 0 &&
                                checkedLists.groupB.length < plainOptions.length
                              }
                              onChange={(e) => onCheckAllChange(e, "groupB")}
                              checked={
                                checkedLists.groupB.length ===
                                plainOptions.length
                              }
                            >
                              Tất cả
                            </Checkbox>
                          </div>
                          <CheckboxGroup
                            options={plainOptions}
                            value={checkedLists.groupB}
                            onChange={(list) => onChange("groupB", list)}
                          />
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                          <div className="role__text__1">Nhóm chức năng C</div>
                          <div className="d-flex items-center">
                            <Checkbox
                              indeterminate={
                                checkedLists.groupC.length > 0 &&
                                checkedLists.groupC.length < plainOptions.length
                              }
                              onChange={(e) => onCheckAllChange(e, "groupC")}
                              checked={
                                checkedLists.groupC.length ===
                                plainOptions.length
                              }
                            >
                              Tất cả
                            </Checkbox>
                          </div>
                          <CheckboxGroup
                            options={plainOptions}
                            value={checkedLists.groupC}
                            onChange={(list) => onChange("groupC", list)}
                          />
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
