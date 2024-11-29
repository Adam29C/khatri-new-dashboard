import React from "react";
import PagesIndex from "../../PagesIndex";
import ReusableModal from "../../../Helpers/Modal/ModalComponent_main";

const ViewWallet = () => {
  const token = localStorage.getItem("token");

  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [TableData, setTableData] = PagesIndex.useState([]);

  const [ModalStateHistory, setModalStateHistory] = PagesIndex.useState(false);
  const [ModalStateHistoryTable, setModalStateHistoryTable] =
    PagesIndex.useState([]);
  const [ModalStateHistoryUserDetails, setModalStateHistoryUserDetails] =
    PagesIndex.useState("");
  const [rowStatus, setRowStatus] = PagesIndex.useState(0);

  const visibleFields = [
    "id",
    "username",
    "name",
    "mobile",
    "wallet_bal_updated_at",
  ];

  const visibleFields1 = [
    "id",
    "Previous_Amount",
    "Transaction_Amount",
    "Current_Amount",
    "Description",
    "Transaction_Date",
    "Transaction_Status",
    "Added_by",
  ];

  const getHistory = async (row, number) => {
    setRowStatus(number);
    setModalStateHistoryUserDetails(row.username);
    setModalStateHistory(true);

    if (number === 1) {
      const payload = {
        id: row._id,
        page: 1,
        limit: 10,
        search: SearchInTable,
      };
      const res = await PagesIndex.admin_services.WALLET_LIST_CREDIT_API(
        payload,
        token
      );

      setModalStateHistoryTable(res.data);
    } else if (number === 2) {
      const payload = {
        id: row._id,
        page: 1,
        limit: 10,
        search: SearchInTable,
      };

      const res = await PagesIndex.admin_services.WALLET_LIST_HISTORY_API(
        payload,
        token
      );
      setModalStateHistoryTable(res.data);
    } else if (number === 3) {
    }
  };

  const UserFullButtonList = [
    {
      id: 0,
      buttonName: "C/D Histoy",
      buttonColor: "info",
      route: "",
      Conditions: (row) => {
        // setGetBannedData(row.banned);
        getHistory(row, 1);
      },
      Visiblity: true,
      type: "button",
    },
    {
      id: 1,
      buttonName: "Edit",
      buttonColor: "info",
      route: "test",
      Conditions: (row) => {
        // getProfile(row);
      },
      Visiblity: false,
      type: "button",
    },
    {
      id: 2,
      buttonName: "History",
      buttonColor: "info",
      Conditions: (row) => {
        getHistory(row, 2);
      },

      Visiblity: false,
      type: "button",
    },
    {
      id: 2,
      buttonName: "profile",
      buttonColor: "info",
      Conditions: (row) => {
        getHistory(row, 3);

        // BlockUserAndRemoveUser(row, 2);
      },

      Visiblity: false,
      type: "button",
    },
  ];

  const getList = async () => {
    const payload = {
      page: 1,
      perPage: 10,
      search: SearchInTable,
    };

    const res = await PagesIndex.admin_services.GET_WALLET_LIST(payload, token);

    setTableData(res?.records);
  };

  PagesIndex.useEffect(() => {
    getList();
  }, []);


  return (
    <PagesIndex.Main_Containt
      add_button={false}
      // route="/admin/user/add"
      title="View Wallet"
    >
      <PagesIndex.TableWitCustomPegination
        data={TableData}
        // columns={columns}
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

      <ReusableModal
        show={ModalStateHistory}
        onClose={setModalStateHistory}
        title={`Transaction History of : ${ModalStateHistoryUserDetails} `}
        size={"lg"}
        body={
          <>
            {rowStatus === 1 || 2 ? (
              <PagesIndex.TableWitCustomPegination
                data={ModalStateHistoryTable}
                // columns={columns}
                initialRowsPerPage={5}
                SearchInTable={SearchInTable}
                visibleFields={visibleFields1}
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
            ) : (
              <div className="main">
                <div className="profile-content">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6 ml-auto mr-auto">
                        <div className="profile">
                          {/* <div class="avatar">
											<img
                      width="110"
												height="150"
												src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU0NjQzOTk4OTQ4OTkyMzQy/ansel-elgort-poses-for-a-portrait-during-the-baby-driver-premiere-2017-sxsw-conference-and-festivals-on-march-11-2017-in-austin-texas-photo-by-matt-winkelmeyer_getty-imagesfor-sxsw-square.jpg"
												alt="Circle Image"
												class="img-raised rounded-circle img-fluid"
											/>
                      </div> */}
                          <div className="name">
                            <h3 className="title" id="username">
                              User Name : srinivas yadav{" "}
                            </h3>
                            <p className="walletbalance" id="balance">
                              Wallet Balance : 20295/-
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="user-data">
                  <div className="container">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>Bank Name</td>
                          <td id="bankName">
                            Canara Bank SANTHEBENNUR SANTHEBENNUR
                          </td>
                        </tr>
                        <tr>
                          <td>Account Number</td>
                          <td id="accNo">0579119012562</td>
                        </tr>
                        <tr>
                          <td>IFSC Code</td>
                          <td id="ifsc">CNRB0000579</td>
                        </tr>
                        <tr>
                          <td>Account Holder Name</td>
                          <td id="accHolder">srinivas t</td>
                        </tr>
                        <tr>
                          <td>Paytm Number</td>
                          <td id="paytm" />
                        </tr>
                        <tr>
                          <td>Personal Number</td>
                          <td id="regular">+919591957918</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        }
        primaryButtonText="Save Changes"
        secondaryButtonText="Close"
        showFooter={false}
        // onPrimaryAction={handleSave}
      />
    </PagesIndex.Main_Containt>
  );
};

export default ViewWallet;
