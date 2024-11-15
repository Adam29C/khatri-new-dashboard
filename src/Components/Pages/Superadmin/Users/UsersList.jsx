import PagesIndex from "../../PagesIndex";
import DeleteSweetAlert from "../../../Helpers/DeleteSweetAlert";
import TableWitCustomPegination from "../../../Helpers/Table/TableWithCustomPegination";
const UsersList = () => {
  const [loading, setLoading] = PagesIndex.useState(false);
  const [data, setData] = PagesIndex.useState([]);

  const userId = localStorage.getItem("userId");
  let userDeleteReason = true;
  const getList = async () => {
    setLoading(true);
    try {
      const res = await PagesIndex.admin_services.USERS_LIST(userId);

      setData(res?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  PagesIndex.useEffect(() => {
    getList();
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
    },
    {
      name: "User Name",
      selector: (row) => row?.username,
    },
    {
      name: "Mobile No.",
      selector: (row) => row?.mobile,
    },
    {
      name: "Device",
      selector: (row) => row?.deviceName,
    },
    {
      name: "Is Active",
      selector: (row) => (
        <span
          className={`badge fw-bold ${
            row.isActive ? "bg-primary" : "bg-danger"
          }`}
        >
          {row.isActive ? "Active" : "In-Active"}
        </span>
      ),
    },
    {
      name: "Is Block",
      selector: (row) => (
        <PagesIndex.ChangeStatus
          apiRoute={PagesIndex.admin_services.BLOCK_USER}
          req={{ userId: row?._id, isBlock: row?.isBlock }}
          checkboxStatus={row?.isBlock}
          rowData={row}
        />
      ),
    },
    {
      name: "Is Login",
      selector: (row) => (
        <span
          className={`badge fw-bold ${
            row.isLogin ? "bg-primary" : "bg-danger"
          }`}
        >
          {row.isLogin ? "Login" : "Log-Out"}
        </span>
      ),
    },
    {
      name: "Actions",
      selector: (cell, row) => (
        <div style={{ width: "120px" }}>
          <div>
            <PagesIndex.Link
              className="delete-icon"
              href="#"
              onClick={() =>
                DeleteSweetAlert(
                  PagesIndex.admin_services.DELETE_USER,
                  cell?._id,
                  getList,
                  userDeleteReason
                )
              }
            >
              <span data-toggle="tooltip" data-placement="top" title="Delete">
                <i class="ti-trash fs-5 mx-1 "></i>
              </span>
            </PagesIndex.Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <PagesIndex.Main_Containt
      add_button={false}
      route="/admin/user/add"
      title="All Users"
    >
      {/* <PagesIndex.Data_Table
        isLoading={loading}
        columns={columns}
        data={data}
      /> */}

      <TableWitCustomPegination />
      <PagesIndex.Toast />
    </PagesIndex.Main_Containt>
  );
};

export default UsersList;
