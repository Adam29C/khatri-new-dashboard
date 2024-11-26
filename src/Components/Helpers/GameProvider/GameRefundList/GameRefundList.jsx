import PagesIndex from "../../../Pages/PagesIndex";
import { Confirm_box } from "../../Confirm_Box";

const RefundPayment = ({ refund_list, confirm_revert_payment }) => {
  const token = localStorage.getItem("token");
  let { user_id, role } = JSON.parse(localStorage.getItem("userdetails"));

  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [TableData, setTableData] = PagesIndex.useState([]);
  const [Refresh, setRefresh] = PagesIndex.useState(false);

  const visibleFields = [
    "id",
    "providerName",
    "resultDate",
    "winningDigit",
    "Delete",
  ];

  const getList = async () => {
    const payload = {
      page: 1,
      limit: 10,
      searchQuery: SearchInTable,
    };

    const res = await PagesIndex.game_service.ALL_GAME_REFUND_PAYMENT_API(
      refund_list,
      // payload,
      token
    );
    setTableData(res?.data);
  };

  PagesIndex.useEffect(() => {
    getList();
  }, [Refresh]);

  const UserFullButtonList = [
    {
      id: 0,
      buttonName: "Revert Payment",
      buttonColor: "",
      route: "",
      Conditions: (row) => {
        ConfirmPayment(row);
        // handleActionBtn(row, 1);
      },
      Visiblity: true,
      type: "button",
    },
  ];

  const ConfirmPayment = async (row) => {
    const apidata = {
      resultId: row?._id,
      providerId: row?.providerId,
      session: row?.session,
      digit: row?.winningDigit,
      date: row?.resultDate,
      family: row?.winningDigitFamily.toString(),
    };

    const res =
      await PagesIndex.game_service.STARLINE_GAME_CONFIRM_REVERT_PAYMENT_API(
        confirm_revert_payment,
        apidata,
        token
      );

    try {
      if (res.statusCode === 200) {
        Confirm_box({
          title1: "You won't be able to revert this!",
          title2: "Item has been deleted successfully!",
        });
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
        title="Starline Refund Payment List"
      >
        <PagesIndex.TableWithCustomPeginationButton
          data={TableData}
          initialRowsPerPage={5}
          SearchInTable={SearchInTable}
          visibleFields={visibleFields}
          UserFullButtonList={UserFullButtonList}
          // confirm_button={
          //   <ConfirmationModal
          //     title="Are you sure you want to delete this file?"
          //     text="This action cannot be undone."
          //     icon="warning"
          //     confirmButtonText="Yes, delete it!"
          //     cancelButtonText="No, cancel!"
          //     Buttontitle="Confirm"
          //     onConfirm={ConfirmPayment}
          //   />
          // }
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

export default RefundPayment;
