import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Common_service from "../../Services/CommonServices";
import * as admin_service from "../../Services/SuperAdminServices";

export const Games_Provider_List = createAsyncThunk(
  "common/Games_Provider_List",
  async (data) => {
    try {
      const res = await admin_service.GAME_PROVIDER_GET_LIST_API(data);
      // console.log("data123" ,res);

      return await res;
    } catch (err) {
      return err;
    }
  }
);

// GAME_RATES_GET_LIST_API

export const Games_Settings_List = createAsyncThunk("common/Games_Settings_List",async (data, token) => {
    
    try {
      const res = await admin_service.GAME_SEETING_LIST_API(data.data, data.token);
      console.log("resres", res);

      return await res;
    } catch (err) {
      return err;
    }
  }
);

//PERMISSION_GET_API

export const Get_permissions = createAsyncThunk(
  "common/PERMISSION_GET_API",
  async (id) => {
    try {
      const res = await Common_service.PERMISSION_GET_API(id);
      return await res;
    } catch (error) {
      return error;
    }
  }
);

const CommonSlice = createSlice({
  name: "CommonSlice",
  initialState: {
    getGenrateTokenState: "",
    gameProviders: [],
    gameSettings: [],
    getPermissions: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Games_Provider_List.pending, (state, action) => {
        return {
          ...state,
          gameProviders: [],
          isLoading: true,
        };
      })
      .addCase(Games_Provider_List.fulfilled, (state, action) => {
        return {
          ...state,
          gameProviders: action.payload.data,
          isLoading: false,
        };
      })
      .addCase(Games_Provider_List.rejected, (state, action) => {
        return {
          ...state,
          gameProviders: [],
          isLoading: false,
        };
      })
      .addCase(Games_Settings_List.pending, (state, action) => {
        return {
          ...state,
          gameSettings: [],
          isLoading: true,
        };
      })
      .addCase(Games_Settings_List.fulfilled, (state, action) => {
        return {
          ...state,
          gameSettings: action.payload.data,
          isLoading: false,
        };
      })
      .addCase(Games_Settings_List.rejected, (state, action) => {
        return {
          ...state,
          gameSettings: [],
          isLoading: false,
        };
      })
      .addCase(Get_permissions.pending, (state, action) => {
        return {
          ...state,
          getPermissions: {},
          isLoading: true,
        };
      })
      .addCase(Get_permissions.fulfilled, (state, action) => {
        return {
          ...state,
          getPermissions: action.payload?.data,
          isLoading: true,
        };
      })
      .addCase(Get_permissions.rejected, (state, action) => {
        return {
          ...state,
          getPermissions: {},
          isLoading: true,
        };
      });
  },
});

export default CommonSlice;
