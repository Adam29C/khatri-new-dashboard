import axios from "axios";
import { Api } from "../Config/Api";
import { header } from "../Config/Header";
import dataservice, { BASE_URL } from "../Config/DataService";

export const ADMIN_PROFILE_GET_API = async (id) => {
  try {
    const res = await axios.get(`${Api.ADMIN_PROFILE_GET}?adminId=${id}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const ADMIN_CHANGE_PASSWORD_API = async (data) => {
  try {
    const res = await axios.post(Api.ADMIN_CHANGE_PASSWORD, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

// -------------------------- DASHBOARD_COUNT ------------------------

// GET_DASHBOARD_COUNT

export const GET_DASHBOARD_COUNT_API = async (id, token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.GET_DASHBOARD_COUNT}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GET_DASHBOARD_COUNT_UPI_PAYMENT_API = async (id) => {
  try {
    const res = await axios.get(`${Api.GET_DASHBOARD_COUNT_UPI_PAYMENT}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

// -------------------------- DASHBOARD_COUNT ------------------------

// --------------------------   USERS CRUD ------------------------

export const USERS_LIST_API = async (request, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.USERS_LIST}`, request, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const BLOCK_USER = async (ID) => {
  try {
    const res = await axios.put(Api.USERS_LIST, ID, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
export const DELETE_USER = async (ID) => {
  let apiData = {
    adminId: ID.adminId,
    userId: ID.deleteId,
    reason: ID.reason,
  };
  try {
    const res = await axios.delete(
      Api.USERS_LIST,
      { data: apiData },
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GET_DELETED_USERS = async (id) => {
  try {
    const res = await axios.get(`${Api.DELETED_USERS}?adminId=${id}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
export const GET_USERS_IDEAS = async (id) => {
  try {
    const res = await axios.get(`${Api.USERS_IDEAS}?adminId=${id}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
// --------------------------   USERS CRUD ------------------------

// --------------------------  game provider api ------------------------

export const GAME_PROVIDER_GET_LIST_API = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.MAIN_GAME}`, {
      headers: header(token),
    });

    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GAME_PROVIDER_ADD_API = async (data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.MAIN_GAME_ADD}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GAME_PROVIDER_DELETE_API = async (id, token) => {



  try {
    let apiData = {
      gameId: id,
    };
    const res = await axios.delete(
      `${BASE_URL}${Api.MAIN_GAME}`,
      {
        headers: header(token),
        data: apiData,
      }
    );


    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GAME_PROVIDER_UPDATE_API = async (data,token) => {

  try {
    // const res = await axios.patch(Api.MAIN_GAME, data, {
    //   headers: header(token),
    // });

    const res = await axios.patch(`${BASE_URL}${Api.MAIN_GAME}`,data,{headers:header(token)})


    return res?.data;
  } catch (error) {
    return error;
  }
};

//GAME RATES API
export const GAME_RATES_GET_LIST_API = async (token) => {
  try {

    const res = await axios.get(`${BASE_URL}${Api.ADMIN_GAME_RATES}`,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GAME_RATES_ADD_API = async (data,token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.ADMIN_GAME_RATES_ADD}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GAME_RATES_UPDATE_API = async (data,token) => {
  try {
    const res = await axios.patch(`${BASE_URL}${Api.ADMIN_GAME_RATES}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GAME_RATES_DELETE_API = async (id,token) => {

  try {
    let apiData = {
      userId: id,
    };

    const res = await axios.delete(`${BASE_URL}${Api.ADMIN_GAME_RATES}`, {
      data: apiData,
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

// --------------------------  game provider api ------------------------
// --------------------------   super admin provider api ------------------------

// --------------------------   GAME SETTING CRUD ------------------------

export const GAME_SEETING_LIST_API = async (data, token) => {

  try {
    const { userId, gameType } = data;
    const res = await axios.get(`${BASE_URL}${Api.ADMIN_GAME_SETTING}`, {
      headers: header(token),
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const GAME_SETTING_ADD = async (data, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}${Api.ADMIN_GAME_SETTING_ADD}`,
      data,
      {
        headers: header(token),
      }
    );
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GAME_SETTING_UPDATE_API = async (data, token) => {
  try {
    const res = await axios.patch(`${BASE_URL}${Api.ADMIN_GAME_SETTING}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GAME_SETTING_UPDATEALL_API = async (data ,token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.ADMIN_GAME_SETTING_UPDATEALL}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

// --------------------------   GAME SETTING CRUD ------------------------

// --------------------------   GAME RESULT CRUD ------------------------


export const GAME_RESULT = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.ADMIN_GAME_RESULT}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const ADD_GAME_RESULT = async (data,token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.ADMIN_GAME_RESULT}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GAME_RESULT_DELETE = async (data,token) => {
  console.log(token,"check game result")
  console.log(data)
  try {
    const res = await axios.delete(`${BASE_URL}${Api.ADMIN_GAME_RESULT_DELETE}`, {
      data:data,
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};


export const GAME_RESULT_DATEWISE = async (req,token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.GET_GAME_RESULT_WITH_DATE}?date=${req}`,{
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};


export const GAME_REMAINING_WINNER_LIST_API = async(data,token)=>{
  try {
    const res = await axios.post(`${BASE_URL}${Api.GET_REMAINING_WINNER_LIST}`,data,{
      headers:header(token)
    })
    return res?.data;
  } catch (error) {
    return error;
  }
}

// --------------------------   GAME RESULT CRUD ------------------------

// --------------------------   GAME SETTING CRUD ------------------------

// -------------------------- APP_SETTINGS ------------------------

//HTP LIST START
export const GET_HTP_LIST_API = async (token) => {
  console.log(token)
  try {
    const res = await axios.get(`${BASE_URL}${Api.HOW_TO_PLAY_GET_LIST}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const UPDATE_HTP_API = async (data,token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.UPDATE_HTP}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

//HTP LIST END

//VERSION CONTROL API START
export const GET_VERSION_API = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.GET_VERSION}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const UPDATE_VERSION_API = async (formData,token) => {

  try {
    const res = await axios.post(`${BASE_URL}${Api.UPDATE_VERSION}`, formData, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
//VERSION CONTROL API END

//WALLET CONTACT API START
export const GET_WALLET_CONTACT_API = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.WALLET_CONTACT_LIST}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GET_WALLET_HEADLINE_API = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.WALLET_HEADLINE_LIST}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const GET_WALLET_UPI_API = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.WALLET_UPI_LIST}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const UPDATE_WALLET_CONTACT_API = async (data,token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.UPDATE_WALLET_CONTACT}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error?.response;
  }
};
export const UPDATE_WALLET_HEADLINE_API = async (data,token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.UPDATE_WALLET_HEADLINE}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error?.response;
  }
};
export const UPDATE_WALLET_UPI_API = async (data,token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.UPDATE_WALLET_UPI}`,data ,{
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error?.response;
  }
};

//WALLET CONTACT API END

//NOTICE BOARD API START
export const GET_NOTICE_BOARD_API = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.NOTICE_BOARD_LIST}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const UPDATE_NOTICE_BOARD_API = async (data,token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.UPDATE_NOTICE_BOARD}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    // console.log(error.response)
    return error?.response;
  }
};
//NOTICE BOARD API END

//APP WITHDRAW API START
export const GET_APP_WITHDRAW_API = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.GET_WITHDRAW_SCREEN}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const UPDATE_APP_WITHDRAW_API = async (data,token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.UPDATE_WITHDRAW_SCREEN}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
//APP WITHDRAW API END

// PROFILE NOTE GET AND UPDATE API START
export const GET_PROFILE_NOTE_API = async(token)=>{
  try {
    const res = await axios.get(`${BASE_URL}${Api.GET_PROFILE_NOTE}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error
  }
}

export const UPDATE_PROFILE_NOTE_API =async(data,token)=>{
  try {
    const res = await axios.post(`${BASE_URL}${Api.UPDATE_PROFILE_NOTE}`,data,{
      headers:header(token)
    })
    return res?.data;
  } catch (error) {
    return error?.response;
  }
}
// PROFILE NOTE GET AND UPDATE API END

// -------------------------- APP_SETTINGS ------------------------

// -------------------------- MASTERS ------------------------
//UPI LIST START
export const GET_UPI_LIST_API = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.GET_UPI_LIST}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const BLOCK_UPI_LIST_API = async (data,token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.BLOCK_UPI_LIST}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
export const ADD_UPI_LIST_API = async (data,token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.ADD_UPI_LIST}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
export const DELETE_UPI_LIST_API = async (apidata,token) => {

  try {
    const res = await axios.post(`${BASE_URL}${Api.DELETE_UPI_LIST}`, apidata, {
     
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

//UPI LIST END

// FUND MODE START
export const GET_FUND_MODE_API = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}${Api.GET_FUND_MODE}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const ADD_FUND_MODE_API = async (data,token) => {
  try {
    const res = await axios.post(`${BASE_URL}${Api.ADD_FUND_MODE}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const DELETE_FUND_MODE_API = async (apidata,token) => {

  try {
    const res = await axios.post(`${BASE_URL}${Api.DELETE_FUND_MODE}`, apidata, {
     
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

// FUND MODE END

// -------------------------- MASTERS ------------------------





// --------------------------   Employee Crud ------------------------

export const CREATE_EMPLOYEE = async (data) => {
  try {
    const res = await axios.post(Api.CREATE_EMPLOYEE, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
export const UPDATE_EMPLOYEE = async (data) => {
  try {
    const res = await axios.put(Api.UPDATE_EMPLOYEE, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const EMPLOYEE_GET_LIST_API = async (id) => {
  try {
    const res = await axios.get(`${Api.EMPLOYEE_LIST}?adminId=${id}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const BLOCK_EMPLOYEE_API = async (data) => {
  try {
    const res = await axios.patch(Api.BLOCK_EMPLOYEE, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const DELETE_EMPLOYEE = async (ID) => {
  let apiData = {
    adminId: ID.adminId,
    empId: ID.deleteId,
  };
  try {
    const res = await axios.delete(Api.DELETE_EMPLOYEE, {
      data: apiData,

      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};
// --------------------------   Employee Crud ------------------------
