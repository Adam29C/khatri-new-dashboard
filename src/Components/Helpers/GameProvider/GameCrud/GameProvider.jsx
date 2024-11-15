import PagesIndex from "../../../Pages/PagesIndex";
import { Link } from "react-router-dom";
import { Get_Year_Only } from "../../../Utils/Common_Date";
import Toggle from "../../Toggle";
import Swal from "sweetalert2";
import { GAME_PROVIDER_DELETE_API } from "../../../Services/SuperAdminServices";
import DeleteSweetAlert from "../../DeleteSweetAlert";
import { Games_Provider_List } from "../../../Redux/slice/CommonSlice";
const GameProvider = ({ data, path, title, gametype }) => {
  const userId = localStorage.getItem("userId");
  const navigate = PagesIndex.useNavigate();

  const dispatch = PagesIndex.useDispatch();
  let userDeleteReason = false;
  const { gameProviders } = PagesIndex.useSelector(
    (state) => state.CommonSlice
  );

  const getGameProviderList = () => {
    let apiData = {
      userId: userId,
      gameType: gametype,
    };
    dispatch(Games_Provider_List(apiData));
  };

  PagesIndex.useEffect(() => {
    getGameProviderList();
  }, []);

  const updateStatusApi = () => {};

  const columns = [
    {
      name: "Provider Name",
      selector: (row) => row.providerName,
    },
    {
      name: "Provider Result",
      selector: (row) => row.providerResult,
    },
    {
      name: "Active Status",
      selector: (row) => (
        <>
          <Toggle check={row.activeStatus} updateStatusApi={updateStatusApi} />
        </>
      ),
    },
    {
      name: "Created At",
      selector: (row) => Get_Year_Only(row.createdAt),
      // selector: (row) => row?.modifiedAt,
    },
    {
      name: "Actions",
      selector: (cell, row) => (
        <div style={{ width: "120px" }}>
          <div>
            <Link className="edit-icon" to={`${path}/edit`} state={cell}>
              <span data-toggle="tooltip" data-placement="top" title="Edit">
                <i class="ti-marker-alt fs-5 mx-1 "></i>
              </span>
            </Link>

            <Link
              className="delete-icon"
              href="#"
              onClick={() =>
                DeleteSweetAlert(
                  PagesIndex.admin_services.GAME_PROVIDER_DELETE_API,
                  cell?._id,
                  getGameProviderList,
                  userDeleteReason
                )
              }
            >
              <span data-toggle="tooltip" data-placement="top" title="Delete">
                <i class="ti-trash fs-5 mx-1 "></i>
              </span>
            </Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div>
        <PagesIndex.Main_Containt
          add_button={true}
          route={`${path}/add`}
          title={title}
          btnTitle="Add"
        >
          <PagesIndex.Data_Table columns={columns} data={gameProviders} />
        </PagesIndex.Main_Containt>
      </div>
    </>
  );
};

export default GameProvider;
