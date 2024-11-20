import React, { useState } from "react";
import Split_Main_Containt from "../../../../Layout/Main/Split_Main_Content";
import PagesIndex from "../../../PagesIndex";
import { getActualDateFormate, today } from "../../../../Utils/Common_Date";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Games_Provider_List } from "../../../../Redux/slice/CommonSlice";

const ExamplePage = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token")
  const actual_date_formet = getActualDateFormate(new Date());
const [check,setCheck]=useState("")
const[getGameResult,setGetGameResult]=useState([])
  const [Data, setData] = PagesIndex.useState([]);
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const dispatch = PagesIndex.useDispatch();
  const data = PagesIndex.useSelector((state) => {
    return state.CommonSlice.gameProviders;
  });


  const getGameResultApi = async()=>{
    const res = await PagesIndex.admin_services.GAME_RESULT(token)
    setGetGameResult(res?.data?.result)
  }
  const getGameRatesList =  () => {
  dispatch(Games_Provider_List(token));
  };

  PagesIndex.useEffect(() => {
    getGameRatesList();
    getGameResultApi()
  }, []);


  const handleProviderChange = (e) => {
   const selectedProviderId = e.target.value;
    const selectedProviderName = data.find(
      (item) => item._id === selectedProviderId
    )?.providerName;
  
    // Update formik values
    formik.setFieldValue("providerId", selectedProviderId);
    formik.setFieldValue("providerName", selectedProviderName);
  };
  const formik = PagesIndex.useFormik({
    initialValues: {
      winningDigit: "",
      resultDate: actual_date_formet || null,
      session: "",
      providerId: "",
      providerName:""
    },

    validate: (values) => {
      const errors = {};

      if (!values.providerId) {
        errors.providerId = PagesIndex.valid_err.GAME_PROVIDER_ERROR;
      }

      if (!values.session) {
        errors.session = PagesIndex.valid_err.GAME_SESSION_ERROR;
      }

      if (!values.resultDate) {
        errors.resultDate = PagesIndex.valid_err.DOMAIN_ERROR;
      }

      if (!values.winningDigit) {
        errors.winningDigit = PagesIndex.valid_err.GAME_WINING_DIGIT_ERROR;
      }

      return errors;
    },
    
    onSubmit: async (values) => {
      const req = {
        winningDigit: +(values.winningDigit),
        resultDate: today(values.resultDate),
        session: values.session,
        providerId: values.providerId,
        providerName:values.providerName
      };


      // return
 try {
  const res = await PagesIndex.admin_services.ADD_GAME_RESULT(req,token);
  if(res.status){
    PagesIndex.toast.success(res.data.message)
  }

 } catch (error) {
  PagesIndex.toast.error(res.data.message || error)
 }


    },
  });

  const formik1 = PagesIndex.useFormik({
    initialValues: {
      date: getActualDateFormate(new Date()),
    },

    validate: (values) => {
      const errors = {};
      return errors;
    },
    onSubmit: async (values) => {
      
const apidata = values.date
      const res = await PagesIndex.admin_services.GAME_RESULT_DATEWISE(apidata,token);
      if (res.status === 200) {
        setData(res.data);
      }
    },
  });


  const fields = [
    {
      name: "providerId",
      label: "Provider Name",
      type: "select",
      options:
        data?.map((item) => ({
          label: item.providerName,
          value: item._id,
      
        })) || [],
      label_size: 12,
      col_size: 3,
      onChange: handleProviderChange, 
    },

    {
      name: "session",
      label: "Session",
      type: "select",
      options: [
        { label: "Open", values: 1 },
        { label: "Close", values: 0 },
      ],
      label_size: 12,
      col_size: 3,
    },
    {
      name: "resultDate",
      label: "Result Date",
      type: "date",
      label_size: 12,
      col_size: 3,
      // min: { actual_date_formet },
      max: { actual_date_formet },
    },
    {
      name: "winningDigit",
      label: "Winning Digit",
      type: "text",
      label_size: 12,
      col_size: 3,
    },
  ];

  const fields1 = [
    {
      name: "date",
      label: "Result Date",
      type: "date",
      label_size: 12,
      col_size: 12,
      max: { actual_date_formet },
    },
  ];


  const handleDelete = async (row) => {
    const apidata = {
      resultId:row?._id,
      providerId:row?.providerId,
      session:row?.session 
      
    }
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this game?"
    );
    if (!confirmDelete) return;

    try {
      const res = await PagesIndex.admin_services.GAME_RESULT_DELETE(apidata,token);
      if (res.statusCode === 200) {
        alert(res?.message);
        getGameResult();
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleActionBtn = (row, buttonStatus)=>{

    if (buttonStatus === 1) {
    } else if (buttonStatus === 2) {
      handleDelete(row)
    } else {
      return "";
    }
  }


  const visibleFields = [
    "id",
    "providerName",
    "session",
    "resultDate",
    "winningDigit",
  ];

  const UserFullButtonList = [
    {
      id: 0,
      buttonName: "Get Winners List",
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
      buttonName: "Delete Result",
      buttonColor: "danger",
      route: "test",
      Conditions: (row) => {
        handleActionBtn(row, 2);
      },
      Visiblity: false,
      type: "button",
    },
   
  ];
  const cardLayouts = [
    {
      size: 9,
      body: (
        <div>
          <PagesIndex.Formikform
            fieldtype={fields.filter((field) => !field.showWhen)}
            show_submit={true}
            formik={formik}
            btn_name="Add Game Result"
           
          />
        </div>
      ),
    },
    {
      size: 3,
      body: (
        <div >
          <div >
            <PagesIndex.Formikform
              fieldtype={fields1.filter((field) => !field.showWhen)}
              formik={formik1}
              show_submit={true}
              btn_name="Search Result"
            />
          </div>
           
        </div>
      ),
    },
    {
      size: 12,
      body: (
        <div>

            <PagesIndex.TableWitCustomPegination
          data={getGameResult}
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
        </div>
      ),
    },
  ];


  return (
    <>
      <Split_Main_Containt
        title="Game Results"
        add_button={false}
        btnTitle="Add"
        route="/add"
        cardLayouts={cardLayouts}

      />
    </>
  );
};

export default ExamplePage;
