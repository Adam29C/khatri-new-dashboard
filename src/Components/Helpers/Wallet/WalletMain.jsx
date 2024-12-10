import React from "react";
import PagesIndex from "../../Pages/PagesIndex";
import ReusableModal from "../Modal/ReusableModal";

const WalletMain = ({
  title,
  TableData,
  fields,
  formik,
  totalAmount,
  UserFullButtonList,
  visibleFields,
  setSearchInTable,
  SearchInTable,
  setModalState,
  ModalState,
  handleBtnStatus,
  btnStatus,
  todayReportData,
  UserFullButtonList1,
  visibleFields1
}) => {

  const cardLayouts = [
    {
      size: 12,
      body: (
        <div>
          <PagesIndex.Formikform
            fieldtype={fields?.filter((field) => !field.showWhen)}
            formik={formik}
            btn_name={"Get Report"}
            button_Size={"w-15"}
            show_submit={true}
          />

          <div className="report-btn-main mt-3">
           
            <button onClick={() => handleBtnStatus("see-report")} className="approve-btn">See Report</button>
          </div>
        </div>
      ),
    },

    {
      size: 12,
      body: (
        <div>

          <button onClick={() => handleBtnStatus("approve-all")} className="approve-btn">
            Approve All
          </button>

          <PagesIndex.TableWitCustomPegination
            data={TableData}
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
          <h3 className="ml-3 mb-3 fw-bold">Total Amount {totalAmount}/-</h3>
        </div>
      ),
    },
  ];
  return (
    <>
      <PagesIndex.Split_Main_Containt
        title={title}
        add_button={false}
        cardLayouts={cardLayouts}
      />
      <ReusableModal
        ModalTitle={btnStatus === "see-report" ? "Today Approved Report" :"Approve All"  }
        ModalState={ModalState}
        setModalState={setModalState}
        ModalBody={
         <>
         {
          btnStatus === "approve-all" ? ( <div className="">
            <h1 className="confirm-payment-text">
              Are You Sure Want To Confirm Payment?
            </h1>
            <div className="d-flex justify-content-end">
              <button className="btn btn-dark  mx-2">Confirm</button>
              <button
                onClick={() => setModalState(false)}
                className="btn btn-dark  mx-2"
              >
                Close
              </button>
            </div>
          </div>) : ( <PagesIndex.TableWitCustomPegination
                data={todayReportData}
                UserFullButtonList={UserFullButtonList1}
                initialRowsPerPage={5}
                SearchInTable={SearchInTable}
                visibleFields={visibleFields1}
                searchInput={
                  <input
                    type="text"
                    placeholder="Search..."
                    value={SearchInTable}
                    onChange={(e) => setSearchInTable(e.target.value)}
                    className="form-control ms-auto"
                  />
                }
              />)
         }
         
         </>
        }
      />
    </>
  );
};

export default WalletMain;
