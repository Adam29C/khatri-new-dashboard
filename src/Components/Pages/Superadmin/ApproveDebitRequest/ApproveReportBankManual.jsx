import React from 'react'
import CreditDeclinedRequest from '../../../Helpers/CreditDeclinedRequest/CreditDeclinedRequest'
import PagesIndex from '../../PagesIndex';
import { getActualDateWithFormat } from '../../../Utils/Common_Date';

const ApproveReportBankManual = () => {

    
    //get token in local storage
    const token = localStorage.getItem("token");

    //set actual date
    const actual_date_formet = getActualDateWithFormat(new Date());
  
    //all state
    const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
    const [tableData, setTableData] = PagesIndex.useState([]);
  
    const title = "Declined Report"
    const subtitle = "APPROVED Debit Requests : Bank Account"
  
    // get api decline request 
  
    const getDataList = async (date = actual_date_formet) => {
      
      const payload = {
        date: date,
        page: 1,
        limit: 10,
        search: SearchInTable,
      };
      const res = await PagesIndex.admin_services.APPROVED_DEBIT_BANK_MANUAL_API(
        payload,
        token
      );
  
      if (res?.status) {
        setTableData(res?.data);
      }
    };
  
    PagesIndex.useEffect(() => {
      getDataList();
    }, []);
  
    const formik = PagesIndex.useFormik({
      initialValues: {
        date: actual_date_formet || null,
      },
      validate: (values) => {},
  
      onSubmit: async (values) => {
          getDataList(values.date);
      },
    });
  
    
  
    const fields = [
      {
        name: "date",
        label: "Search By Approve Date",
        type: "date",
        label_size: 12,
        col_size: 12,
      },
    ];
  
    const visibleFields = [
      "id",
      "username",
      "fullname",
      "mobile",
     "reqTime",
      "withdrawalMode",
      "reqAmount",
      "createTime",
      "reqUpdatedAt"
    ];
  return (
    <CreditDeclinedRequest fields={fields} formik={formik} tableData={tableData} SearchInTable={SearchInTable} setSearchInTable={setSearchInTable} visibleFields={visibleFields} title={title} subtitle={subtitle}/>

  )
}

export default ApproveReportBankManual