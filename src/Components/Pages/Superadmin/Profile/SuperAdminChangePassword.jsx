import React from "react";
import PagesIndex from "../../PagesIndex";

const SuperAdminChangePassword = () => {
  const navigate = PagesIndex.useNavigate();

  const userId = localStorage.getItem("userId");

  const formik = PagesIndex.useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.password) {
        errors.password = PagesIndex.valid_err.PASSWORD_ERROR;
      } else if (!PagesIndex.Password_Rejex(values.password)) {
        errors.password = PagesIndex.valid_err.PASSWORD__LENGTH_ERROR;
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = PagesIndex.valid_err.CONFIRM_ERROR;
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword =
          PagesIndex.valid_err.CONFIRM_AND_NEW_PASSWORD_ERROR;
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        let data = {
          id: userId,
          password: values.password,
        };
        const res = await PagesIndex.admin_services.ADMIN_CHANGE_PASSWORD_API(
          data
        );

        if (res?.status === 200) {
          PagesIndex.toast.success(res?.message);
          setTimeout(() => {
            navigate("/admin/dashboard");
          }, 1000);
        } else {
          PagesIndex.toast.error(res.message);
        }
      } catch (error) {
        PagesIndex.toast.error(error);
      }
    },
  });

  const fields = [
    {
      name: "password",
      label: "Password",
      type: "password",
      label_size: 12,
      col_size: 12,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      label_size: 12,
      col_size: 12,
    },
  ];

  return (
    <div className="card">
      <div className="card-body profile-change-password-card-padding">
        <h3 className="card-title-text text-center ">Change Password</h3>
        <PagesIndex.Formikform
          fieldtype={fields.filter((field) => !field.showWhen)}
          formik={formik}
          //btn_name={loding ? <PagesIndex.Loader text="Submit"/> : "Login"}
          btn_name={"Submit"}
          button_Size={"w-100"}
          show_submit={true}
        />
      </div>
    </div>
  );
};

export default SuperAdminChangePassword;
