import PagesIndex from "../../../Pages/PagesIndex";
import { Games_Settings_List } from "../../../Redux/slice/CommonSlice";
import { convertTo12HourFormat } from "../../../Utils/Common_Date";

const GameProvider = ({ path, title, gameType, api_Route }) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = PagesIndex.useNavigate();

  const dispatch = PagesIndex.useDispatch();

  const { gameSettings } = PagesIndex.useSelector((state) => state.CommonSlice);
  const [GetGameList, setGetGameList] = PagesIndex.useState(gameSettings);

  const getStarLineSettingList = async () => {
    let apiData = {
      userId: userId,
      gameType: gameType,
    };

    if (gameType === "MainGame") {
      dispatch(Games_Settings_List({ data: apiData, token: token }));
    } else {
      const res =
        await PagesIndex.game_service.FOR_STARLINE_AND_JACPOT_LIST_API(
          api_Route,
          apiData,
          token
        );
      setGetGameList(res.data);
    }
  };

  PagesIndex.useEffect(() => {
    getStarLineSettingList();
  }, []);

  const columns = [
    {
      name: "Game Name",
      selector: (row, cell) => {
        const rowData = row.gameDetails && row.gameDetails[0];

        return (
          <div className="">
            <div className="break-text">{row.providerName}</div>
            <PagesIndex.Link
              to={`${path}/edit`}
              state={{ row: row, rowData: rowData, edit: "multiple" }}
              className="update-button"
            >
              update
            </PagesIndex.Link>
          </div>
        );
      },
    },
    {
      name: "Monday",
      selector: (row) => {
        const rowData = row.gameDetails && row.gameDetails[0];
        return (
          <div className="py-2">
            {rowData ? (
              <>
                <p className="game-setting-font">
                  <span className="fw-bold"> OBT</span> :
                  {rowData ? convertTo12HourFormat(rowData.OBT) : "N/A"}
                </p>
                <p className="game-setting-font">
                  <span className="fw-bold"> CBT</span> :
                  {rowData ? convertTo12HourFormat(rowData.CBT) : "N/A"}
                </p>
                <p className="game-setting-font">
                  <span className="fw-bold"> OBRT</span> :
                  {rowData ? convertTo12HourFormat(rowData.OBRT) : "N/A"}
                </p>
                {gameType === "MainGame" ? (
                  <p className="game-setting-font">
                    <span className="fw-bold"> CBRT</span> :
                    {rowData ? convertTo12HourFormat(rowData.CBRT) : "N/A"}
                  </p>
                ) : (
                  ""
                )}

                <p className="game-setting-font">
                  <span className="fw-bold">
                    IsClosed :
                    {rowData ? (rowData.isClosed ? "Closed" : "Open") : "N/A"}
                  </span>
                </p>

                <PagesIndex.Link
                  to={`${path}/edit`}
                  state={{ row: row, rowData: rowData, edit: "single" }}
                  className="update-button"
                >
                  update
                </PagesIndex.Link>
              </>
            ) : (
              " No Record"
            )}
          </div>
        );
      },
    },
    {
      name: "Tuesday",
      selector: (row) => {
        const rowData = row.gameDetails && row.gameDetails[1];
        return (
          <div className="py-2">
            <div className="py-2">
              {rowData ? (
                <>
                  <p className="game-setting-font">
                    <span className="fw-bold"> OBT</span> :
                    {rowData ? convertTo12HourFormat(rowData.OBT) : "N/A"}
                  </p>
                  <p className="game-setting-font">
                    <span className="fw-bold"> CBT</span> :
                    {rowData ? convertTo12HourFormat(rowData.CBT) : "N/A"}
                  </p>
                  <p className="game-setting-font">
                    <span className="fw-bold"> OBRT</span> :
                    {rowData ? convertTo12HourFormat(rowData.OBRT) : "N/A"}
                  </p>
                  {gameType === "MainGame" ? (
                    <p className="game-setting-font">
                      <span className="fw-bold"> CBRT</span> :
                      {rowData ? convertTo12HourFormat(rowData.CBRT) : "N/A"}
                    </p>
                  ) : (
                    ""
                  )}

                  <p className="game-setting-font">
                    <span className="fw-bold">
                      IsClosed :
                      {rowData ? (rowData.isClosed ? "Closed" : "Open") : "N/A"}
                    </span>
                  </p>

                  <PagesIndex.Link
                    to={`${path}/edit`}
                    state={{ row: row, rowData: rowData, edit: "single" }}
                    className="update-button"
                  >
                    update
                  </PagesIndex.Link>
                </>
              ) : (
                " No Record"
              )}
            </div>
          </div>
        );
      },
    },
    {
      name: "Wednesday",
      selector: (row) => {
        const rowData = row.gameDetails && row.gameDetails[2];
        return (
          <div className="py-2">
            <div className="py-2">
              {rowData ? (
                <>
                  <p className="game-setting-font">
                    <span className="fw-bold"> OBT</span> :
                    {rowData ? convertTo12HourFormat(rowData.OBT) : "N/A"}
                  </p>
                  <p className="game-setting-font">
                    <span className="fw-bold"> CBT</span> :
                    {rowData ? convertTo12HourFormat(rowData.CBT) : "N/A"}
                  </p>
                  <p className="game-setting-font">
                    <span className="fw-bold"> OBRT</span> :
                    {rowData ? convertTo12HourFormat(rowData.OBRT) : "N/A"}
                  </p>

                  {gameType === "MainGame" ? (
                    <p className="game-setting-font">
                      <span className="fw-bold"> CBRT</span> :
                      {rowData ? convertTo12HourFormat(rowData.CBRT) : "N/A"}
                    </p>
                  ) : (
                    ""
                  )}

                  <p className="game-setting-font">
                    <span className="fw-bold">
                      IsClosed :
                      {rowData ? (rowData.isClosed ? "Closed" : "Open") : "N/A"}
                    </span>
                  </p>

                  <PagesIndex.Link
                    to={`${path}/edit`}
                    state={{ row: row, rowData: rowData, edit: "single" }}
                    className="update-button"
                  >
                    update
                  </PagesIndex.Link>
                </>
              ) : (
                " No Record"
              )}
            </div>
          </div>
        );
      },
    },
    {
      name: "Thursday",
      selector: (row) => {
        const rowData = row.gameDetails && row.gameDetails[3];
        return (
          <div className="py-2">
            <div className="py-2">
              {rowData ? (
                <>
                  <p className="game-setting-font">
                    <span className="fw-bold"> OBT</span> :
                    {rowData ? convertTo12HourFormat(rowData.OBT) : "N/A"}
                  </p>
                  <p className="game-setting-font">
                    <span className="fw-bold"> CBT</span> :
                    {rowData ? convertTo12HourFormat(rowData.CBT) : "N/A"}
                  </p>
                  <p className="game-setting-font">
                    <span className="fw-bold"> OBRT</span> :
                    {rowData ? convertTo12HourFormat(rowData.OBRT) : "N/A"}
                  </p>

                  {gameType === "MainGame" ? (
                    <p className="game-setting-font">
                      <span className="fw-bold"> CBRT</span> :
                      {rowData ? convertTo12HourFormat(rowData.CBRT) : "N/A"}
                    </p>
                  ) : (
                    ""
                  )}

                  <p className="game-setting-font">
                    <span className="fw-bold">
                      IsClosed :
                      {rowData ? (rowData.isClosed ? "Closed" : "Open") : "N/A"}
                    </span>
                  </p>

                  <PagesIndex.Link
                    to={`${path}/edit`}
                    state={{ row: row, rowData: rowData, edit: "single" }}
                    className="update-button"
                  >
                    update
                  </PagesIndex.Link>
                </>
              ) : (
                " No Record"
              )}
            </div>
          </div>
        );
      },
    },
    {
      name: "Friday",
      selector: (row) => {
        const rowData = row.gameDetails && row.gameDetails[4];
        return (
          <div className="py-2">
            <div className="py-2">
              {rowData ? (
                <>
                  <p className="game-setting-font">
                    <span className="fw-bold"> OBT</span> :
                    {rowData ? convertTo12HourFormat(rowData.OBT) : "N/A"}
                  </p>
                  <p className="game-setting-font">
                    <span className="fw-bold"> CBT</span> :
                    {rowData ? convertTo12HourFormat(rowData.CBT) : "N/A"}
                  </p>
                  <p className="game-setting-font">
                    <span className="fw-bold"> OBRT</span> :
                    {rowData ? convertTo12HourFormat(rowData.OBRT) : "N/A"}
                  </p>

                  {gameType === "MainGame" ? (
                    <p className="game-setting-font">
                      <span className="fw-bold"> CBRT</span> :
                      {rowData ? convertTo12HourFormat(rowData.CBRT) : "N/A"}
                    </p>
                  ) : (
                    ""
                  )}
                  <p className="game-setting-font">
                    <span className="fw-bold">
                      IsClosed :
                      {rowData ? (rowData.isClosed ? "Closed" : "Open") : "N/A"}
                    </span>
                  </p>

                  <PagesIndex.Link
                    to={`${path}/edit`}
                    state={{ row: row, rowData: rowData, edit: "single" }}
                    className="update-button"
                  >
                    update
                  </PagesIndex.Link>
                </>
              ) : (
                " No Record"
              )}
            </div>
          </div>
        );
      },
    },
    {
      name: "Saturday",
      selector: (row) => {
        const rowData = row.gameDetails && row.gameDetails[5];
        return (
          <div className="py-2">
            <div className="py-2">
              {rowData ? (
                <>
                  <p className="game-setting-font">
                    <span className="fw-bold"> OBT</span> :
                    {rowData ? convertTo12HourFormat(rowData.OBT) : "N/A"}
                  </p>
                  <p className="game-setting-font">
                    <span className="fw-bold"> CBT</span> :
                    {rowData ? convertTo12HourFormat(rowData.CBT) : "N/A"}
                  </p>
                  <p className="game-setting-font">
                    <span className="fw-bold"> OBRT</span> :
                    {rowData ? convertTo12HourFormat(rowData.OBRT) : "N/A"}
                  </p>

                  {gameType === "MainGame" ? (
                    <p className="game-setting-font">
                      <span className="fw-bold"> CBRT</span> :
                      {rowData ? convertTo12HourFormat(rowData.CBRT) : "N/A"}
                    </p>
                  ) : (
                    ""
                  )}
                  <p className="game-setting-font">
                    <span className="fw-bold">
                      IsClosed :
                      {rowData ? (rowData.isClosed ? "Closed" : "Open") : "N/A"}
                    </span>
                  </p>

                  <PagesIndex.Link
                    to={`${path}/edit`}
                    state={{ row: row, rowData: rowData, edit: "single" }}
                    className="update-button"
                  >
                    update
                  </PagesIndex.Link>
                </>
              ) : (
                " No Record"
              )}
            </div>
          </div>
        );
      },
    },
    {
      name: "Sunday",
      selector: (row) => {
        const rowData = row.gameDetails && row.gameDetails[6];
        return (
          <div className="py-2">
            <div className="py-2">
              {rowData ? (
                <>
                  <p className="game-setting-font">
                    <span className="fw-bold"> OBT</span> :
                    {rowData ? convertTo12HourFormat(rowData.OBT) : "N/A"}
                  </p>
                  <p className="game-setting-font">
                    <span className="fw-bold"> CBT</span> :
                    {rowData ? convertTo12HourFormat(rowData.CBT) : "N/A"}
                  </p>
                  <p className="game-setting-font">
                    <span className="fw-bold"> OBRT</span> :
                    {rowData ? convertTo12HourFormat(rowData.OBRT) : "N/A"}
                  </p>

                  {gameType === "MainGame" ? (
                    <p className="game-setting-font">
                      <span className="fw-bold"> CBRT</span> :
                      {rowData ? convertTo12HourFormat(rowData.CBRT) : "N/A"}
                    </p>
                  ) : (
                    ""
                  )}
                  <p className="game-setting-font">
                    <span className="fw-bold">
                      IsClosed :
                      {rowData ? (rowData.isClosed ? "Closed" : "Open") : "N/A"}
                    </span>
                  </p>

                  <PagesIndex.Link
                    to={`${path}/edit`}
                    state={{ row: row, rowData: rowData, edit: "single" }}
                    className="update-button"
                  >
                    update
                  </PagesIndex.Link>
                </>
              ) : (
                " No Record"
              )}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <PagesIndex.Main_Containt
        add_button={true}
        route={`${path}/add`}
        title={title}
        btnTitle="Add"
      >
        <PagesIndex.Data_Table
          columns={columns}
          data={GetGameList && GetGameList}
        />
      </PagesIndex.Main_Containt>
    </div>
  );
};

export default GameProvider;
