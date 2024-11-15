import React from 'react'
import PagesIndex from '../../PagesIndex';

const ViewWallet = () => {
  
  const columns = [
    {
      name: "Username",
      selector: (row) => row.title,
    },
    {
      name: "Fullname",
      selector: (row) => row.year,
    },
    {
      name: "Mobile",
      selector: (row) => row.year,
    },
    {
      name: "Balance",
      selector: (row) => row.year,
    },
    {
      name: "Last Updated",
      selector: (row) => row.year,
    },
    {
      name: "C/D History",
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
    <PagesIndex.WalletMain title="View Wallet" columns={columns} data={data}    showForm={true}/>
  )
}

export default ViewWallet