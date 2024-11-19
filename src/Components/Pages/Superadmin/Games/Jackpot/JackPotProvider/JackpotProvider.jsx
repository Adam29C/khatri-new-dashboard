import React, { useEffect } from "react";
import PagesIndex from "../../../../PagesIndex";

const JackpotProvider = () => {
  const [getAbData, setGetAbData] = PagesIndex.useState([]);
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [modalType, setModalType] = PagesIndex.useState("");
  const [selectedRow, setSelectedRow] = PagesIndex.useState(null);
  const [visible, setVisible] = PagesIndex.useState(false);

  const getAbListApi = async () => {
    const res = await PagesIndex.admin_services.GET_AB_GAME();
    setGetAbData(res?.data);
  };

  useEffect(() => {
    getAbListApi();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this game?"
    );
    if (!confirmDelete) return;
    try {
      const res = await PagesIndex.admin_services.AB_GAME_DELETE_API(id);
      console.log(res)
      if (res?.status) {
        alert(res?.message);
        getAbListApi();
      }
    } catch (error) {
      console.log(error);
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
            gamename: "",
            result: "",
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
         
        },
        validate: (values) => {
          const errors = {};
    
          if (!values.gamename) {
            errors.gamename = PagesIndex.valid_err.PROVIDER_NAME_ERROR;
          }
    
          if (!values.result) {
            errors.result = PagesIndex.valid_err.PROVIDER_RESULT_ERROR;
          }
    
     
    
          return errors;
        },
    
        onSubmit: async (values) => {
        
          try {
            const payload = {
              gamename: values.gamename,
              result: values.result,
              ...(modalType === "Edit" && { userId: selectedRow._id }),
            
            };
   
            const res =
              modalType === "Edit"
                ? await PagesIndex.admin_services.AB_GAME_UPDATE_API(payload)
                : await PagesIndex.admin_services.AB_GAME_ADD_API(payload);
                console.log(res,"100")
            if (res.status) {
              PagesIndex.toast.success(res?.message);
              getAbListApi();
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
      
    
       
      ];


  const visibleFields = ["id", "providerName", "providerResult"];

  const UserFullButtonList = [
    {
      id: 1,
      buttonName: "Edit",
      buttonColor: "success",
      route: "test",
      Conditions: "",
      Visiblity: false,
      type: "button",
      onClick: handleEdit,
    },
    {
      id: 2,
      buttonName: "Delete",
      buttonColor: "danger",
      route: "users/deleted",
      Conditions: "",
      Visiblity: false,
      type: "button",
      onClick: handleDelete,
    },
  ];


  return (
    <PagesIndex.Main_Containt  setVisible={setVisible}  add_button={false}  btn_modal={true}   btnTitle="Add" title="Jackpot Provider"  handleAdd={handleAdd}  >
      <PagesIndex.TableWitCustomPegination
        data={getAbData}
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
      <PagesIndex.Toast />
    </PagesIndex.Main_Containt>
  );
};

export default JackpotProvider;
