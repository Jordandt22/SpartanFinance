import React, { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Contexts
import { useAuth } from "../Auth/Auth.context";
import { useGlobal } from "../Global/Global.context";
import { useUserAPI } from "../API/UserAPI.context";
import { useUser } from "../User/User.context";
import { useBank } from "../User/Bank.context";

// Firebase
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  deleteUser,
  onAuthStateChanged,
  signOut,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  getAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "spartanfinance-f46a9.firebaseapp.com",
  projectId: "spartanfinance-f46a9",
  storageBucket: "spartanfinance-f46a9.appspot.com",
  messagingSenderId: "406722099807",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-8ETNVEBTJ7",
};

// Firebase Context
const FirebaseContext = createContext();
export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseContextProvider = (props) => {
  const firebaseApp = initializeApp(firebaseConfig);
  const Auth = getAuth();
  const { showLoading, closeLoading } = useGlobal().state;
  const { authenticateUser, logoutUser } = useAuth();
  const { getUser } = useUserAPI().functions;
  const {
    userFunctions: { updateUser },
    bankFunctions: { finishBankLogin },
    resetUserContext,
  } = useUser();
  const {
    functions: { updateBankData },
    resetBankContext,
  } = useBank();
  const navigate = useNavigate();

  // Error Handler
  const errorHandler = (err) => {
    const { code } = err;
    console.log(code);

    switch (code) {
      case "auth/invalid-credential":
        return {
          code,
          form: { password: "Incorrect email or password." },
          type: "FIREBASE",
        };

      case "auth/email-already-in-use":
        return {
          code,
          form: { email: "An account with this email already exists." },
          type: "FIREBASE",
        };

      default:
        return null;
    }
  };

  // Get Current User
  const getCurrentUser = (cb) => onAuthStateChanged(Auth, (user) => cb(user));

  // Check Auth Session
  useEffect(() => {
    showLoading(true, "Logging you into your account...");
    getCurrentUser((user) => {
      if (user) {
        const { accessToken, uid } = user;

        // Get Information from Database
        getUser(uid, accessToken, (data, APIError) => {
          if (APIError || data.error) return console.log(APIError.error);

          // Change Auth State to Logged In
          authenticateUser(accessToken, uid);

          const { email, username, financialInfo } = data?.user;

          // Update User Info in User Context
          updateUser(email, username, financialInfo);

          // Check if BankID exists
          const bankID = data?.user?.bankID;
          if (bankID) {
            updateBankData({ bankID, ...data?.user?.bankInfo });
            finishBankLogin();
          }

          // Auth Finished
          navigate(localStorage.getItem("LAST_PAGE"));
        });
      }

      closeLoading();
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Create Email User
  const createEmailUser = (email, password, cb) =>
    createUserWithEmailAndPassword(Auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        authenticateUser(user.accessToken, user.uid);
        cb(user, null);
      })
      .catch((err) => cb(null, errorHandler(err)));

  // Sign In Email User
  const signInEmailUser = (email, password, cb) =>
    signInWithEmailAndPassword(Auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        authenticateUser(user.accessToken, user.uid);
        cb(user, null);
      })
      .catch((err) => cb(null, errorHandler(err)));

  // Log Out User
  const logoutFirebaseUser = () =>
    signOut(Auth).then(() => {
      logoutUser();
      resetUserContext();
      resetBankContext();
    });

  // Delete Firebase User
  const deleteFirebaseUser = () =>
    deleteUser(Auth.currentUser).then(() => {
      // Delete Database User
      // ---- Here ----

      logoutUser();
      resetUserContext();
      resetBankContext();
    });

  return (
    <FirebaseContext.Provider
      value={{
        firebaseApp,
        Auth,
        functions: {
          getCurrentUser,
          createEmailUser,
          logoutFirebaseUser,
          signInEmailUser,
          deleteFirebaseUser,
        },
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
