import React, { useEffect, useState } from "react";
import PagesIndex from "../../../Pages/PagesIndex";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";
import ReusableModal from "../../../Helpers/Modal/ReusableModal";
// import ConfirmationModal from "../../Confirm_Box";

const WinnerList = () => {
  //get token in localstorage
  const token = localStorage.getItem("token");
  const { user_id } = JSON.parse(localStorage.getItem("userdetails"));

  //get previous page single game result data
  const location = PagesIndex.useLocation();
  //data destructure
  const data = location.state.row;
  const api_Route = location.state.route;
  const gameType = location.state.gameType;
  const distribute_fund_Api = location.state.distribute_fund;

  //all state
  const [remainingWinnerData, setRemainingWinnerData] = PagesIndex.useState([]);
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [mainWinnerData, setMainWinnerData] = PagesIndex.useState([]);
  const [ModalState, setModalState] = useState(false);

  //get game winner list api
  const getGameWinnerListApi = async () => {
    // winnerlist
    // digit, provider, date, resultId, resultStatus, digitFamily

    // providerId, windigit, gameDate, digitFamily, resultId, adminId

    const apidata = {
      digit: data.winningDigit,
      provider: data.providerId,
      date: data.resultDate,
      resultId: data._id,
      resultStatus: data.status,
      digitFamily: data.winningDigitFamily,
    };

    try {
      const res = await PagesIndex.game_service.ALL_GAME_WINNER_LIST_API(
        api_Route,
        apidata,
        token
      );
      

      //   const res = await PagesIndex.admin_services.GAME_MAIN_WINNER_LIST_API(
      //     apidata1,
      //     token
      //   );
      //   const res1 =
      //     await PagesIndex.admin_services.GAME_REMAINING_WINNER_LIST_API(
      //       apidata,
      //       token
      //     );

      if (res.status) {
        setMainWinnerData(res?.data?.winnerList);
      }
      //   if (res1.status) {
      //     setRemainingWinnerData(res1?.data?.winnerList["Single Digit"]);
      //   }
    } catch (error) {}
  };

  useEffect(() => {
    getGameWinnerListApi();
  }, []);

  const visibleFields = [
    "id",
    "userName",
    "mobileNumber",
    "gameTypeName",
    "gameDate",
    "bidDigit",
    "biddingPoints",
    "gameTypePrice",
    "gameWinPoints",
  ];

  const visibleFields1 = [
    "id",
    "userName",
    "mobileNumber",
    "gameTypeName",
    "gameDate",
    "bidDigit",
    "biddingPoints",
    "gameTypePrice",
    "gameWinPoints",
  ];

  const UserFullButtonList = [];

  // ----------------  ------------------

  const ConfirmPayment = async (row) => {
    const apidata = {
      //   resultId: row?._id,
      //   providerId: row?.providerId,
      //   session: row?.session,

      windigit: data.winningDigit,
      providerId: data.providerId,
      gameDate: data.resultDate,
      resultId: data._id,
      resultStatus: String(data.status),
      digitFamily: String(data.winningDigitFamily),
      adminId: user_id,
    };

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this game?"
    );
    if (!confirmDelete) return;

    return;
    const res =
      await PagesIndex.game_service.STARLINE_GAME_DISTIBUTE_FUND_WINNERS_API(
        api_Route,
        distribute_fund_Api,
        token
      );

    try {
      if (res.statusCode === 200) {
        alert(res?.message);
        getGameResultApi;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cardLayouts = [
    {
      size: 12,
      visiblity: "show",

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
      visiblity: "show",
      body: (
        <div>
          <PagesIndex.TableWithCustomPeginationButton
            data={mainWinnerData}
            initialRowsPerPage={5}
            SearchInTable={SearchInTable}
            visibleFields={visibleFields}
            UserFullButtonList={UserFullButtonList}
            confirm_button={
              // <ConfirmationModal
              //   title="Are you sure you want to delete this file?"
              //   text="This action cannot be undone."
              //   icon="warning"
              //   confirmButtonText="Yes, delete it!"
              //   cancelButtonText="No, cancel!"
              //   Buttontitle="Confirm"
              //   onConfirm={ConfirmPayment}
              // />

              //   <button
              //     className="btn btn-primary"
              //     onClick={() => ConfirmPayment()}
              //   >
              //     confirm
              //   </button>
           "" }
            searchInput={
              <>
                <input
                  type="text"
                  placeholder="Search..."
                  value={SearchInTable}
                  onChange={(e) => setSearchInTable(e.target.value)}
                  className="form-control ms-auto"
                />
              </>
            }
          />
        </div>
      ),
    },

    {
      size: 12,
      visiblity:
        gameType === "StarLine" || gameType === "StarLine" ? "hide" : "show",
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

          <PagesIndex.TableWithCustomPeginationButton
            data={remainingWinnerData}
            initialRowsPerPage={5}
            SearchInTable={SearchInTable}
            visibleFields={visibleFields1}
            UserFullButtonList={UserFullButtonList}
            searchInput={
              <>
                <input
                  type="text"
                  placeholder="Search..."
                  value={SearchInTable}
                  onChange={(e) => setSearchInTable(e.target.value)}
                  className="form-control ms-auto"
                />
              </>
            }
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
