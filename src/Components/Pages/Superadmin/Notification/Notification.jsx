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



  //formik form
  const formik = PagesIndex.useFormik({
    initialValues: {
      title: "",
      message: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = PagesIndex.valid_err.TITLE_ERROR;
      }
      if (!values.message) {
        errors.message = PagesIndex.valid_err.REQUIRE_MESSAGE;
      }
      return errors;
    },

    onSubmit: async (values) => {
      console.log(values)
      try {
        let apidata = {
          title: values.title,
          message: values.message ,
        };

        const res = await PagesIndex.common_services.ADD_NOTIFICATION_API(apidata,token);
        console.log(res);
        if (res?.status) {
          PagesIndex.toast.success(res?.message);
          getList();
          setVisible(false);
          formik.setFieldValue("title", "");
          formik.setFieldValue("message", "");
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
      name: "message",
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
    
      const res = await PagesIndex.common_services.DELETE_NOTIFICATION_API(
        row?._id,
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
