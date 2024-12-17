import React, { useEffect, useState } from "react";
import PagesIndex from "../../../PagesIndex";
import Split_Main_Containt from "../../../../Layout/Main/Split_Main_Content";
import ReusableModal from "../../../../Helpers/Modal/ReusableModal";

const WinnerList = () => {
  //get token in localstorage
  const token = localStorage.getItem("token");
  //get previous page single game result data
  const location = PagesIndex.useLocation();
  //data destructure
  const data = location.state?.rowdata;

  //all state
  const [remainingWinnerData, setRemainingWinnerData] = PagesIndex.useState([]);
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [mainWinnerData, setMainWinnerData] = PagesIndex.useState([]);
  const [ModalState, setModalState] = useState(false);
  const [Refresh, setRefresh] = PagesIndex.useState(false);

  const fetchData = async (page, rowsPerPage, searchQuery = "") => {
    const apidata = {
      providerId: data.providerId,
      date: data.resultDate,
      session: data.session,
      page: page,
      limit: rowsPerPage,
      searchQuery,
    };

    try {
      const res1 =
        await PagesIndex.admin_services.GAME_REMAINING_WINNER_LIST_API(
          apidata,
          token
        );

      if (res1.status) {
        const nonEmptyCategories1 = [];

        Object.entries(res1?.data?.winnerList).forEach(([key, value]) => {
          if (value.length > 0) {
            nonEmptyCategories1.push(...value);
          }
        });

        const totalRows1 = res1.data.pagination.totalItems || 10;
        let mainRes1 = nonEmptyCategories1;

        return { mainRes1, totalRows1 };
      }
    } catch {}
  };

  const fetchData1 = async (page, rowsPerPage, searchQuery = "") => {
    const apidata1 = {
      digit: data.winningDigit,
      provider: data.providerId,
      gamedate: data.resultDate,
      resultId: data._id,
      resultStatus: String(data.status),
      digitFamily: String(data.winningDigitFamily),
      sessionType: data.session,
      providerName: data.providerName,
      page: page,
      limit: rowsPerPage,
      searchQuery,
    };

    try {
      const res = await PagesIndex.admin_services.GAME_MAIN_WINNER_LIST_API(
        apidata1,
        token
      );

      if (res.status) {
        const nonEmptyCategories = [];

        Object.entries(res?.data?.winnerList).forEach(([key, value]) => {
          if (value.length > 0) {
            nonEmptyCategories.push(...value);
          }
        });

        const totalRows = res.data.pagination.totalItems || 5;
        let mainRes = nonEmptyCategories;

        return { mainRes, totalRows };
      }
    } catch {}
  };

  PagesIndex.useEffect(() => {
    fetchData();
    fetchData1();
  }, []);

  const visibleFields = [
    {
      name: "Winner Name",
      value: "userName",
      sortable: false,
    },
    {
      name: "Mobile Number",
      value: "mobileNumber",
      sortable: false,
    },
    {
      name: "Game",
      value: "gameTypeName",
      sortable: false,
    },
    {
      name: "Bid Digit",
      value: "bidDigit",
      sortable: false,
      className: "badge badge-purple",
    },
    {
      name: "Bid Date",
      value: "gameDate",
      sortable: false,
    },
    {
      name: "Rate",
      value: "gameTypePrice",
      sortable: false,
    },
    {
      name: "Total Amount",
      value: "gameWinPoints",
      sortable: false,
    },
  ];

  //get game winner list api
  const getGameWinnerListApi = async () => {
    const apidata = {
      providerId: data.providerId,
      date: data.resultDate,
      session: data.session,
    };
    const apidata1 = {
      digit: data.winningDigit,
      provider: data.providerId,
      gamedate: data.resultDate,
      resultId: data._id,
      resultStatus: String(data.status),
      digitFamily: String(data.winningDigitFamily),
      sessionType: data.session,
      providerName: data.providerName,
    };

    try {
      const res = await PagesIndex.admin_services.GAME_MAIN_WINNER_LIST_API(
        apidata1,
        token
      );

      console.log("resres", res);

      const res1 =
        await PagesIndex.admin_services.GAME_REMAINING_WINNER_LIST_API(
          apidata,
          token
        );

      if (res.status) {
        setMainWinnerData(res?.data?.winnerList["Single Digit"]);
      }
      if (res1.status) {
        setRemainingWinnerData(res1?.data?.winnerList["Single Digit"]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getGameWinnerListApi();
  }, []);

  const cardLayouts = [
    {
      size: 12,
      body: (
        <div>
          <h4 className="winner-list-text-main">
            Game Winners Of Date : {data?.resultDate}, Provider :{" "}
            {data?.providerName}, Session : {data.session}, Digit :{" "}
            {data?.winningDigit}-{data?.winningDigitFamily}
          </h4>
        </div>
      ),
    },

    {
      size: 12,
      body: (
        <div>
          <PagesIndex.TableWithCustomPeginationNew
            fetchData={fetchData1}
            columns={visibleFields}
            // UserFullButtonList={UserFullButtonList}
            showIndex={true}
            Refresh={Refresh}
          />
        </div>
      ),
    },

    {
      size: 12,
      body: (
        <div>
          <div class="d-flex justify-content-end mb-3">
            <button
              onClick={() => setModalState(true)}
              className="btn btn-dark"
            >
              Confirm Payment
            </button>
          </div>
          <PagesIndex.TableWithCustomPeginationNew
            fetchData={fetchData}
            columns={visibleFields}
            // UserFullButtonList={UserFullButtonList}
            showIndex={true}
            Refresh={Refresh}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <Split_Main_Containt
        title="Game Winners"
        add_button={false}
        cardLayouts={cardLayouts}
      />
      <ReusableModal
        // ModalTitle="ghghu"
        ModalState={ModalState}
        setModalState={setModalState}
        ModalBody={
          <div className="">
            <h1 className="confirm-payment-text">
              Are You Sure Want To Confirm Payment?
            </h1>
            <div className="d-flex justify-content-end">
              <button className="btn btn-dark  mx-2">Confirm</button>
              <button
                onClick={() => setModalState(false)}
                className="btn btn-dark  mx-2"
              >
                Close
              </button>
            </div>
          </div>
        }
      />
    </>
  );
};

export default WinnerList;
