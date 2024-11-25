import { useState } from "react";
import PagesIndex from "../../PagesIndex";

const EmployeeList = () => {
  //get token and user_id in localstorage
  const token = localStorage.getItem("token");

  //navigate 
  const navigate = PagesIndex.useNavigate()
  
  //all satte
  const [data, setData] = PagesIndex.useState([]);
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [visible, setVisible] = PagesIndex.useState(false);
const [adminId,setAdminId]=useState()
  //dynamic header keys for datatable
  const visibleFields = ["id", "username", "name", "username", "loginStatus"];

  //get employee data list
  const getList = async () => {
    const payload = {
      page: 1,
      limit: 10,
      searchQuery: SearchInTable,
    };
    const res = await PagesIndex.admin_services.EMPLOYEE_GET_LIST_API(
      payload,
      token
    );
    setData(res?.data);
  };

  PagesIndex.useEffect(() => {
    getList();
  }, []);


  //handle change password formik form
  const formik = PagesIndex.useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.password) {
        errors.password = PagesIndex.valid_err.PASSWORD_ERROR;
      } else if (!PagesIndex.Password_Rejex(values.password)) {
        errors.password = PagesIndex.valid_err.PASSWORD__LENGTH_ERROR;
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = PagesIndex.valid_err.CONFIRM_ERROR;
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword =
          PagesIndex.valid_err.CONFIRM_AND_NEW_PASSWORD_ERROR;
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        let data = {
          adminId: adminId,
          password: values.password,
        };
        const res = await PagesIndex.admin_services.EMPLOYEE_CHANGE_PASSWORD_API(
          data,token 
        );

        if (res?.status) {
          PagesIndex.toast.success(res?.message);
          setVisible(false);
        } else {
          PagesIndex.toast.error(res.message);
          setVisible(false);
        }
      } catch (error) {
        PagesIndex.toast.error(error);
      }
    },
  });

  const fields = [
    {
      name: "password",
      label: "Password",
      type: "password",
      label_size: 12,
      col_size: 12,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      label_size: 12,
      col_size: 12,
    },
  ];

  //handle add fn
  const handleAdd = (row)=>{
    setAdminId(row?._id)
    formik.resetForm({
      values: {
        password: "",
        confirmPassword: "",
       
      },
    });

    setVisible(true);
  }


    //handle block and unblock status function
    const handleStatusUpdate = async (row) => {
      console.log(row)
      try {
        let apidata = {
          id: row._id,
          status: !row.disabled,
        };
  
        const response = await PagesIndex.admin_services.BLOCK_EMPLOYEE_API(
            apidata,
            token
          );
  
        if (response?.status) {
          PagesIndex.toast.success(response.message);
          getList();
        }
      } catch (error) {
        PagesIndex.toast.error(error);
      }
    };
  
    //delete fund mode list start
    const handleDelete = async (row) => {
     
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Employee?"
      );
      if (!confirmDelete) return;
  
      try {
        const apidata = {
          id: row?._id,
        };
  
        const res = await PagesIndex.admin_services.DELETE_EMPLOYEE(
          apidata,
          token
        );
  
        if (res.status) {
          getList();
          alert(res?.message);
        }
      } catch (error) {}
    };

  const handleActionBtn = (row, buttonStatus) => {
    switch (buttonStatus) {
      case 0:
        handleAdd(row)

        break;
      case 1:
        handleStatusUpdate(row)
        break;
      case 2:
        navigate("edit",{state:{row}})
        break;
      case 3:
        handleDelete(row)
        break;
        default:
         break;
    }
  };

  //actions button
  const UserFullButtonList = [
    {
      id: 0,
      buttonName: "Change Password",
      buttonColor: "dark",
      Conditions: (row) => {
        handleActionBtn(row, 0);
      },
      Visiblity: true,
      type: "button",
    },
    {
      id: 1,
      buttonName: "Block",
      buttonColor: "danger",
      Conditions: (row) => {
        handleActionBtn(row, 1);
      },
      Visiblity: false,
      type: "button",
    },
    {
      id: 2,
      buttonName: "Edit Employee",
      buttonColor: "info",
      route: "employee/edit",
      Conditions: (row) => {
        handleActionBtn(row, 2);
      },
      Visiblity: false,
      type: "button",
    },
    {
      id: 3,
      buttonName: "Delete",
      buttonColor: "danger",
      Conditions: (row) => {
        handleActionBtn(row, 3);
      },

      Visiblity: false,
      type: "button",
    },
  ];

  return (
    <div>
      <PagesIndex.Main_Containt add_button={false} title="Employee List ">
        <PagesIndex.TableWitCustomPegination
          data={data}
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
      <PagesIndex.ModalComponent
            visible={visible}
            setVisible={setVisible}
            fields={fields}
            form_title="Change Password"
            formik={formik}
          />
          <PagesIndex.Toast />
      </PagesIndex.Main_Containt>
    </div>
  );
};

export default EmployeeList;
