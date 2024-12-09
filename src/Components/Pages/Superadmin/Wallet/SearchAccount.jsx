import React from "react";
import PagesIndex from "../../PagesIndex";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";

const SearchAccount = () => {
  //get token in local storage
  const token = localStorage.getItem("token");
  //all state
  const [tableData, setTableData] = PagesIndex.useState([]);

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
        let apidata = {
          acc_num: values.acc_num,
        };

    
      } catch (error) {
        PagesIndex.toast.error(error);
      }
    },
  });

  const fields = [
    {
      name: "upiName",
      label: "User Account Number",
      type: "text",
      label_size: 12,
      col_size: 4,
    },


  ];



  const columns = [
    {
      name: "Name",
      selector: (row) => row?.UPI_ID,
    },

    {
      name: "IsActive",
      selector: (row) => (row.is_Active ? "Active" : "Disable"),
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
          <PagesIndex.Data_Table columns={columns} data={tableData} />
        </div>
      ),
    },
    {
      size: 12,
      body: (
        <div>
        <PagesIndex.Data_Table columns={columns} data={tableData} />
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
