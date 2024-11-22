import PagesIndex from "../../../Pages/PagesIndex";
import { Games_Provider_List } from "../../../Redux/slice/CommonSlice";
import { useState } from "react";

const GameProvider = ({
  data,
  path,
  title,
  gametype,
  provider_list,
  add_provider,
  edit_provider,
  remove_provider,
  
}) => {
  const token = localStorage.getItem("token");

  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [GetProviderData, setGetProviderData] = PagesIndex.useState([]);
  const [modalType, setModalType] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [visible, setVisible] = useState(false);
  const dispatch = PagesIndex.useDispatch();

  const { gameProviders } = PagesIndex.useSelector(
    (state) => state.CommonSlice
  );

  const getGameProviderList = async () => {
    if (gametype === "StarLine" || gametype === "JackPot") {
      const res =
        await PagesIndex.game_service.STARLINE_AND_JACKPOT_GAME_PROVIDERS_LIST_API(
          provider_list,
          token
        );
      if (res.status) {
        setGetProviderData(res.data);
      }
    } else {
      dispatch(Games_Provider_List(token));
    }
  };

  PagesIndex.useEffect(() => {
    getGameProviderList();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this game?"
    );
    if (!confirmDelete) return;

    try {
      let res;
      if (gametype === "StarLine" || gametype === "JackPot") {
        res =
          await PagesIndex.game_service.STARLINE__AND_JACKPOT_GAME_PROVIDERS_DELETE_API(
            remove_provider,
            id,
            token
          );
      } else {
        res = await PagesIndex.admin_services.GAME_PROVIDER_DELETE_API(
          id,
          token
        );
      }

      if (res.status) {
        PagesIndex.toast.success(res?.message);
        getGameProviderList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Add Button
  const handleAdd = () => {
    setModalType("Add");
    setSelectedRow(null);
    formik.resetForm({
      values: {
        gamename: "",
        result: "",
        mobile: "",
        activeStatus: "",
      },
    });

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

      // if (!values.mobile) {
      //   errors.mobile = PagesIndex.valid_err.CONTACT_ERROR;
      // }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        let res;
        if (gametype === "StarLine" || gametype === "JackPot") {
          const payload = {
            gamename: values.gamename,
            result: values.result,

            ...(modalType === "Edit" && { providerId: selectedRow._id }),
          };

          res =
            modalType === "Edit"
              ? await PagesIndex.game_service.STARLINE__AND_JACKPOT_GAME_PROVIDER_UPDATE_API(
                  edit_provider,
                  payload,
                  token
                )
              : await PagesIndex.game_service.STARLINE__AND_JACKPOT_GAME_PROVIDER_ADD_API(
                  add_provider,
                  payload,
                  token
                );

          console.log("resres", res);
        } else {
          const payload = {
            gamename: values.gamename,
            result: values.result,
            mobile: values.mobile.toString(),
            activeStatus: values.activeStatus === "true",
            ...(modalType === "Edit" && { gameId: selectedRow._id }),
          };

          res =
            modalType === "Edit"
              ? await PagesIndex.admin_services.GAME_PROVIDER_UPDATE_API(
                  payload,
                  token
                )
              : await PagesIndex.admin_services.GAME_PROVIDER_ADD_API(
                  payload,
                  token
                );
        }

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
      Visiblity: "show",
      label_size: 12,
      col_size: 12,
    },
    {
      name: "result",
      label: "Result",
      type: "text",
      Visiblity: "show",
      label_size: 12,
      col_size: 12,
    },
    {
      name: "mobile",
      label: "Mobile",
      type: "number",
      label_size: 12,
      col_size: 12,
      Visiblity:
        gametype === "StarLine" || gametype === "JackPot" ? "hidden" : "show",
    },

    {
      name: "activeStatus",
      label: "Disable Provider",
      type: "select",
      Visiblity:
        gametype === "StarLine" || gametype === "JackPot" ? "hidden" : "show",
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
      buttonName: "Update",
      buttonColor: "",
      route: "",
      Conditions: (row) => {
        handleActionBtn(row, 1);
      },
      Visiblity: true,
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
      Visiblity: true,
      type: "button",
    },
  ];

  var PROVIDERDATA =
    gametype === "StarLine" || gametype === "JackPot"
      ? GetProviderData && GetProviderData
      : gameProviders;

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
            data={PROVIDERDATA && PROVIDERDATA}
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
      </div>
    </>
  );
};

export default GameProvider;
