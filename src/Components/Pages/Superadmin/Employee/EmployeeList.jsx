import Main_Containt from "../../../Layout/Main/Main_Containt";
import { Get_Year_Only } from "../../../Utils/Common_Date";
import Toggle from "../../../Helpers/Toggle";
import PagesIndex from "../../PagesIndex";
import DeleteSweetAlert from "../../../Helpers/DeleteSweetAlert";


const EmployeeList = () => {
  const [loading, setLoading] = PagesIndex.useState(false);
  const [data, setData] = PagesIndex.useState([]);
  const userId = localStorage.getItem("userId");
  let userDeleteReason = false
  const getList = async () => {
    const res = await PagesIndex.admin_services.EMPLOYEE_GET_LIST_API(userId);
    setData(res?.data?.details);
  };

  PagesIndex.useEffect(() => {
    getList();
  }, []);

  const columns = [
    {
      name: "Employee Name",
      selector: (row) => row.employeeName,
    },

    {
      name: "Designation",
      selector: (row) => row.designation,
    },

    {
      name: "User Name",
      selector: (row) => row.username,
    },

    {
      name: "Created At",
      selector: (row) => Get_Year_Only(row.createdAt),
    },
    {
      name: "Block",
      selector: (row) => (
        <PagesIndex.ChangeStatus
          apiRoute={PagesIndex.admin_services.BLOCK_EMPLOYEE_API}
          req={{ empId: row._id, isBlock: row.isBlock }}
          checkboxStatus={row.isBlock}
          rowData={row}
        />
      ),
    },
    {
      name: "Actions",
      selector: (cell, row) => (
        <div style={{ width: "120px" }}>
          <div>
            <PagesIndex.Link className="edit-icon" to={"/admin/employee/edit"} state={cell}>
              <span data-toggle="tooltip" data-placement="top" title="Edit">
                <i class="ti-marker-alt fs-5 mx-1 "></i>
              </span>
            </PagesIndex.Link>

            <PagesIndex.Link  className="delete-icon">
              <span
                data-toggle="tooltip"
                data-placement="top"
                title="Delete"
                onClick={() =>
                  DeleteSweetAlert(
                    PagesIndex.admin_services.DELETE_EMPLOYEE,
                    cell?._id,
                    getList,
                    userDeleteReason
                  )
                }
              >
                <i class="ti-trash fs-5 mx-1 "></i>
              </span>
            </PagesIndex.Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Main_Containt
        add_button={false}
        // route="/admin/employee/add"
        btnTitle="Add"
        title="Employee List "
      >
        <PagesIndex.Data_Table
          isLoading={loading}
          columns={columns}
          data={data}
        />
             <PagesIndex.Toast />
      </Main_Containt>
    </div>
  );
};

export default EmployeeList;
