import React from 'react'
import PagesIndex from '../../PagesIndex'

const ManualRequest = () => {
  const columns = [
    {
      name: "User Name",
      selector: (row) => row.name,
    },

    {
      name: "Contact No.",
      selector: (row) => row.mobileNumber,
    },
    {
      name: "UPI Name",
      selector: (row) => row.mobileNumber,
    },
    {
      name: "UTR No.",
      selector: (row) => row.mobileNumber,
    },
    {
      name: "ScreenShot",
      selector: (row) => row.mobileNumber,
    },
    {
      name: "Amount",
      selector: (row) => row.mobileNumber,
    },
    {
      name: "Type",
      selector: (row) => row.mobileNumber,
    },
    {
      name: "Date & Time",
      selector: (row) => row.mobileNumber,
    },
  ];

  const data = [
    {
      id: 1,
      name: "test",
      mobileNumber: "000000000000",
    },
    {
      id: 2,
      name: "tsssstt",
      mobileNumber: "000000000000",
    },
    {
      id: 3,
      name: "tttttt",
      mobileNumber: "000000000000",
    },
  ];

    const tabs = [
    { title: 'Pending Request', content: <PagesIndex.Data_Table columns={columns} data={data} /> },

    
  ];

  return (
   <PagesIndex.Main_Containt title="Manual Payment Request">
       <PagesIndex.MultiTabs tabs={tabs}/>
   </PagesIndex.Main_Containt>
  )
}

export default ManualRequest