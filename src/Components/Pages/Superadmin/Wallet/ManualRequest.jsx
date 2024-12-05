import React from "react";
import PagesIndex from "../../PagesIndex";

const ManualRequest = () => {
  //get token in localstorage
  const token = localStorage.getItem("token")
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
    {
      title: "Pending Request",
      content: (
        <div className="mt-4">
          <PagesIndex.Data_Table columns={columns} data={data} />{" "}
          <h3 className="ml-3 mb-3 fw-bold">Total Amount 450/-</h3>
        </div>
      ),
    },
    {
      title: "Approved Request",
      content: (
        <div className="mt-4">
          <PagesIndex.Data_Table columns={columns} data={data} />{" "}
          <h3 className="ml-3 mb-3 fw-bold">Total Amount 50/-</h3>
        </div>
      ),
    },
    {
      title: "Declined Request",
      content: (
        <div className="mt-4">
          <PagesIndex.Data_Table columns={columns} data={data} />{" "}
          <h3 className="ml-3 mb-3 fw-bold">Total Amount 0/-</h3>
        </div>
      ),
    },
  ];

  return (
    <PagesIndex.Main_Containt title="Manual Payment Request">
      <PagesIndex.MultiTabs tabs={tabs} />
    </PagesIndex.Main_Containt>
  );
};

export default ManualRequest;
