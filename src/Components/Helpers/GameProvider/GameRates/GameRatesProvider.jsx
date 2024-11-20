import PagesIndex from "../../../Pages/PagesIndex";


const GameRatesProvider = ({title}) => {
  const token = localStorage.getItem("token");
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [modalType, setModalType] = PagesIndex.useState(""); 
  const [selectedRow, setSelectedRow] = PagesIndex.useState(null); 
  const [visible, setVisible] = PagesIndex.useState(false);
  const [data, getData] = PagesIndex.useState([]);

  //get game list start
  const getGameRatesList = async () => {
    const res = await PagesIndex.admin_services.GAME_RATES_GET_LIST_API(token);

    getData(res?.data);
  };

  PagesIndex.useEffect(() => {
    getGameRatesList();
  }, []);
  //get game list end

  //delete game list start
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this game rate?"
    );
    if (!confirmDelete) return;

    try {
      const res = await PagesIndex.admin_services.GAME_RATES_DELETE_API(id,token);
      if (res.status) {
        getGameRatesList;
        alert(res?.message);
      }

      getGameRatesList();
    } catch (error) {
      console.log(error);
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

  const handleActionBtn = (row, buttonStatus) => {
    if (buttonStatus === 1) {
      setModalType("Edit");
      setSelectedRow(row);
      formik.resetForm({
        values: {
          gamename: row.providerName,
          result: row.providerResult,
          mobile: row.mobile,
          activeStatus: row.activeStatus,
        },
      });

      setVisible(true);
    } else if (buttonStatus === 2) {
      handleDelete(row?._id);
    } else {
      return "";
    }
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
      if (!values.gameName)
        errors.gameName = PagesIndex.valid_err.GAME_NAME_ERROR;
      if (!values.gamePrice)
        errors.gamePrice = PagesIndex.valid_err.GAME_PRICE_ERROR;
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
            ? await PagesIndex.admin_services.GAME_RATES_UPDATE_API(payload,token)
            : await PagesIndex.admin_services.GAME_RATES_ADD_API(payload,token);

        if (res.status) {
          PagesIndex.toast.success(res?.message);
          getGameRatesList();
          setVisible(false); // Close modal
        } else {
          PagesIndex.toast.error(
            res?.response?.data?.message 
          );
        }
      } catch (error) {
        PagesIndex.toast.error(
          error?.response?.data?.message 
        );
      }
    },
  });

  const visibleFields = ["id", "gameName", "gamePrice"];

  const UserFullButtonList = [
    {
      id: 0,
      buttonName: "Update",
      buttonColor: "",
      route: "",
      Conditions: (row) => {
        handleActionBtn(row, 1);
      },
      Visiblity: false,
      type: "button",
    },
    {
      id: 1,
      buttonName: "Delete",
      buttonColor: "danger",
      route: "",
      Conditions: (row) => {
        handleActionBtn(row, 2);
      },
      Visiblity: false,
      type: "button",
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
