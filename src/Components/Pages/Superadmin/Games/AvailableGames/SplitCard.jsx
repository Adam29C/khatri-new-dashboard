import React, { useState } from "react";
import Split_Main_Containt from "../../../../Layout/Main/Split_Main_Content";
import PagesIndex from "../../../PagesIndex";
import { getActualDateFormate, today } from "../../../../Utils/Common_Date";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Games_Provider_List } from "../../../../Redux/slice/CommonSlice";

const ExamplePage = () => {
  //get token in local storage
  const token = localStorage.getItem("token")
  //set actual date
  const actual_date_formet = getActualDateFormate(new Date());
  //dispatch
  const dispatch = PagesIndex.useDispatch();

  //all state
const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
const [tableData, setTableData] = useState([]);

//get data in redux 
  const data = PagesIndex.useSelector((state) => {
    return state.CommonSlice.gameProviders;
  });


  //get game result function
  const getGameResultApi = async()=>{
    const res = await PagesIndex.admin_services.GAME_RESULT(token)

    if(res.status){
      setTableData(res?.data?.result)
    }


  }

//get game provider data 
  const getGameProvidersList =  () => {
  dispatch(Games_Provider_List(token));
  };


  //get apis functions call in useEffect
  PagesIndex.useEffect(() => {
    getGameProvidersList();
    getGameResultApi()
  }, []);


  //set id and provider name in form functions
  const handleProviderChange = (e) => {
   const selectedProviderId = e.target.value;
    const selectedProviderName = data.find(
      (item) => item._id === selectedProviderId
    )?.providerName;
  
    // Update formik values
    formik.setFieldValue("providerId", selectedProviderId);
    formik.setFieldValue("providerName", selectedProviderName);
  };

  //formik form 
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

 try {
  const res = await PagesIndex.admin_services.ADD_GAME_RESULT(req,token);
  console.log(res)
  if(res.status){
    PagesIndex.toast.success(res?.data?.message || res?.message)
  }

 } catch (error) {
 console.log(error)
  const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
  PagesIndex.toast.error(errorMessage);
  
 }


    },
  });


  //formik form for only result date 
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
   try {
    const res = await PagesIndex.admin_services.GAME_RESULT_DATEWISE(apidata,token);

    if (res.status) {
PagesIndex.toast.success(res.message)
      setTableData(res.data.results)
    }else{
      PagesIndex.toast.error(res.message)
    }
   } catch (error) {
    PagesIndex.toast.error(error.response.data.message )
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

//game result delete 
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
        getGameResultApi
      }

    } catch (error) {
      console.log(error);
    }
  };
//get remainning winner list api call function

const getRemainingWinner = async(rowdata)=>{


  const apidata = {
    providerId:rowdata.providerId,
    date:rowdata.resultDate,
    session:rowdata.session
  }
  console.log("check row data",apidata)
  try {
    const res = await PagesIndex.admin_services.GAME_REMAINING_WINNER_LIST_API(apidata,token)
    console.log(res)
  } catch (error) {
    
  }
}
  //handle actions button function 
  const handleActionBtn = (row, buttonStatus)=>{

    if (buttonStatus === 1) {
      getRemainingWinner(row)
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
            btn_name="Submit"
           
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
          data={tableData}
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
