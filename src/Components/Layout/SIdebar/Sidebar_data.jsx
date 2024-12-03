export const admin_Sidebar = [
  {
    id: 1,
    headerTitle: "Dashboard",
    title: "Dashboard",
    permission: "main",
    route: "dashboard",
    Icon: "icon-speedometer",
    NestedElement: [],
  },
  {
    id: 2,
    route: "Users",
    headerTitle: "Users",
    permission: "users",
    title: "Users",
    Icon: "fa fa-users",
    NestedElement: [],
  },
  {
    id: 2,
    route: "system",
    headerTitle: "Penal Info",
  permission: "000",

    title: "Penal Info",
    Icon: "icon-globe-alt",
    NestedElement: [
      {
        id: 1,
        title: "Systems",
  permission: "000",

        route: "system",
      },
    ],
  },

  {
    id: 3,
    route: "games",
    permission: "games",
    headerTitle: "Games",
    title: "Available Games",
    Icon: "fa-solid fa-gamepad",
    NestedElement: [
      {
        id: 1,
        title: "Game Provider",
        permission: "gamesProvider",
        route: "games",
      },
      {
        id: 2,
        title: "Games Setting",
        permission: "gamesSetting",
        route: "game/settings",
      },
      {
        id: 3,
        title: "Game Rates",
        permission: "gamesRates",
        route: "game/rates",
      },

      {
        id: 4,
        title: "Game Result",
        route: "game/results",
        permission: "gamesResult",
      },
      {
        id: 5,
        title: "Revert Result Payment",
        permission: "0",
        route: "#",
      },
      {
        id: 6,
        title: "Refund User Points",
        permission: "0",
        route: "#",
      },
    ],
  },
  {
    id: 4,
    route: "games/starlineProvider",
    title: "Starline",
    permission: "starline",
    Icon: "fa-regular fa-star",
    NestedElement: [
      {
        id: 1,
        title: "Star Game Provider",
        route: "games/starlineProvider",
        permission: "starlineProvider",
      },
      {
        id: 2,
        title: "Star Games Setting",
        route: "games/starlinegamesetting",
        permission: "starlineSetting",
      },
      {
        id: 3,
        title: "Star Game Rates",
        route: "games/starlinegamerates",
        permission: "starlineRates",
      },
      {
        id: 4,
        title: "Star Game Result",
        route: "#",
        permission: "starlineResult",
      },
      {
        id: 5,
        title: "Star Revert Result Payment",
        route: "#",
        permission: "0",
      },
      {
        id: 6,
        title: "Refund User Points",
        route: "#",
        permission: "0",
      },
    ],
  },
  {
    id: 5,
    route: "games/jackpotProvider",
    title: "Jackpot",
    permission: "ab",
    Icon: "fa-regular fa-heart",
    NestedElement: [
      {
        id: 1,
        title: "Jackpot Game Provider",
        route: "games/jackpotProvider",
        permission: "abProvider",
      },
      {
        id: 2,
        title: "Jackpot Games Setting",
        permission: "abSetting",
        route: "games/jackpotGameSetting",
      },
      {
        id: 3,
        title: "Jackpot Game Rates",
        permission: "abRates",
        route: "games/jackpotRates",
      },
      {
        id: 4,
        title: "Jackpot Profit/Loss",
        permission: "abProftLoss",
        route: "#",
      },
      {
        id: 4,
        title: "Jackpot Game Result",
        permission: "abResult",
        route: "#",
      },

      {
        id: 5,
        title: "Jackpot Revert Result Payment",
        permission: "0",
        route: "#",
      },
      {
        id: 6,
        title: "Refund User Points",
        permission: "0",
        route: "#",
      },
    ],
  },

  {
    id: 6,
    headerTitle: "Cutting Group",
    title: "Cutting Group",
    route: "cuttinggroup",
    permission: "cg",
    Icon: "icon-speedometer",
    NestedElement: [],
  },

  {
    id: 7,
    route: "OCGroup",
    headerTitle: "Bookie Corner",
    permission: "bookie",
    title: "Bookie Corner",
    Icon: "fa-solid fa-wallet",
    NestedElement: [
      {
        id: 1,
        title: "OC Cutting Group",
        permission: "ocCutting",
        route: "OCGroup",
      },
      {
        id: 2,
        title: "Final OC Cutting Group",
        route: "finalOCGroup",
        permission: "fcg",
      },
    ],
  },
  {
    id: 8,
    route: "wallet/manualrequest",
    headerTitle: "Wallet",
    permission: "wallet",
    title: "Wallet",
    Icon: "fa-solid fa-wallet",
    NestedElement: [
      {
        id: 1,
        title: "Fund Request",
        permission: "fundRequest",
        route: "wallet/manualrequest",
      },
      // {
      //   id: 1,
      //   title: "Manual Request",
      //   permission: "wallet",
      //   route: "wallet/manualrequest",
      // },
      {
        id: 2,
        title: "Export Debit Report",
        permission: "exportDebit",
        route: "wallet/debitreport",
      },
      {
        id: 3,
        title: "Download Debit Report",
        permission: "exportDebit",
        route: "wallet/moneycheck",
      },
      {
        id: 4,
        permission: "exportDebit",
        title: "Search Account",
        route: "wallet/searchaccount",
      },
      {
        id: 5,
        title: "Invoices",
        permission: "invoices",
        route: "wallet/invoices",
      },

      {
        id: 6,
        title: "View Wallet",
        permission: "viewWallet",
        route: "wallet/customerbalance",
      },
      {
        id: 7,
        permission: "reqONOFF",
        title: "Requests On/Off",
        route: "wallet/reqOnOff",
      },
    ],
  },

  {
    id: 9,
    route: "creditUPI",
    headerTitle: "Credit Request (UPI)",
    permission: "appDebit",
    title: "Credit Request (UPI)",
    Icon: "fa-solid fa-check",
    NestedElement: [],
  },
  {
    id: 10,
    headerTitle: "Approved Requests",
    title: "Approved Debit Requests",
    route: "approvedReports/bank",
    permission: "appDebit",
    Icon: "fa-solid fa-check",
    NestedElement: [
      {
        id: 1,
        title: "Bank Account(Export)",
        permission: "bankReq",
        route: "approvedReports/bank",
      },
      {
        id: 2,
        title: "Bank Account(Manual)",
        permission: "bankReq",
        route: "approvedReports/bankManual",
      },
    ],
  },
  {
    id: 11,
    headerTitle: "Pending Requests",
    title: "Pending Debit Requests",
    permission: "fundRequest",
    Icon: "fa-regular fa-clock",
    NestedElement: [
      {
        id: 1,
        title: "Pending Bank Requests",
        permission: "fundRequest",
        route: "#",
      },
      {
        id: 2,
        title: "Pending Paytm Requests",
        permission: "fundRequest",
        route: "#",
      },
    ],
  },

  {
    id: 12,
    route: "approvedReports/declined",
    headerTitle: "Declined Request",
    permission: "decDebit",
    title: "Declined Request",
    Icon: "fa-solid fa-times",
    NestedElement: [],
  },

  {
    id: 13,
    headerTitle: "Reports",
    title: "Reports",
    permission: "reports",
    Icon: "ti-agenda",
    NestedElement: [
      {
        id: 1,
        title: "Sales Report",
        route: "#",
        permission: "salesReport",
      },
      {
        id: 2,
        title: "Starline Sales Report",
        route: "#",
        permission: "starLineSaleReport",
      },
      {
        id: 3,
        title: "Andar Bahar Sales Report",
        route: "#",
        permission: "abTotalBids",
      },
      {
        id: 4,
        title: "Andar Bahar Total Bids",
        route: "#",
        permission: "abTotalBids",
      },
      {
        id: 5,
        title: "Fund Report",
        route: "#",
        permission: "upiReport",
      },
      {
        id: 6,
        title: "UPI Fund Report",
        route: "#",
        permission: "upiReport",
      },

      {
        id: 7,
        title: "Trak Pay Fund Report",
        route: "#",
        permission: "upiReport",
      },
      {
        id: 8,
        title: "RazorPay Fund Report",
        route: "#",
        permission: "upiReport",
      },
      {
        id: 9,
        title: "Total Bids",
        route: "#",
        permission: "totalBids",
      },
      {
        id: 10,
        title: "Credit/Debit Report",
        route: "#",
        permission: "credDebReport",
      },
      {
        id: 11,
        title: "Daily Report",
        route: "#",
        permission: "dailyReport",
      },
      {
        id: 12,
        title: "Bidding Report",
        route: "#",
        permission: "biddingReport",
      },
      {
        id: 13,
        title: "User Analysis",
        route: "#",
        permission: "biddingReport",
      },
      {
        id: 14,
        title: "Customer Balance",
        route: "#",
        permission: "customerBal",
      },
      {
        id: 15,
        title: "All User Bids",
        route: "#",
        permission: "allUserBIds",
      },
    ],
  },
  {
    id: 14,
    route: "notification",
    headerTitle: "Notification",
    title: "Notification",
    Icon: "fa-regular fa-bell",
    permission: "notification",

    NestedElement: [],
  },

  {
    id: 15,
    route: "users/ideas",
    headerTitle: "userIdeas",
    title: "User Idea's",
    Icon: "fa-regular fa-bell",
    permission: "notification",

    NestedElement: [],
  },

  {
    id: 16,
    headerTitle: "News",
    title: "News",
    route: "#",
    Icon: "fa-solid fa-television",
    permission: "news",
    NestedElement: [],
  },
  {
    id: 17,
    route: "users/deleted",
 
    title: "Deleted Users",
    permission: "delete",
    Icon: "fa-regular fa-bell",
    NestedElement: [],
  },

  {
    id: 18,
    route: "appSettings/howToPlay",
    headerTitle: "App Settings",
    title: "App Settings",
    permission: "app_settings",

    Icon: "fa-solid fa-cog",
    NestedElement: [
      {
        id: 1,
        title: "How To Play",
        route: "appSettings/howToPlay",
        permission: "howToPlay",
      },
      {
        id: 2,
        title: "Withdraw Screen",
        route: "appSettings/withDraw",
        permission: "app_settings",
      },
      {
        id: 3,
        title: "Notice Board",
        route: "appSettings/noticeBoard",
        permission: "noticeBoard",
      },
 
      {
        id: 4,
        title: "Profile Note",
        route: "appSettings/profileNote",
        permission: "profileNote",
      },
      {
        id: 5,
        title: "Wallet Contact",
        route: "appSettings/walletContact",
        permission: "walletContact",
      },

      {
        id: 6,
        title: "App Version",
        route: "appSettings/versionSetting",
        permission: "walletContact",
      },
    ],
  },
  {
    id: 19,
    route: "masters/UPI",
    headerTitle: "Masters",
    permission: "masters",
    title: "Masters",
    Icon: "ti-money",
    NestedElement: [
      
      {
        id: 1,
        title: "UPI Id",
        route: "masters/UPI",
        permission: "upiId",
      },
      {
        id: 2,
        title: "Add Fund Mode",
        permission: "addFoundMode",
        route: "masters/fundMode",
      },
      {
        id: 3,
        title: "Manage Employee",
        permission: "manageEmp",
        route: "employees",
      },
      {
        id: 4,
        permission: "createEmployee",
        title: "Register New Employee",
        route: "employees/add",
      },
    ],
  },
];
