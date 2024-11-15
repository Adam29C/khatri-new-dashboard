import React, { useState } from "react";
import Split_Main_Containt from "../../../../Layout/Main/Split_Main_Content";
import PagesIndex from "../../../PagesIndex";
import { getActualDateFormate, today } from "../../../../Utils/Common_Date";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const ExamplePage = () => {
  const userId = localStorage.getItem("userId");
  const actual_date_formet = getActualDateFormate(new Date());

  const [Data, setData] = PagesIndex.useState([]);

  const dispatch = PagesIndex.useDispatch();
  const data = PagesIndex.useSelector((state) => {
    return state.CommonSlice.gameProviders;
  });

  const getGameRatesList =  () => {
    let apidata = {
      userId: userId,
      gameType: "MainGame",
    };
   dispatch(
      PagesIndex.commonSlice.Games_Provider_List(apidata)
    );
  };

  PagesIndex.useEffect(() => {
    getGameRatesList();
  }, []);

  const formik = PagesIndex.useFormik({
    initialValues: {
      winningDigit: "",
      resultDate: actual_date_formet,
      session: "",
      providerId: "",
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
        winningDigit: values.winningDigit,
        resultDate: today(values.resultDate),
        session: values.session,
        providerId: values.providerId,
        adminId: userId,
        gameType: "MainGame",
      };


      // return
      const res = await PagesIndex.admin_services.ADD_GAME_RESULT(req);
  

      // if (response.status === 409) {
      //   toast.error(response.data.msg);
      // } else if (response.status) {
      //   toast.success(response.msg);
      //   setTimeout(() => {
      //     navigate("/super/alladmins");
      //   }, 1000);
      // } else if (!response.status) {
      //   toast.error(response.msg);
      // }
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
      // const req = today(values.date);
      // const res = await PagesIndex.admin_services.GAME_RESULT(req);
      // if (res.status === 200) {
      //   setData(res.data);
      // }
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



  const SearchResult = async () => {
    // const req = today(formik1.values.date);
    // const res = await PagesIndex.admin_services.GAME_RESULT(req);
    // if (res.status === 200) {
    //   setData(res.data);
    // }
  };

  PagesIndex.useEffect(() => {
    SearchResult();
  }, []);

  const columns = [
    {
      name: "Game Name",
      selector: (row) => row?.providerName,
    },
    {
      name: "Game Session",
      selector: (row) => row?.session,
    },
    {
      name: "Result Date",
      selector: (row) => row?.resultDate,
    },
    {
      name: "winning Digit",
      selector: (row) => row?.winningDigit,
    },

    {
      name: "actions",
      selector: (cell, row) => (
        <div style={{ width: "120px" }}>
          <div>
            <PagesIndex.Link to={"/admin/employee/edit"} state={cell}>
              <span
                data-toggle="tooltip"
                data-placement="top"
                title="Winners List"
              >
                <i class="icon-user-follow icon-size"></i>
              </span>
            </PagesIndex.Link>

            <PagesIndex.Link href="#" onClick={SearchResult}>
              <span data-toggle="tooltip" data-placement="top" title="Delete">
                <i class="ti-trash fs-5 mx-1 "></i>
                {/* <PagesIndex.Icon icon="line-md:account-delete" width="24" height="24" /> */}
              </span>
            </PagesIndex.Link>
          </div>
        </div>
      ),
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
            // form_responsive={}
            formik={formik}
            btn_name="Add Game Result"
          />
        </div>
      ),
    },
    {
      size: 3,
      body: (
        <div>
          <div>
            <PagesIndex.Formikform
              fieldtype={fields1.filter((field) => !field.showWhen)}
              formik={formik1}
              show_submit={true}
              btn_name="Search Result"
            />
          </div>
          {/* <button className=" btn btn-primary my-1" onClick={SearchResult}>Search </button> */}
        </div>
      ),
    },
    {
      size: 12,
      body: (
        <div>
          <PagesIndex.Data_Table
         
            columns={columns}
            data={Data.gameResult}
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
