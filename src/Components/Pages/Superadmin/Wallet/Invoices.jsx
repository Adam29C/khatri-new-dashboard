import React from 'react'
import PagesIndex from '../../PagesIndex'

const Invoices = () => {
  
  const columns = [
    {
      name: "Username",
      selector: (row) => row.title,
    },
    {
      name: "Bank",
      selector: (row) => row.year,
    },
    {
      name: "Account",
      selector: (row) => row.year,
    },
    {
      name: "IFSC",
      selector: (row) => row.year,
    },
    {
      name: "Acc Holder",
      selector: (row) => row.year,
    },
    {
      name: "Paytm",
      selector: (row) => row.year,
    },
    {
      name: "History",
      selector: (cell, row) => (
        <div style={{ width: "120px" }}>
          <div>
            <PagesIndex.Link to="#" >
              <span data-toggle="tooltip" data-placement="top" title="Edit">
                <i class="ti-eye fs-5 mx-1 "></i>
              </span>
            </PagesIndex.Link>

    
          </div>
        </div>
      ),
    },

   
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];




  return (
    <PagesIndex.WalletMain title="Profile Change History" columns={columns} data={data}    showForm={true}/>
  )
}

export default Invoices