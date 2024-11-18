import PagesIndex from "../../PagesIndex";
import DeleteSweetAlert from "../../../Helpers/DeleteSweetAlert";
import TableWitCustomPegination from "../../../Helpers/Table/TableWithCustomPegination";
// const UsersList = () => {
//   const [loading, setLoading] = PagesIndex.useState(false);
//   const [data, setData] = PagesIndex.useState([]);

//   const userId = localStorage.getItem("userId");
//   let userDeleteReason = true;
//   const getList = async () => {
//     setLoading(true);
//     try {
//       const res = await PagesIndex.admin_services.USERS_LIST(userId);

//       setData(res?.data);
//     } catch (error) {
//     } finally {
//       setLoading(false);
//     }
//   };

//   PagesIndex.useEffect(() => {
//     getList();
//   }, []);

//   const columns = [
//     {
//       name: "Name",
//       selector: (row) => row?.name,
//     },
//     {
//       name: "User Name",
//       selector: (row) => row?.username,
//     },
//     {
//       name: "Mobile No.",
//       selector: (row) => row?.mobile,
//     },
//     {
//       name: "Device",
//       selector: (row) => row?.deviceName,
//     },
//     {
//       name: "Is Active",
//       selector: (row) => (
//         <span
//           className={`badge fw-bold ${
//             row.isActive ? "bg-primary" : "bg-danger"
//           }`}
//         >
//           {row.isActive ? "Active" : "In-Active"}
//         </span>
//       ),
//     },
//     {
//       name: "Is Block",
//       selector: (row) => (
//         <PagesIndex.ChangeStatus
//           apiRoute={PagesIndex.admin_services.BLOCK_USER}
//           req={{ userId: row?._id, isBlock: row?.isBlock }}
//           checkboxStatus={row?.isBlock}
//           rowData={row}
//         />
//       ),
//     },
//     {
//       name: "Is Login",
//       selector: (row) => (
//         <span
//           className={`badge fw-bold ${
//             row.isLogin ? "bg-primary" : "bg-danger"
//           }`}
//         >
//           {row.isLogin ? "Login" : "Log-Out"}
//         </span>
//       ),
//     },
//     {
//       name: "Actions",
//       selector: (cell, row) => (
//         <div style={{ width: "120px" }}>
//           <div>
//             <PagesIndex.Link
//               className="delete-icon"
//               href="#"
//               onClick={() =>
//                 DeleteSweetAlert(
//                   PagesIndex.admin_services.DELETE_USER,
//                   cell?._id,
//                   getList,
//                   userDeleteReason
//                 )
//               }
//             >
//               <span data-toggle="tooltip" data-placement="top" title="Delete">
//                 <i class="ti-trash fs-5 mx-1 "></i>
//               </span>
//             </PagesIndex.Link>
//           </div>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <PagesIndex.Main_Containt
//       add_button={false}
//       route="/admin/user/add"
//       title="All Users"
//     >
//       <PagesIndex.Data_Table
//         isLoading={loading}
//         columns={columns}
//         data={data}
//       />

//       {/* <TableWitCustomPegination /> */}
//       <PagesIndex.Toast />
//     </PagesIndex.Main_Containt>
//   );
// };

// export default UsersList;

const UsersList = () => {
  const token = localStorage.getItem("token");

  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [TableData, setTableData] = PagesIndex.useState([]);

  const [loading, setLoading] = PagesIndex.useState(false);
  const userId = localStorage.getItem("userId");

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

  // let userDeleteReason = true;

  const getList = async () => {
    const payload = {
      page: 1,
      limit: 10,
      searchQuery: SearchInTable,
    };

    const res = await PagesIndex.admin_services.USERS_LIST(payload, token);

    setTableData(res?.data);
  };

  PagesIndex.useEffect(() => {
    getList();
  }, []);

  const UserFullButtonList = [
    {
      id: 0,
      buttonName: "Profile",
      buttonColor: "info",
      route: "",
      Conditions: "",
      Visiblity: true,
      type: "button",
    },
    {
      id: 1,
      buttonName: "Edit",
      buttonColor: "success",
      route: "test",
      Conditions: "",
      Visiblity: false,
      type: "button",
    },
    {
      id: 2,
      buttonName: "Delete",
      buttonColor: "danger",
      route: "users/deleted",
      Conditions: "",
      Visiblity: false,
      type: "button",
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
      </PagesIndex.Main_Containt>
    </div>
  );
};

export default UsersList;
