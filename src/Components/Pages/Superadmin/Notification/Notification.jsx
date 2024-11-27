import React from "react";
import PagesIndex from "../../PagesIndex";

const Notification = () => {
  //get token in localstorage
  const token = localStorage.getItem("token");

  //all state
  const [loading, setLoading] = PagesIndex.useState(false);
  const [data, setData] = PagesIndex.useState([]);
  const [visible, setVisible] = PagesIndex.useState(false);

  //get upi list function
  const getList = async () => {
    setLoading(true);
    try {
      const res = await PagesIndex.common_services.GET_NOTIFICATION_API(token);
      if (res?.status) {
        setData(res?.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  PagesIndex.useEffect(() => {
    getList();
  }, []);

  //handle status update function for upi list
  const handleStatusUpdate = async (event, value) => {
    try {
      const apidata = {
        id: value?._id,
        status: event === "true",
        stat: 1,
      };
      const response = await PagesIndex.admin_services.BLOCK_UPI_LIST_API(
        apidata,
        token
      );

      if (response?.status) {
        toast.success(response.message);
        getList();
      } else {
        alert(response.message);
      }
    } catch (error) {
      PagesIndex.toast.error(error);
    }
  };

  //formik form
  const formik = PagesIndex.useFormik({
    initialValues: {
      upiName: "",
      status: "",
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
          status: values.status === "true",
        };

        const res = await PagesIndex.admin_services.ADD_UPI_LIST_API(
          apidata,
          token
        );
        console.log(res);
        if (res?.status) {
          PagesIndex.toast.success(res?.message);
          getList();
          setVisible(false);
          formik.setFieldValue("upiName", "");
        } else {
          PagesIndex.toast.error(res.message);
          setVisible(false);
        }
      } catch (error) {
        PagesIndex.toast.error(error);
      }
    },
  });

  const fields = [
    {
      name: "title",
      label: "Title",
      type: "text",
      label_size: 12,
      col_size: 12,
    },

    {
      name: "status",
      label: "Message",
      type: "msgbox",
      label_size: 12,
      col_size: 12,
    },
  ];

  // Handle Add Button
  const handleAdd = () => {
    setVisible(true);
  };

  //delete upi list start
  const handleDelete = async (row) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Upi Id?"
    );
    if (!confirmDelete) return;

    try {
      const apidata = {
        id: row?._id,
      };
      const res = await PagesIndex.admin_services.DELETE_UPI_LIST_API(
        apidata,
        token
      );
      console.log(res);
      if (res.status) {
        getList();
        alert(res?.message);
      }
    } catch (error) {}
  };

  const columns = [
    {
      name: "Game Name",
      selector: (row) => row?.title,
    },

    {
      name: "Game Result",
      selector: (row) => row.message,
    },

    {
      name: "Delete Notifiction",
      selector: (cell, row) => (
        <div style={{ width: "" }}>
          <div>
            <span>
              <button
                onClick={() => handleDelete(cell)}
                class="btn btn-dark waves-effect waves-light btn-sm"
              >
                <i class="far fa-trash-alt mr-1" aria-hidden="true"></i>
                Delete
              </button>
            </span>
          </div>
        </div>
      ),
    },
  ];
  return (
    <PagesIndex.Main_Containt
      setVisible={setVisible}
      add_button={false}
      btn_modal={true}
      title="Notifications"
      handleAdd={handleAdd}
    >
      <PagesIndex.Data_Table
        isLoading={loading}
        columns={columns}
        data={data}
      />
      <PagesIndex.ModalComponent
        visible={visible}
        setVisible={setVisible}
        fields={fields}
        form_title="Send New Notification"
        formik={formik}
      />
      <PagesIndex.Toast />
    </PagesIndex.Main_Containt>
  );
};

export default Notification;
