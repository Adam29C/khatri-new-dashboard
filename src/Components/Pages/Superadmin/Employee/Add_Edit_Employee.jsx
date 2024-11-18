import React, { useEffect } from "react";
import FormWizardComponent from "../../../Helpers/MultiStepForm";
import Main_Containt from "../../../Layout/Main/Main_Containt";
import PagesIndex from "../../../Pages/PagesIndex";
import { makePermissions, InitialValues } from "./permissions";

function AddEmployee() {
  const userId = localStorage.getItem("userId");
  const navigate = PagesIndex.useNavigate();
  const location = PagesIndex.useLocation();
  const userData = location.state;

  const formik = PagesIndex.useFormik({
    initialValues: {
      employeeName: userData?.employeeName || "",
      username: userData?.username || "",
      password: userData?.password || "",
      designation: userData?.designation || "",
      loginPermission: userData?.loginPermission || "",
    },
    validate: (values) => {
      const errors = {};
      const requiredFields = [
        "employeeName",
        "username",
        "password",
        "designation",
      ];
      requiredFields.forEach((field) => {
        if (!values[field]) {
          errors[field] = PagesIndex.valid_err[`${field.toUpperCase()}_ERROR`];
        }
      });
      return errors;
    },
    onSubmit: async (values) => {},
  });

  const fields = [
    {
      name: "employeeName",
      label: "name",
      type: "text",
      label_size: 12,
      col_size: 6,
    },
    {
      name: "username",
      label: "User Name",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: !!userData,
    },
    {
      name: "password",
      label: "Password",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: !!userData,
    },
    {
      name: "designation",
      label: "Designation",
      type: "text",
      label_size: 12,
      col_size: 6,
      disable: !!userData,
    },
    {
      name: "loginPermission",
      label: "Dashboard/App Permission",
      type: "select",
      label_size: 12,
      col_size: 6,
      options: [
        { label: "Both", value: 0 },
        { label: "Dashboard", value: 1 },
        { label: "Application", value: 2 },
      ],
    },
  ];

  const filteredFields = userData
    ? fields.filter((field) => field.name !== "password")
    : fields;

  const formik1 = PagesIndex.useFormik({
    initialValues: InitialValues,
    validate: () => ({}),
    onSubmit: async (values) => {},
  });

  function updateCheckedStatus(array1, makePermissions) {
    const permissions = array1[0];
    const keyMap = {
      Dashboard: "isDashboard",
      Users: "isUsers",
      Games: "isGames",
      "Games Provider": "isGamesProvider",
      "Games Setting": "isGamesSetting",
      "Games Rates": "isGamesRates",
      "Games Result": "isGamesResult",
      "Games Revert": "isGamesRevert",
      "Games Refund": "isGamesRefund",
      Starline: "isStarline",
      "Starline Provider": "isStarlineProvider",
      "Starline Setting": "isStarlineSetting",
      "Starline Rates": "isStarlineRates",
      "Starline Result": "isStarlineResult",
      "Starline Revert": "isStarlineRevert",
      "Starline Refund": "isStarlineRefund",
      "Andar Bahar": "isAndarBahar",
      "Andar Bahar Provider": "isAndarBaharProvider",
      "Andar Bahar Setting": "isAndarBaharSetting",
      "Andar Bahar Rates": "isAndarBaharRates",
      "Andar Bahar Result": "isAndarBaharResult",
      "Andar Bahar Revert": "isAndarBaharRevert",
      "Andar Bahar Refund": "isAndarBaharRefund",
      "Cutting Group": "isCuttingGroup",
      "Bookie Corner": "isBookieCorner",
      "OC Cutting Group": "isOCCuttingGroup",
      "Final Cutting Group": "isFinalCuttingGroup",
      Wallet: "isWallet",
      "Fund Request": "isFundRequest",
      ExportDebitReport: "isExportDebitReport",
      "View Wallet": "isViewWallet",
      "Request ON/OFF": "isRequestON/OFF",
      "Credit Request": "isCreditRequest",
      "Approved Debit Page": "isApprovedDebitPage",
      "Paytm Request": "isPaytmRequest",
      "Bank Account Request": "isBankAccountRequest",
      "Pending Debit Request": "isPendingDebitRequest",
      "Pending Bank Request": "isPendingBankRequest",
      "Pending Paytm Request": "isPendingPaytmRequest",
      "Declined Request": "isDeclinedRequest",
      Notification: "isNotification",
      News: "isNews",
      "Delete User": "isDeleteUser",
      "App Settings": "isAppSettings",
      "How To Play": "isHowToPlay",
      "Withdraw Screen": "isWithdrawScreen",
      "Notice Board": "isNoticeBoard",
      "Wallet Contact": "isWalletContact",
      "App Version": "isAppVersion",
      Masters: "isMasters",
      "Upi Id": "isUpiId",
      "Add Fund Mode": "isAddFundMode",
      "Manage Employee": "isManageEmployee",
      "Create Employee": "isCreateEmployee",
      Reports: "isReports",
      "Jodi All": "isJodiAll",
      "Sales Report": "isSalesReport",
      "Andar Bahar Sales Report": "isAndarBaharSalesReport",
      "Andar Bahar Total Bids": "isAndarBaharTotalBids",
      "Starline Sales Report": "isStarlineSalesReport",
      "Fund Report": "isFundReport",
      "Total Bids": "isTotalBids",
      "Ajay Sir Report": "isAjaySirReport",
      "Credit Debit Report": "isCreditDebitReport",
      "Daily Report": "isDailyReport",
      "Bidding Report": "isBiddingReport",
      "Customer Balance": "isCustomerBalance",
      "All User Bids": "isAllUserBids",
      "Deleted Users": "isDeletedUsers",
      "Upi Fund Report": "isUpiFundReport",
    };

    function updateNested(array, parentKey) {
      array.forEach((item) => {
        const key = keyMap[item.name];
        if (key !== undefined && permissions[key] !== undefined) {
          item.checked = permissions[key];
        }
        if (item.Nasted && item.Nasted.length > 0) {
          updateNested(item.Nasted);
        }
      });
    }

    updateNested(makePermissions);
    return makePermissions;
  }

  const abcde = () => {
    if (location?.state?.permission) {
      updateCheckedStatus([location.state.permission], makePermissions);
    }
  };

  useEffect(() => {
    abcde()
  }, [location]);

  const fields1 = [
    {
      name: "permission",
      // label: "Create Strategy",
      type: "checkbox",
      label_size: 12,
      title_size: 12,
      col_size: 4,
      options: makePermissions,
    },
  ];

  const handleComplete = async () => {
    let updatedABC = {};
    for (let key in formik1.values) {
      updatedABC["is" + key.replace(/\s+/g, "")] = formik1.values[key];
    }

    var combinedObject;
    if (location?.state) {
      const combineObjects = (obj1, obj2) => {
        const result = {};
        for (const key in obj1) {
          if (obj1[key] === true) {
            result[key] = true;
          } else {
            result[key] = obj2[key] !== undefined ? obj2[key] : obj1[key];
          }
        }

        return result;
      };

      combinedObject = combineObjects(updatedABC, location?.state?.permission);
    }

    const req = {
      adminId: userId,
      username: formik.values.username,
      employeeName: formik.values.employeeName,
      loginPermission: formik.values.loginPermission,
      permission: location?.state ? combinedObject : updatedABC,
      ...(location?.state ? { empId: location?.state?._id } : {}),
    };

    // return;
    const res = location?.state
      ? await PagesIndex.admin_services.UPDATE_EMPLOYEE(req)
      : await PagesIndex.admin_services.CREATE_EMPLOYEE({
          ...req,
          password: formik.values.password,
          designation: formik.values.designation,
          loginPermission: 1,
        });

    if (res.status === 200) {
      PagesIndex.toast.success(res.message);
      setTimeout(() => {
        navigate("/admin/employees");
      }, 1500);
    } else {
      PagesIndex.toast.error(res?.response?.data?.message);
    }
  };

  const tabs = [
    {
      title: "Personal details",
      icon: "ti-user",
      content: (
        <PagesIndex.Formikform
          fieldtype={filteredFields.filter((field) => !field.showWhen)}
          formik={formik}
          btn_name="Next"
          show_submit={false}
        />
      ),
    },
    {
      title: "Manage Permissions",
      icon: "ti-check",
      content: (
        <PagesIndex.Formikform
          fieldtype={fields1.filter((field) => !field.showWhen)}
          formik={formik1}
          btn_name="Add Panel"
        />
      ),
    },
  ];

  return (
    <Main_Containt
      title={location.state ? "Edit Employee" : "Add Employee"}
      col_size={12}
      add_button={true}
      route="/admin/employees"
      btnTitle="Back"
    >
      <FormWizardComponent
        shape="circle"
        color="#478767"
        stepSize="sm"
        onComplete={handleComplete}
        tabs={tabs}
      />
      <PagesIndex.Toast />
    </Main_Containt>
  );
}

export default AddEmployee;
