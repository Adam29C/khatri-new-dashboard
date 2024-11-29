import React from 'react'
import PagesIndex from "../../PagesIndex";
import Split_Main_Containt from '../../../Layout/Main/Split_Main_Content';
const CreditRequest = () => {

  //get token in local storage
  const token = localStorage.getItem("token")


  //dispatch
  const dispatch = PagesIndex.useDispatch();

  //all state
const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
const [tableData, setTableData] = PagesIndex.useState([]);



  const formik = PagesIndex.useFormik({
    initialValues: {
      date: "",
    },
    validate: (values) => {
   
    },

    onSubmit: async (values) => {
     
    },
  });

  const fields = [
  
    {
      name: "date",
      label: "Search By Approve Date",
      type: "date",
      label_size: 12,
      col_size: 12,
    },
  ];


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
    Conditions: "",
    Visiblity: true,
    
    type: "button",
  },
  {
    id: 1,
    buttonName: "Delete Result",
    buttonColor: "danger",
    route: "test",
    Conditions: "",
    Visiblity: false,
    type: "button",
  },
 
];

const cardLayouts = [
  {
    size: 12,
    body: (
      <div>
         <PagesIndex.Formikform
                fieldtype={fields.filter((field) => !field.showWhen)}
                show_submit={true}
                formik={formik}
                button_Size={"w-15"}
                btn_name="Submit"
              />
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
      title="Credit Requests : UPI"
      add_button={false}
      cardLayouts={cardLayouts}

    />
    </>
  );
};

export default CreditRequest;
