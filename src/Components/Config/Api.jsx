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
 
  //MAIN GAME API'S
  MAIN_GAME: "mainGames",
  MAIN_GAME_ADD: "mainGames/insertGame",

  // ADMIN_GAME_RATES: "admin/game/gameRate",
  MAIN_GAME_RATE_LIST: "mainGameRate",
  MAIN_GAME_RATE_ADD: "mainGameRate/insertGame",
  MAIN_GAME_RATE_UPDATE: "mainGameRate",
  MAIN_GAME_RATE_REMOVE: "mainGameRate",

  //GAME SETTING
  // ADMIN_GAME_SETTING: "/admin/game/gameSetting",
  ADMIN_GAME_SETTING: "mainGameSetting",
  ADMIN_GAME_SETTING_ADD: "mainGameSetting/insertSettings",
  ADMIN_GAME_SETTING_UPDATEALL: "mainGameSetting/updateAll",

  // GAME PROVIDER

  STARLINE_GAME_PROVIDERS_LIST: "starlineProvider/getStarlineProvider",
  STARLINE_GAME_PROVIDER_ADD: "starlineProvider/insertStarLineProvider",
  STARLINE_GAME_PROVIDER_UPDATE: "starlineProvider/updateStarLineProvider",
  STARLINE_GAME_PROVIDERS_DELETE: "starlineProvider/deleteStarLineProvider",
  STARLINE_GAME_PROVIDERS_GET_BY_ID: "starlineProvider/starLineProviderById",

  // GAME RATE

  STARLINE_GAME_RATE_LIST: "starGameRate",
  STARLINE_GAME_RATE_ADD: "starGameRate/insertGame",
  STARLINE_GAME_RATE_UPDATE: "starGameRate/update",
  STARLINE_GAME_RATE_REMOVE: "starGameRate",

  // STARLINE GAME SETTING CRUD

  STARLINE_GAME_PROVIDERS: "starGameSetting/addSetting",
  STARLINE_GAME_SETTING_LIST: "starGameSetting",
  STARLINE_GAME_SETTING_ADD: "starGameSetting/insertSettings",
  STARLINE_GAME_SETTING_UPDATE_ALL: "starGameSetting/updateProviderSettings",
  STARLINE_GAME_SETTING_UPDATE_ONE: "starGameSetting",





  //  STARLINE GAME RESULT - 
  STARLINE_GAME_MAIN_RESULT: "starGameResult",
  STARLINE_GAME_MAIN_RESULT_ADD: "starGameResult",
  STARLINE_GAME_PAST_RESULT: "starGameResult/pastResult",
  STARLINE_GAME_WINNER_LIST: "starlineWinner/starLineWinnerList",
  STARLINE_GAME_DISTIBUTE_FUND_WINNERS: "starlineWinner/starWinners",
  // STARLINE_GAME_SETTING_ADD: "starGameSetting/insertSettings",
  // STARLINE_GAME_SETTING_UPDATE_ALL: "starGameSetting/updateProviderSettings",
  // STARLINE_GAME_SETTING_UPDATE_ONE: "starGameSetting",


  //  STARLINE REVERT PAYMENT - 

  STARLINE_GAME_REVERT_PAYMENT: "starGameResult/revertPayment",
  STARLINE_GAME_CONFIRM_REVERT_PAYMENT: "starGameResult/paymentRevert",
  

    //  STARLINE REVERT PAYMENT - 

    STARLINE_GAME_REFUND_PAYMENT: "mainGameResult/refundPayment",
    STARLINE_GAME_CONFIRM_REVERT_PAYMENT: "starGameResult/paymentRevert",

    



  // JACKPOT GAME SETTING CRUD

  JACKPOT_GAME_PROVIDERS: "abGameSetting/addSetting",
  JACKPOT_GAME_SETTING_LIST: "abGameSetting",
  JACKPOT_GAME_SETTING_ADD: "abGameSetting/insertSettings",
  JACKPOT_GAME_SETTING_UPDATE_ALL: "abGameSetting/updateProviderSettings",
  JACKPOT_GAME_SETTING_UPDATE_ONE: "abGameSetting",

  //   ADMIN_GAME_SETTING_ADD: "mainGameSetting/insertSettings",
  //   ADMIN_GAME_SETTING_UPDATEALL: "mainGameSetting/updateAll"
  // starGameSetting

  ADMIN_CHANGE_PASSWORD: "admin/changePassword",

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
  GET_MAIN_WINNER_LIST: "winnerList/mainWinnerList",

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
