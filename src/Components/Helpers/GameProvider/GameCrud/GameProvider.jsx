import PagesIndex from "../../../Pages/PagesIndex";
import { Get_Year_Only } from "../../../Utils/Common_Date";
import Toggle from "../../Toggle";
import DeleteSweetAlert from "../../DeleteSweetAlert";
import { Games_Provider_List } from "../../../Redux/slice/CommonSlice";
import { useState } from "react";

const GameProvider = ({ data, path, title, gametype }) => {
    const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
    const [TableData, setTableData] = PagesIndex.useState([]);
    const [modalType, setModalType] = useState(""); // Tracks if Add or Edit
    const [selectedRow, setSelectedRow] = useState(null); // For Edit functionality
    const [visible, setVisible] = useState(false);
  const dispatch = PagesIndex.useDispatch();

  const { gameProviders } = PagesIndex.useSelector(
    (state) => state.CommonSlice
  );
  const getGameProviderList = () => {
    dispatch(Games_Provider_List());
  };

  PagesIndex.useEffect(() => {
    getGameProviderList();
  }, []);

  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this game?");
    if (!confirmDelete) return;

    try {
     const res =  await PagesIndex.admin_services.GAME_PROVIDER_DELETE_API(id)
     if(res.statusCode === 200){
      alert(res?.message);
      getGameProviderList();
     }
  
      dispatch(Games_Provider_List()); 
    } catch (error) {
console.log(error)
    }
  };


    // Handle Edit Button
    const handleEdit = (row) => {
      setModalType("Edit");
      setSelectedRow(row);
      formik.resetForm({
        values: {
          gamename: row.providerName,
          result: row.providerResult,
          mobile: row.mobile,
          activeStatus:row.activeStatus
        },
      });
      setVisible(true);
    };
  
    // Handle Add Button
    const handleAdd = () => {
      setModalType("Add");
      setSelectedRow(null);
      formik.resetForm({
        values: {
          gamename:"",
          result: "",
          mobile: "",
          activeStatus:""
        },
      });
      setVisible(true);
    };

   
    // Formik Configuration
    const formik = PagesIndex.useFormik({
      enableReinitialize: true,
 
      initialValues: {
        gamename: selectedRow ? selectedRow.providerName : "",
        result: selectedRow ? selectedRow.providerResult : "",
        mobile: selectedRow ? selectedRow.mobile : "",
        activeStatus: selectedRow ? selectedRow.activeStatus : null,
      },
      validate: (values) => {
        const errors = {};
  
        if (!values.gamename) {
          errors.gamename = PagesIndex.valid_err.PROVIDER_NAME_ERROR;
        }
  
        if (!values.result) {
          errors.result = PagesIndex.valid_err.PROVIDER_RESULT_ERROR;
        }
  
        if (!values.mobile) {
          errors.mobile = PagesIndex.valid_err.CONTACT_ERROR;
        }
  
        return errors;
      },
  
      onSubmit: async (values) => {
      
        try {
          const payload = {
            gamename: values.gamename,
            result: values.result,
            mobile: values.mobile.toString(),
            activeStatus: values.activeStatus === "true",
            ...(modalType === "Edit" && { gameId: selectedRow._id }),
          
          };
  
          const res =
            modalType === "Edit"
              ? await PagesIndex.admin_services.GAME_PROVIDER_UPDATE_API(payload)
              : await PagesIndex.admin_services.GAME_PROVIDER_ADD_API(payload);
              console.log(res,"100")
          if (res.status) {
            PagesIndex.toast.success(res?.message);
            getGameProviderList();
            setVisible(false); 
          } else {
            PagesIndex.toast.error(res?.response?.data?.message);
          }
        } catch (error) {
          PagesIndex.toast.error(error?.response?.data?.message);
        }
      },
    });
  

    const fields = [
      {
        name: "gamename",
        label: "Game Name",
        type: "text",
        label_size: 12,
        col_size: 12,
      },
      {
        name: "result",
        label: "Result",
        type: "text",
        label_size: 12,
        col_size: 12,
      },
      {
        name: "mobile",
        label: "Mobile",
        type: "number",
        label_size: 12,
        col_size:12,
      },
  
      {
        name: "activeStatus",
        label: "Disable Provider",
        type: "select",
        title_size: 12,
        col_size: 12,
        options: [
          {
            label: "Active",
            value: true,
          },
          {
            label: "In-Active",
            value: false,
          },
        ],
      },
    ];

  const visibleFields = [
    "id",
    "providerName",
    "providerResult",
    "activeStatus",
    "modifiedAt",
  
  ];


  const UserFullButtonList = [

    {
      id: 0,
      buttonName: "Edit",
      buttonColor: "",
      route: "",
      Conditions: "",
      Visiblity: true,
      type: "button",
      onClick: handleEdit,
    },
    {

      
      id: 1,
      buttonName: "Delete",
      buttonColor: "danger",
      route: "",
      Conditions: "",
      Visiblity: true,
      type: "button",
      onClick: handleDelete,
    },
  ];


  return (
    <>
      <div> 
        <PagesIndex.Main_Containt
         setVisible={setVisible}
         add_button={false}
          btn_modal={true}
          title={title}
          btnTitle="Add"
          handleAdd={handleAdd}  
        >
          <PagesIndex.TableWitCustomPegination
          data={gameProviders}
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
        form_title={modalType === "Add" ? "Add Game" : "Edit Game"}
        formik={formik}
      />
        <PagesIndex.Toast/>
        </PagesIndex.Main_Containt>
      </div>
    </>
  );
};

export default GameProvider;
