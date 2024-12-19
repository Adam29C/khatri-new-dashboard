import PagesIndex from "../../../Pages/PagesIndex";
import { Confirm_box } from "../../Confirm_Box";
import ReusableModal from "../../../Helpers/Modal/ReusableModal";

const RevertPayment = ({ main_result, confirm_revert_payment, gameType }) => {
  const token = localStorage.getItem("token");
  let { user_id, username, role } = JSON.parse(
    localStorage.getItem("userdetails")
  );

  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [TableData, setTableData] = PagesIndex.useState([]);
  const [Refresh, setRefresh] = PagesIndex.useState(false);
  const [ModalState, setModalState] = PagesIndex.useState(false);
  const [BtnVisiably, setBtnVisiably] = PagesIndex.useState(false);
  const [RowData, setRowData] = PagesIndex.useState("");

  const visibleFields = [
    {
      name: "provider Name",
      value: "providerName",
      sortable: true,
    },
    {
      name: "result Date",
      value: "resultDate",
      sortable: false,
    },
    {
      name: "winning Digit",
      value: "winningDigit",
      sortable: true,
    },
    {
      name: "Revert Payment",
      value: "Revert Payment",
      buttonColor: "",
      className: "primary-color",
      isButton: true,
      sortable: true,
      Conditions: (row) => {
        setModalState(true);
        setRowData(row);
      },
    },
  ];

  const getList = async () => {
    const payload = {
      page: 1,
      limit: 10,
      searchQuery: SearchInTable,
    };

    const res = await PagesIndex.game_service.ALL_GAME_REVERT_PAYMENT_API(
      main_result,
      // payload,
      token
    );
    setTableData(res?.data);
  };

  PagesIndex.useEffect(() => {
    getList();
  }, [Refresh]);

  const ConfirmPayment = async (row) => {
    setBtnVisiably(true);

    try {
      let apidata = "";
      if (gameType === "MainGame") {
        apidata = {
          id: RowData?._id,
          provider: RowData?.providerId,
          gameSession: RowData?.session,
          digit: RowData?.winningDigit,
          digitFamily: RowData?.winningDigitFamily.toString(),
          gameDate: RowData?.resultDate,
          adminId: user_id,
          adminName: username,
        };
      } else {
        apidata = {
          resultId: RowData?._id,
          providerId: RowData?.providerId,
          session: RowData?.session,
          digit: RowData?.winningDigit,
          date: RowData?.resultDate,
          family: RowData?.winningDigitFamily.toString(),
        };
      }

      const res =
        await PagesIndex.game_service.STARLINE_GAME_CONFIRM_REVERT_PAYMENT_API(
          confirm_revert_payment,
          apidata,
          token
        );

      if (res.statusCode === 200 || res.status) {
        PagesIndex.toast.success(res.message);

        setRefresh(!Refresh);
        setBtnVisiably(false);
        setModalState(false);
      } else {
        PagesIndex.toast.error(res.response.data.message);
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
        <PagesIndex.TableWithCustomPeginationNew123
          data={TableData}
          initialRowsPerPage={5}
          SearchInTable={SearchInTable}
          visibleFields={visibleFields}
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
                <button
                  className={`btn btn-dark  mx-2 ${
                    BtnVisiably ? "d-none" : "d-block"
                  }`}
                  onClick={() => ConfirmPayment(1)}
                >
                  Confirm
                </button>

                <button
                  className={`btn btn-dark  mx-2 ${
                    !BtnVisiably ? "d-none" : "d-block"
                  }`}
                  disabled
                >
                  Confirm
                </button>

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
        <PagesIndex.Toast />
      </PagesIndex.Main_Containt>
    </div>
  );
};

export default RevertPayment;
