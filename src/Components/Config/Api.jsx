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

  //   ADMIN_GAME_SETTING_ADD: "mainGameSetting/insertSettings",
  //   ADMIN_GAME_SETTING_UPDATEALL: "mainGameSetting/updateAll"

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

  // JACKPOT GAME PROVIDER CRUD
  JACKPOT_GAME_PROVIDER_LIST: "abGameSetting",
  JACKPOT_GAME_PROVIDER_ADD: "abGameProvider/insertGame",
  JACKPOT_GAME_PROVIDER_UPDATE: "abGameProvider",
  JACKPOT_GAME_PROVIDERS_DELETE: "abGameProvider",

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

  STARLINE_GAME_PROVIDER_LIST: "starGameProfitLoss",
  STARLINE_GAME_PROFIT_LOSS_LIST: "starGameProfitLoss/getResult",
  STARLINE_GAME_PROFIT_LOSS_BID_DATA: "starGameProfitLoss/getBidData",

  //  STARLINE REVERT PAYMENT -

  STARLINE_GAME_REVERT_PAYMENT: "starGameResult",
  STARLINE_GAME_CONFIRM_REVERT_PAYMENT: "starGameResult",

  // JACKPOT GAME SETTING CRUD
  JACKPOT_GAME_PROVIDERS: "abGameSetting/addSetting",
  JACKPOT_GAME_SETTING_LIST: "abGameSetting",
  JACKPOT_GAME_SETTING_ADD: "abGameSetting/insertSettings",
  JACKPOT_GAME_SETTING_UPDATE_ALL: "abGameSetting/updateProviderSettings",
  JACKPOT_GAME_SETTING_UPDATE_ONE: "abGameSetting",

  // JACKPOT GAME RATE
  JACKPOT_GAME_RATE_LIST: "abGameRate",
  JACKPOT_GAME_RATE_ADD: "abGameRate/insertGame",
  JACKPOT_GAME_RATE_UPDATE: "abGameRate/update",
  JACKPOT_GAME_RATE_REMOVE: "abGameRate",

  ADMIN_CHANGE_PASSWORD: "admin/changePassword",

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

    //FUND REQUEST APIS
    GET_FUND_REQUEST : "fundsRequest/getManualPaymentList"

};


export { Api };
