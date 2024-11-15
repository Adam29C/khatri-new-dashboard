import React from "react";
import PagesIndex from "../../../Pages/PagesIndex";

const GameRatesAdd = ({ gameType, path }) => {
  const userId = localStorage.getItem("userId");
  const navigate = PagesIndex.useNavigate();
  const location = PagesIndex.useLocation();

  const formik = PagesIndex.useFormik({
    initialValues: {
      gameName: location?.state ? location?.state?.gameName : "",
      gamePrice: location?.state ? location?.state?.gamePrice : "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.gameName) {
        errors.gameName = PagesIndex.valid_err.GAME_NAME_ERROR;
      }

      if (!values.gamePrice) {
        errors.gamePrice = PagesIndex.valid_err.GAME_PRICE_ERROR;
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        let apidata = {
          adminId: userId,
          gameName: values.gameName,
          gamePrice: values.gamePrice,
          ...(location?.state?._id ? { gameRateId: location?.state?._id } : ""),
          ...(location?.state?._id ? "" : { gameType: gameType }),
        };

        const res = location?.state?._id
          ? await PagesIndex.admin_services.GAME_RATES_UPDATE_API(apidata)
          : await PagesIndex.admin_services.GAME_RATES_ADD_API(apidata);

        if (res?.status === 200) {
          PagesIndex.toast.success(res?.message);
          setTimeout(() => {
            navigate(path);
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
      name: "gameName",
      label: "Game Name",
      type: "text",
      label_size: 6,
      col_size: 6,
    },
    {
      name: "gamePrice",
      label: "Game Price",
      type: "text",
      label_size: 6,
      col_size: 6,
    },
  ];

  return (
    <PagesIndex.Main_Containt
      add_button={true}
      route={path}
      title={location?.state ? "Edit Game Rate" : "Add Game Rate"}
      btnTitle="Back"
    >
      <PagesIndex.Formikform
        fieldtype={fields.filter((field) => !field.showWhen)}
        formik={formik}
        btn_name={location?.state ? "Update" : "Add"}
        button_Size={"w-10"}
        show_submit={true}
      />

      <PagesIndex.Toast />
    </PagesIndex.Main_Containt>
  );
};

export default GameRatesAdd;
