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

  // CUTTING GROUP

  CUTTING_GROUP_LIST: "cuttingGroups/getCutting",
  CUTTING_GROUP_OC_LIST: "cuttingGroups/getOC",
  GET_BID_DATA: "cuttingGroups/getOC",
  OC_CUTTING_GROUP_LIST: "ocCuttingGroup/getFinalCutting",
  OC_CUTTING_GROUP_OC_LIST: "ocCuttingGroup/finalCloseCutingGroup",

  // REPORT
  MAIN_GAME_REPORT: "mainSalesReport/userReport",
  STARLINE_GAME_REPORT: "starSalesReport/userReportStar",
  JACKPOT_REPORT: "abSalesReport/userReportAB",
  JACKPOT_BIDS_REPORT: "totalBids/andarBaharBidsData",
  GET_FUND_REPORT_DETAILS: "fundReports",
  GET_FUND_REPORT: "fundReports",
  GET_UPI_FUND_REPORT_DETAILS: "upiFundReport/upiReport",
  GET_UPI_FUND_REPORT: "upiFundReport/getUPIReport",
  GET_NEW_UPI_FUND_REPORT: "upiFundReport/getUPIFundReport",

  TOTAL_BIDS_LIST_DETAILS: "totalBidsReport/games",
  TOTAL_BIDS_LIST: "totalBidsReport/gameBidsData",
  CREDIT_DEBIT_LIST_DETAILS: "creditDebitReport",
  CREDIT_DEBIT_LIST: "creditDebitReport/report",
  DAILY_REPORT: "daliyReport/dailyData",
  DETAILS_BIDDING_REPORT: "biddingReport/biddingDay",
  GET_USER_ANALAYSIS_REPORT: "userAnalysis/analysisReport",
  GET_USER_BIDS_REPORT: "userBids/getUserBidData",

  // WALLET

  REQUEST_LIST: "reqOn_Off",
  REQUEST_LIST_UPDATE: "reqOn_Off/updateReq",
  GET_REQUEST_LIST: "reqOn_Off/getWithdrawReqOnOff",
  UPDATE_REQUEST: "reqOn_Off/withdrawReqOnOff",

  WALLET_LIST: "view_wallet",
  WALLET_LIST_HISTORY: "view_wallet/newHistroy",
  WALLET_LIST_CREDIT: "view_wallet/newCredit",
  WALLET_LIST_USER_PROFILE: "view_wallet/getProfile",
  WALLET_LIST_UPDATE_WALLET: "view_wallet/walletUpdate",

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

  //FUND REQUEST GET LIST AND APPROVED / DECLINED REQUEST APIS
  GET_FUND_REQUEST: "fundsRequest/getManualPaymentList",
  APPROVED_FUND_REQUEST: "fundsRequest/approveManualPayment",
  DECLINED_FUND_REQUEST: "fundsRequest/declineManualPayment",

  //wallet export debit report
  GET_EXPORT_DEBIT_REPORT: "exportDebit",
  //todayApproved
  EXPORT_DEBIT_TODAY_APPROVED_REPORT: "exportDebit/todayApproved",

  EXPORT_DEBIT_DECLINE_REPORT: "exportDebit/decline",

  //FUND MODE
  GET_FUND_MODE: "upiId/fundMode",

  ADD_FUND_MODE: "upiId/modeAdd",

  DELETE_FUND_MODE: "upiId/dlt_mode",
  CHANGE_STATUS_FUND_MODE: "upiId/disable_mode",
};

export { Api };
