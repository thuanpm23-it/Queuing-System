import React, { useEffect, useState } from "react";
import "../Report/style.css";
import { CaretRightOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import MenuPage from "../../layout/Menu";
import Header from "../../layout/Header";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchserviceData,
  selectserviceData,
} from "../../redux/slice/Service/serviceSlice";
import {
  fetchnumberData,
  selectnumberData,
} from "../../redux/slice/Number/saveNumberSlice";
import usePagination from "../../components/Pagination/Use";
import { ITEMS_PER_PAGE } from "../../components/Pagination/Contants";
import Pagination from "../../components/Pagination/Pagination";
import { format } from "date-fns";
import { Dayjs } from "dayjs";
import CustomDatePicker from "../../components/DatePicker";
import * as XLSX from "xlsx";

const ReportList = () => {
  const breadcrumbPaths = [{ label: "Báo cáo" }, { label: "Lập báo cáo" }];

  const dispatch: AppDispatch = useDispatch();
  const serviceData = useSelector(selectserviceData);
  const numberData = useSelector(selectnumberData);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    dispatch(fetchserviceData());
    dispatch(fetchnumberData());
  }, [dispatch]);

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

  const { currentPage, totalPages, startIndex, endIndex, handlePageChange } =
    usePagination(numberData.length, ITEMS_PER_PAGE);

  const filteredData = numberData.filter(
    (data) =>
      (startDate === "" && endDate === "") ||
      (startDate &&
        endDate &&
        data.startDate >= startDate &&
        data.startDate <= endDate)
  );

  const currentNumberData = filteredData.slice(startIndex, endIndex);

  const handleDownload = () => {
    const dataForExcel = numberData.map((data, index) => {
      return [
        index + 1,
        data.number,
        serviceData.find((service) => service.id === data.serviceId)
          ?.serviceName,
        `${data.startTime} - ${format(new Date(data.startDate), "dd/MM/yyyy")}`,
        data.active,
        data.supply,
      ];
    });

    const ws = XLSX.utils.aoa_to_sheet([
      [
        "STT",
        "Số cấp",
        "Tên dịch vụ",
        "Thời gian cấp",
        "Tình trạng",
        "Nguồn cấp",
      ],
      ...dataForExcel,
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");

    const blob = new Blob(
      [XLSX.write(wb, { bookType: "xlsx", type: "array" })],
      {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "report.xlsx";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Row className="main__wrapper">
      <MenuPage />
      <Col span={20} className="main__bg">
        <Header breadcrumbPaths={breadcrumbPaths} />
        <Col span={24} className="ms-30">
          <div className="mt-15 mb-10">
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
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên dịch vụ</th>
                  <th>Thời gian cấp</th>
                  <th>Tình trạng</th>
                  <th>Nguồn cấp</th>
                </tr>
              </thead>
              <tbody>
                {currentNumberData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.number}</td>
                    <td>
                      {
                        serviceData.find(
                          (service) => service.id === data.serviceId
                        )?.serviceName
                      }
                    </td>
                    <td>
                      {data.startTime} -{" "}
                      {format(new Date(data.startDate), "dd/MM/yyyy")}
                    </td>

                    <td>
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
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="add__border report__down" onClick={handleDownload}>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path
                    d="M23.9166 11.888H20.545C17.78 11.888 15.5283 9.63634 15.5283 6.87134V3.49967C15.5283 2.85801 15.0033 2.33301 14.3616 2.33301H9.41496C5.82163 2.33301 2.91663 4.66634 2.91663 8.83134V19.168C2.91663 23.333 5.82163 25.6663 9.41496 25.6663H18.585C22.1783 25.6663 25.0833 23.333 25.0833 19.168V13.0547C25.0833 12.413 24.5583 11.888 23.9166 11.888ZM14.3266 18.4097L11.9933 20.743C11.9116 20.8247 11.8066 20.8947 11.7016 20.9297C11.5966 20.9763 11.4916 20.9997 11.375 20.9997C11.2583 20.9997 11.1533 20.9763 11.0483 20.9297C10.955 20.8947 10.8616 20.8247 10.7916 20.7547C10.78 20.743 10.7683 20.743 10.7683 20.7313L8.43496 18.398C8.09663 18.0597 8.09663 17.4997 8.43496 17.1613C8.77329 16.823 9.33329 16.823 9.67163 17.1613L10.5 18.013V13.1247C10.5 12.6463 10.8966 12.2497 11.375 12.2497C11.8533 12.2497 12.25 12.6463 12.25 13.1247V18.013L13.09 17.173C13.4283 16.8347 13.9883 16.8347 14.3266 17.173C14.665 17.5113 14.665 18.0713 14.3266 18.4097Z"
                    fill="#FF7506"
                  />
                  <path
                    d="M20.335 10.2779C21.4434 10.2896 22.9834 10.2896 24.3017 10.2896C24.9667 10.2896 25.3167 9.50792 24.85 9.04125C23.17 7.34958 20.16 4.30458 18.4334 2.57792C17.955 2.09958 17.1267 2.42625 17.1267 3.09125V7.16292C17.1267 8.86625 18.5734 10.2779 20.335 10.2779Z"
                    fill="#FF7506"
                  />
                </svg>
              </div>
              <p className="add__text">Tải về</p>
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

export default ReportList;
