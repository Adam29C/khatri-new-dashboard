import React from "react";
import PagesIndex from "../../PagesIndex";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";

const SearchAccount = () => {
  //get token in local storage
  const token = localStorage.getItem("token");
  //all state
  const [currentData, setCurrentData] = PagesIndex.useState([]);
  const [oldData, setOldData] = PagesIndex.useState([]);
console.log(oldData)
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
        console.log(values)
        let apidata = {
          acc_num: values.acc_num,
        };
        const res =
          await PagesIndex.admin_services.WALLET_GET_SEARCH_DETAILS_API(
            apidata,
            token
          );
   
        setCurrentData(res?.data)
        setOldData(res.data?.[0]?.changeDetails)
        

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

  const columns1 = [
    {
      name: "Username",
      selector: (row) => row?.username,
    },
    {
      name: "Old Acc No",
      selector: (row) => row?.UPI_ID,
    },

    {
      name: "Old Bank Name",
      selector: (row) => row?.UPI_ID,
    },

    {
      name: "Old IFSC",
      selector: (row) => row?.UPI_ID,
    },

    {
      name: "Old Acc Name	",
      selector: (row) => row?.UPI_ID,
    },

    {
      name: "Changed On",
      selector: (row) => row?.UPI_ID,
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
          <PagesIndex.Data_Table columns={columns} data={currentData} />
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
          <PagesIndex.Data_Table columns={columns1} data={oldData} />
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
