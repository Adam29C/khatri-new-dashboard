// import PagesIndex from "../../PagesIndex";
// import DeleteSweetAlert from "../../../Helpers/DeleteSweetAlert";
// import TableWitCustomPegination from "../../../Helpers/Table/TableWithCustomPegination";

// import ReusableModal from "../../../Helpers/Modal/ReusableModal";
// import { PROFILE_GET_API } from "../../../Services/CommonServices";

// // const UsersList = () => {
// //   const [loading, setLoading] = PagesIndex.useState(false);
// //   const [data, setData] = PagesIndex.useState([]);

// //   const userId = localStorage.getItem("userId");
// //   let userDeleteReason = true;
// //   const getList = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await PagesIndex.admin_services.USERS_LIST(userId);

// //       setData(res?.data);
// //     } catch (error) {
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   PagesIndex.useEffect(() => {
// //     getList();
// //   }, []);

// //   const columns = [
// //     {
// //       name: "Name",
// //       selector: (row) => row?.name,
// //     },
// //     {
// //       name: "User Name",
// //       selector: (row) => row?.username,
// //     },
// //     {
// //       name: "Mobile No.",
// //       selector: (row) => row?.mobile,
// //     },
// //     {
// //       name: "Device",
// //       selector: (row) => row?.deviceName,
// //     },
// //     {
// //       name: "Is Active",
// //       selector: (row) => (
// //         <span
// //           className={`badge fw-bold ${
// //             row.isActive ? "bg-primary" : "bg-danger"
// //           }`}
// //         >
// //           {row.isActive ? "Active" : "In-Active"}
// //         </span>
// //       ),
// //     },
// //     {
// //       name: "Is Block",
// //       selector: (row) => (
// //         <PagesIndex.ChangeStatus
// //           apiRoute={PagesIndex.admin_services.BLOCK_USER}
// //           req={{ userId: row?._id, isBlock: row?.isBlock }}
// //           checkboxStatus={row?.isBlock}
// //           rowData={row}
// //         />
// //       ),
// //     },
// //     {
// //       name: "Is Login",
// //       selector: (row) => (
// //         <span
// //           className={`badge fw-bold ${
// //             row.isLogin ? "bg-primary" : "bg-danger"
// //           }`}
// //         >
// //           {row.isLogin ? "Login" : "Log-Out"}
// //         </span>
// //       ),
// //     },
// //     {
// //       name: "Actions",
// //       selector: (cell, row) => (
// //         <div style={{ width: "120px" }}>
// //           <div>
// //             <PagesIndex.Link
// //               className="delete-icon"
// //               href="#"
// //               onClick={() =>
// //                 DeleteSweetAlert(
// //                   PagesIndex.admin_services.DELETE_USER,
// //                   cell?._id,
// //                   getList,
// //                   userDeleteReason
// //                 )
// //               }
// //             >
// //               <span data-toggle="tooltip" data-placement="top" title="Delete">
// //                 <i class="ti-trash fs-5 mx-1 "></i>
// //               </span>
// //             </PagesIndex.Link>
// //           </div>
// //         </div>
// //       ),
// //     },
// //   ];

// //   return (
// //     <PagesIndex.Main_Containt
// //       add_button={false}
// //       route="/admin/user/add"
// //       title="All Users"
// //     >
// //       <PagesIndex.Data_Table
// //         isLoading={loading}
// //         columns={columns}
// //         data={data}
// //       />

// //       {/* <TableWitCustomPegination /> */}
// //       <PagesIndex.Toast />
// //     </PagesIndex.Main_Containt>
// //   );
// // };

// // export default UsersList;

// const UsersList = () => {
//   const token = localStorage.getItem("token");
//   let { user_id, role } = JSON.parse(localStorage.getItem("userdetails"));

//   const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
//   const [TableData, setTableData] = PagesIndex.useState([]);
//   const [ModalState, setModalState] = PagesIndex.useState(false);
//   const [GetUserProfile, seGetUserProfile] = PagesIndex.useState([]);

//   const [loading, setLoading] = PagesIndex.useState(false);

//   const visibleFields = [
//     "id",
//     "name",
//     "username",
//     "mobile",
//     "deviceName",
//     "deviceId",
//     "CreatedAt",
//     "Block",
//     "Profile",
//     "Delete",
//   ];

//   // let userDeleteReason = true;

//   const getList = async () => {
//     const payload = {
//       page: 1,
//       limit: 10,
//       searchQuery: SearchInTable,
//     };

//     const res = await PagesIndex.admin_services.USERS_LIST(payload, token);

//     setTableData(res?.data);
//   };

//   PagesIndex.useEffect(() => {
//     getList();
//   }, []);

//   // USER PROFILE
//   const getProfile = async (row) => {
//     const res = await PagesIndex.common_services.PROFILE_GET_API(row.id, token);
//     console.log("resres", res);

//     if (res.status) {
//       setModalState(true);

//       seGetUserProfile(res.userData);
//     } else {
//       setModalState(false);
//       PagesIndex.toast.error(res.response.data.message);
//     }
//   };

//   const UserFullButtonList = [
//     {
//       id: 0,
//       buttonName: "Block",
//       buttonColor: "danger",
//       route: "",
//       Conditions: () => setModalState(true),
//       Visiblity: true,
//       type: "button",
//     },
//     {
//       id: 1,
//       buttonName: "Profile",
//       buttonColor: "info",
//       route: "test",
//       Conditions: (row) => {
//         getProfile(row);
//       },
//       Visiblity: false,
//       type: "button",
//     },
//     {
//       id: 2,
//       buttonName: "Delete",
//       buttonColor: "danger",
//       Conditions: () => setModalState(true),

//       Conditions: "",
//       Visiblity: false,
//       type: "button",
//     },
//   ];

//   // USER PROFILE

//   return (
//     <div>
//       <PagesIndex.Main_Containt
//         add_button={false}
//         route="/admin/user/add"
//         title="All Users"
//       >
//         <TableWitCustomPegination
//           data={TableData}
//           initialRowsPerPage={5}
//           SearchInTable={SearchInTable}
//           visibleFields={visibleFields}
//           UserFullButtonList={UserFullButtonList}
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
//         {/* <PagesIndex.Toast /> */}

// {/* -  MODAL FOR BLOCK USERS */}
//         <ReusableModal
//           ModalTitle={`User Profile : ${
//             GetUserProfile && GetUserProfile.username
//           }`}
//           ModalBody={
//             <div>
//               <table class="table table-bordered table-responsive">
//                 <tbody>
//                   <tr>
//                     <td scope="col">Address</td>
//                     <td scope="col">
//                       {GetUserProfile && GetUserProfile.address
//                         ? GetUserProfile && GetUserProfile.address
//                         : "--"}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td scope="col">City</td>
//                     <td scope="col">
//                       {GetUserProfile && GetUserProfile.city
//                         ? GetUserProfile && GetUserProfile.city
//                         : "--"}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td scope="col">Acc Holder Name</td>
//                     <td scope="col">
//                       {GetUserProfile && GetUserProfile.account_holder_name
//                         ? GetUserProfile && GetUserProfile.account_holder_name
//                         : "--"}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td scope="col">Bank Name</td>
//                     <td scope="col">
//                       {GetUserProfile && GetUserProfile.bank_name
//                         ? GetUserProfile && GetUserProfile.bank_name
//                         : "--"}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td scope="col">Pincode</td>
//                     <td scope="col">
//                       {GetUserProfile && GetUserProfile.pincode
//                         ? GetUserProfile && GetUserProfile.pincode
//                         : "--"}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td scope="col">IFSC</td>
//                     <td scope="col">
//                       {GetUserProfile && GetUserProfile.ifsc_code
//                         ? GetUserProfile && GetUserProfile.ifsc_code
//                         : "--"}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td scope="col">Paytm Number</td>
//                     <td scope="col">
//                       {GetUserProfile && GetUserProfile.paytm_number
//                         ? GetUserProfile && GetUserProfile.paytm_number
//                         : "--"}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           }
//           setModalState={setModalState}
//           ModalState={ModalState}
//         />

//         <ReusableModal
//           ModalTitle={`User Profile : ${
//             GetUserProfile && GetUserProfile.username
//           }`}
//           ModalBody={<div></div>}
//           setModalState={setModalState}
//           ModalState={ModalState}
//         />
//         <PagesIndex.Toast />
//       </PagesIndex.Main_Containt>
//     </div>
//   );
// };

// export default UsersList;

import PagesIndex from "../../PagesIndex";
import DeleteSweetAlert from "../../../Helpers/DeleteSweetAlert";
import TableWitCustomPegination from "../../../Helpers/Table/TableWithCustomPegination";
import Formikform from "../../../Helpers/FormikForm/Form";

import ReusableModal from "../../../Helpers/Modal/ReusableModal";
import { PROFILE_GET_API } from "../../../Services/CommonServices";
import { useFormik } from "formik";

const UsersList = () => {
  const token = localStorage.getItem("token");
  let { user_id, role } = JSON.parse(localStorage.getItem("userdetails"));

  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [TableData, setTableData] = PagesIndex.useState([]);

  const [ModalStateUserProfile, setModalStateUserProfile] =
    PagesIndex.useState(false);
  const [GetRowData, setGetRowData] = PagesIndex.useState("");
  const [GetBannedData, setGetBannedData] = PagesIndex.useState("");
  const [Refresh, setRefresh] = PagesIndex.useState(false);

  const [ModalStateForRemoveAndBlock, setModalStateForRemoveAndBlock] =
    PagesIndex.useState(false);

  const [ManageModalStatus, setManageModalStatus] = PagesIndex.useState(false);
  const [GetUserProfile, seGetUserProfile] = PagesIndex.useState([]);

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

    const res = await PagesIndex.admin_services.USERS_LIST_API(payload, token);

    setTableData(res?.data);
  };

  PagesIndex.useEffect(() => {
    getList();
  }, [Refresh]);

  // USER PROFILE
  const getProfile = async (row) => {
    const res = await PagesIndex.common_services.PROFILE_GET_API(row.id, token);

    if (res.status) {
      setModalStateUserProfile(true);
      seGetUserProfile(res.userData);
    } else {
      setModalStateUserProfile(false);
      PagesIndex.toast.error(res.response.data.message);
    }
  };

  const BlockUserAndRemoveUser = async (row, buttonStatus) => {
    setGetRowData(row);

    if (buttonStatus === 1) {
      setManageModalStatus(buttonStatus);
      setModalStateForRemoveAndBlock(!ModalStateForRemoveAndBlock);
    } else if (buttonStatus === 2) {
      setManageModalStatus(buttonStatus);
      setModalStateForRemoveAndBlock(!ModalStateForRemoveAndBlock);
    } else {
      return "";
    }
  };

  const UserFullButtonList = [
    {
      id: 0,
      buttonName: "Block",
      buttonColor: "danger",
      route: "",
      Conditions: (row) => {
        setGetBannedData(row.banned);
        BlockUserAndRemoveUser(row, 1);
      },
      Visiblity: true,
      type: "button",
    },
    {
      id: 1,
      buttonName: "Profile",
      buttonColor: "info",
      route: "test",
      Conditions: (row) => {
        getProfile(row);
      },
      Visiblity: false,
      type: "button",
    },
    {
      id: 2,
      buttonName: "Delete",
      buttonColor: "danger",
      Conditions: (row) => {
        BlockUserAndRemoveUser(row, 2);
      },

      Visiblity: false,
      type: "button",
    },
  ];

  const getListfilter = () => {
    if (TableData) {
      // Update the buttonName dynamically based on the `banned` status
      TableData.forEach((item) => {
        const button = UserFullButtonList.find((btn) => btn.id === 0);
        if (button) {
          button.buttonName = item.banned ? "Un-Block" : "Block";
        }
      });
    }
  };
  console.log("Updated UserFullButtonList:", UserFullButtonList);

  PagesIndex.useEffect(() => {
    getListfilter();
  }, [TableData]);

  // USER PROFILE

  const formik = useFormik({
    initialValues: {
      blockReason: "",
    },

    validate: (values) => {
      const errors = {};
      return errors;
    },
    onSubmit: async (values) => {
      if (ManageModalStatus === 1) {
        const req = {
          id: GetRowData.id,
          blockStatus: GetRowData.banned ? true : false,
          blockReason: values.blockReason,
        };

        const res = await PagesIndex.common_services.BLOCK_USER_API(req, token);
      } else if (ManageModalStatus === 2) {
        const req = {
          id: GetRowData.id,
          blockReason: values.blockReason,
        };

        const res = await PagesIndex.common_services.DELETED_USERS_API(
          req,
          token
        );

        if (res.status) {
          setRefresh(!Refresh);
          PagesIndex.toast.success(res.message);
          setModalStateForRemoveAndBlock(!ModalStateForRemoveAndBlock);
        } else {
          setModalStateForRemoveAndBlock(!ModalStateForRemoveAndBlock);
          setRefresh(!Refresh);
          PagesIndex.toast.error(res.response.data.message);
        }

        console.log("res1231", res);

        // PagesIndex.toast.error(res.response.data.message);
        // if()
      } else {
        return "";
      }
    },
  });

  const fields = [
    {
      name: "blockReason",
      label: "Enter  Message",
      type: "msgbox",
      label_size: 12,
      col_size: 12,
      row_size: 6,
    },
  ];

  return (
    <div>
      <PagesIndex.Main_Containt
        add_button={false}
        route="/admin/user/add"
        title="All Users"
      >
        <TableWitCustomPegination
          data={TableData}
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
        {/* <PagesIndex.Toast /> */}

        {/* -  MODAL FOR BLOCK USERS */}
        <ReusableModal
          ModalTitle={`User Profile : ${
            GetUserProfile && GetUserProfile.username
          }`}
          ModalBody={
            <div>
              <table class="table table-bordered table-responsive">
                <tbody>
                  <tr>
                    <td scope="col">Address</td>
                    <td scope="col">
                      {GetUserProfile && GetUserProfile.address
                        ? GetUserProfile && GetUserProfile.address
                        : "--"}
                    </td>
                  </tr>
                  <tr>
                    <td scope="col">City</td>
                    <td scope="col">
                      {GetUserProfile && GetUserProfile.city
                        ? GetUserProfile && GetUserProfile.city
                        : "--"}
                    </td>
                  </tr>
                  <tr>
                    <td scope="col">Acc Holder Name</td>
                    <td scope="col">
                      {GetUserProfile && GetUserProfile.account_holder_name
                        ? GetUserProfile && GetUserProfile.account_holder_name
                        : "--"}
                    </td>
                  </tr>
                  <tr>
                    <td scope="col">Bank Name</td>
                    <td scope="col">
                      {GetUserProfile && GetUserProfile.bank_name
                        ? GetUserProfile && GetUserProfile.bank_name
                        : "--"}
                    </td>
                  </tr>
                  <tr>
                    <td scope="col">Pincode</td>
                    <td scope="col">
                      {GetUserProfile && GetUserProfile.pincode
                        ? GetUserProfile && GetUserProfile.pincode
                        : "--"}
                    </td>
                  </tr>
                  <tr>
                    <td scope="col">IFSC</td>
                    <td scope="col">
                      {GetUserProfile && GetUserProfile.ifsc_code
                        ? GetUserProfile && GetUserProfile.ifsc_code
                        : "--"}
                    </td>
                  </tr>
                  <tr>
                    <td scope="col">Paytm Number</td>
                    <td scope="col">
                      {GetUserProfile && GetUserProfile.paytm_number
                        ? GetUserProfile && GetUserProfile.paytm_number
                        : "--"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
          setModalState={setModalStateUserProfile}
          ModalState={ModalStateUserProfile}
        />

        <ReusableModal
          ModalTitle={
            <h5 class="modal-title" id="mySmallModalLabel">
              Reason For
              {ManageModalStatus && ManageModalStatus === 1
                ? "Block"
                : "Delete"}
              The User
            </h5>
          }
          ModalBody={
            <div>
              {/* <h6> */}
              <PagesIndex.Formikform
                fieldtype={fields.filter((field) => !field.showWhen)}
                formik={formik}
                btn_name={"Submit"}
                button_Size={"w-100"}
                show_submit={true}
              />

              {/* {ManageModalStatus && ManageModalStatus === 1
                  ? "Block"
                  : "Delete"}{" "}
                Reason
              </h6> */}
              {/* <div class="input-group">
                <textarea
                  class="form-control"
                  aria-label="With textarea"
                  rows="6"
                  cols="40"
                ></textarea>
              </div> */}
            </div>
          }
          setModalState={setModalStateForRemoveAndBlock}
          ModalState={ModalStateForRemoveAndBlock}
        />
        <PagesIndex.Toast />
      </PagesIndex.Main_Containt>
    </div>
  );
};

export default UsersList;
