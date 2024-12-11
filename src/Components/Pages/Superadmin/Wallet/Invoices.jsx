import React from 'react'
import PagesIndex from '../../PagesIndex'
import ReusableModal from '../../../Helpers/Modal/ReusableModal';

const Invoices = () => {

  const token = localStorage.getItem("token");

  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [TableData, setTableData] = PagesIndex.useState([]);
  const [viewHistory, setViewHistory] = PagesIndex.useState([]);
  const [modalState, setModalState] = PagesIndex.useState(false);
  
  console.log(viewHistory)

  const visibleFields = [
    "id",
    "username",
    "bank_name",
    "account_no",
    "ifsc_code",
    "account_holder_name",
    "paytm_number"
  ];
  const visibleFields1 = [
    "id",
    "old_bank_name",
    "old_acc_no",
    "old_ifsc",
    "old_acc_name",
    "old_paytm_no",
    "changeDate"
  ];

  const getList = async () => {
    const payload = {
      page: 1,
      limit: 10,
      searchQuery: SearchInTable,
    };
    const res = await PagesIndex.admin_services.GET_WALLET_INVOICE_PROFILE_CHANGE_API(payload, token);
    if(res?.status){
      setTableData(res?.records);
    }
  };

  PagesIndex.useEffect(() => {
    getList();
  }, []);

  const handleViewHistory = (row)=>{
    
    setViewHistory(row?.changeDetails)
    setModalState(true)
  }


  const UserFullButtonList = [
    {
      id: 0,
      buttonName: "View Chnage History",
      buttonColor: "info",
      route: "",
      Conditions: (row) => {
        handleViewHistory(row)
      },
      Visiblity: true,
      type: "button",
    },
 
  ];

  return (
    <PagesIndex.Main_Containt
    add_button={false}
    title="Profile Change History"
  >
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
    
    <ReusableModal
        ModalTitle={"Change History"}
        ModalState={modalState}
        setModalState={setModalState}
        ModalBody={
          <>
           <PagesIndex.TableWitCustomPegination
                data={viewHistory}
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
              />
          </>
        }
      />
      <PagesIndex.Toast />
      </PagesIndex.Main_Containt>
    )
}

export default Invoices