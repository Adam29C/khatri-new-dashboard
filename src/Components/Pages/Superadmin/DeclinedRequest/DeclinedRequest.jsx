import React from "react";
import PagesIndex from "../../PagesIndex";
import { getActualDateWithFormat } from "../../../Utils/Common_Date";
import CreditDeclinedRequest from "../../../Helpers/CreditDeclinedRequest/CreditDeclinedRequest";

const DeclinedRequest = () => {
  //get token in local storage
  const token = localStorage.getItem("token");

  //set actual date
  const actual_date_formet = getActualDateWithFormat(new Date());

  //all state
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [tableData, setTableData] = PagesIndex.useState([]);

  const title = "Declined Report";
  const subtitle = "Declined Debit Requests";

  const formik = PagesIndex.useFormik({
    initialValues: {
      date: actual_date_formet || null,
    },
    validate: (values) => {},

    onSubmit: async (values) => {
      getDeclinedRequest(values.date);
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
    { name: "User Name", value: "username", sortable: true },
    { name: "Name", value: "fullname", sortable: false },
    { name: "Mobile", value: "mobile", sortable: true },
    { name: "Request Date", value: "reqDate", sortable: true },
    { name: "Request Time", value: "reqTime", sortable: true },
    { name: "Withdrawal Mode", value: "withdrawalMode", sortable: true },
    { name: "Update", value: "reqUpdatedAt", sortable: true },
    { name: "Request mount", value: "reqAmount", sortable: true },
  ];

  const fetchData = async (
    page,
    rowsPerPage,
    searchQuery = "",
    date = actual_date_formet
  ) => {
    const payload = {
      page: page,
      limit: rowsPerPage,
      date_cust: date,
      searchQuery,
    };

    try {
      const response = await PagesIndex.admin_services.GET_DECLINED_REQUEST_API(
        payload,
        token
      );

      const totalRows = response?.total || 5;
      let mainRes = response?.data;
      setTableData(mainRes);

      return { mainRes, totalRows };
    } catch {}
  };

  return (
    <>
      <CreditDeclinedRequest
        fields={fields}
        fetchData={fetchData}
        formik={formik}
        tableData={tableData}
        SearchInTable={SearchInTable}
        setSearchInTable={setSearchInTable}
        visibleFields={visibleFields}
        title={title}
        subtitle={subtitle}
      />
    </>
  );
};

export default DeclinedRequest;
