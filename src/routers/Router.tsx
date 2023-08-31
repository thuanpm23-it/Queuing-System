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
import UserDataUtil from "../components/UserData";
import NumberAddWtlogin from "../view/NumberAllocation/AddWithoutLogin";
import Protected from "../components/Protected";

const Routers = () => {
  const userData = UserDataUtil();
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/newpassword" element={<NewPassword />} />

        <Route path="/profile" element={<Protected Cmp={Profile} />} />

        <Route path="/dashboard" element={<Protected Cmp={Dashboard} />} />

        <Route path="/device" element={<Protected Cmp={DeviceList} />} />
        <Route path="/device/add" element={<Protected Cmp={DeviceAdd} />} />
        <Route
          path="/device/detail/:id"
          element={<Protected Cmp={DeviceDetail} />}
        />
        <Route
          path="/device/update/:id"
          element={<Protected Cmp={DeviceUpdate} />}
        />

        <Route path="/service" element={<Protected Cmp={ServiceList} />} />
        <Route path="/service/add" element={<Protected Cmp={ServiceAdd} />} />
        <Route
          path="/service/update/:id"
          element={<Protected Cmp={ServiceUpdate} />}
        />
        <Route
          path="/service/detail/:id"
          element={<Protected Cmp={ServiceDetail} />}
        />

        <Route
          path="/numberallocaiton"
          element={<Protected Cmp={NumberList} />}
        />
        <Route
          path="/numberallocaiton/add"
          element={
            userData ? <Protected Cmp={NumberAdd} /> : <NumberAddWtlogin />
          }
        />
        <Route
          path="/numberallocaiton/detail/:id"
          element={<Protected Cmp={NumberDetail} />}
        />

        <Route path="/report" element={<Protected Cmp={ReportList} />} />

        <Route path="/setting" element={<Navigate to="/setting/role" />} />

        <Route path="/setting/role" element={<Protected Cmp={RoleList} />} />
        <Route path="/setting/role/add" element={<Protected Cmp={RoleAdd} />} />
        <Route
          path="/setting/role/update/:id"
          element={<Protected Cmp={RoleUpdate} />}
        />

        <Route
          path="/setting/account"
          element={<Protected Cmp={AccountList} />}
        />
        <Route
          path="/setting/account/add"
          element={<Protected Cmp={AccountAdd} />}
        />
        <Route
          path="/setting/account/update/:id"
          element={<Protected Cmp={AccountUpdate} />}
        />

        <Route
          path="/setting/userlog"
          element={<Protected Cmp={UserLogList} />}
        />
      </Routes>
    </>
  );
};

export default Routers;
