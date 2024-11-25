
import React, { useState, useEffect } from "react";
import Main_Containt from "../../../Layout/Main/Main_Containt";
import ModalComponent from "../../../Helpers/Modal/ModalComponent";
import PagesIndex from "../../PagesIndex";
import DeleteSweetAlert from "../../../Helpers/DeleteSweetAlert";
import { toast } from "react-toastify";

const FundMode = () => {
  //get token in localstorage
  const token = localStorage.getItem("token");

  //all state
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);


  const getList = async () => {
    setLoading(true);
    try {
      const res = await PagesIndex.admin_services.GET_FUND_MODE_API(token);

      setData(res?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const handleStatusUpdate = async (event, value) => {
    try {
      let apidata = {
      id:"",
        upiId: value._id,
        status: event,
      };

      const response = await PagesIndex.admin_services.UPDATE_UPI_LIST_API(
        apidata
      );

      if (response?.status === 200) {
        toast.success(response.message);
        getList();
      } else {
        alert(response.response.data.message);
      }
    } catch (error) {
      PagesIndex.toast.error(error);
    }
  };


    //delete fund mode list start
    const handleDelete = async (row) => {

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this game rate?"
      );
      if (!confirmDelete) return;
  
      try {
        const apidata = {
          id: row?._id,
        };
   
        
        const res = await PagesIndex.admin_services.DELETE_FUND_MODE_API(
          apidata,
          token
        );
  console.log(res)
        if (res.status) {
          getList();
          alert(res?.message);
        }
      } catch (error) {}
    };
    
  const columns = [
    {
      name: "Mode",
      selector: (row) => row?.mode,
    },
    {
      name: "Redirect Url",
      selector: (row) => row?.redirectURL,
    },
    {
      name: "Status",
      selector: (row) => row?.disabled ? "Active" : "Disabled",
    },
    {
      name: "Edit",
      selector: (row) => (
   
        <span><button onClick={() =>
          handleDelete(cell)
        } class={`btn ${row.disabled ? "btn-danger":"btn-success"} btn-sm me-2`}> {row.disabled ? "Block" : "Unblock"}</button></span>
        
      ),
    },

    {
      name: "Actions",
      selector: (cell, row) => (
        <div style={{ width: "120px" }}>
          <div>
          
          <span><button onClick={() =>
                handleDelete(cell)
              } class="btn btn-danger btn-sm me-2">Delete</button></span>

          </div>
        </div>
      ),
    },
  ];

  const formik = PagesIndex.useFormik({
    initialValues: {
      mode: "",
      status:"",
      urlWeb:""
    },
    validate: (values) => {
      const errors = {};
      if (!values.mode) {
        errors.mode = PagesIndex.valid_err.REQUIRE_MODE;
      }
      if (!values.urlWeb) {
        errors.urlWeb = PagesIndex.valid_err.URLWEB_MODE;
      }
      if (!values.status) {
        errors.status = PagesIndex.valid_err.STATUS_ERROR;
      }
      return errors;
    },

    onSubmit: async (values) => {
     
      try {

        let apidata = {
          mode: values.mode,
          status: values.status === "true",
          urlWeb: values.urlWeb,
        };
    
        const res = await PagesIndex.admin_services.ADD_FUND_MODE_API(apidata,token);
console.log(res)
        if (res?.status) {
          PagesIndex.toast.success(res?.message);
          getList();
          setVisible(false);
          formik.setFieldValue("mode", "");
          formik.setFieldValue("status", "");
          formik.setFieldValue("urlWeb", "");
        } else {
          PagesIndex.toast.error(res.response.data.message);
        }
      } catch (error) {
        PagesIndex.toast.error(error);
      }
    },
  });

  const fields = [
    {
      name: "mode",
      label: "Payment Mode",
      type: "text",
      label_size: 12,
      col_size: 12,
    },
    {
        name: "urlWeb",
        label: "Redirect URL(Only For WEB Payment)",
        type: "text",
        label_size: 12,
        col_size: 12,
      },
   
    {
      name: "status",
      label: "Status",
      type: "select",
      title_size: 6,
      col_size: 12,
      options: [
        {
          label: "Active",
          value: true,
        },
        {
          label: "In-Active",
          value: false,
        },
      ],
    },
  ];

    // Handle Add Button
    const handleAdd = () => {
    
      setVisible(true);
    };


  return (
    <Main_Containt
      setVisible={setVisible}
      add_button={false}
      btn_modal={true}
      title="Payment Mode List"
      handleAdd={handleAdd}
    >
      <PagesIndex.Data_Table
        isLoading={loading}
        columns={columns}
        data={data}
      />
      <ModalComponent
        visible={visible}
        setVisible={setVisible}
        fields={fields}
        form_title="Add New Mode"
        formik={formik}
      />
      <PagesIndex.Toast />
    </Main_Containt>
  );
};

export default FundMode;
