import React, { useEffect, useMemo } from "react";
import PagesIndex from "../../PagesIndex";

const ManualRequest = () => {
  //get token in localstorage
  const token = localStorage.getItem("token");
  const [activeTabIndex, setActiveTabIndex] = PagesIndex.useState(0);
  const [data, setData] = PagesIndex.useState([]);

  // Log the corresponding tab name
  const tabTitles = ["pending", "approve", "decline"];

  const getFundRequestList = async () => {
    const status = tabTitles[activeTabIndex];
    const res = await PagesIndex.admin_services.FUND_REQUEST_LIST_API(
      status,
      token
    );
    if (res?.status) {
      setData(res?.data);
    }
  };

  useEffect(() => {
    getFundRequestList();
  }, [activeTabIndex]);

 

  const columns = [
    {
      name: "User Name",
      selector: (row) => row.userName,
    },

    {
      name: "Contact No.",
      selector: (row) => row.mobileNumber,
    },
    {
      name: "UPI Name",
      selector: (row) => row.upiId,
    },
    {
      name: "UTR No.",
      selector: (row) => row.utrNumber,
    },
    {
      name: "ScreenShot",
      selector: (row) => row.imageUrl,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Type",
      selector: (row) => (
        <div>
          <select
            className="p-1"
            aria-label="Default select example"
            value={row.status}
            // value={updatedData[row._id]?.status || row.status}
            onChange={(e) => {
              // handleFieldChange("isActive", e.target.value, row);
            }}
          >
            <option disabled value="pending">
              Pending
            </option>
            <option value="approve">Approve</option>
            <option value="decline">Decline</option>
          </select>
        </div>
      ),
    },
    {
      name: "Date & Time",
      selector: (row) => row.createdAt,
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
      <PagesIndex.MultiTabs
        tabs={tabs}
        activeTabIndex={activeTabIndex}
        onTabSelect={(index) => {
          setActiveTabIndex(index); // Update active tab index
        }}
      />
    </PagesIndex.Main_Containt>
  );
};

export default ManualRequest;
