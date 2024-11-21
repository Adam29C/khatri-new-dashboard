import React, { useEffect } from "react";
import PagesIndex from "../../../PagesIndex";
import Split_Main_Containt from "../../../../Layout/Main/Split_Main_Content";

const WinnerList = () => {
  const token = localStorage.getItem("token")
  const location = PagesIndex.useLocation();
  const data = location.state?.rowdata
  const [remainingWinnerData, setRemainingWinnerData] = PagesIndex.useState([]);
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");

const [mainWinnerData, setMainWinnerData] = PagesIndex.useState([]);
  console.log(data,"data");
  console.log(mainWinnerData,10);

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

  useEffect(()=>{
    getGameWinnerListApi()
  },[])


  const visibleFields = [
    "id",
    "userName",
    "mobileNumber",
    "gameTypeName",
    "bidDigit",
    "gameDate",
    "biddingPoints",
    "gameTypePrice",
    "gameWinPoints"
  ];

  const visibleFields1 = [
    "id",
    "userName",
    "mobileNumber",
    "gameTypeName",
    "bidDigit",
    "gameDate",
    "biddingPoints",
    "gameTypePrice",
    "gameWinPoints"

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
       <div  >
        <h4 className="winner-list-text-main">
                Game Winners Of Date : {data?.resultDate},
                Provider : {data?.providerName}, Session : {data.session}, Digit : {data?.winningDigit}-{data?.winningDigitFamily}
            </h4>
       </div>
      ),
    },
  
    {
      size: 12,
      body: (
        <div>

            <PagesIndex.TableWitCustomPegination
          data={mainWinnerData}
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
  
    {
      size: 12,
      body: (
        <div>
          <div class="d-flex justify-content-end mb-3"><button className="btn btn-dark">Confirm Payment</button></div>

            <PagesIndex.TableWitCustomPegination
          data={remainingWinnerData}
          initialRowsPerPage={5}
          SearchInTable={SearchInTable}
          visibleFields={visibleFields1}
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
    <Split_Main_Containt
    title="Game Winners"
    add_button={false}
 
    cardLayouts={cardLayouts}

  />
  );
};

export default WinnerList;
