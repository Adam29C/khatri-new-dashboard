import axios from "axios";
import { Api } from "../Config/Api";

import dataservice, { BASE_URL } from "../Config/DataService";
import { header } from "../Config/Header";

// ---------------    FOR  STARLINE AND JACPOT  PROVIDERS  ---------------------
export const STARLINE_AND_JACKPOT_GAME_PROVIDERS_LIST_API = async (
  api_Route,
  token
) => {
  try {
    const res = await axios.get(`${BASE_URL}${api_Route}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const STARLINE__AND_JACKPOT_GAME_PROVIDER_ADD_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.post(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const STARLINE__AND_JACKPOT_GAME_PROVIDERS_GET_BY_ID_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.get(`${BASE_URL}${api_Route}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const STARLINE__AND_JACKPOT_GAME_PROVIDER_UPDATE_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.patch(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const STARLINE__AND_JACKPOT_GAME_PROVIDERS_DELETE_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.delete(`${BASE_URL}${api_Route}?providerId=${data}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

// ---------------FOR_STARLINE_AND_JACPOT_LIST  ---------------------



// ---------------    FOR  STARLINE AND JACPOT  PROVIDERS  ---------------------
export const STARLINE_AND_JACKPOT_GAME_RATE_LIST_API = async (
  api_Route,
  token
) => {
  try {
    const res = await axios.get(`${BASE_URL}${api_Route}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const STARLINE__AND_JACKPOT_GAME_RATE_ADD_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.post(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const STARLINE__AND_JACKPOT_GAME_RATE_GET_BY_ID_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.get(`${BASE_URL}${api_Route}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const STARLINE__AND_JACKPOT_GAME_RATE_UPDATE_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.patch(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const STARLINE__AND_JACKPOT_GAME_RATE_DELETE_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.delete(`${BASE_URL}${api_Route}?providerId=${data}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

// ---------------FOR_STARLINE_AND_JACPOT_LIST  ---------------------



// ---------------FOR_STARLINE_AND_JACPOT_LIST  ---------------------
export const FOR_STARLINE_AND_JACPOT_LIST_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.get(`${BASE_URL}${api_Route}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const FOR_STARLINE_AND_JACPOT_PROVIDER_LIST_API = async (
  api_Route,
  token
) => {
  try {
    const res = await axios.get(`${BASE_URL}${api_Route}`, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const FOR_STARLINE_AND_JACPOT_ADD_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.post(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const FOR_STARLINE_AND_JACPOT_UPDATE_GAME_SETTING_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.post(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

export const FOR_STARLINE_AND_JACPOT_UPDATE_ONE_GAME_SETTING_API = async (
  api_Route,
  data,
  token
) => {
  try {
    const res = await axios.patch(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};

// ---------------FOR_STARLINE_AND_JACPOT_LIST  ---------------------
