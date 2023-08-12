import React, { useState } from "react";
import "../Add/style.css";
import { Col, Modal, Row } from "antd";
import MenuPage from "../../../layout/Menu";
import Header from "../../../layout/Header";

const NumberAdd = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const breadcrumbPaths = [
    { label: "Cấp số" },
    { label: "Danh sách cấp số" },
    { label: "Cấp số mới" },
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
          <div className="number__border mt-15">
            <div className="number__text__1 mt-20">CẤP SỐ MỚI</div>
            <div className="number__text__2 mt-30">
              Dịch vụ khách hàng lựa chọn
            </div>

            <select className="device__list__select mt-10 w-400">
              <option value="">Tất cả</option>
              <option value="1">Lựa chọn 1</option>
              <option value="2">Lựa chọn 2</option>
              <option value="3">Lựa chọn 3</option>
            </select>
            <div className="d-flex mt-100">
              <button className="cancel__button button w-115">Hủy bỏ</button>
              <button
                className="add__button button ms-20 w-115"
                onClick={() => setIsSuccessModalOpen(true)}
              >
                In số
              </button>
            </div>
          </div>
        </Col>
      </Col>
      <Modal
        open={isSuccessModalOpen}
        onCancel={() => setIsSuccessModalOpen(false)}
        footer={null}
        className="custom__modal text-center"
      >
        <div className="modal__text__1 mt-30">Số thứ tự được cấp</div>
        <div className="modal__text__2 mt-20">2001201</div>
        <div className="modal__text__3 mt-20">
          DV: Khám răng hàm mặt{" "}
          <span className="modal__text__4">(tại quầy số 1)</span>
        </div>
        <div className="custom__modal__footer mt-70">
          <div className="modal__text__5">Thời gian cấp: 9:30 11/10/2021</div>

          <div className="modal__text__5 mt-5">
            Thời gian cấp: 17:30 11/10/2021
          </div>
        </div>
      </Modal>
    </Row>
  );
};

export default NumberAdd;
