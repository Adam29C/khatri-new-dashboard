// import PagesIndex from "../../../Pages/PagesIndex";
// import { Confirm_box } from "../../Confirm_Box";

// const RefundPayment = ({ refund_list, confirm_revert_payment }) => {
//   const token = localStorage.getItem("token");
//   let { user_id, role } = JSON.parse(localStorage.getItem("userdetails"));

//   const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
//   const [TableData, setTableData] = PagesIndex.useState([]);
//   const [Refresh, setRefresh] = PagesIndex.useState(false);

//   const visibleFields = [
//     "id",
//     "providerName",
//     "resultDate",
//     "winningDigit",
//     "Delete",
//   ];

//   const getList = async () => {
//     const payload = {
//       page: 1,
//       limit: 10,
//       searchQuery: SearchInTable,
//     };

//     const res = await PagesIndex.game_service.ALL_GAME_REFUND_PAYMENT_API(
//       refund_list,
//       // payload,
//       token
//     );
//     setTableData(res?.data);
//   };

//   PagesIndex.useEffect(() => {
//     getList();
//   }, [Refresh]);

//   const UserFullButtonList = [
//     {
//       id: 0,
//       buttonName: "Revert Payment",
//       buttonColor: "",
//       route: "",
//       Conditions: (row) => {
//         ConfirmPayment(row);
//         // handleActionBtn(row, 1);
//       },
//       Visiblity: true,
//       type: "button",
//     },
//   ];

//   const ConfirmPayment = async (row) => {
//     const apidata = {
//       resultId: row?._id,
//       providerId: row?.providerId,
//       session: row?.session,
//       digit: row?.winningDigit,
//       date: row?.resultDate,
//       family: row?.winningDigitFamily.toString(),
//     };

//     const res =
//       await PagesIndex.game_service.STARLINE_GAME_CONFIRM_REVERT_PAYMENT_API(
//         confirm_revert_payment,
//         apidata,
//         token
//       );

//     try {
//       if (res.statusCode === 200) {
//         Confirm_box({
//           title1: "You won't be able to revert this!",
//           title2: "Item has been deleted successfully!",
//         });
//         getGameResultApi;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       <PagesIndex.Main_Containt
//         add_button={false}
//         route="/admin/user/add"
//         title="Starline Refund Payment List"
//       >
//         <PagesIndex.TableWithCustomPeginationButton
//           data={TableData}
//           initialRowsPerPage={5}
//           SearchInTable={SearchInTable}
//           visibleFields={visibleFields}
//           UserFullButtonList={UserFullButtonList}
//           // confirm_button={
//           //   <ConfirmationModal
//           //     title="Are you sure you want to delete this file?"
//           //     text="This action cannot be undone."
//           //     icon="warning"
//           //     confirmButtonText="Yes, delete it!"
//           //     cancelButtonText="No, cancel!"
//           //     Buttontitle="Confirm"
//           //     onConfirm={ConfirmPayment}
//           //   />
//           // }
//           searchInput={
//             <input
//               type="text"
//               placeholder="Search..."
//               value={SearchInTable}
//               onChange={(e) => setSearchInTable(e.target.value)}
//               className="form-control ms-auto"
//             />
//           }
//         />

//         <PagesIndex.Toast />
//       </PagesIndex.Main_Containt>
//     </div>
//   );
// };

// export default RefundPayment;

