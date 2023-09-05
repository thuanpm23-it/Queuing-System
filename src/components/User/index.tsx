import React, { useEffect, useState } from "react";
import Img7 from "../../assets/images/notification.svg";
import { Link } from "react-router-dom";
import "../User/style.css";
import UserDataUtil from "../UserData";
import Notification from "../Notificantion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  fetchnumberData,
  selectnumberData,
} from "../../redux/slice/Number/saveNumberSlice";
import { fetchImageData, selectImgData } from "../../redux/slice/Image/slice";

const User = () => {
  const userData = UserDataUtil();
  const dispatch: AppDispatch = useDispatch();
  const numberData = useSelector(selectnumberData);
  const [showNotification, setShowNotification] = useState(false);
  const image = useSelector(selectImgData);

  const handleNotificationClick = () => {
    setShowNotification(!showNotification);
  };

  useEffect(() => {
    dispatch(fetchnumberData());
    dispatch(fetchImageData());
  }, [dispatch]);

  return (
    <>
      {userData && (
        <>
          <div
            className={`notification__box ${showNotification ? "show" : ""}`}
            onClick={handleNotificationClick}
          >
            {showNotification ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M16.1167 12.0743L15.2833 10.691C15.1083 10.3827 14.95 9.79935 14.95 9.45768V7.34935C14.95 5.39102 13.8 3.69935 12.1417 2.90768C11.7083 2.14102 10.9083 1.66602 9.99166 1.66602C9.08333 1.66602 8.26666 2.15768 7.83333 2.93268C6.20833 3.74102 5.08333 5.41602 5.08333 7.34935V9.45768C5.08333 9.79935 4.92499 10.3827 4.74999 10.6827L3.90833 12.0743C3.57499 12.6327 3.49999 13.2493 3.70833 13.816C3.90833 14.3743 4.38333 14.8077 4.99999 15.016C6.61666 15.566 8.31666 15.8327 10.0167 15.8327C11.7167 15.8327 13.4167 15.566 15.0333 15.0244C15.6167 14.8327 16.0667 14.391 16.2833 13.816C16.5 13.241 16.4417 12.6077 16.1167 12.0743Z"
                  fill="white"
                />
                <path
                  d="M12.3583 16.6743C12.0083 17.641 11.0833 18.3327 9.99999 18.3327C9.34166 18.3327 8.69166 18.066 8.23333 17.591C7.96666 17.341 7.76666 17.0077 7.64999 16.666C7.75833 16.6827 7.86666 16.691 7.98333 16.7077C8.17499 16.7327 8.37499 16.7577 8.57499 16.7743C9.04999 16.816 9.53333 16.841 10.0167 16.841C10.4917 16.841 10.9667 16.816 11.4333 16.7743C11.6083 16.7577 11.7833 16.7493 11.95 16.7243C12.0833 16.7077 12.2167 16.691 12.3583 16.6743Z"
                  fill="white"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M16.1167 12.0743L15.2833 10.691C15.1083 10.3827 14.95 9.79935 14.95 9.45768V7.34935C14.95 5.39102 13.8 3.69935 12.1417 2.90768C11.7083 2.14102 10.9083 1.66602 9.99166 1.66602C9.08333 1.66602 8.26666 2.15768 7.83333 2.93268C6.20833 3.74102 5.08333 5.41602 5.08333 7.34935V9.45768C5.08333 9.79935 4.92499 10.3827 4.74999 10.6827L3.90833 12.0743C3.57499 12.6327 3.49999 13.2493 3.70833 13.816C3.90833 14.3743 4.38333 14.8077 4.99999 15.016C6.61666 15.566 8.31666 15.8327 10.0167 15.8327C11.7167 15.8327 13.4167 15.566 15.0333 15.0244C15.6167 14.8327 16.0667 14.391 16.2833 13.816C16.5 13.241 16.4417 12.6077 16.1167 12.0743Z"
                  fill="#FFAC6A"
                />
                <path
                  d="M12.3584 16.6743C12.0084 17.641 11.0834 18.3327 10 18.3327C9.34169 18.3327 8.69169 18.066 8.23336 17.591C7.96669 17.341 7.76669 17.0077 7.65002 16.666C7.75836 16.6827 7.86669 16.691 7.98336 16.7077C8.17502 16.7327 8.37502 16.7577 8.57502 16.7743C9.05002 16.816 9.53336 16.841 10.0167 16.841C10.4917 16.841 10.9667 16.816 11.4334 16.7743C11.6084 16.7577 11.7834 16.7493 11.95 16.7243C12.0834 16.7077 12.2167 16.691 12.3584 16.6743Z"
                  fill="#FFAC6A"
                />
              </svg>
            )}
            <div
              className={`notificantion__main ${
                showNotification ? "show" : ""
              }`}
            >
              {showNotification && (
                <>
                  <div className="not__header">
                    <div className="not__text">Thông báo</div>
                  </div>
                  <div className="not__list">
                    {numberData.map((data, index) => (
                      <Notification key={index} not={data} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="ms-20">
            <Link to="/profile">
              {userData.userImg ? (
                <img
                  src={userData.userImg}
                  alt="Profile"
                  className="profile__img__icon"
                />
              ) : (
                <img
                  src={image?.noimage}
                  alt="Profile"
                  className="profile__img__icon"
                />
              )}
            </Link>
          </div>
          <div className="ms-10">
            <span className="profile__text__1">Xin chào</span>
            <br />
            <Link to="/profile" className="link">
              <span className="profile__text__2">{userData.fullName}</span>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default User;
