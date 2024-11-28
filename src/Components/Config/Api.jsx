const Api = {
  COMMON_GENERATE_TOKEN: "common/generate-token",

  // AUTH MODULE
  LOGIN: "adminLogin/loginDashboard",

  //PERMISSION API
  PERMISSION_API: "/adminLogin/getPermission",

  //DASHBOARD COUNT
  GET_DASHBOARD_COUNT: "dashboard/dashboardCount",
  GET_DASHBOARD_COUNT_UPI_PAYMENT: "/dashboard/getBriefDeposit",
  GET_DASHBOARD_REGISTRED_USERS: "dashboard/getRegisteredUser",

  //USERS
  USERS_LIST: "allUser/getAllUsers",
  USER_PROFILE_GET: "/allUser/getProfile",
  BLOCK_USER: "/allUser/blockUser",

  //DELETED USERS 
  DELETED_USER_GET_TIMEHISTORY:"deleteduser/getTimeHistory",
  DELETED_USER_TIMEHISTORY:"deleteduser/timeHistory",
  GET_DELETED_USERS: "deleteduser",
 
  // SYSTEM MODULE
  ADD_SYSTEM_INFO: "admin/addSystemInfo",
  LIST_SYSTEM_INFO: "common/systemInforList",
  UPDATE_SYSTEM_INFO: "admin/updateSystemInfo",
  ADMIN_PROFILE_GET: "admin/adminProfile",

  // EMPLOYEE MODULE
  CREATE_EMPLOYEE: "master/employees/createEmployee",
  UPDATE_EMPLOYEE: "master/employees/updateEmployee",
  EMPLOYEE_CHANGE_PASSWORD: "master/employees/updatePassword",
  SINGLE_EMPLOYEE_LIST: "master/employees/empById",
  EMPLOYEE_LIST: "master/employees",
  BLOCK_EMPLOYEE: "master/employees/blockEmployee",
  DELETE_EMPLOYEE: "master/employees/deleteEmp",

  //MAIN GAME API'S
  MAIN_GAME: "mainGames",
  MAIN_GAME_ADD: "mainGames/insertGame",

  //GAME RATES
  ADMIN_GAME_RATES: "mainGameRate",
  ADMIN_GAME_RATES_ADD: "mainGameRate/insertGame",

  //GAME SETTING
  // ADMIN_GAME_SETTING: "/admin/game/gameSetting",
  ADMIN_GAME_SETTING: "mainGameSetting",
  ADMIN_GAME_SETTING_ADD: "mainGameSetting/insertSettings",
  ADMIN_GAME_SETTING_UPDATEALL: "mainGameSetting/updateAll",

  // GAME RESULT
  ADMIN_GAME_RESULT: "mainGameResult",
  ADMIN_GAME_RESULT_DELETE: "mainGameResult/delete",
  GET_GAME_RESULT_WITH_DATE: "mainGameResult/pastResult",
  GET_REMAINING_WINNER_LIST: "winnerList/remaningWinnerList",

  USERS_IDEAS: "/admin/UserIdea",

  //APP SETTINGS APP VERSION API'S
  GET_VERSION: "versionSetting",
  UPDATE_VERSION: "versionSetting/updateAppSet",

  //APP SETTINGS WALLET GET UPDATE API'S
  WALLET_CONTACT_LIST: "walletContect",
  WALLET_HEADLINE_LIST: "walletContect/headLine",
  WALLET_UPI_LIST: "walletContect/upi",
  UPDATE_WALLET_CONTACT: "walletContect/updatewalletContact",
  UPDATE_WALLET_HEADLINE: "walletContect/updateHeadline",
  UPDATE_WALLET_UPI: "walletContect/updateUpiId",

  //APP SETTINGS NOTICE BOARD
  NOTICE_BOARD_LIST: "noticeBoard",
  UPDATE_NOTICE_BOARD: "noticeBoard/updateNotice",

  //APP SETTINGS WITHDRAW SCREEN
  GET_WITHDRAW_SCREEN: "withdraw",
  UPDATE_WITHDRAW_SCREEN: "withdraw/updateWithdraw",

  //APP SETTINGS PROFILE NOT GET AND UPDATE API

  GET_PROFILE_NOTE: "profileNote",
  UPDATE_PROFILE_NOTE: "profileNote/updateProfileNote",

  // APP SETTINGS HOW TO PLAY
  HOW_TO_PLAY_GET_LIST: "appSetting/htp",
  UPDATE_HTP: "appSetting/updateHtp",

  //UPI LIST
  GET_UPI_LIST: "upiId",
  ADD_UPI_LIST: "upiId/upiAdd",
  BLOCK_UPI_LIST: "upiId/disable_upi",
  DELETE_UPI_LIST: "upiId/dlt_upi",

  //FUND MODE 
  GET_FUND_MODE:"upiId/fundMode",
  ADD_FUND_MODE:"upiId/modeAdd",
  DELETE_FUND_MODE:"upiId/dlt_mode",
CHANGE_STATUS_FUND_MODE:"upiId/disable_mode",

//notification apis
GET_NOTIFICATION : "notification",
ADD_NOTIFICATION : "notification/inserNotification",
DELETE_NOTIFICATION : "notification",

};

export { Api };
