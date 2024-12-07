import axios from "axios";
import { Api } from "../Config/Api";

import dataservice, { BASE_URL } from "../Config/DataService";
import { header } from "../Config/Header";

export const GET_DASHBOARD_REGISTRED_USERS = async (request, token) => {

  try {
    const res = await axios.post(
      `${BASE_URL}${Api.GET_DASHBOARD_REGISTRED_USERS}`,
      request,
      { headers: header(token) }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const ADD_SYSTEM_INFO_API = async (data) => {
  try {
    const res = await dataservice.post(Api.ADD_SYSTEM_INFO, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const LIST_SYSTEM_INFO_API = async (token, data) => {
  // try {
  //   if (token) {
  //     const res = await axios.post(`${BASE_URL}${Api.LIST_SYSTEM_INFO}`,data, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     return res?.data;
  //   } else {
  //     const res = await dataservice.post(Api.LIST_SYSTEM_INFO);
  //     return res?.data;
  //   }
  // } catch (error) {
  //   return error;
  // }
};

export const UPDATE_SYSTEM_INFO_API = async (data) => {
  // try {
  //   const res = await dataservice.put(Api.UPDATE_SYSTEM_INFO,data)
  //   return res?.data
  // } catch (error) {
  //   return error
  // }
};

//PERMISSION API
export const PERMISSION_GET_API = async (id) => {
  try {
    const res = await dataservice.get(`${Api.PERMISSION_API}?userId=${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const PROFILE_GET_API = async (id) => {
  try {
    const res = await dataservice.get(`${Api.USER_PROFILE_GET}?id=${id}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const BLOCK_USER_API = async (request, token) => {
  try {
    const res = await dataservice.post(`${Api.BLOCK_USER}`, request, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const DELETED_USERS_API = async (request, token) => {
  try {
    const res = await dataservice.post(`${Api.DELETED_USERS}`, request, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
