import PagesIndex from "../../../Pages/PagesIndex";
import { Link } from "react-router-dom";
import { Get_Year_Only } from "../../../Utils/Common_Date";
import DeleteSweetAlert from "../../DeleteSweetAlert";
import App from "../../Modal/ReusableModal";
import { useState } from "react";

const GameRatesProvider = ({ gameType, path, title }) => {
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [TableData, setTableData] = PagesIndex.useState([]);
  const [modalType, setModalType] = useState(""); // Tracks if Add or Edit
  const [selectedRow, setSelectedRow] = useState(null); // For Edit functionality
  const [visible, setVisible] = useState(false);
  const [data, getData] = PagesIndex.useState([]);

  //get game list start
  const getGameRatesList = async () => {

    const res = await PagesIndex.admin_services.GAME_RATES_GET_LIST_API();

    getData(res?.data);
  };

  PagesIndex.useEffect(() => {
    getGameRatesList();
  }, []);
  //get game list end

  //delete game list start
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this game rate?");
    if (!confirmDelete) return;

    try {
     const res =  await   PagesIndex.admin_services.GAME_RATES_DELETE_API(id)
console.log(res)
     if(res.status){
      getGameRatesList
      alert(res?.message);
     }
   
    getGameRatesList();
    } catch (error) {
console.log(error)  
  }
  };

//delete game list end


  // Handle Edit Button
  const handleEdit = (row) => {
    setModalType("Edit");
    setSelectedRow(row);
    setVisible(true);
  };

  // Handle Add Button
  const handleAdd = () => {
    setModalType("Add");
    setSelectedRow(null);
    setVisible(true);
  };


  // Formik Configuration
  const formik = PagesIndex.useFormik({
    enableReinitialize: true,
    initialValues: {
      gameName: selectedRow?.gameName || "",
      gamePrice: selectedRow?.gamePrice || "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.gameName) errors.gameName = PagesIndex.valid_err.GAME_NAME_ERROR;
      if (!values.gamePrice) errors.gamePrice = PagesIndex.valid_err.GAME_PRICE_ERROR;
      return errors;
    },
    onSubmit: async (values) => {
      // userId, gamename, price
      try {
        const payload = {
          gamename: values.gameName,
          price: values.gamePrice,
          ...(modalType === "Edit" && { userId: selectedRow._id }),
        };

        const res =
          modalType === "Edit"
            ? await PagesIndex.admin_services.GAME_RATES_UPDATE_API(payload)
            : await PagesIndex.admin_services.GAME_RATES_ADD_API(payload);

        if (res.status) {
          PagesIndex.toast.success(res?.message);
          getGameRatesList();
          setVisible(false); // Close modal
        } else {
          PagesIndex.toast.error(res?.response?.data?.message || "Failed to save!");
        }
      } catch (error) {
        PagesIndex.toast.error(error?.response?.data?.message || "Error occurred!");
      }
    },
  });


  
  const visibleFields = [
    "id",
    "gameName",
    "gamePrice",
 
  ];


  const UserFullButtonList = [

    {
      id: 0,
      buttonName: "Edit",
      buttonColor: "sucess",
      route: "edit",
      Conditions: "",
      Visiblity: false,
      type: "button",
      onClick: handleEdit,
    },
    {
      id: 1,
      buttonName: "Delete",
      buttonColor: "danger",
      route: "users/deleted",
      Conditions: "",
      Visiblity: false,
      type: "button",
      onClick: handleDelete,
    },
  ];


  const fields = [
    {
      name: "gameName",
      label: "Game Name",
      type: "text",
      label_size: 12,
      col_size: 12,
    },
    {
      name: "gamePrice",
      label: "Game Price",
      type: "text",
      label_size: 12,
      col_size: 12,
    },
  ];

  return (
    <div>
      <PagesIndex.Main_Containt
      setVisible={setVisible}
      add_button={false}
      btn_modal={true}
      handleAdd={handleAdd}  
      title={title}
      btnTitle="Add"
      >
       
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
        form_title={modalType === "Add" ? "Add Game Rate" : "Edit Game Rate"}
        formik={formik}
      />
        <PagesIndex.Toast />
      </PagesIndex.Main_Containt>
  
          </div>
  );
};

export default GameRatesProvider;
