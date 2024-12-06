import { useEffect, useMemo } from "react";
import PagesIndex from "../../PagesIndex";
import { getActualDateFormate } from "../../../Utils/Common_Date";
import ReusableModal from "../../../Helpers/Modal/ReusableModal";
import Papa from "papaparse";

const ExportDebitReport = () => {

  //get token in localstorage
const token = localStorage.getItem("token")
const userdetails = JSON.parse(localStorage.getItem("userdetails")) 

  //set actual date
  const actual_date_formet = getActualDateFormate(new Date());

  //all state
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [TableData, setTableData] = PagesIndex.useState([]);
  const [todayReportData, setTodayReportData] = PagesIndex.useState([]);
  const [ModalState,setModalState]= PagesIndex.useState(false)
  const [btnStatus ,setBtnStatus] = PagesIndex.useState(null)

  const handleBtnStatus = (status)=>{
  
    setBtnStatus(status)
    setModalState(true)
    if(status === "see-report"){
      getTodayReport()
    }
  }

  const getTodayReport  = async()=>{
    const apidata = {
      date : actual_date_formet
    }
    const res = await PagesIndex.admin_services.EXPORT_DEBIT_SEE_TODAY_REPORT_API(apidata,token)
   if(res?.status){
    setTodayReportData(res?.data)
   }
  }

//get export debit list
const getExportDebitList = async()=>{
  const apidata = {
    page : 1 ,
    limit : 10
  }
  const res = await PagesIndex.admin_services.GET_EXPORT_DEBIT_REPORT_API(apidata,token)
if(res?.status){
  setTableData(res?.data)
}
}

useEffect(()=>{
  getExportDebitList()
},[])

const handleDeclineReport = async(row)=>{
  setBtnStatus("decline-report")
  console.log(row)
  const data = {
    id:userdetails?.user_id,
    rowId: row?.rowId,
    userId: row?.userId,
    firebaseId: row?.firebaseId,

    reason: "Insufficient Balance",
    amountDecline: row?.reqAmount

  }
  // const res = await PagesIndex.admin_services.EXPORT_DEBIT_DECLINE_REPORT_API(data,token)
  // if(res?.status){
  //   PagesIndex.toast.success(res?.message)
  // }

}

  const UserFullButtonList = [
    {
      id: 0,
      buttonName: "Decline user request",
      buttonColor: "info",
      route: "",
      Conditions: (row) => {
        handleDeclineReport(row)
      },
      Visiblity: true,
      type: "button",
    },
   
  ];

  const UserFullButtonList1 = [
    {
      id: 0,
      buttonName: "Download RBL.xls Report	",
      buttonColor: "dark",
      route: "",
      Conditions: (row) => {
      },
      Visiblity: true,
      type: "button",
    },
    {
      id: 1,
      buttonName: "Download MK.txt Report	",
      buttonColor: "dark",
      route: "",
      Conditions: (row) => {
      },
      Visiblity: true,
      type: "button",
    },
    {
      id: 2,
      buttonName: "Download Gajju Report",
      buttonColor: "dark",
      route: "",
      Conditions: (row) => {
      },
      Visiblity: true,
      type: "button",
    },
    {
      id: 3,
      buttonName: "Download FINA PNB Report",
      buttonColor: "dark",
      route: "",
      Conditions: (row) => {
      },
      Visiblity: true,
      type: "button",
    },
   
  ];

  const visibleFields = [
    "id",
    "username",
    "mobile",
    // "withdrawalMode",
    // "name",
    // "bank_name",
    // "ifsc",
    // "account_no",
    // "walletBal",
    "reqAmount",
    "reqDate",
    // "address",
    // "city"
  ];

  const visibleFields1 = [
    "id",
    "ReportName",
    "ReportTime",
    "adminName",
  
  ];


  const formik = PagesIndex.useFormik({
    initialValues: {
      searchType: "",
      reportType: "",
      date:actual_date_formet,
    },
    validate: (values) => {
      const errors = {}
      if(!values.searchType){
        errors.searchType = PagesIndex.valid_err.REQUIRED_SEARCH_TYPE
      }
      if(!values.reportType){
        errors.reportType = PagesIndex.valid_err.REQUIRED_REPORT_TYPE
      }
      return errors
    },

    onSubmit: async (values) => {
      const data = {
        reportDate:values.date,
        searchType:values.searchType
      }
  const res = await PagesIndex.admin_services.EXPORT_DEBIT_GET_REPORT_API(data,token,values.reportType)
if(res?.status){
  const { filename, writeString, Profile } = res;
  if (writeString) {
    // Handle plain text or CSV data
    Papa.parse(writeString, {
      header: true, // Set to true if the first line contains headers
      skipEmptyLines: true,
      complete: (result) => {
        console.log("Parsed CSV data:", result.data);

        // Handle parsed data (optional: download as CSV)
        const csvBlob = new Blob([Papa.unparse(result.data)], {
          type: "text/csv;charset=utf-8;",
        });
        const csvUrl = window.URL.createObjectURL(csvBlob);
        const csvLink = document.createElement("a");
        csvLink.href = csvUrl;
        csvLink.setAttribute(
          "download",
          filename || `${values.reportType}.csv`
        );
        document.body.appendChild(csvLink);
        csvLink.click();
        csvLink.parentNode.removeChild(csvLink);
      },
      error: (err) => {
        console.error("Error parsing CSV data:", err);
      },
    });
  } else if (Profile && Array.isArray(Profile)) {
    // Handle JSON array (Profile data)
    console.log("Profile data:", Profile);

    // Optionally save JSON as a file
    const jsonBlob = new Blob([JSON.stringify(Profile, null, 2)], {
      type: "application/json",
    });
    const jsonUrl = window.URL.createObjectURL(jsonBlob);
    const jsonLink = document.createElement("a");
    jsonLink.href = jsonUrl;
    jsonLink.setAttribute(
      "download",
      `${values.reportType}-Profile.json`
    );
    document.body.appendChild(jsonLink);
    jsonLink.click();
    jsonLink.parentNode.removeChild(jsonLink);
  } else {
    console.error("Unexpected response format");
  }
} else {
  console.error("Failed to fetch report:", response?.message);

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
        {
          label: "Kotk XLS",
          value: "xlsDataNew",
        },
        {
          label: "Cash free",
          value: "xlsDataDailyTrak",
        },
        {
          label: "Rbl.xls",
          value: "rblxls",
        },
        {
          label: "MK.txt",
          value: "mkxls",
        },
        {
          label: "Gajju Bob",
          value: "gajjubob",
        },
 
        {
          label: "FINAPNB",
          value: "Finapnb",
        },
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

  const totalAmount = useMemo(
    () => TableData.reduce((acc, item) => acc + (item?.reqAmount || 0), 0),
    [TableData]
  );
  return (
    <>
      <PagesIndex.WalletMain
        title="Withdraw Report"
        TableData={TableData}
        fields={fields}
        formik={formik}
        totalAmount={totalAmount}
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
      />
       
    </>
  );
};

export default ExportDebitReport;
