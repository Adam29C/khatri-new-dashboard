import PagesIndex from "../../../Pages/PagesIndex";
import DeleteSweetAlert from "../../../Helpers/DeleteSweetAlert";
import ConfirmationModal from "../../Confirm_Box";

const RevertPayment = ({ main_result , confirm_revert_payment}) => {
  const token = localStorage.getItem("token");
  let { user_id, role } = JSON.parse(localStorage.getItem("userdetails"));

  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [TableData, setTableData] = PagesIndex.useState([]);
  const [Refresh, setRefresh] = PagesIndex.useState(false);

  const visibleFields = [
    "id",
    "name",
    "username",
    "mobile",
    "deviceName",
    "deviceId",
    "CreatedAt",
    "Block",
    "Profile",
    "Delete",
  ];

  const getList = async () => {
    const payload = {
      page: 1,
      limit: 10,
      searchQuery: SearchInTable,
    };

    const res = await PagesIndex.game_service.ALL_GAME_REVERT_PAYMENT_API(
      main_result,
      payload,
      token
    );

    setTableData(res?.data);
  };

  PagesIndex.useEffect(() => {
    getList();
  }, [Refresh]);

  const UserFullButtonList = [];

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
      await PagesIndex.game_service.STARLINE_GAME_CONFIRM_REVERT_PAYMENT_API(
        confirm_revert_payment,
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
  return (
    <div>
      <PagesIndex.Main_Containt
        add_button={false}
        route="/admin/user/add"
        title="Revert Game Result Payment"
      >
        <PagesIndex.TableWithCustomPeginationButton
          data={TableData}
          initialRowsPerPage={5}
          SearchInTable={SearchInTable}
          visibleFields={visibleFields}
          UserFullButtonList={UserFullButtonList}
          confirm_button={
            <ConfirmationModal
              title="Are you sure you want to delete this file?"
              text="This action cannot be undone."
              icon="warning"
              confirmButtonText="Yes, delete it!"
              cancelButtonText="No, cancel!"
              Buttontitle="Confirm"
              onConfirm={ConfirmPayment}
            />
          }
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

        <PagesIndex.Toast />
      </PagesIndex.Main_Containt>
    </div>
  );
};

export default RevertPayment;
