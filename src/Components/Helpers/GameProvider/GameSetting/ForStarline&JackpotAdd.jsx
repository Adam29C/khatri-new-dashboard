import React from "react";
import PagesIndex from "../../../Pages/PagesIndex";

const ForStarlineJackpotAdd = ({ gameType, path }) => {
  const userId = localStorage.getItem("userId");
  const navigate = PagesIndex.useNavigate();
  const location = PagesIndex.useLocation();
  const dispatch = PagesIndex.useDispatch();
  const data = PagesIndex.useSelector((state) => {
    return state.CommonSlice.gameProviders;
  });

  const getGameProviderList = () => {
    let providerapidata = {
      userId: userId,
      gameType: gameType,
    };

    dispatch(PagesIndex.commonSlice.Games_Provider_List(providerapidata));
  };

  PagesIndex.useEffect(() => {
    getGameProviderList();
  }, []);


  
  const formik = PagesIndex.useFormik({
   
    initialValues: {
      providerId: location?.state?.row ? location?.state?.row.providerId : "",
      gameDay:
        location?.state?.edit === "single"
          ? location?.state?.rowData.gameDay
          : "all",
      OBT: location?.state?.rowData ?location?.state?.rowData.OBT : "",
      CBT: location?.state?.rowData ?location?.state?.rowData.CBT : "",
      OBRT: location?.state?.rowData ? location?.state?.rowData.OBRT : "",
      // CBRT: location?.state?.rowData ? location?.state?.rowData.CBRT : "",
      CBRT: "null",
      isClosed: location?.state?.rowData
        ? location?.state?.rowData.isClosed
        : "1",
    },
    validate: (values) => {
      const errors = {};
      if(!values.providerId && formik.touched.providerId ){
        errors.providerId= PagesIndex.valid_err.PROVIDER_NAME_REQUIRED
      }
      if(!values.OBT && formik.touched.OBT ){
        errors.OBT= PagesIndex.valid_err.OPEN_BID_TIME_IS_REQUIRED
      }
      if(!values.CBT && formik.touched.CBT ){
        errors.CBT= PagesIndex.valid_err.CLOSE_BID_TIME_IS_REQUIRED
      }
      if(!values.OBRT && formik.touched.OBRT ){
        errors.OBRT= PagesIndex.valid_err.OPEN_BID_RESULT_TIME_IS_REQUIRED
      }
    
      return errors;
    },

    onSubmit: async (values) => {
      
      let data = {
        adminId: userId,
        gameType: gameType,
        providerId: values.providerId,
        OBT: values.OBT,
        CBT: values.CBT,
        OBRT: values.OBRT,
        CBRT: "null",
        isClosed:values.isClosed.toString(),
      };

      if (location?.state?.rowData?._id) {
        data.gameSettingId = location?.state.rowData?._id;
      }

      if (location?.state?.edit === "multiple") {
        data.providerId = values.providerId;
      } else {
        data.providerId = values.providerId;
        data.gameDay = values.gameDay;
      }

      const res = location?.state?.rowData?._id
        ? await PagesIndex.admin_services.GAME_SETTING_UPDATE_API(data)
        : await PagesIndex.admin_services.GAME_SETTING_ADD(data);

      if (res?.status === 200) {
        PagesIndex.toast.success(res?.message);
        setTimeout(() => {
          navigate(path);
        }, 1000);
      } else {
        PagesIndex.toast.error(res.response.data.message);
      }
    },
  });
  const fields = [
    {
      name: "providerId",
      label: "Provider Name",
      type: "select",
      options:
        data?.map((item) => ({
          label: item.providerName,
          value: item._id,
        })) || [],
      label_size: 12,
      col_size: 6,
    },
    {
      name: "gameDay",
      label: "Game Day",
      type: "select",
      label_size: 6,
      disable: location?.state ? true : false,
      col_size: 6,
      options: [
        { label: "Full Week", value: "all" },
        { label: "Sunday", value: "Sunday" },
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Seturday", value: "Seturday" },
      ],
    },
    {
      name: "OBT",
      label: "Open Bid Time",
      type: "time",
      title_size: 6,
      col_size: 6,
    },

    {
      name: "CBT",
      label: "Close Bid Time",
      type: "time",
      title_size: 6,
      col_size: 6,
    },
    {
      name: "OBRT",
      label: "Open Bid Result Time",
      type: "time",
      title_size: 6,
      col_size: 6,
    },

    // {
    //   name: "CBRT",
    //   label: "Close Bid Result Time",
    //   type: "time",
    //   title_size: 6,
    //   col_size: 6,
    // },
    {
      name: "isClosed",
      label: "Is Closed",
      type: "select",
      label_size: 6,
      col_size: 6,
      options: [
        { label: "Open", value: "1" },
        { label: "Close", value: "0" },
      ],
    },
  ];

  return (
    <PagesIndex.Main_Containt
      add_button={true}
      route={path}
      title={
        location?.state
          ? `${gameType} Game Setting Update`
          : `${gameType} Game Setting Add`
      }
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

export default ForStarlineJackpotAdd;
