import React, { useState, useEffect } from "react";
import Main_Containt from "../../../Layout/Main/Main_Containt";
import ModalComponent from "../../../Helpers/Modal/ModalComponent";
import PagesIndex from "../../PagesIndex";
import { toast } from "react-toastify";

const UpiIdList = () => {
  //get token in localstorage
  const token = localStorage.getItem("token");

  //all state
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");


  const getList = async () => {
    setLoading(true);
    try {
      const res = await PagesIndex.admin_services.GET_UPI_LIST_API(token);
      if(res?.status){
        setData(res?.data);
      }

     
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



  const formik = PagesIndex.useFormik({
    initialValues: {
      upiName: "",
      status:""
    },
    validate: (values) => {
      const errors = {};
      if (!values.upiName) {
        errors.upiName = PagesIndex.valid_err.EMPTY_UPI_ERROR;
      }
      if (!values.status) {
        errors.status = PagesIndex.valid_err.STATUS_ERROR;
      }
      return errors;
    },

    onSubmit: async (values) => {
 
      try {

        let apidata = {
          upiId: values.upiName,
          status:values.status === "true"
        };

        const res = await PagesIndex.admin_services.ADD_UPI_LIST_API(apidata,token);
console.log(res)
        if (res?.status) {
          PagesIndex.toast.success(res?.message);
          getList();
          setVisible(false);
          formik.setFieldValue("upiName", "");
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
      name: "upiName",
      label: "Upi Id",
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

      //delete upi list start
  const handleDelete = async (id) => {
    console.log(id)
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this game rate?"
    );
    if (!confirmDelete) return;

    // try {
    //   const res = await PagesIndex.admin_services.GAME_RATES_DELETE_API(id,token);
    //   if (res.status) {
    //     getList();
    //     alert(res?.message);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

    const handleActionBtn = (row, buttonStatus) => {
      if (buttonStatus === 1) {

      } else if (buttonStatus === 2) {
        handleDelete(row?._id);
      } else {
        return "";
      }
    };

    const visibleFields = [
      "id",
      "UPI_ID",
      "is_Active",
    ];

    const UserFullButtonList = [
      {
        id: 0,
        buttonName: "Block",
        buttonColor: "danger",
        route: "",
        Conditions: (row) => {
         
          handleActionBtn(row, 1);
        },
        Visiblity: true,
        type: "button",
      },
      {
        id: 1,
        buttonName: "Delete",
        buttonColor: "danger",
        route: "",
        Conditions: (row) => {
        
          handleActionBtn(row, 2);
        },
        Visiblity: true,
        type: "button",
      },
      

    ];
  return (
    <Main_Containt
      setVisible={setVisible}
      add_button={false}
      btn_modal={true}
      title="UPI ID List"
      handleAdd={handleAdd}
    >
    <PagesIndex.TableWitCustomPegination
          data={data}
          initialRowsPerPage={5}
          SearchInTable={SearchInTable}
          visibleFields={visibleFields}
          UserFullButtonList={UserFullButtonList}
          searchInput={
            <input
              type="text"
              placeholder="Search..."
              value={SearchInTable}
              onChange={(e) => setSearchInTable(e.target.value)}
              className="form-control ms-auto"
            />
          }
        />
      <ModalComponent
        visible={visible}
        setVisible={setVisible}
        fields={fields}
        form_title="Add Upi Id"
        formik={formik}
      />
      <PagesIndex.Toast />
    </Main_Containt>
  );
};

export default UpiIdList;
