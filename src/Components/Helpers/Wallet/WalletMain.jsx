import React from "react";
import PagesIndex from "../../Pages/PagesIndex";

const WalletMain = ({
  title,
  columns,
  data,
  fields,
  formik,
  approvebtn,
  totalAmount,
  showsubmitbtn,
  showForm,
  amount
}) => {

  return (
    <PagesIndex.Main_Containt title={title}>
      <div className="row">
        <div className="col-lg-12 col-xl-12">
          {!showForm ? (      
            <div className="card shadow-lg">
            <div className="card-body">
              <PagesIndex.Formikform
                fieldtype={fields.filter((field) => !field.showWhen)}
                formik={formik}
                btn_name={"Submit"}
                button_Size={"w-15"}
                show_submit={showsubmitbtn ? true : false}
              />
              {!showsubmitbtn ? (
                <div className="report-btn-main mt-3">
                  <button className="report-btn mr-3">Get Report</button>
                  <button className="report-btn">See Report</button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
         ):""} 
    
        </div>

        <div className="col-lg-12 col-xl-12">
          <div className="card shadow-lg">
            <div className="card-body p-0">
              {approvebtn ? (
                <button className="approve-btn">Approve All</button>
              ) : (
                ""
              )}
              <PagesIndex.Data_Table columns={columns} data={data} />
              {totalAmount ? (
                <h3 className="ml-3 mb-3 fw-bold">Total Amount {amount}/-</h3>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <PagesIndex.Toast />
    </PagesIndex.Main_Containt>
  );
};

export default WalletMain;
