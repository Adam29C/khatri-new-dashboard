import React, { useEffect, useState } from "react";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";
import PagesIndex from "../../../Pages/PagesIndex";
import { getActualDateFormate, today } from "../../../Utils/Common_Date";
import "react-datepicker/dist/react-datepicker.css";
import { Games_Provider_List } from "../../../Redux/slice/CommonSlice";

const MainGameReports = ({
  gameType,

  report_api,
}) => {
  //get token in local storage
  const token = localStorage.getItem("token");
  //set actual date
  const actual_date_formet = getActualDateFormate(new Date());
  //dispatch
  const dispatch = PagesIndex.useDispatch();

  //navigate
  const navigate = PagesIndex.useNavigate();
  //all state
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [tableData, setTableData] = useState([]);
  const [GetProvider, setGetProvider] = useState([]);

  const { gameProviders } = PagesIndex.useSelector(
    (state) => state.CommonSlice
  );

  console.log("gameProviders", gameProviders);

  //get game result function
  const getGameResultApi = async () => {
    // const res = await PagesIndex.admin_services.GAME_RESULT(token);
    // const res = await PagesIndex.game_service.ALL_GAME_RESULTS(
    //   main_result,
    //   token
    // );
    // if (res.status) {
    //   setTableData(res?.data?.result || res?.data?.results);
    //   setGetProvider(res?.data?.provider || res?.data?.providers);
    // }
  };

  //get game provider data
  const getGameProvidersList = () => {
    dispatch(Games_Provider_List(token));
  };

  PagesIndex.useEffect(() => {
    getGameProvidersList();
    getGameResultApi();
  }, []);

  const formik = PagesIndex.useFormik({
    initialValues: {
      providerId: "",
      startdate: today(new Date()),
      enddate: today(new Date()),
      username: "",
    },

    validate: (values) => {
      const errors = {};

      return errors;
    },

    onSubmit: async (values) => {
      const payload = {
        userId: values.username,
        gameId: values.providerId ||0,
        startDate: values.startdate,
        endDate: values.enddate,
      };

      try {
        const res = await PagesIndex.report_service.ALL_GAME_REPORT_API(
          report_api,
          payload,
          token
        );

        // const res = await PagesIndex.admin_services.ADD_GAME_RESULT(req, token);
        console.log("res" ,res);
        if (res.status) {
          PagesIndex.toast.success(res?.data?.message || res?.message);
          getGameResultApi();
        }
      } catch (error) {
        console.log(error);
        const errorMessage =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        PagesIndex.toast.error(errorMessage);
      }
    },
  });

  const fields = [
    {
      name: "startdate",
      label: "Start Date",
      type: "date",
      label_size: 12,
      col_size: 3,
      max: { actual_date_formet },
    },
    {
      name: "enddate",
      label: "End Date",
      type: "date",
      label_size: 12,
      col_size: 3,
      max: { actual_date_formet },
    },
    {
      name: "providerId",
      label: "Provider Name",
      type: "select",
      options:
        (gameProviders &&
          gameProviders?.map((item) => ({
            label: item.providerName,
            value: item._id,
          }))) ||
        [],
      label_size: 12,
      col_size: 3,
    },
    {
      name: "username",
      label: "Player Name",
      type: "text",
      label_size: 12,
      col_size: 3,
    },
  ];

  //game result delete
  const handleDelete = async (row) => {
    const apidata = {
      resultId: row?._id,
      providerId: row?.providerId,
      session: row?.session,
    };

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this game?"
    );
    if (!confirmDelete) return;

    try {
      const res = await PagesIndex.admin_services.GAME_RESULT_DELETE(
        apidata,
        token
      );

      if (res.statusCode === 200) {
        alert(res?.message);
        getGameResultApi;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle actions button function
  const handleActionBtn = (row, buttonStatus) => {
    // console.log("row", row.providerId);
    var locationData = {
      row: row,
      route: winner_list,
      gameType: gameType,
      distribute_fund: distribute_fund,
    };
    if (buttonStatus === 1) {
      if (gameType === "StarLine") {
        navigate(`/admin/starline/winnerlist/providerId=${row.providerId}`, {
          state: locationData,
        });
      } else if (gameType === "JackPot") {
        navigate(`/admin/starline/winnerlist/providerId=${row.providerId}`, {
          state: locationData,
        });
      } else {
        navigate(`/admin/starline/winnerlist/providerId=${row.providerId}`, {
          state: locationData,
        });
      }
    } else if (buttonStatus === 2) {
      handleDelete(row);
    } else {
      return "";
    }
  };

  const visibleFields = [
    // "id",
    "providerName",
    "session",
    "resultDate",
    "winningDigit",
  ];

  const UserFullButtonList = [
    {
      id: 0,
      buttonName: "Get Winners List",
      buttonColor: "",
      route: "",
      Conditions: (row) => {
        handleActionBtn(row, 1);
      },
      Visiblity: true,
      type: "button",
    },
    {
      id: 1,
      buttonName: "Delete Result",
      buttonColor: "danger",
      route: "test",
      Conditions: (row) => {
        handleActionBtn(row, 2);
      },
      Visiblity: false,
      type: "button",
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
          <PagesIndex.TableWitCustomPegination
            data={tableData}
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
        </div>
      ),
    },
  ];

  return (
    <>
      <Split_Main_Containt
        title="Sales Report "
        add_button={false}
        btnTitle="Add"
        route="/add"
        cardLayouts={cardLayouts}
      />
    </>
  );
};

export default MainGameReports;
