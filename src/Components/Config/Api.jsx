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
  DELETED_USERS: "/allUser/deleteUserByAdmin",
  USER_PROFILE_GET: "/allUser/getProfile",
  BLOCK_USER: "/allUser/blockUser",

  //MAIN GAME API'S
  MAIN_GAME: "mainGames",
  MAIN_GAME_ADD: "mainGames/insertGame",

  //GAME RATES
  // ADMIN_GAME_RATES: "admin/game/gameRate",

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
  STARLINE_GAME_RATE_ADD: "/starGameRate/insertGame",
  STARLINE_GAME_RATE_UPDATE: "/starGameRate/update",
  STARLINE_GAME_RATE_REMOVE: " /starGameRate/",

  // STARLINE GAME SETTING CRUD

  STARLINE_GAME_PROVIDERS: "starGameSetting/addSetting",
  STARLINE_GAME_SETTING_LIST: "starGameSetting",
  STARLINE_GAME_SETTING_ADD: "starGameSetting/insertSettings",
  STARLINE_GAME_SETTING_UPDATE_ALL: "starGameSetting/updateProviderSettings",
  STARLINE_GAME_SETTING_UPDATE_ONE: "starGameSetting",

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
  CREATE_EMPLOYEE: "admin/createEmployee",
  UPDATE_EMPLOYEE: "admin/updateEmployeeInformition",

  EMPLOYEE_LIST: "admin/empList",
  BLOCK_EMPLOYEE: "admin/blockEmployee",
  DELETE_EMPLOYEE: "admin/deleteEmployee",

  //MAIN GAME API'S
  MAIN_GAME: "mainGames",
  MAIN_GAME_ADD: "mainGames/insertGame",

  // GAME RESULT
  ADMIN_GAME_RESULT: "mainGameResult",

  USERS_IDEAS: "/admin/UserIdea",
  GET_VERSION: "/admin/appSetting/listVersionSetting",
  UPDATE_VERSION: "/admin/appSetting/updateVersionSetting",
  WALLET_CONTACT_LIST: "/admin/appSetting/walledContestList",
  UPDATE_WALLET_CONTACT: "/admin/appSetting/updateWalledContest",

  //NOTICE BOARD
  NOTICE_BOARD_LIST: "/admin/appSetting/noticeBoardList",
  UPDATE_NOTICE_BOARD: "/admin/appSetting/updateNoticeBoard",
  GET_WITHDRAW_SCREEN: "/admin/appSetting/withdrawMessageList",
  UPDATE_WITHDRAW_SCREEN: "/admin/appSetting/updateWithdrawMessage",
  //UPI LIST
  GET_UPI_LIST: "/admin/master/upiList",
  ADD_UPI_LIST: "/admin/master/addUpi",
  UPDATE_UPI_LIST: "/admin/master/updateUpiStatus",
  DELETE_UPI_LIST: "/admin/master/deleteUpi",

  //HOW TO PLAY
  HOW_TO_PLAY_GET_LIST: "/admin/appSetting/htpList",
  UPDATE_HTP: "/admin/appSetting/updateHtp",
};

export { Api };
