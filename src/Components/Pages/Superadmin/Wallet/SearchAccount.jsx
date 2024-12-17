import React from "react";
import PagesIndex from "../../PagesIndex";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";

const SearchAccount = () => {
  //get token in local storage
  const token = localStorage.getItem("token");
  //all state
  const [currentData, setCurrentData] = PagesIndex.useState([]);


  
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");

  const [oldData, setOldData] = PagesIndex.useState([]);
  console.log(oldData);
  //formik form
  const formik = PagesIndex.useFormik({
    initialValues: {
      acc_num: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.acc_num) {
        errors.acc_num = PagesIndex.valid_err.REQUIRED_ACCOUNT_NUMBER;
      }
      return errors;
    },

    onSubmit: async (values) => {
      try {
        console.log(values);
        let apidata = {
          acc_num: values.acc_num,
        };
        const res =
          await PagesIndex.admin_services.WALLET_GET_SEARCH_DETAILS_API(
            apidata,
            token
          );

        setCurrentData(res?.data);
        setOldData(res.data?.[0]?.changeDetails);
      } catch (error) {
        PagesIndex.toast.error(error);
      }
    },
  });

  const fields = [
    {
      name: "acc_num",
      label: "User Account Number",
      type: "text",
      label_size: 12,
      col_size: 4,
    },
  ];

  const columns = [
    {
      name: "Username",
      selector: (row) => row?.username,
    },
    {
      name: "Acc Holder	",
      selector: (row) => row?.account_holder_name,
    },

    {
      name: "A/C NO	",
      selector: (row) => row?.account_no,
    },

    {
      name: "Bank",
      selector: (row) => row?.bank_name,
    },

    {
      name: "IFSC",
      selector: (row) => row?.ifsc_code,
    },
  ];

  const visibleFields = [
    {
      name: "Username",
      value: "username",
      sortable: true,
    },
    {
      name: "Acc Holder",
      value: "account_holder_name",
      sortable: true,
    },
    {
      name: "A/C NO",
      value: "account_no",
      sortable: true,
    },
    {
      name: "Bank",
      value: "bank_name",
      sortable: true,
    },
    {
      name: "IFSC",
      value: "ifsc_code",
      sortable: true,
    },
  ];

  const visibleFields1 = [
    {
      name: "Username",
      value: "username",
      sortable: true,
    },
    {
      name: "Old Acc No",
      value: "UPI_ID",
      sortable: true,
    },
    {
      name: "Old Bank Name",
      value: "UPI_ID",
      sortable: true,
    },
    {
      name: "Old IFSC",
      value: "UPI_ID",
      sortable: true,
    },
    {
      name: "Old Acc Name",
      value: "UPI_ID",
      sortable: true,
    },
    {
      name: "Changed On",
      value: "UPI_ID",
      sortable: true,
    },
  ];

  const cardLayouts = [
    {
      size: 12,
      body: (
        <div>
          <PagesIndex.Formikform
            fieldtype={fields.filter((field) => !field.showWhen)}
            show_submit={true}
            formik={formik}
            btn_name="Submit"
          />
        </div>
      ),
    },

    {
      size: 12,
      body: (
        <div>
          <div>
            <h4 class="profile-note-title mt-0 mb-4 text-center">
              Current Details
            </h4>
          </div>
          <PagesIndex.TableWithCustomPeginationNew123
            data={currentData && currentData}
            initialRowsPerPage={10}
            SearchInTable={SearchInTable}
            visibleFields={visibleFields}
            showIndex={true}
          />
          {/* <PagesIndex.Data_Table columns={columns} data={currentData} /> */}
        </div>
      ),
    },
    {
      size: 12,
      body: (
        <div>
          <div>
            <h4 class="profile-note-title mt-0 mb-4 text-center">
              Old Details
            </h4>
          </div>

          <PagesIndex.TableWithCustomPeginationNew123
            data={oldData && oldData}
            initialRowsPerPage={10}
            SearchInTable={SearchInTable}
            visibleFields={visibleFields1}
          />
          {/* <PagesIndex.Data_Table columns={columns1} data={oldData} /> */}
        </div>
      ),
    },
  ];

  return (
    <>
      <Split_Main_Containt
        title="Search Account"
        add_button={false}
        cardLayouts={cardLayouts}
      />
    </>
  );
};

export default SearchAccount;
