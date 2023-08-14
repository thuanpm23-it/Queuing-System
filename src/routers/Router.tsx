import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../view/Signup/Login";
import NewPassword from "../view/Signup/NewPassword";
import ForgotPassword from "./../view/Signup/ForgotPassword/index";
import Profile from "../view/Profile";
import Dashboard from "../view/Dashboard";
import DeviceList from "../view/Device/List";
import DeviceAdd from "../view/Device/Add";
import DeviceDetail from "../view/Device/Detail";
import DeviceUpdate from "../view/Device/Update";
import ServiceList from "../view/Service/List";
import ServiceAdd from "../view/Service/Add";
import ServiceUpdate from "../view/Service/Update";
import ServiceDetail from "../view/Service/Detail";
import NumberList from "../view/NumberAllocation/List";
import NumberAdd from "../view/NumberAllocation/Add";
import NumberDetail from "../view/NumberAllocation/Detail";
import ReportList from "../view/Report";
import RoleList from "../view/SystemInstallation/Role/List";
import RoleAdd from "../view/SystemInstallation/Role/Add";
import RoleUpdate from "../view/SystemInstallation/Role/Update";
import AccountList from "./../view/SystemInstallation/Account/List/index";
import AccountAdd from "../view/SystemInstallation/Account/Add";
import AccountUpdate from "../view/SystemInstallation/Account/Update";
import UserLogList from "../view/SystemInstallation/UserLog";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/newpassword" element={<NewPassword />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/device" element={<DeviceList />} />
        <Route path="/device/add" element={<DeviceAdd />} />
        <Route path="/device/detail/:id" element={<DeviceDetail />} />
        <Route path="/device/update/:id" element={<DeviceUpdate />} />

        <Route path="/service" element={<ServiceList />} />
        <Route path="/service/add" element={<ServiceAdd />} />
        <Route path="/service/update/:id" element={<ServiceUpdate />} />
        <Route path="/service/detail" element={<ServiceDetail />} />

        <Route path="/numberallocaiton" element={<NumberList />} />
        <Route path="/numberallocaiton/add" element={<NumberAdd />} />
        <Route path="/numberallocaiton/detail" element={<NumberDetail />} />

        <Route path="/report" element={<ReportList />} />

        <Route path="/role" element={<RoleList />} />
        <Route path="/role/add" element={<RoleAdd />} />
        <Route path="/role/update/:id" element={<RoleUpdate />} />

        <Route path="/account" element={<AccountList />} />
        <Route path="/account/add" element={<AccountAdd />} />
        <Route path="/account/update/:id" element={<AccountUpdate />} />

        <Route path="/userlog" element={<UserLogList />} />
      </Routes>
    </>
  );
};

export default Routers;
