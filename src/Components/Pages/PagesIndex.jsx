// import { useDispatch } from "react-redux"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { Remove_Special_Character, Password_Rejex,validApkFile,Mobile_regex } from "../Utils/Valid_Rejex";
import { LOGIN_API } from "../Services/AuthServices";
import { Icon } from "@iconify/react/dist/iconify.js";
import 'react-responsive-modal/styles.css';

import Logo from "../Layout/Logo/Logo_png";
import { useFormik } from "formik";
import Auth_Containt from "../Layout/Main/Auth_content";
import Main_Containt from "../Layout/Main/Main_Containt";
import Formikform from "../Helpers/FormikForm/Form";
import Toast from "../Helpers/Toast";
import { getGenerateToken } from "../Redux/slice/CommonSlice";
import { Link } from "react-router-dom";
import * as valid_err from "../Utils/Common_Msg";
import * as admin_services from "../Services/SuperAdminServices";
import * as common_services from "../Services/CommonServices";
import {
  ADD_SYSTEM_INFO_API,
  LIST_SYSTEM_INFO_API,
  UPDATE_SYSTEM_INFO_API,
} from "../Services/CommonServices";
import { Image_Regexp } from "../Utils/Valid_Rejex";
import Loader from "../Helpers/Loader";
import SuperAdminChangePassword from "./Superadmin/Profile/SuperAdminChangePassword";
import profileLogo from "../../../public/assets/images/avatar/12b69c03188762a06008e9d7151832d4.png";
import empLogo from "../../../public/assets/images/avatar/emp-logo.png";
import TeamMets from "./Superadmin/Profile/TeamMets";
import { getEmployeeList } from "../Redux/slice/SuperAdminSlice";
import * as commonSlice from "../Redux/slice/CommonSlice";
import DeleteSweetAlert from "../Helpers/DeleteSweetAlert";
import Data_Table from "../Helpers/Table/Datatable";
import CuttingGroupMain from "../Helpers/CuttingGroup/CuttingGroup";
import MultiTabs from "../Helpers/MultiTabs";
import WalletMain from "../Helpers/Wallet/WalletMain";
import ChangeStatus from "../Helpers/ChangeStatus";


const PagesIndex = {
  useDispatch,
  useState,
  useSelector,
  useNavigate,
  toast,
  v4,
  Remove_Special_Character,
  LOGIN_API,
  Logo,
  useFormik,
  Main_Containt,
  Formikform,
  Toast,
  getGenerateToken,
  useEffect,
  Link,
  valid_err,
  Password_Rejex,
  ADD_SYSTEM_INFO_API,
  Image_Regexp,
  Auth_Containt,
  LIST_SYSTEM_INFO_API,
  Loader,
  UPDATE_SYSTEM_INFO_API,
  admin_services,
  SuperAdminChangePassword,
  profileLogo,
  TeamMets,
  empLogo,
  getEmployeeList,
  Data_Table,
  useLocation,
  commonSlice,
  Icon,
  CuttingGroupMain,
  MultiTabs,
  WalletMain,
  ChangeStatus,
  validApkFile,
  Mobile_regex,
  common_services
};

export default PagesIndex;
