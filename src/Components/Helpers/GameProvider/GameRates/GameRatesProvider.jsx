import Swal from "sweetalert2";
import PagesIndex from "../../../Pages/PagesIndex";

const GameRatesProvider = ({
  gameType,
  path,
  title,
  GameRate_list,
  GameRate_delete,
  GameRate_update,
  GameRate_add,
}) => {
  const token = localStorage.getItem("token");

  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [modalType, setModalType] = PagesIndex.useState("");
  const [selectedRow, setSelectedRow] = PagesIndex.useState(null);
  const [visible, setVisible] = PagesIndex.useState(false);
  const [data, getData] = PagesIndex.useState([]);
  const [getGameRateList, setgetGameRateList] = PagesIndex.useState([]);

  //get game list start
  const getGameRatesList = async () => {
    if (gameType === "StarLine" || gameType === "JackPot") {
      const res =
        await PagesIndex.game_service.STARLINE_AND_JACKPOT_GAME_RATE_LIST_API(
          GameRate_list,
          token
        );
      setgetGameRateList(res.data);
    } else {
      const res = await PagesIndex.game_service.GAME_RATES_GET_LIST_API(token);
      getData(res?.data);
    }
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
      let res;
      if (gameType === "StarLine" || gameType === "JackPot") {
        res =
          await PagesIndex.game_service.STARLINE__AND_JACKPOT_GAME_RATE_DELETE_API(
            GameRate_delete,
            id,
            token
          );
      } else {
        res = await PagesIndex.game_service.GAME_RATES_DELETE_API(id, token);
      }
      if (res.status) {
        getGameRatesList();
        PagesIndex.toast.success(res?.message);
      } else {
        PagesIndex.toast.error(res?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  // const handleActionBtn = (row, buttonStatus) => {
  //   if (buttonStatus === 1) {
  //     setModalType("Edit");
  //     setSelectedRow(row);
  //     formik.resetForm({
  //       values: {
  //         gamename: row.providerName,
  //         result: row.providerResult,
  //         mobile: row.mobile,
  //         activeStatus: row.activeStatus,
  //       },
  //     });

  //     setVisible(true);
  //   } else if (buttonStatus === 2) {
  //     handleDelete(row?._id);
  //   } else {
  //     return "";
  //   }
  // };

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
      try {
        let res = "";
        if (gameType === "StarLine" || gameType === "JackPot") {
          const payload = {
            gameName: values.gameName,
            gamePrice: values.gamePrice,
            ...(modalType === "Edit" && { gameRateId: selectedRow._id }),
          };
          res =
            modalType === "Edit"
              ? await PagesIndex.game_service.STARLINE__AND_JACKPOT_GAME_RATE_UPDATE_API(
                  GameRate_update,
                  payload,

                  token
                )
              : await PagesIndex.game_service.STARLINE__AND_JACKPOT_GAME_RATE_ADD_API(
                  GameRate_add,
                  payload,
                  token
                );
        } else {
          const payload = {
            gamename: values.gameName,
            price: values.gamePrice,
            ...(modalType === "Edit" && { userId: selectedRow._id }),
          };

          res =
            modalType === "Edit"
              ? await PagesIndex.game_service.GAME_RATES_UPDATE_API(
                  payload,
                  token
                )
              : await PagesIndex.game_service.GAME_RATES_ADD_API(
                  payload,
                  token
                );
        }

        if (res.status) {
          PagesIndex.toast.success(res?.message);
          getGameRatesList();
          setVisible(false); // Close modal
        } else {
          PagesIndex.toast.error(res?.response?.data?.message);
        }
      } catch (error) {
        PagesIndex.toast.error(error?.response?.data?.message);
      }
    },
  });

  const visibleFields = ["id", "gameName", "gamePrice"];

  const UserFullButtonList = [
    {
      id: 0,
      buttonName: "Edit",
      buttonColor: "sucess",
      route: "edit",
      Conditions: (row) => {
        handleEdit(row);
      },
      Visiblity: false,
      type: "button",
      // onClick: handleEdit,
    },
    {
      id: 1,
      buttonName: "Delete",
      buttonColor: "danger",
      route: "users/deleted",
      Conditions: (row) => {
        handleDelete(row._id);
      },
      Visiblity: false,
      type: "button",
      // onClick: handleDelete,
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

  var GAME_RATE_DATA =
    gameType === "StarLine" || gameType === "JackPot"
      ? getGameRateList && getGameRateList
      : data;

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
          data={GAME_RATE_DATA}
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
