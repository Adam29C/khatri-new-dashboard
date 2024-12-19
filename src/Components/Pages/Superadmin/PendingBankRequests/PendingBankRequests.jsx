import React, { useEffect, useMemo } from "react";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";
import PagesIndex from "../../PagesIndex";
import { numberRegexp } from "../../../Utils/Valid_Rejex";
import ReusableModal from "../../../Helpers/Modal/ReusableModal";

const PendingBankRequests = () => {
  //get token in local storage
  const token = localStorage.getItem("token");
  const user_details = JSON.parse(localStorage.getItem("userdetails"));

  const [Refresh, setRefresh] = PagesIndex.useState(false);

  //all state
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [tableData, setTableData] = PagesIndex.useState([]);
  const [visible, setVisible] = PagesIndex.useState(false);
  const [ModalState, setModalState] = PagesIndex.useState(false);
  const [selectedRow, setSelectedRow] = PagesIndex.useState(null);
  const [getBal, setGetBal] = PagesIndex.useState();
  const [getUserProfile, setGetUserProfile] = PagesIndex.useState();

  //destructure data fro getuserprofile api
  const userProfileData1 = getUserProfile && getUserProfile?.userData1;
  const userProfileData2 = getUserProfile && getUserProfile?.userData2;
  const amountValidation = (value) => {
    return numberRegexp(value);
  };

  const fetchData = async (page, rowsPerPage, searchQuery = "") => {
    const payload = {
      page: page,
      limit: rowsPerPage,
      searchQuery,
    };

    try {
      const response =
        await PagesIndex.admin_services.PENDING_DEBIT_BANK_REQUEST_API(
          payload,
          token
        );
      const totalRows = response?.totalRecords || 10;
      let mainRes = response.data;
      setTableData(mainRes);

      return { mainRes, totalRows };
    } catch {}
  };

  //actions button
  const UserFullButtonList = [
    {
      id: 0,
      buttonName: "Request Amount",
      buttonColor: "",
      Conditions: (row) => {
        handleActionBtn(row, 0);
      },
      Visiblity: true,
      type: "button",
    },
    {
      id: 1,
      buttonName: "Delete",
      buttonColor: "danger",
      Conditions: (row) => {
        handleActionBtn(row, 1);
      },
      Visiblity: true,
      type: "button",
    },
    {
      id: 2,
      buttonName: "User Profile",
      buttonColor: "secondary",
      Conditions: (row) => {
        handleActionBtn(row, 2);
      },
      Visiblity: true,
      type: "button",
    },
  ];

  const visibleFields = [
    { name: "Name", value: "fullname", sortable: false },
    { name: "User Name", value: "username", sortable: true },
    { name: "Mobile", value: "mobile", sortable: true },
    { name: "Request mount", value: "reqAmount", sortable: true },
    { name: "Request Type", value: "reqType", sortable: true },
    { name: "Withdrawal Mode", value: "withdrawalMode", sortable: true },
    { name: "Status", value: "reqStatus", sortable: true },
    { name: "Create Time ", value: "reqTime", sortable: true },
    {
      // name: "Profile",
      name: "Request Amount",
      isButton: true,
      value: "Request Amount",
      buttonColor: "success",
      Conditions: (row) => {
        handleActionBtn(row, 0);
      },
    },
    {
      // name: "Profile",
      name: "Delete",
      isButton: true,
      value: "Delete",
      buttonColor: "danger",
      Conditions: (row) => {
        handleActionBtn(row, 1);
      },
    },
    {
      // name: "Profile",
      name: "Profile",
      isButton: true,
      value: "Profile",
      buttonColor: "success",
      Conditions: (row) => {
        handleActionBtn(row, 2);
      },
    },
  ];

  const totalAmount = useMemo(
    () => tableData.reduce((acc, item) => acc + (item?.reqAmount || 0), 0),
    [tableData]
  );

  const formik = PagesIndex.useFormik({
    initialValues: {
      amount: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.amount) {
        errors.amount = PagesIndex.valid_err.REQUIRE_AMOUNT;
      } else if (!amountValidation(values.amount)) {
        errors.amount = PagesIndex.valid_err.REQUIRE_AMOUNT_VALID;
      }
      return errors;
    },

    onSubmit: async (values) => {
      setVisible(false);
      const apidata = {
        userId: selectedRow?.userId,
        rowId: selectedRow?._id,
        adminId: user_details.user_id,
        amount: +values.amount,
        id: selectedRow?.reqType === "Debit" ? 2 : 1,
      };
      const res =
        await PagesIndex.admin_services.PENDING_DEBIT_UPDATE_WALLET_API(
          apidata,
          token
        );

      if (res.status) {
        PagesIndex.toast.success(res.message);
        getPendingRequestList();
      } else {
        PagesIndex.toast.error(res.message);
      }
      if (res?.status === 400) {
        PagesIndex.toast.error(res?.data?.message);
      }
    },
  });

  const fields = [
    {
      name: "amount",
      label: "Request Amount",
      type: "text",
      label_size: 12,
      col_size: 12,
    },
  ];

  //handle action btn
  const handleActionBtn = (row, buttonStatus) => {
    switch (buttonStatus) {
      case 0:
        handleGetBal(row);
        setSelectedRow(row);
        formik.resetForm({
          values: {
            amount: row?.reqAmount,
          },
        });

        setVisible(true);
        break;
      case 1:
        handlePendingRequestDecline(row?._id);
        break;
      case 2:
        setModalState(true);
        handleGetUserProfile(row?.userId);
        break;

      default:
        break;
    }
  };

  // get balance api
  const handleGetBal = async (row) => {
    const data = {
      id: row?.userId,
    };
    const res = await PagesIndex.admin_services.PENDING_DEBIT_GET_BALANCE_API(
      data,
      token
    );
    if (res?.status) {
      setGetBal(res?.data);
    }
  };

  //PENDING DEBIT DECLINE
  const handlePendingRequestDecline = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to decline this pending request?"
    );
    if (!confirmDelete) return;

    const apidata = {
      rowId: id,
      adminId: user_details.user_id,
    };
    const res = await PagesIndex.admin_services.PENDING_DEBIT_DECLINE_API(
      apidata,
      token
    );
    if (res?.status) {
      alert(res?.message);
      getPendingRequestList();
    }
  };

  //PENDING DEBIT GETPROFILE API
  const handleGetUserProfile = async (id) => {
    const res = await PagesIndex.admin_services.PENDING_DEBIT_GETPROFILE_API(
      id,
      token
    );
    if (res?.status) {
      setGetUserProfile(res?.data);
    }
  };

  const cardLayouts = [
    {
      size: 12,
      body: (
        <div>
          <div>
            <h4 class="profile-note-title mt-0 mb-4">
              Pending Debit Requests : Bank Account
            </h4>
          </div>
          <PagesIndex.TableWithCustomPeginationNew
            fetchData={fetchData}
            columns={visibleFields}
            // UserFullButtonList={UserFullButtonList}
            showIndex={true}
            Refresh={Refresh}
          />

          {/* <PagesIndex.TableWitCustomPegination
            data={tableData}
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
          /> */}
          <h3 className="ml-3 mb-3 fw-bold">Total Amount {totalAmount}/-</h3>
        </div>
      ),
    },
  ];
  return (
    <>
      <Split_Main_Containt
        title="Pending Request"
        add_button={false}
        cardLayouts={cardLayouts}
      />
      <PagesIndex.ModalComponent
        visible={visible}
        setVisible={setVisible}
        fields={fields}
        formik={formik}
        form_title={selectedRow?.username}
        showBal={getBal?.wallet_balance}
      />
      <ReusableModal
        ModalTitle={
          <h5 class="modal-title fw-bold" id="mySmallModalLabel">
            User Profile
          </h5>
        }
        ModalBody={
          <div>
            <div className="user-profile-head">
              <h3 className="title">Name : {userProfileData1?.username}</h3>
              <p className="walletbalance" id="balance">
                Wallet Balance : {userProfileData1?.wallet_balance}/-
              </p>
            </div>
            <div className="user-data">
              <div className="container">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Bank Name</td>
                      <td>
                        {userProfileData2?.bank_name
                          ? userProfileData2?.bank_name
                          : "null"}
                      </td>
                    </tr>
                    <tr>
                      <td>Account Number</td>
                      <td>
                        {userProfileData2?.account_no
                          ? userProfileData2?.account_no
                          : "null"}
                      </td>
                    </tr>
                    <tr>
                      <td>IFSC Code</td>
                      <td>
                        {userProfileData2?.ifsc_code
                          ? userProfileData2?.ifsc_code
                          : "null"}
                      </td>
                    </tr>
                    <tr>
                      <td>Account Holder Name</td>
                      <td>
                        {userProfileData2?.account_holder_name
                          ? userProfileData2?.account_holder_name
                          : "null"}
                      </td>
                    </tr>
                    <tr>
                      <td>Paytm Number</td>
                      <td>
                        {userProfileData2?.paytm_number
                          ? userProfileData2?.paytm_number
                          : "null"}
                      </td>
                    </tr>
                    <tr>
                      <td>Personal Number</td>
                      <td>
                        {userProfileData1?.mobile
                          ? userProfileData1?.mobile
                          : "null"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }
        setModalState={setModalState}
        ModalState={ModalState}
      />
    </>
  );
};

export default PendingBankRequests;
