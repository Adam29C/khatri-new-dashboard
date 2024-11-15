import React, { useState, useEffect } from "react";
import Main_Containt from "../../../Layout/Main/Main_Containt";
import ModalComponent from "../../../Helpers/Modal/ModalComponent";
import PagesIndex from "../../PagesIndex";
import { DELETE_USER } from "../../../Services/SuperAdminServices";
import DeleteSweetAlert from "../../../Helpers/DeleteSweetAlert";
import { toast } from "react-toastify";

const UpiIdList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userId");
  const [visible, setVisible] = useState(false);

  let userDeleteReason = false;
  const getList = async () => {
    setLoading(true);
    try {
      const res = await PagesIndex.admin_services.GET_UPI_LIST_API(userId);

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
        adminId: userId,
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

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.upiName,
    },

    {
      name: "IsActive",
      selector: (row) => (
        <span
          className={`badge fw-bold ${
            row.status === "true" ? "bg-primary" : "bg-danger"
          }`}
        >
          {row.status === "true" ? "Active" : "Disable"}
        </span>
      ),
    },

    {
      name: "Status",
      selector: (row) => (
        <div>
          <select
            className="form-select-upi"
            aria-label="Default select example"
            onChange={(e) => {
              handleStatusUpdate(e.target.value, row);
            }}
          >
            <option value="false" disbled selected>
              {row.status === "true" ? "Active" : "Disable"}
            </option>
            <option value="true">Active</option>
            <option value="false">Disable</option>
          </select>
        </div>
      ),
    },

    {
      name: "Actions",
      selector: (cell, row) => (
        <div style={{ width: "120px" }}>
          <div>
            <PagesIndex.Link
             className="delete-icon"
              href="#"
              onClick={() =>
                DeleteSweetAlert(
                  PagesIndex.admin_services.DELETE_UPI_LIST_API,
                  cell?._id,
                  getList,
                  userDeleteReason
                )
              }
            >
              <span data-toggle="tooltip" data-placement="top" title="Delete">
                <i class="ti-trash fs-5 mx-1 "></i>
              </span>
            </PagesIndex.Link>
          </div>
        </div>
      ),
    },
  ];

  const formik = PagesIndex.useFormik({
    initialValues: {
      upiName: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.upiName) {
        errors.upiName = PagesIndex.valid_err.EMPTY_UPI_ERROR;
      }
      return errors;
    },

    onSubmit: async (values) => {
      try {
        let apidata = {
          adminId: userId,
          upiName: values.upiName,
        };

        const res = await PagesIndex.admin_services.ADD_UPI_LIST_API(apidata);

        if (res?.status === 200) {
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
  ];

  return (
    <Main_Containt
      setVisible={setVisible}
      add_button={false}
      btn_modal={true}
      title="UPI ID List"
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
        form_title="Add Upi Id"
        formik={formik}
      />
      <PagesIndex.Toast />
    </Main_Containt>
  );
};

export default UpiIdList;
