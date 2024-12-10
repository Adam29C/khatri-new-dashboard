import { useEffect } from "react";
import PagesIndex from "../../PagesIndex";
import { getActualDateFormate } from "../../../Utils/Common_Date";
import { handleCSVFile, handleTextFile, normalizeData } from "../../../Utils/ConvertFile";

const ExportDebitReport = () => {
  
  //get token in localstorage
  const token = localStorage.getItem("token");
  const userdetails = JSON.parse(localStorage.getItem("userdetails"));

  //set actual date
  const actual_date_formet = getActualDateFormate(new Date());

  //all state
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [TableData, setTableData] = PagesIndex.useState([]);
  const [todayReportData, setTodayReportData] = PagesIndex.useState([]);
  const [ModalState, setModalState] = PagesIndex.useState(false);
  const [btnStatus, setBtnStatus] = PagesIndex.useState(null);
  const [declineData, setDeclineData] = PagesIndex.useState();


  const handleBtnStatus = (status) => {
    setBtnStatus(status);
    setModalState(true);
    if (status === "see-report") {
      getTodayReport();
    }
  };

  const getTodayReport = async () => {
    const apidata = {
      date: actual_date_formet,
    };
    const res =
      await PagesIndex.admin_services.EXPORT_DEBIT_SEE_TODAY_REPORT_API(
        apidata,
        token
      );
    if (res?.status) {
      setTodayReportData(res?.data);
    }
  };

  //get export debit list
  const getExportDebitList = async () => {
    const apidata = {
      page: 1,
      limit: 10,
    };
    const res = await PagesIndex.admin_services.GET_EXPORT_DEBIT_REPORT_API(
      apidata,
      token
    );
    if (res?.status) {
      setTableData(res?.data);
    }
  };

  useEffect(() => {
    getExportDebitList();
  }, []);

  const handleDeclineReport = async (row) => {
    setDeclineData(row)
    setBtnStatus("decline-report");
    setModalState(true);
  };

  const UserFullButtonList = [
    {
      id: 0,
      buttonName: "Decline user request",
      buttonColor: "info",
      route: "",
      Conditions: (row) => {
        handleDeclineReport(row);
      },
      Visiblity: true,
      type: "button",
    },
  ];

  const handleDownloadFiles = async(row)=>{

    const data = {
      reportDate: actual_date_formet,
      searchType: "Pending",
    };
    
    const res = await PagesIndex.admin_services.EXPORT_MKXLS_FILE_API(data,token);
    console.log(res)
    if (res?.status) {
      const { filename, writeString} = res;
      if (writeString) {
        // Handle plain text format
        handleTextFile(writeString, filename || `MKTTC.txt`);
      }
    }
  }

  const UserFullButtonList1 = [
    // {
    //   id: 0,
    //   buttonName: "Download RBL.xls Report	",
    //   buttonColor: "dark",
    //   route: "",
    //   Conditions: (row) => {},
    //   Visiblity: true,
    //   type: "button",
    // },
    {
      id: 1,
      buttonName: "Download MK.txt Report	",
      buttonColor: "dark",
      route: "",
      Conditions: (row) => {
        handleDownloadFiles(row)
      },
      Visiblity: true,
      type: "button",
    },
    // {
    //   id: 2,
    //   buttonName: "Download Gajju Report",
    //   buttonColor: "dark",
    //   route: "",
    //   Conditions: (row) => {},
    //   Visiblity: true,
    //   type: "button",
    // },
    // {
    //   id: 3,
    //   buttonName: "Download FINA PNB Report",
    //   buttonColor: "dark",
    //   route: "",
    //   Conditions: (row) => {},
    //   Visiblity: true,
    //   type: "button",
    // },
  ];

  const visibleFields = [
    "id",
    "username",
    "mobile",
    "withdrawalMode",
    "name",
    "bank_name",
    "ifsc",
    "account_no",
    "walletBal",
    "reqAmount",
    "reqDate",
    "address",
    "city"
  ];

  const visibleFields1 = ["id", "ReportName", "ReportTime", "adminName"];

  const formik = PagesIndex.useFormik({
    initialValues: {
      searchType: "",
      reportType: "",
      date: actual_date_formet,
    },
    validate: (values) => {
      const errors = {};
      if (!values.searchType) {
        errors.searchType = PagesIndex.valid_err.REQUIRED_SEARCH_TYPE;
      }
      if (!values.reportType) {
        errors.reportType = PagesIndex.valid_err.REQUIRED_REPORT_TYPE;
      }
      return errors;
    },

    onSubmit: async (values) => {
      const data = {
        reportDate: values.date,
        searchType: values.searchType,
      };
      const res = await PagesIndex.admin_services.EXPORT_DEBIT_GET_REPORT_API(
        data,
        token,
        values.reportType
      );
      if (res?.status) {
        const { filename, writeString, Profile, profile } = res;
        if (writeString) {
          // Handle plain text format
          handleTextFile(writeString, filename || `${values.reportType}.txt`);
        } else if (Profile || profile) {
          // Normalize data from various formats
          const normalizedData = normalizeData(Profile || profile);
          if (normalizedData) {
            handleCSVFile(
              normalizedData,
              filename || `${values.reportType}.csv`
            );
          } else {
            console.error("Unexpected profile data format.");
          }
        } else {
          console.error("Unsupported response format.");
        }
      } else {
        console.error("Failed to fetch report:", response?.message);
      }
    },
  });
  const formik1 = PagesIndex.useFormik({
    initialValues: {
      reason: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.reason) {
        errors.reason = PagesIndex.valid_err.REQUIRED_REASON;
      }
      return errors;
    },

    onSubmit: async (values) => {
      const data = {
        id: userdetails?.user_id,
        rowId: declineData?.rowId,
        userId: declineData?.userId,
        firebaseId: declineData?.firebaseId,
        reason: values.reason,
        amountDecline: declineData?.reqAmount,
      };
      const res = await PagesIndex.admin_services.EXPORT_DEBIT_DECLINE_REPORT_API(data,token)
      if(res?.status){
        PagesIndex.toast.success(res?.message)
        setModalState(false)
        getExportDebitList()
      }
    },
  });


  const fields = [
    {
      name: "searchType",
      label: "Search Type",
      type: "select",
      label_size: 12,
      col_size: 4,
      options: [
        {
          label: "Approved Debit Requests",
          value: "Approved",
        },
        {
          label: "Pending Debit Requests",
          value: "Pending",
        },
      ],
    },
    {
      name: "reportType",
      label: "Report Type",
      type: "select",
      label_size: 12,
      col_size: 4,
      options: [
        // {
        //   label: "Kotk XLS",
        //   value: "xlsDataNew",
        // },
        // {
        //   label: "Cash free",
        //   value: "xlsDataDailyTrak",
        // },
        // {
        //   label: "Rbl.xls",
        //   value: "rblxls",
        // },
        {
          label: "MK.txt",
          value: "mkxls",
        },
        // {
        //   label: "Gajju Bob",
        //   value: "gajjubob",
        // },

        // {
        //   label: "FINAPNB",
        //   value: "Finapnb",
        // },
      ],
    },
    {
      name: "date",
      label: "Report Date",
      type: "date",
      label_size: 12,
      col_size: 4,
    },
  ];

  const fields1 = [
    {
      name: "reason",
      label: "Select Reason",
      type: "select",
      label_size: 12,
      col_size: 12,
      options: [
        {
          label: "Insufficient Balance",
          value: "Insufficient Balance",
        },
        {
          label: "In Valid Bank Details",
          value: "In Valid Bank Details",
        },
      ],
    },

  ];


  return (
    <>
      <PagesIndex.WalletMain
        title="Export Debit Report"
        TableData={TableData}
        fields={fields}
        formik={formik}
        UserFullButtonList={UserFullButtonList}
        visibleFields={visibleFields}
        setSearchInTable={setSearchInTable}
        SearchInTable={SearchInTable}
        setModalState={setModalState}
        ModalState={ModalState}
        handleBtnStatus={handleBtnStatus}
        btnStatus={btnStatus}
        todayReportData={todayReportData}
        visibleFields1={visibleFields1}
        UserFullButtonList1={UserFullButtonList1}
        formik1={formik1}
        fields1={fields1}
      />
    </>
  );
};

export default ExportDebitReport;