import React from "react";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";
import { useFormik } from "formik";
import PagesIndex from "../../../Pages/PagesIndex";
import { Games_Provider_List } from "../../../Redux/slice/CommonSlice";
import { today } from "../../../Utils/Common_Date";
import ReusableModal from "../../Modal/ReusableModal";
const RefundPayment = ({
  gametype,
  provider_list,
  refund_list,
  refund_payment,
}) => {
  const token = localStorage.getItem("token");

  const dispatch = PagesIndex.useDispatch();

  let { user_id, username, role } = JSON.parse(
    localStorage.getItem("userdetails")
  );

  const [GetProviderData, setGetProviderData] = PagesIndex.useState([]);
  const [tableData, setTableData] = PagesIndex.useState([]);
  const [Refresh, setRefresh] = PagesIndex.useState(false);
  const [ModalState, setModalState] = PagesIndex.useState(false);
  const [BtnVisiably, setBtnVisiably] = PagesIndex.useState(false);
  const [RowData, setRowData] = PagesIndex.useState("");
  const [UserPagenateData, setUserPagenateData] = PagesIndex.useState({
    pageno: 1,
    limit: 10,
  });

  const [TotalPages, setTotalPages] = PagesIndex.useState(1);

  const getGameProviderList = async () => {
    console.log("provider_list ", provider_list);

    // if (gametype === "StarLine" || gametype === "JackPot") {
    const res =
      await PagesIndex.game_service.STARLINE_AND_JACKPOT_GAME_PROVIDERS_LIST_API(
        provider_list,
        token
      );

    if (res.staus || res.status) {
      setGetProviderData(res.data);
    }
  };

  PagesIndex.useEffect(() => {
    getGameProviderList();
  }, [Refresh]);

  const formik = useFormik({
    initialValues: {
      providerId: "",
      date: "",
    },

    validate: (values) => {
      const errors = {};

      if (!values.date) {
        errors.date = "Please Select Date";
      }
      if (!values.providerId && formik.touched.providerId) {
        errors.providerId = "Please Select Provide Name";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const payload = {
        providerId: values.providerId,
        resultDate: today(values.date),
        page: UserPagenateData.pageno,
        limit: UserPagenateData.limit,
      };

      try {
        const res = await PagesIndex.game_service.ALL_GAME_RESULTS_ADD_API(
          refund_list,
          payload,
          token
        );

        if (res.status) {
          setTotalPages(res.pagination.totalCount);
          setTableData(res.data);
          // PagesIndex.toast.success(res?.data?.message || res?.message);
        } else {
          PagesIndex.toast.error(res.response.data.message);
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
      name: "date",
      label: "Result Date",
      type: "date",
      label_size: 12,
      col_size: 3,
    },
    {
      name: "providerId",
      label: "Provider",
      type: "select",
      label_size: 12,
      col_size: 4,
      options:
        (GetProviderData &&
          GetProviderData.map((item) => ({
            label: item.providerName,
            value: item._id,
          }))) ||
        [],
    },
  ];

  const visibleFields = [
    { name: "User Name", value: "userName", sortable: true },
    { name: "Game Session", value: "gameSession", sortable: false },
    { name: "Game Date", value: "gameDate", sortable: true },
    { name: "Bid Digits", value: "bidDigit", sortable: true },
    { name: "Bid Points", value: "biddingPoints", sortable: true },
    {
      name: "Action",
      value: "Refund ",
      buttonColor: "info",
      isButton: true,
      sortable: true,
      Conditions: (row) => {
        setRowData(row);
        setModalState(true);
      },
    },
  ];

  const ConfirmPayment1 = async (staus) => {
    if (confirm("Are you sure you want to delete this payment method? ")) {
      try {
        let apidata = {};

        if (gametype === "maingame") {
          const abc =
            GetProviderData?.filter(
              (i) => i._id === formik.values.providerId
            ) || [];

          apidata = {
            providerId: abc[0]?._id,
            resultDate: formik.values.date,
            type: staus,
            providerName: abc[0]?.providerName,
          };
        }
        const res =
          await PagesIndex.game_service.STARLINE_GAME_CONFIRM_REVERT_PAYMENT_API(
            refund_payment,
            apidata,
            token
          );

        if (res.statusCode === 200 || res.status) {
          PagesIndex.toast.success(res.message);

          setBtnVisiably(false);
          setModalState(false);
        } else {
          PagesIndex.toast.error(res.response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const ConfirmPayment = async (staus) => {
    try {
      let apidata = {};

      if (gametype === "maingame") {
        apidata = {
          userid: RowData.userId,
          biddingPoints: RowData.biddingPoints,
          providerId: RowData.providerId,
          resultDate: RowData.gameDate,
          type: staus,
          providerName: RowData.providerName,
        };
      }
      const res =
        await PagesIndex.game_service.STARLINE_GAME_CONFIRM_REVERT_PAYMENT_API(
          refund_payment,
          apidata,
          token
        );

      if (res.statusCode === 200 || res.status) {
        PagesIndex.toast.success(res.message);

        setBtnVisiably(false);
        setModalState(false);
      } else {
        PagesIndex.toast.error(res.response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <button
            className="btn btn-primary primary-color"
            onClick={() => {
              ConfirmPayment1(2);
            }}
          >
            Refund All
          </button>
          <PagesIndex.TableWithCustomPeginationNew
            // fetchData={handleFetchDataManually}
            // handleFetchDataManually={handleFetchDataManually}
            tableData={tableData && tableData}
            TotalPagesCount={(TotalPages && TotalPages) || []}
            columns={visibleFields}
            showIndex={true}
            Refresh={Refresh}
            setUserPagenateData={setUserPagenateData}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Split_Main_Containt
        title="Game Results"
        add_button={false}
        btnTitle="Add"
        route="/add"
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
    </div>
  );
};

export default RefundPayment;
