import React from 'react'
import PagesIndex from '../../PagesIndex'

const WithdrawScreen = () => {
    const userId = localStorage.getItem("userId");

  //all states
  const [loading, setLoading] = PagesIndex.useState(true);
  const [withdrawData, setWithdrawData] = PagesIndex.useState();
  

  //get wallet api
  const getNoticeData = async () => {
    const res = await PagesIndex.admin_services.GET_APP_WITHDRAW_API(userId);

    if (res?.status === 200) {
        setWithdrawData(res?.data?.[0]);
      setLoading(false);
    }
  };

  //function call with useeffect
  PagesIndex.useEffect(() => {
    getNoticeData();
  }, []);

  PagesIndex.useEffect(() => {
    if (withdrawData) {
        formik.setFieldValue("textMain", withdrawData?.textMain);
        formik.setFieldValue("textSecondry", withdrawData?.textSecondry);
        formik.setFieldValue("Number", withdrawData?.Number);
        formik.setFieldValue("Timing", withdrawData?.Timing);

    }
  }, [withdrawData]);

  //contact number validation regex
const contactRegex = (numbervalue) => {
  return  PagesIndex.Mobile_regex(numbervalue);
  };


  //formik form submit
  const formik = PagesIndex.useFormik({
    initialValues: {
      textMain: "",
      textSecondry:"",
      Number: "",
      Timing:"",
      
      
    },

    validate: (values) => {

      const errors = {};
      if (!values.textMain && formik.touched.textMain ) {
        errors.textMain = PagesIndex.valid_err.TITLE_ERROR;
      }

      if (!values.textSecondry && formik.touched.textSecondry ) {
        errors.textSecondry = PagesIndex.valid_err.TITLE_ERROR;
      }


      if (!values.Number  && formik.touched.Number ) {
        errors.Number = PagesIndex.valid_err.CONTACT_ERROR;
      }  else if (!contactRegex(values.Number) && formik.touched.Number ) {
        errors.Number = PagesIndex.valid_err.INVALID_CONTACT_ERROR;
      }


      return errors;
    },
    onSubmit: async (values) => {

      const apidata = {
   
        adminId: userId,
        widhdrawMessageId: withdrawData?._id,
        textMain:values.textMain,
        textSecondry: values.textSecondry,
        Number: +values.Number,
        Timing:values.Timing,
  
      };
 

      const res = await PagesIndex.admin_services.UPDATE_APP_WITHDRAW_API(
        apidata
      );
     
      if (res.status === 200) {
        PagesIndex.toast.success(res.message);
        getNoticeData();
      }
    },
  });

  const fields = [
    {
      name: "textMain",
      label: "Title",
      type: "msgbox",
      label_size: 12,
      col_size: 12,
    },

    {
      name: "textSecondry",
      label: "Secondry Title",
      type: "msgbox",
      label_size: 12,
      col_size: 12,
    },
    {
        name: "Number",
        label: "Number",
        type: "number",
        label_size: 12,
        col_size: 6,
      },
    {
        name: "Timing",
        label: "Timing",
        type: "text",
        label_size: 12,
        col_size: 6,
      },
      
    
    
  ];

  return (
    <PagesIndex.Main_Containt title="App Withdraw Text" col_size={12}>
    {loading ? (
      <PagesIndex.Loader lodersize={20} />
    ) : (
      <PagesIndex.Formikform
        fieldtype={fields.filter((field) => !field.showWhen)}
        formik={formik}
        show_submit={true}
      
        btn_name="Submit"
      />
    )}
    <PagesIndex.Toast />
  </PagesIndex.Main_Containt>
  )
}

export default WithdrawScreen