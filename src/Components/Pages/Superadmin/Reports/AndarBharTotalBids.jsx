import React, { useEffect, useState } from "react";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";
import PagesIndex from "../../../Pages/PagesIndex";
import { getActualDateFormate, today } from "../../../Utils/Common_Date";
import "react-datepicker/dist/react-datepicker.css";
import { Games_Provider_List } from "../../../Redux/slice/CommonSlice";
import { Api } from "../../../Config/Api";

const AndarBharTotalBids = ({ gameType, report_api, starandjackProvider }) => {
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

  const [ProviderList, setProviderList] = useState([]);

  //get game result function
  const getGameResultApi = async () => {
    const res =
      await PagesIndex.game_service.FOR_STARLINE_AND_JACPOT_PROVIDER_LIST_API(
        Api.JACKPOT_GAME_PROVIDERS,
        token
      );
    setProviderList(res.data);
  };

  const visibleFields = [
    {
      name: "User Name",
      value: "userName",
      sortable: true,
    },
    {
      name: "Bracket",
      value: "bidDigit",
      sortable: false,
    },
    {
      name: "Bidding Points",
      value: "biddingPoints",
      sortable: true,
    },
    {
      name: "Winning Points",
      value: "gameWinPoints",
      sortable: true,
    },

    {
      name: "created At",
      value: "createdAt",
      sortable: true,
    },
  ];

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
      gameId: "",
      StartDate: today(new Date()),
    },

    validate: (values) => {
      const errors = {};
      if (!values.gameId) {
        errors.gameId = PagesIndex.valid_err.SELECT_GAME_NAME_ERROR;
      }

      return errors;
    },

    onSubmit: async (values) => {
      const payload = {
        startDate: values.StartDate,
        gameId: values.gameId || "0",
        page: 1,
        limit: 10,
        search: SearchInTable,
      };

      try {
        const res = await PagesIndex.report_service.JACKPOT_BIDS_REPORT_API(
          payload,
          token
        );

        if (res.status) {
          setTableData(res.data);
          getGameResultApi();
        } else {
          setTableData([]);
          PagesIndex.toast.error(res.response.data.message);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        PagesIndex.toast.error(errorMessage);
      }
    },
  });

  const fields = [
    {
      name: "StartDate",
      label: "Start Date",
      type: "date",
      label_size: 12,
      col_size: 3,
      max: { actual_date_formet },
    },

    {
      name: "gameId",
      label: "Provider Name",
      type: "select",
      options:
        (ProviderList &&
          ProviderList.map((item) => ({
            label: item.providerName,
            value: item._id,
          }))) ||
        [],
      label_size: 12,
      col_size: 3,
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
          <PagesIndex.TableWithCustomPeginationNew
            data={tableData}
            initialRowsPerPage={5}
            SearchInTable={SearchInTable}
            visibleFields={visibleFields}
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
        title="Andar Bahar Detailed Bidding Report "
        add_button={false}
        btnTitle="Add"
        route="/add"
        cardLayouts={cardLayouts}
      />
    </>
  );
};

export default AndarBharTotalBids;
