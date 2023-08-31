import React, { useState, useEffect } from "react";
import "../Dashboard/style.css";
import MenuPage from "../../layout/Menu";
import { CalendarProps, Col, Row } from "antd";
import Breadcrumb from "../../components/Breadcrums";
import Img9 from "../../assets/images/Frame 625210 (1).png";
import User from "../../components/User";
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
import {
  fetchdeviceData,
  selectdeviceData,
} from "../../redux/slice/Device/deviceSlice";
import DatePicker from "react-datepicker";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { Dayjs } from "dayjs";

interface DataPoint {
  name: string;
  value: number;
}

const Dashboard = () => {
  const breadcrumbPaths = [{ label: "Dashboard" }];
  const options = [
    {
      label: "Ngày",
      value: "ngày",
    },
    {
      label: "Tuần",
      value: "tuần",
    },
    {
      label: "Tháng",
      value: "tháng",
    },
  ];

  const dispatch: AppDispatch = useDispatch();

  const serviceData = useSelector(selectserviceData);
  const numberData = useSelector(selectnumberData);
  const deviceData = useSelector(selectdeviceData);

  useEffect(() => {
    dispatch(fetchserviceData());
    dispatch(fetchnumberData());
    dispatch(fetchdeviceData());
  }, [dispatch]);

  const totalNumber = numberData.length;
  const totalDSD = numberData.filter(
    (data) => data.active === "Đã sử dụng"
  ).length;
  const totalDC = numberData.filter(
    (data) => data.active === "Đang chờ"
  ).length;
  const totalBQ = numberData.filter((data) => data.active === "Bỏ qua").length;

  const totalService = serviceData.length;
  const totalSVDHD = serviceData.filter(
    (data) => data.active === "Hoạt động"
  ).length;
  const totalSVNHD = serviceData.filter(
    (data) => data.active === "Ngưng hoạt động"
  ).length;

  const totalDevice = deviceData.length;
  const totalDVDHD = deviceData.filter(
    (data) => data.active === "Hoạt động"
  ).length;
  const totalDVNHD = deviceData.filter(
    (data) => data.active === "Ngưng hoạt động"
  ).length;

  const dailyData: DataPoint[] = [
    { name: "01", value: 45 },
    { name: "", value: 60 },
    { name: "13", value: 65 },
    { name: "19", value: 70 },
    { name: "", value: 55 },
    { name: "31", value: 95 },
  ];

  const weeklyData: DataPoint[] = [
    { name: "Tuần 1", value: 50 },
    { name: "Tuần 2", value: 60 },
    { name: "Tuần 3", value: 45 },
    { name: "Tuần 4", value: 75 },
  ];

  const monthlyData: DataPoint[] = [
    { name: "1", value: 20 },
    { name: "2", value: 45 },
    { name: "3", value: 28 },
    { name: "4", value: 80 },
    { name: "5", value: 60 },
    { name: "6", value: 90 },
    { name: "7", value: 20 },
    { name: "8", value: 45 },
    { name: "9", value: 28 },
    { name: "10", value: 80 },
    { name: "11", value: 60 },
    { name: "12", value: 90 },
  ];

  // Convert DocumentData to DataPoint[]
  // const convertedData: DataPoint[] = numberData.map((data: DocumentData) => {
  //   return {
  //     name: moment(data.startDate).format("DD"),
  //     value: 1,
  //   };
  // });
  // const dailyData: DataPoint[] = Array.from({ length: 31 }, (_, i) => ({
  //   name: (i + 1).toString(),
  //   value: convertedData.filter((data) => data.name === (i + 1).toString())
  //     .length,
  // })).map((dataPoint) => ({
  //   ...dataPoint,
  //   name: dataPoint.value > 0 ? dataPoint.name : "",
  // }));

  // const weeklyData: DataPoint[] = Array.from({ length: 4 }, (_, i) => {
  //   const startOfWeek = moment().startOf("month").add(i, "weeks");
  //   const endOfWeek = startOfWeek.clone().endOf("week");
  //   const weekNumber = i + 1;

  //   const value = convertedData.filter((data) =>
  //     moment(data.name, "DD").isBetween(startOfWeek, endOfWeek, undefined, "[)")
  //   ).length;

  //   return {
  //     name: `Tuần ${weekNumber}`,
  //     value: value,
  //   };
  // });

  // const monthlyData: DataPoint[] = Array.from({ length: 12 }, (_, i) => {
  //   const monthIndex = i;
  //   const monthName = moment().month(monthIndex).format("M");

  //   const value = convertedData.filter(
  //     (data) => moment(data.name, "DD").month() === monthIndex
  //   ).length;

  //   return {
  //     name: monthName,
  //     value: value,
  //   };
  // });
  const [selectedOption, setSelectedOption] = useState("tháng");

  const getFilteredData = () => {
    switch (selectedOption) {
      case "ngày":
        return dailyData;
      case "tuần":
        return weeklyData;
      case "tháng":
        return monthlyData;
      default:
        return [];
    }
  };

  const filteredData = getFilteredData();
  const handleDateChange = (date: any) => {
    // Xử lý khi ngày được chọn thay đổi
    console.log("Selected date:", date);
  };

  return (
    <Row className="main__wrapper">
      <MenuPage />
      <Col span={20} className="main__bg">
        <Row>
          <Col span={16} className="dashboard__left ">
            <div className="ms-30">
              <div className="mt-15">
                <Breadcrumb paths={breadcrumbPaths} />
              </div>
              <div className="dashboard__text__1 mt-30">Biểu đồ cấp số</div>
              <div className="d-flex mt-20">
                <div className="dashboard__border__1">
                  <div className="d-flex items-center">
                    <div className="icon__border">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5.25 0C5.44891 0 5.63968 0.0790176 5.78033 0.21967C5.92098 0.360322 6 0.551088 6 0.75V1.5H18V0.75C18 0.551088 18.079 0.360322 18.2197 0.21967C18.3603 0.0790176 18.5511 0 18.75 0C18.9489 0 19.1397 0.0790176 19.2803 0.21967C19.421 0.360322 19.5 0.551088 19.5 0.75V1.5H21C21.7956 1.5 22.5587 1.81607 23.1213 2.37868C23.6839 2.94129 24 3.70435 24 4.5V21C24 21.7956 23.6839 22.5587 23.1213 23.1213C22.5587 23.6839 21.7956 24 21 24H3C2.20435 24 1.44129 23.6839 0.87868 23.1213C0.316071 22.5587 0 21.7956 0 21V4.5C0 3.70435 0.316071 2.94129 0.87868 2.37868C1.44129 1.81607 2.20435 1.5 3 1.5H4.5V0.75C4.5 0.551088 4.57902 0.360322 4.71967 0.21967C4.86032 0.0790176 5.05109 0 5.25 0V0ZM1.5 6V21C1.5 21.3978 1.65804 21.7794 1.93934 22.0607C2.22064 22.342 2.60218 22.5 3 22.5H21C21.3978 22.5 21.7794 22.342 22.0607 22.0607C22.342 21.7794 22.5 21.3978 22.5 21V6H1.5Z"
                          fill="#6493F9"
                        />
                      </svg>
                    </div>
                    <div className="ms-5 icon__t__1">
                      Số thứ tự
                      <br /> đã cấp
                    </div>
                  </div>
                  <div className="d-flex db__c mt-10 items-center">
                    <div className="icon__t__2">{totalNumber}</div>
                    <div className="mt-10 icon__t__3 d-flex items-center content-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.80099 9.52148C6.70154 9.52148 6.60615 9.48198 6.53583 9.41165C6.4655 9.34132 6.42599 9.24594 6.42599 9.14648L6.42599 4.80173L4.81649 6.41198C4.78163 6.44685 4.74024 6.47451 4.69468 6.49338C4.64913 6.51225 4.6003 6.52196 4.55099 6.52196C4.50169 6.52196 4.45286 6.51225 4.40731 6.49338C4.36175 6.47451 4.32036 6.44685 4.28549 6.41198C4.25063 6.37712 4.22297 6.33573 4.2041 6.29017C4.18523 6.24462 4.17552 6.19579 4.17552 6.14648C4.17552 6.09718 4.18523 6.04835 4.2041 6.0028C4.22297 5.95724 4.25063 5.91585 4.28549 5.88098L6.53549 3.63098C6.57033 3.59606 6.61171 3.56835 6.65727 3.54945C6.70283 3.53054 6.75167 3.52081 6.80099 3.52081C6.85032 3.52081 6.89916 3.53055 6.94472 3.54945C6.99028 3.56835 7.03166 3.59606 7.06649 3.63098L9.31649 5.88098C9.35136 5.91585 9.37902 5.95724 9.39789 6.0028C9.41676 6.04835 9.42647 6.09718 9.42647 6.14648C9.42647 6.19579 9.41676 6.24462 9.39789 6.29017C9.37902 6.33573 9.35136 6.37712 9.31649 6.41198C9.24608 6.4824 9.15058 6.52196 9.05099 6.52196C9.00169 6.52196 8.95286 6.51225 8.90731 6.49338C8.86175 6.47451 8.82036 6.44685 8.78549 6.41198L7.17599 4.80173L7.17599 9.14648C7.17599 9.24594 7.13649 9.34132 7.06616 9.41165C6.99583 9.48198 6.90045 9.52148 6.80099 9.52148Z"
                          fill="#FF9138"
                        />
                      </svg>
                      <span>32.41%</span>
                    </div>
                  </div>
                </div>
                <div className="dashboard__border__1 ms-20">
                  <div className="d-flex items-center">
                    <div className="icon__border green">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <path
                          d="M17.031 10.7194C17.1008 10.789 17.1563 10.8718 17.1941 10.9629C17.2319 11.054 17.2513 11.1517 17.2513 11.2504C17.2513 11.349 17.2319 11.4467 17.1941 11.5378C17.1563 11.6289 17.1008 11.7117 17.031 11.7814L12.531 16.2814C12.4613 16.3512 12.3786 16.4066 12.2875 16.4444C12.1963 16.4822 12.0987 16.5017 12 16.5017C11.9014 16.5017 11.8037 16.4822 11.7126 16.4444C11.6214 16.4066 11.5387 16.3512 11.469 16.2814L9.219 14.0314C9.14927 13.9616 9.09396 13.8788 9.05622 13.7877C9.01848 13.6966 8.99905 13.599 8.99905 13.5004C8.99905 13.4017 9.01848 13.3041 9.05622 13.213C9.09396 13.1219 9.14927 13.0391 9.219 12.9694C9.35983 12.8285 9.55084 12.7494 9.75 12.7494C9.84862 12.7494 9.94627 12.7688 10.0374 12.8066C10.1285 12.8443 10.2113 12.8996 10.281 12.9694L12 14.6899L15.969 10.7194C16.0387 10.6495 16.1214 10.5941 16.2126 10.5563C16.3037 10.5185 16.4014 10.499 16.5 10.499C16.5987 10.499 16.6963 10.5185 16.7875 10.5563C16.8786 10.5941 16.9613 10.6495 17.031 10.7194Z"
                          fill="#35C75A"
                        />
                        <path
                          d="M6 0C6.19891 0 6.38968 0.0790176 6.53033 0.21967C6.67098 0.360322 6.75 0.551088 6.75 0.75V1.5H18.75V0.75C18.75 0.551088 18.829 0.360322 18.9697 0.21967C19.1103 0.0790176 19.3011 0 19.5 0C19.6989 0 19.8897 0.0790176 20.0303 0.21967C20.171 0.360322 20.25 0.551088 20.25 0.75V1.5H21.75C22.5456 1.5 23.3087 1.81607 23.8713 2.37868C24.4339 2.94129 24.75 3.70435 24.75 4.5V21C24.75 21.7956 24.4339 22.5587 23.8713 23.1213C23.3087 23.6839 22.5456 24 21.75 24H3.75C2.95435 24 2.19129 23.6839 1.62868 23.1213C1.06607 22.5587 0.75 21.7956 0.75 21V4.5C0.75 3.70435 1.06607 2.94129 1.62868 2.37868C2.19129 1.81607 2.95435 1.5 3.75 1.5H5.25V0.75C5.25 0.551088 5.32902 0.360322 5.46967 0.21967C5.61032 0.0790176 5.80109 0 6 0V0ZM2.25 6V21C2.25 21.3978 2.40804 21.7794 2.68934 22.0607C2.97064 22.342 3.35218 22.5 3.75 22.5H21.75C22.1478 22.5 22.5294 22.342 22.8107 22.0607C23.092 21.7794 23.25 21.3978 23.25 21V6H2.25Z"
                          fill="#35C75A"
                        />
                      </svg>
                    </div>
                    <div className="ms-5 icon__t__1">
                      Số thứ tự
                      <br /> đã sử dụng
                    </div>
                  </div>
                  <div className="d-flex mt-10 db__c items-center">
                    <div className="icon__t__2">{totalDSD}</div>
                    <div className="mt-10 icon__t__3 d-flex items-center content-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.80099 9.52148C6.70154 9.52148 6.60615 9.48198 6.53583 9.41165C6.4655 9.34132 6.42599 9.24594 6.42599 9.14648L6.42599 4.80173L4.81649 6.41198C4.78163 6.44685 4.74024 6.47451 4.69468 6.49338C4.64913 6.51225 4.6003 6.52196 4.55099 6.52196C4.50169 6.52196 4.45286 6.51225 4.40731 6.49338C4.36175 6.47451 4.32036 6.44685 4.28549 6.41198C4.25063 6.37712 4.22297 6.33573 4.2041 6.29017C4.18523 6.24462 4.17552 6.19579 4.17552 6.14648C4.17552 6.09718 4.18523 6.04835 4.2041 6.0028C4.22297 5.95724 4.25063 5.91585 4.28549 5.88098L6.53549 3.63098C6.57033 3.59606 6.61171 3.56835 6.65727 3.54945C6.70283 3.53054 6.75167 3.52081 6.80099 3.52081C6.85032 3.52081 6.89916 3.53055 6.94472 3.54945C6.99028 3.56835 7.03166 3.59606 7.06649 3.63098L9.31649 5.88098C9.35136 5.91585 9.37902 5.95724 9.39789 6.0028C9.41676 6.04835 9.42647 6.09718 9.42647 6.14648C9.42647 6.19579 9.41676 6.24462 9.39789 6.29017C9.37902 6.33573 9.35136 6.37712 9.31649 6.41198C9.24608 6.4824 9.15058 6.52196 9.05099 6.52196C9.00169 6.52196 8.95286 6.51225 8.90731 6.49338C8.86175 6.47451 8.82036 6.44685 8.78549 6.41198L7.17599 4.80173L7.17599 9.14648C7.17599 9.24594 7.13649 9.34132 7.06616 9.41165C6.99583 9.48198 6.90045 9.52148 6.80099 9.52148Z"
                          fill="#FF9138"
                        />
                      </svg>
                      <span>32.41%</span>
                    </div>
                  </div>
                </div>
                <div className="dashboard__border__1 ms-20">
                  <div className="d-flex items-center">
                    <div className="icon__border orange">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <path
                          d="M19.2505 8.9625L20.155 8.058C20.2767 7.93778 20.4308 7.85549 20.5984 7.82114C20.766 7.78679 20.94 7.80185 21.0992 7.8645L22.2017 8.304C22.3627 8.36959 22.5007 8.48137 22.5983 8.62525C22.6958 8.76913 22.7486 8.93867 22.75 9.1125V11.1315C22.748 11.3637 22.6539 11.5856 22.4884 11.7485C22.3229 11.9113 22.0995 12.0018 21.8672 12L21.8297 11.9985C14.1077 11.5185 12.55 4.977 12.2552 2.4735C12.2425 2.35915 12.2525 2.24341 12.2845 2.1329C12.3165 2.02239 12.37 1.91927 12.4418 1.82942C12.5137 1.73958 12.6026 1.66477 12.7034 1.60928C12.8042 1.55379 12.9149 1.51869 13.0292 1.506C13.0631 1.50199 13.0972 1.49998 13.1312 1.5H15.0812C15.2552 1.50063 15.4249 1.55323 15.5687 1.65106C15.7125 1.74888 15.8238 1.88746 15.8882 2.049L16.3285 3.1515C16.3932 3.31023 16.4098 3.48452 16.376 3.65259C16.3423 3.82066 16.2597 3.97506 16.1387 4.0965L15.2342 5.001C15.2342 5.001 15.7547 8.526 19.2505 8.9625Z"
                          fill="#FFAC6A"
                        />
                        <path
                          d="M12.25 22.5H10.75V18.75C10.7494 18.1534 10.5122 17.5815 10.0903 17.1597C9.6685 16.7378 9.09655 16.5006 8.5 16.5H5.5C4.90345 16.5006 4.3315 16.7378 3.90967 17.1597C3.48784 17.5815 3.2506 18.1534 3.25 18.75V22.5H1.75V18.75C1.75119 17.7558 2.14666 16.8027 2.84966 16.0997C3.55267 15.3967 4.5058 15.0012 5.5 15H8.5C9.4942 15.0012 10.4473 15.3967 11.1503 16.0997C11.8533 16.8027 12.2488 17.7558 12.25 18.75V22.5Z"
                          fill="#FFAC6A"
                        />
                        <path
                          d="M7 7.5C7.44501 7.5 7.88002 7.63196 8.25004 7.87919C8.62005 8.12643 8.90843 8.47783 9.07873 8.88896C9.24903 9.3001 9.29359 9.7525 9.20677 10.189C9.11995 10.6254 8.90566 11.0263 8.59099 11.341C8.27632 11.6557 7.87541 11.87 7.43896 11.9568C7.0025 12.0436 6.5501 11.999 6.13896 11.8287C5.72783 11.6584 5.37643 11.37 5.1292 11C4.88196 10.63 4.75 10.195 4.75 9.75C4.75 9.15326 4.98705 8.58097 5.40901 8.15901C5.83097 7.73705 6.40326 7.5 7 7.5ZM7 6C6.25832 6 5.5333 6.21993 4.91661 6.63199C4.29993 7.04404 3.81928 7.62971 3.53545 8.31494C3.25162 9.00016 3.17736 9.75416 3.32206 10.4816C3.46675 11.209 3.8239 11.8772 4.34835 12.4017C4.8728 12.9261 5.54098 13.2833 6.26841 13.4279C6.99584 13.5726 7.74984 13.4984 8.43506 13.2145C9.12029 12.9307 9.70596 12.4501 10.118 11.8334C10.5301 11.2167 10.75 10.4917 10.75 9.75C10.75 9.25754 10.653 8.76991 10.4646 8.31494C10.2761 7.85997 9.99987 7.44657 9.65165 7.09835C9.30343 6.75013 8.89004 6.47391 8.43506 6.28545C7.98009 6.097 7.49246 6 7 6Z"
                          fill="#FFAC6A"
                        />
                      </svg>
                    </div>
                    <div className="ms-5 icon__t__1">
                      Số thứ tự
                      <br /> đang chờ
                    </div>
                  </div>
                  <div className="d-flex mt-10 db__c items-center">
                    <div className="icon__t__2">{totalDC}</div>
                    <div className="mt-10 icon__t__3 d-flex items-center content-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.80099 9.52148C6.70154 9.52148 6.60615 9.48198 6.53583 9.41165C6.4655 9.34132 6.42599 9.24594 6.42599 9.14648L6.42599 4.80173L4.81649 6.41198C4.78163 6.44685 4.74024 6.47451 4.69468 6.49338C4.64913 6.51225 4.6003 6.52196 4.55099 6.52196C4.50169 6.52196 4.45286 6.51225 4.40731 6.49338C4.36175 6.47451 4.32036 6.44685 4.28549 6.41198C4.25063 6.37712 4.22297 6.33573 4.2041 6.29017C4.18523 6.24462 4.17552 6.19579 4.17552 6.14648C4.17552 6.09718 4.18523 6.04835 4.2041 6.0028C4.22297 5.95724 4.25063 5.91585 4.28549 5.88098L6.53549 3.63098C6.57033 3.59606 6.61171 3.56835 6.65727 3.54945C6.70283 3.53054 6.75167 3.52081 6.80099 3.52081C6.85032 3.52081 6.89916 3.53055 6.94472 3.54945C6.99028 3.56835 7.03166 3.59606 7.06649 3.63098L9.31649 5.88098C9.35136 5.91585 9.37902 5.95724 9.39789 6.0028C9.41676 6.04835 9.42647 6.09718 9.42647 6.14648C9.42647 6.19579 9.41676 6.24462 9.39789 6.29017C9.37902 6.33573 9.35136 6.37712 9.31649 6.41198C9.24608 6.4824 9.15058 6.52196 9.05099 6.52196C9.00169 6.52196 8.95286 6.51225 8.90731 6.49338C8.86175 6.47451 8.82036 6.44685 8.78549 6.41198L7.17599 4.80173L7.17599 9.14648C7.17599 9.24594 7.13649 9.34132 7.06616 9.41165C6.99583 9.48198 6.90045 9.52148 6.80099 9.52148Z"
                          fill="#FF9138"
                        />
                      </svg>
                      <span>32.41%</span>
                    </div>
                  </div>
                </div>
                <div className="dashboard__border__1 ms-20">
                  <div className="d-flex items-center">
                    <div className="icon__border red">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="24"
                        viewBox="0 0 19 24"
                        fill="none"
                      >
                        <path
                          d="M9.26002 6.15C9.28194 6.10502 9.31607 6.06711 9.35851 6.04058C9.40094 6.01406 9.44997 6 9.50001 6C9.55006 6 9.59909 6.01406 9.64152 6.04058C9.68396 6.06711 9.71809 6.10502 9.74001 6.15L10.691 8.0775C10.7101 8.11649 10.7383 8.15025 10.7733 8.17587C10.8084 8.20148 10.8491 8.21817 10.892 8.2245L13.022 8.5335C13.2395 8.565 13.328 8.8335 13.169 8.988L11.63 10.4895C11.599 10.5198 11.5758 10.5572 11.5624 10.5985C11.5491 10.6398 11.546 10.6838 11.5535 10.7265L11.9165 12.8475C11.9247 12.8965 11.919 12.9468 11.9002 12.9927C11.8813 13.0386 11.85 13.0784 11.8098 13.1075C11.7696 13.1367 11.7221 13.154 11.6726 13.1576C11.6231 13.1613 11.5735 13.151 11.5295 13.128L9.62452 12.126C9.58632 12.106 9.54386 12.0956 9.50076 12.0956C9.45766 12.0956 9.41521 12.106 9.37702 12.126L7.47201 13.128C7.42805 13.1506 7.37869 13.1605 7.32942 13.1567C7.28015 13.1529 7.2329 13.1355 7.19294 13.1064C7.15298 13.0773 7.12187 13.0377 7.10308 12.992C7.08429 12.9463 7.07856 12.8963 7.08651 12.8475L7.44952 10.7265C7.45717 10.6839 7.45434 10.64 7.44128 10.5987C7.42821 10.5575 7.4053 10.52 7.37452 10.4895L5.82952 8.988C5.79413 8.95325 5.76911 8.90934 5.75728 8.86117C5.74545 8.81301 5.74727 8.7625 5.76253 8.71531C5.77779 8.66812 5.8059 8.62612 5.84369 8.59401C5.88149 8.56189 5.92748 8.54094 5.97652 8.5335L8.10652 8.2245C8.14944 8.21817 8.19018 8.20148 8.2252 8.17587C8.26022 8.15025 8.28848 8.11649 8.30751 8.0775L9.26002 6.15Z"
                          fill="#F86D6D"
                        />
                        <path
                          d="M0.5 3C0.5 2.20435 0.81607 1.44129 1.37868 0.87868C1.94129 0.316071 2.70435 0 3.5 0L15.5 0C16.2956 0 17.0587 0.316071 17.6213 0.87868C18.1839 1.44129 18.5 2.20435 18.5 3V23.25C18.4999 23.3857 18.4631 23.5188 18.3933 23.6351C18.3236 23.7515 18.2236 23.8468 18.104 23.9108C17.9844 23.9748 17.8497 24.0052 17.7142 23.9988C17.5787 23.9923 17.4474 23.9492 17.3345 23.874L9.5 19.6515L1.6655 23.874C1.55256 23.9492 1.42135 23.9923 1.28584 23.9988C1.15033 24.0052 1.0156 23.9748 0.895999 23.9108C0.776399 23.8468 0.676406 23.7515 0.606671 23.6351C0.536936 23.5188 0.50007 23.3857 0.5 23.25V3ZM3.5 1.5C3.10218 1.5 2.72064 1.65804 2.43934 1.93934C2.15804 2.22064 2 2.60218 2 3V21.849L9.0845 18.126C9.20759 18.0441 9.35215 18.0004 9.5 18.0004C9.64785 18.0004 9.79241 18.0441 9.9155 18.126L17 21.849V3C17 2.60218 16.842 2.22064 16.5607 1.93934C16.2794 1.65804 15.8978 1.5 15.5 1.5H3.5Z"
                          fill="#F86D6D"
                        />
                      </svg>
                    </div>
                    <div className="ms-5 icon__t__1">
                      Số thứ tự
                      <br /> đã bỏ qua
                    </div>
                  </div>
                  <div className="d-flex mt-10 db__c items-center">
                    <div className="icon__t__2">{totalBQ}</div>
                    <div className="mt-10 icon__t__3 d-flex items-center content-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.80099 9.52148C6.70154 9.52148 6.60615 9.48198 6.53583 9.41165C6.4655 9.34132 6.42599 9.24594 6.42599 9.14648L6.42599 4.80173L4.81649 6.41198C4.78163 6.44685 4.74024 6.47451 4.69468 6.49338C4.64913 6.51225 4.6003 6.52196 4.55099 6.52196C4.50169 6.52196 4.45286 6.51225 4.40731 6.49338C4.36175 6.47451 4.32036 6.44685 4.28549 6.41198C4.25063 6.37712 4.22297 6.33573 4.2041 6.29017C4.18523 6.24462 4.17552 6.19579 4.17552 6.14648C4.17552 6.09718 4.18523 6.04835 4.2041 6.0028C4.22297 5.95724 4.25063 5.91585 4.28549 5.88098L6.53549 3.63098C6.57033 3.59606 6.61171 3.56835 6.65727 3.54945C6.70283 3.53054 6.75167 3.52081 6.80099 3.52081C6.85032 3.52081 6.89916 3.53055 6.94472 3.54945C6.99028 3.56835 7.03166 3.59606 7.06649 3.63098L9.31649 5.88098C9.35136 5.91585 9.37902 5.95724 9.39789 6.0028C9.41676 6.04835 9.42647 6.09718 9.42647 6.14648C9.42647 6.19579 9.41676 6.24462 9.39789 6.29017C9.37902 6.33573 9.35136 6.37712 9.31649 6.41198C9.24608 6.4824 9.15058 6.52196 9.05099 6.52196C9.00169 6.52196 8.95286 6.51225 8.90731 6.49338C8.86175 6.47451 8.82036 6.44685 8.78549 6.41198L7.17599 4.80173L7.17599 9.14648C7.17599 9.24594 7.13649 9.34132 7.06616 9.41165C6.99583 9.48198 6.90045 9.52148 6.80099 9.52148Z"
                          fill="#FF9138"
                        />
                      </svg>
                      <span>32.41%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rechart mt-15">
                <div className="d-flex db__text">
                  <div>
                    <div className="db__t__1">
                      Bảng thống kê theo {selectedOption}
                    </div>
                    <div className="db__t__2">
                      {selectedOption === "tháng"
                        ? `Năm ${moment().format("YYYY")}`
                        : `Tháng ${moment().format("MM/YYYY")}`}
                    </div>
                  </div>
                  <div>
                    <span className="db__t__3">Xem theo</span>
                    <div className="select__custom">
                      <select
                        className="device__list__select ms-10"
                        value={selectedOption}
                        onChange={(e) =>
                          setSelectedOption(
                            e.target.value as "ngày" | "tuần" | "tháng"
                          )
                        }
                        style={{ width: "120px" }}
                      >
                        {options.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
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
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <ResponsiveContainer width={780} height={380}>
                    <AreaChart data={filteredData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="value"
                        fill="url(#colorGradient)"
                        stroke="#5185F7"
                      />
                      <defs>
                        <linearGradient
                          id="colorGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop offset="0%" stopColor="#CEDDFF" />
                          <stop
                            offset="100%"
                            stopColor="rgba(206, 221, 255, 0.00)"
                          />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </Col>
          <Col span={8} className="dashboard__right">
            <div className="d-flex items-center mt-15 ms-80">
              <User />
            </div>
            <div className="dashboard__text__1 mt-30 ms-30">Tổng quan</div>
            <div className="mt-5">
              <div className="dashboard__border__2 ms-30 d-flex items-center">
                <div>
                  <img src={Img9} alt="" />
                </div>

                <div className="ms-10">
                  <div className="text__db__1">{totalDevice}</div>
                  <div>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M3.75675 1.16699H10.2376C12.3142 1.16699 12.8334 1.68616 12.8334 3.75699V7.44949C12.8334 9.52616 12.3142 10.0395 10.2434 10.0395H3.75675C1.68591 10.0453 1.16675 9.52616 1.16675 7.45533V3.75699C1.16675 1.68616 1.68591 1.16699 3.75675 1.16699Z"
                          stroke="#FF7506"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7 10.0449V12.8333"
                          stroke="#FF7506"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M1.16675 7.58301H12.8334"
                          stroke="#FF7506"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.375 12.833H9.625"
                          stroke="#FF7506"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text__db__2 ms-5">Thiết bị</span>
                  </div>
                </div>
                <div className="ms-20">
                  <div className="d-flex items-center">
                    <div className="roll__1"></div>
                    <div className="text__db__3 ms-5">Đang hoạt động</div>
                    <div
                      className="text__db__4 ms-10"
                      style={{ marginLeft: "20px" }}
                    >
                      {totalDVDHD}
                    </div>
                  </div>
                  <div className="d-flex items-center mt-10">
                    <div className="roll__2"></div>
                    <div className="text__db__3 ms-5">Ngưng hoạt động</div>
                    <div
                      className="text__db__4 ms-10"
                      style={{ marginLeft: "13px" }}
                    >
                      {totalDVNHD}
                    </div>
                  </div>
                </div>
              </div>
              <div className="dashboard__border__2 ms-30 d-flex items-center mt-15">
                <div>
                  <img src={Img9} alt="" />
                </div>

                <div className="ms-10">
                  <div className="text__db__1">{totalService}</div>
                  <div>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                      >
                        <path
                          d="M14.7704 5.7304C14.7704 7.04284 14.0591 8.22267 12.9266 9.04368C12.8874 9.07098 12.8658 9.11778 12.8639 9.16459L12.8149 10.4419C12.809 10.6135 12.6189 10.713 12.4739 10.6213L11.3864 9.94074C11.3864 9.94074 11.3864 9.94074 11.3845 9.94074C11.3218 9.89978 11.2453 9.88808 11.1748 9.90954C10.5282 10.1104 9.82472 10.2216 9.08797 10.2216C9.07817 10.2216 9.06837 10.2216 9.05857 10.2216C9.07817 10.0928 9.08797 9.96219 9.08797 9.82958C9.08797 7.99841 7.2108 6.51436 4.89472 6.51436C4.41857 6.51436 3.96201 6.57676 3.53485 6.69182C3.44863 6.38175 3.40356 6.05802 3.40356 5.7265C3.40356 3.24398 5.94695 1.2334 9.08601 1.2334C12.227 1.2373 14.7704 3.24983 14.7704 5.7304Z"
                          stroke="#4277FF"
                          stroke-width="1.10526"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M3.53675 6.69531C1.88884 7.14189 0.703369 8.37828 0.703369 9.83308C0.703369 10.8003 1.22851 11.6721 2.06324 12.2785C2.09263 12.3 2.1083 12.3331 2.11026 12.3682L2.14553 13.3102C2.14945 13.4369 2.29053 13.5091 2.3983 13.4428L3.20168 12.9396C3.20756 12.9357 3.2154 12.9299 3.22128 12.926C3.25067 12.9026 3.28986 12.8948 3.32513 12.9065C3.81108 13.0625 4.34013 13.1483 4.89662 13.1483C7.04419 13.1483 8.81555 11.871 9.06048 10.2251"
                          stroke="#4277FF"
                          stroke-width="1.10526"
                          stroke-miterlimit="10"
                        />
                      </svg>
                    </span>
                    <span className="text__db__2 cl__blue ms-5">Dịch vụ</span>
                  </div>
                </div>
                <div className="ms-20">
                  <div className="d-flex items-center">
                    <div className="roll__3"></div>
                    <div className="text__db__3 ms-5">Đang hoạt động</div>
                    <div
                      className="text__db__4 ms-10 cl__blue"
                      style={{ marginLeft: "20px" }}
                    >
                      {totalSVDHD}
                    </div>
                  </div>
                  <div className="d-flex items-center mt-10">
                    <div className="roll__2"></div>
                    <div className="text__db__3 ms-5">Ngưng hoạt động</div>
                    <div
                      className="text__db__4 ms-10 cl__blue"
                      style={{ marginLeft: "13px" }}
                    >
                      {totalSVNHD}
                    </div>
                  </div>
                </div>
              </div>
              <div className="dashboard__border__2 ms-30 d-flex items-center mt-15">
                <div>
                  <img src={Img9} alt="" />
                </div>

                <div className="ms-10">
                  <div className="text__db__1">{totalNumber}</div>
                  <div>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_233_8368)">
                          <path
                            d="M1.16675 9.91699L7.00008 12.8337L12.8334 9.91699"
                            stroke="#35C75A"
                            stroke-width="1.16667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M1.16675 7L7.00008 9.91667L12.8334 7"
                            stroke="#35C75A"
                            stroke-width="1.16667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.00008 1.16699L1.16675 4.08366L7.00008 7.00033L12.8334 4.08366L7.00008 1.16699Z"
                            stroke="#35C75A"
                            stroke-width="1.16667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_233_8368">
                            <rect width="14" height="14" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <span className="text__db__2 cl__green ms-5">Cấp số</span>
                  </div>
                </div>
                <div style={{ marginLeft: "27px" }}>
                  <div className="d-flex items-center">
                    <div className="roll__4"></div>
                    <div className="text__db__3 ms-5">Đang chờ</div>
                    <div
                      className="text__db__4 cl__green"
                      style={{ marginLeft: "55px" }}
                    >
                      {totalDC}
                    </div>
                  </div>
                  <div className="d-flex items-center ">
                    <div className="roll__2"></div>
                    <div className="text__db__3 ms-5">Đã sử dụng</div>
                    <div
                      className="text__db__4 cl__green"
                      style={{ marginLeft: "45px" }}
                    >
                      {totalDSD}
                    </div>
                  </div>
                  <div className="d-flex items-center ">
                    <div className="roll__5"></div>
                    <div className="text__db__3 ms-5">Bỏ qua</div>
                    <div
                      className="text__db__4 cl__green"
                      style={{ marginLeft: "69px" }}
                    >
                      {totalBQ}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-20 ms-30 date__box">
              <DatePicker
                selected={new Date()}
                onChange={handleDateChange}
                inline
              />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Dashboard;
