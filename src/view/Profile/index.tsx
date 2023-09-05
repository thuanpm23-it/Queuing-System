import React, { useEffect, useState } from "react";
import { Col, Input, Row } from "antd";
import "../Profile/style.css";
import MenuPage from "../../layout/Menu";
import Header from "../../layout/Header";
import UserDataUtil from "../../components/UserData";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoleData, selectRoleData } from "../../redux/slice/Role/slice";
import { db, storage } from "../../config/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { fetchImageData, selectImgData } from "../../redux/slice/Image/slice";

const Profile = () => {
  const userData = UserDataUtil();
  const dispatch: AppDispatch = useDispatch();
  const roleData = useSelector(selectRoleData);
  const [image, setImage] = useState<File | null>(null);
  const noimage = useSelector(selectImgData);

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (!selectedFile) {
      console.log("Không có tệp được chọn.");
      return;
    }
    setImage(selectedFile);
    try {
      const storageRef = ref(
        storage,
        `files/${userData.id}/${selectedFile.name}`
      );
      await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(storageRef);
      const userCollection = collection(db, "users");
      const userRef = doc(userCollection, userData.id);
      await updateDoc(userRef, {
        userImg: downloadURL,
      });
      userData.userImg = downloadURL;
      localStorage.setItem("userData", JSON.stringify(userData));
      console.log("Đã tải lên ảnh và URL:", downloadURL);
    } catch (error) {
      console.error("Lỗi khi tải ảnh lên:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchRoleData());
    dispatch(fetchImageData());
  }, [dispatch]);
  const breadcrumbPaths = [{ label: "Thông tin người dùng" }];
  return (
    <>
      {userData && (
        <Row className="main__wrapper">
          <MenuPage />
          <Col span={20} className="main__bg">
            <Header breadcrumbPaths={breadcrumbPaths} />
            <Row>
              <div className="profile__main__box ms-30 d-flex content-center">
                <div className="text-center">
                  {userData.userImg ? (
                    <div>
                      <img
                        src={userData.userImg}
                        alt="Profile"
                        className="profile__img"
                      />
                      <div className="add__image">
                        <label htmlFor="fileInput">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M17.85 3.75C18.3747 3.75014 18.8861 3.91536 19.3116 4.22226C19.7372 4.52916 20.0554 4.96219 20.2213 5.46L20.9 7.5H23.75C24.7446 7.5 25.6984 7.89509 26.4017 8.59835C27.1049 9.30161 27.5 10.2554 27.5 11.25V21.25C27.5 22.2446 27.1049 23.1984 26.4017 23.9017C25.6984 24.6049 24.7446 25 23.75 25H6.25C5.25544 25 4.30161 24.6049 3.59835 23.9017C2.89509 23.1984 2.5 22.2446 2.5 21.25V11.25C2.5 10.2554 2.89509 9.30161 3.59835 8.59835C4.30161 7.89509 5.25544 7.5 6.25 7.5H9.1L9.77875 5.46C9.94462 4.96199 10.263 4.52881 10.6889 4.22189C11.1147 3.91497 11.6263 3.74987 12.1512 3.75H17.8488H17.85ZM17.85 6.25H12.15L11.4713 8.29C11.3054 8.78801 10.987 9.22118 10.5611 9.52811C10.1353 9.83503 9.62366 10.0001 9.09875 10H6.25C5.91848 10 5.60054 10.1317 5.36612 10.3661C5.1317 10.6005 5 10.9185 5 11.25V21.25C5 21.5815 5.1317 21.8995 5.36612 22.1339C5.60054 22.3683 5.91848 22.5 6.25 22.5H23.75C24.0815 22.5 24.3995 22.3683 24.6339 22.1339C24.8683 21.8995 25 21.5815 25 21.25V11.25C25 10.9185 24.8683 10.6005 24.6339 10.3661C24.3995 10.1317 24.0815 10 23.75 10H20.9C20.3753 9.99986 19.8639 9.83464 19.4384 9.52774C19.0128 9.22084 18.6946 8.78781 18.5287 8.29L17.85 6.25ZM11.875 15.625C11.875 14.7962 12.2042 14.0013 12.7903 13.4153C13.3763 12.8292 14.1712 12.5 15 12.5C15.8288 12.5 16.6237 12.8292 17.2097 13.4153C17.7958 14.0013 18.125 14.7962 18.125 15.625C18.125 16.4538 17.7958 17.2487 17.2097 17.8347C16.6237 18.4208 15.8288 18.75 15 18.75C14.1712 18.75 13.3763 18.4208 12.7903 17.8347C12.2042 17.2487 11.875 16.4538 11.875 15.625ZM15 10C13.5082 10 12.0774 10.5926 11.0225 11.6475C9.96763 12.7024 9.375 14.1332 9.375 15.625C9.375 17.1168 9.96763 18.5476 11.0225 19.6025C12.0774 20.6574 13.5082 21.25 15 21.25C16.4918 21.25 17.9226 20.6574 18.9775 19.6025C20.0324 18.5476 20.625 17.1168 20.625 15.625C20.625 14.1332 20.0324 12.7024 18.9775 11.6475C17.9226 10.5926 16.4918 10 15 10Z"
                              fill="white"
                            />
                          </svg>
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          id="fileInput"
                          onChange={handleFileInputChange}
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <img
                        src={noimage?.noimage}
                        alt="Profile"
                        className="profile__img"
                      />
                      <div className="add__image">
                        <label htmlFor="fileInput">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M17.85 3.75C18.3747 3.75014 18.8861 3.91536 19.3116 4.22226C19.7372 4.52916 20.0554 4.96219 20.2213 5.46L20.9 7.5H23.75C24.7446 7.5 25.6984 7.89509 26.4017 8.59835C27.1049 9.30161 27.5 10.2554 27.5 11.25V21.25C27.5 22.2446 27.1049 23.1984 26.4017 23.9017C25.6984 24.6049 24.7446 25 23.75 25H6.25C5.25544 25 4.30161 24.6049 3.59835 23.9017C2.89509 23.1984 2.5 22.2446 2.5 21.25V11.25C2.5 10.2554 2.89509 9.30161 3.59835 8.59835C4.30161 7.89509 5.25544 7.5 6.25 7.5H9.1L9.77875 5.46C9.94462 4.96199 10.263 4.52881 10.6889 4.22189C11.1147 3.91497 11.6263 3.74987 12.1512 3.75H17.8488H17.85ZM17.85 6.25H12.15L11.4713 8.29C11.3054 8.78801 10.987 9.22118 10.5611 9.52811C10.1353 9.83503 9.62366 10.0001 9.09875 10H6.25C5.91848 10 5.60054 10.1317 5.36612 10.3661C5.1317 10.6005 5 10.9185 5 11.25V21.25C5 21.5815 5.1317 21.8995 5.36612 22.1339C5.60054 22.3683 5.91848 22.5 6.25 22.5H23.75C24.0815 22.5 24.3995 22.3683 24.6339 22.1339C24.8683 21.8995 25 21.5815 25 21.25V11.25C25 10.9185 24.8683 10.6005 24.6339 10.3661C24.3995 10.1317 24.0815 10 23.75 10H20.9C20.3753 9.99986 19.8639 9.83464 19.4384 9.52774C19.0128 9.22084 18.6946 8.78781 18.5287 8.29L17.85 6.25ZM11.875 15.625C11.875 14.7962 12.2042 14.0013 12.7903 13.4153C13.3763 12.8292 14.1712 12.5 15 12.5C15.8288 12.5 16.6237 12.8292 17.2097 13.4153C17.7958 14.0013 18.125 14.7962 18.125 15.625C18.125 16.4538 17.7958 17.2487 17.2097 17.8347C16.6237 18.4208 15.8288 18.75 15 18.75C14.1712 18.75 13.3763 18.4208 12.7903 17.8347C12.2042 17.2487 11.875 16.4538 11.875 15.625ZM15 10C13.5082 10 12.0774 10.5926 11.0225 11.6475C9.96763 12.7024 9.375 14.1332 9.375 15.625C9.375 17.1168 9.96763 18.5476 11.0225 19.6025C12.0774 20.6574 13.5082 21.25 15 21.25C16.4918 21.25 17.9226 20.6574 18.9775 19.6025C20.0324 18.5476 20.625 17.1168 20.625 15.625C20.625 14.1332 20.0324 12.7024 18.9775 11.6475C17.9226 10.5926 16.4918 10 15 10Z"
                              fill="white"
                            />
                          </svg>
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          id="fileInput"
                          onChange={handleFileInputChange}
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>
                  )}
                  <p className="profile__name mt-15">{userData.fullName}</p>
                </div>
                <div className="ms-20">
                  <div className="profile__box">
                    <label className="profile__label">Tên người dùng</label>
                    <br />
                    <Input
                      className="profile__input"
                      value={userData.fullName}
                      disabled
                    />
                  </div>
                  <div className="profile__box mt-20">
                    <label className="profile__label">Số diện thoại</label>
                    <br />
                    <Input
                      className="profile__input"
                      value={userData.phoneNumber}
                      disabled
                    />
                  </div>
                  <div className="profile__box mt-20">
                    <label className="profile__label">Email</label>
                    <br />
                    <Input
                      className="profile__input"
                      value={userData.email}
                      disabled
                    />
                  </div>
                </div>
                <div className="ms-20">
                  <div className="profile__box">
                    <label className="profile__label">Tên đăng nhập</label>
                    <br />
                    <Input
                      className="profile__input"
                      value={userData.username}
                      disabled
                    />
                  </div>
                  <div className="profile__box mt-20">
                    <label className="profile__label">Mật khẩu</label>
                    <br />
                    <Input
                      className="profile__input"
                      value={userData.password}
                      disabled
                    />
                  </div>
                  <div className="profile__box mt-20">
                    <label className="profile__label">Vai trò</label>
                    <br />
                    <Input
                      className="profile__input"
                      value={
                        roleData.find((role) => role.id === userData.role)
                          ?.roleName
                      }
                      disabled
                    />
                  </div>
                </div>
              </div>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Profile;
