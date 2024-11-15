import React from "react";
import PagesIndex from "../../PagesIndex";

const WalletContact = () => {
  const userId = localStorage.getItem("userId");

  //all states
  const [loading, setLoading] = PagesIndex.useState(true);
  const [walletData, setWalletData] = PagesIndex.useState();
  

  //get wallet api
  const getWalletData = async () => {
    const res = await PagesIndex.admin_services.GET_WALLET_CONTACT_API(userId);

    if (res?.status === 200) {
      setWalletData(res?.data?.[0]);
      setLoading(false);
    }
  };

  //function call with useeffect
  PagesIndex.useEffect(() => {
    getWalletData();
  }, []);

  PagesIndex.useEffect(() => {
    if (walletData) {
      formik.setFieldValue("number", walletData?.number);
      formik.setFieldValue("headline", walletData?.headline);
      formik.setFieldValue("upiId", walletData?.upiId);
    }
  }, [walletData]);

  //contact number validation regex
const contactRegex = (numbervalue) => {
  return  PagesIndex.Mobile_regex(numbervalue);
  };


  //formik form submit
  const formik = PagesIndex.useFormik({
    initialValues: {
      number: walletData && walletData?.number,
      headline: walletData && walletData?.headline,
      upiId: walletData && walletData?.upiId,
    },

    validate: (values) => {
      const errors = {};
      if (!values.number  && formik.touched.number ) {
        errors.number = PagesIndex.valid_err.CONTACT_ERROR;
      }  else if (!contactRegex(values.number) && formik.touched.number ) {
        errors.number = PagesIndex.valid_err.INVALID_CONTACT_ERROR;
      }

      if (!values.upiId && formik.touched.upiId ) {
        errors.upiId = PagesIndex.valid_err.EMPTY_UPI_ERROR;
      }

      if (!values.headline && formik.touched.headline) {
        errors.headline = PagesIndex.valid_err.PLEASER_ENTER_HEADLINE;
      }
      return errors;
    },
    onSubmit: async (values) => {
      
      const apidata = {
        adminId: userId,
        walledId: walletData?._id,
        number: +values.number,
        headline: values.headline,
        upiId: values.upiId,
      };
 

      const res = await PagesIndex.admin_services.UPDATE_WALLET_CONTACT_API(
        apidata
      );
     
      if (res.status === 200) {
        PagesIndex.toast.success(res.message);
        getWalletData();
      }
    },
  });

  const fields = [
    {
      name: "number",
      label: "Contact No",
      type: "number",
      label_size: 12,
      col_size: 6,
    },
    {
      name: "headline",
      label: "Application Headline",
      type: "text",
      label_size: 12,
      col_size: 6,
    },
    {
      name: "upiId",
      label: "UPI Id",
      type: "text",
      label_size: 12,
      col_size: 12,
    },
  ];

  return (
    <PagesIndex.Main_Containt title="Update Wallet related query" col_size={12}>
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
  );
};

export default WalletContact;
