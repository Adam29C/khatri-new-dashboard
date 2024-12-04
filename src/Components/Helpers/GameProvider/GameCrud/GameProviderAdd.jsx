import React from "react";
import PagesIndex from "../../../Pages/PagesIndex";

const GameProviderAdd = () => {
  const userId = localStorage.getItem("userId");
  const navigate = PagesIndex.useNavigate();
  const location = PagesIndex.useLocation();

  const formik = PagesIndex.useFormik({
    initialValues: {
      gamename: location?.state ? location?.state?.providerName : "",
      result: location?.state ? location?.state?.providerResult : "",
      // resultStatus: 0,
      mobile: location?.state ? location?.state?.mobile : "",
      activeStatus: location?.state ? location?.state?.activeStatus : null,
    },
    validate: (values) => {
      const errors = {};

      if (!values.gamename) {
        errors.gamename = PagesIndex.valid_err.PROVIDER_NAME_ERROR;
      }

      if (!values.result) {
        errors.result = PagesIndex.valid_err.PROVIDER_RESULT_ERROR;
      }

      if (!values.mobile) {
        errors.mobile = PagesIndex.valid_err.CONTACT_ERROR;
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
 

        let data = {
          gamename: values.gamename,
          result: values.result,
          mobile: values.mobile.toString(),
          activeStatus: values.activeStatus,
        };

     
        const res = location?.state?._id
          ? await PagesIndex.admin_services.GAME_PROVIDER_UPDATE_API(data)
          : await PagesIndex.admin_services.GAME_PROVIDER_ADD_API(data);

        if (res?.status === 200) {
          PagesIndex.toast.success(res?.message);
          setTimeout(() => {
            navigate("/admin/games");
          }, 1000);
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
      name: "gamename",
      label: "Game Name",
      type: "text",
      label_size: 6,
      col_size: 6,
    },
    {
      name: "result",
      label: "Result",
      type: "text",
      label_size: 6,
      col_size: 6,
    },
    {
      name: "mobile",
      label: "Mobile",
      type: "number",
      label_size: 6,
      col_size: 6,
    },

    {
      name: "activeStatus",
      label: "Disable Provider",
      type: "select",
      title_size: 6,
      col_size: 6,
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

  return (
    <PagesIndex.Main_Containt
      add_button={true}
      route={"/admin/games"}
      title={location?.state ? "Edit Game" : "Add Game"}
      btnTitle="Back"
    >
      <PagesIndex.Formikform
        fieldtype={fields.filter((field) => !field.showWhen)}
        formik={formik}
        //   btn_name={loding ? <PagesIndex.Loader text="Submit"/> : "Login"}
        btn_name={location?.state ? "Update" : "Add"}
        button_Size={"w-10"}
        show_submit={true}
      />
      <PagesIndex.Toast />
    </PagesIndex.Main_Containt>
  );
};

export default GameProviderAdd;