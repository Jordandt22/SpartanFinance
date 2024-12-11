import React, { createContext, useContext } from "react";
import Axios from "axios";

// User API Context
const UserAPIContext = createContext();
export const useUserAPI = () => useContext(UserAPIContext);
export const UserAPIContextProvider = (props) => {
  const { REACT_APP_SPARTAN_API_URI } = process.env;
  const getUserAPIURI = (uid, path) =>
    REACT_APP_SPARTAN_API_URI + `/users/${uid}${path ? `/${path}` : ""}`;

  // Setting Access Token
  const config = (accessToken, headerOptions) => ({
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...headerOptions,
    },
  });

  // POST: Create User
  const createUser = (uid, accessToken, userData, cb) =>
    Axios.post(getUserAPIURI(uid), userData, config(accessToken))
      .then((res) => cb(res.data, null))
      .catch((err) => cb(null, err));

  // GET: Get User
  const getUser = (uid, accessToken, cb) =>
    Axios.get(getUserAPIURI(uid), config(accessToken))
      .then((res) => cb(res.data, null))
      .catch((err) => cb(null, err));

  // PATCH: Update User Financial Info
  const updateUserFinancialInfo = (uid, accessToken, userData, cb) =>
    Axios.patch(getUserAPIURI(uid, "financial"), userData, config(accessToken))
      .then((res) => cb(res.data, null))
      .catch((err) => cb(null, err));

  // PATCH: Update Username & Email
  const updateUserInfo = (uid, accessToken, userData, cb) =>
    Axios.patch(getUserAPIURI(uid, "info"), userData, config(accessToken))
      .then((res) => cb(null))
      .catch((err) => cb(err));

  return (
    <UserAPIContext.Provider
      value={{
        functions: {
          createUser,
          getUser,
          updateUserFinancialInfo,
          updateUserInfo,
        },
      }}
    >
      {props.children}
    </UserAPIContext.Provider>
  );
};
