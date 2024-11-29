import axios from "axios";
import { BASE_URL } from "../Config/DataService";
import { header } from "../Config/Header";
// --------------- ALL GAMES  RESULT   ---------------------
export const ALL_GAME_REPORT_API = async (api_Route, data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}${api_Route}`, data, {
      headers: header(token),
    });
    return res?.data;
  } catch (error) {
    return error;
  }
};