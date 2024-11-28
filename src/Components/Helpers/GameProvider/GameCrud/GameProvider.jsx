import PagesIndex from "../../../Pages/PagesIndex";
import { Games_Provider_List } from "../../../Redux/slice/CommonSlice";
import { useState } from "react";
<<<<<<< HEAD

const GameProvider = ({ data, path, title, gametype }) => {
  const token = localStorage.getItem("token");

  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [modalType, setModalType] = useState(""); // Tracks if Add or Edit
  const [selectedRow, setSelectedRow] = useState(null); // For Edit functionality
=======

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
>>>>>>> 77310baf74f61b27e088e199c3c8eb71ed58e8cf
  const [visible, setVisible] = useState(false);
  const dispatch = PagesIndex.useDispatch();

  const { gameProviders } = PagesIndex.useSelector(
    (state) => state.CommonSlice
  );
<<<<<<< HEAD
  const getGameProviderList = () => {
    dispatch(Games_Provider_List(token));
=======

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
>>>>>>> 77310baf74f61b27e088e199c3c8eb71ed58e8cf
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
<<<<<<< HEAD
      const res = await PagesIndex.admin_services.GAME_PROVIDER_DELETE_API(id,token);
      if (res.statusCode === 200) {
        alert(res?.message);
        getGameProviderList();
      }

=======
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
>>>>>>> 77310baf74f61b27e088e199c3c8eb71ed58e8cf
    } catch (error) {
      console.log(error);
    }
  };

<<<<<<< HEAD

=======
>>>>>>> 77310baf74f61b27e088e199c3c8eb71ed58e8cf
  // Handle Add Button
  const handleAdd = () => {
    setModalType("Add");
    setSelectedRow(null);
    formik.resetForm({
      values: {
        gamename: "",
        result: "",
        mobile: "",
<<<<<<< HEAD
        activeStatus:""
=======
        activeStatus: "",
>>>>>>> 77310baf74f61b27e088e199c3c8eb71ed58e8cf
      },
    });

    setVisible(true);
  };

<<<<<<< HEAD
  const handleActionBtn = (row, buttonStatus)=>{
    if (buttonStatus === 1) {
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
    } else if (buttonStatus === 2) {
      handleDelete(row?._id)
    } else {
      return "";
    }
  }
=======
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
>>>>>>> 77310baf74f61b27e088e199c3c8eb71ed58e8cf
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

<<<<<<< HEAD
      if (!values.mobile) {
        errors.mobile = PagesIndex.valid_err.CONTACT_ERROR;
      }
=======
      // if (!values.mobile) {
      //   errors.mobile = PagesIndex.valid_err.CONTACT_ERROR;
      // }
>>>>>>> 77310baf74f61b27e088e199c3c8eb71ed58e8cf

      return errors;
    },

    onSubmit: async (values) => {
<<<<<<< HEAD

      try {
        const payload = {
          gamename: values.gamename,
          result: values.result,
          mobile: values.mobile.toString(),
          activeStatus: values.activeStatus === "true",
          ...(modalType === "Edit" && { gameId: selectedRow._id }),
        };

        const res = modalType === "Edit"
            ? await PagesIndex.admin_services.GAME_PROVIDER_UPDATE_API(payload , token)
            : await PagesIndex.admin_services.GAME_PROVIDER_ADD_API(payload ,token);
 
=======
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

>>>>>>> 77310baf74f61b27e088e199c3c8eb71ed58e8cf
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
<<<<<<< HEAD
=======
      Visiblity: "show",
>>>>>>> 77310baf74f61b27e088e199c3c8eb71ed58e8cf
      label_size: 12,
      col_size: 12,
    },
    {
      name: "result",
      label: "Result",
      type: "text",
<<<<<<< HEAD
=======
      Visiblity: "show",
>>>>>>> 77310baf74f61b27e088e199c3c8eb71ed58e8cf
      label_size: 12,
      col_size: 12,
    },
    {
      name: "mobile",
      label: "Mobile",
      type: "number",
      label_size: 12,
      col_size: 12,
<<<<<<< HEAD
=======
      Visiblity:
        gametype === "StarLine" || gametype === "JackPot" ? "hidden" : "show",
>>>>>>> 77310baf74f61b27e088e199c3c8eb71ed58e8cf
    },

    {
      name: "activeStatus",
      label: "Disable Provider",
      type: "select",
<<<<<<< HEAD
=======
      Visiblity:
        gametype === "StarLine" || gametype === "JackPot" ? "hidden" : "show",
>>>>>>> 77310baf74f61b27e088e199c3c8eb71ed58e8cf
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
<<<<<<< HEAD
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
      
=======
>>>>>>> 77310baf74f61b27e088e199c3c8eb71ed58e8cf
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
<<<<<<< HEAD
            data={gameProviders}
=======
            data={PROVIDERDATA && PROVIDERDATA}
>>>>>>> 77310baf74f61b27e088e199c3c8eb71ed58e8cf
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
