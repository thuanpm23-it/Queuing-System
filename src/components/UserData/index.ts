import React from "react";

const UserDataUtil = () => {
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  return userData;
};

export default UserDataUtil;
