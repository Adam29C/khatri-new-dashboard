import React from "react";
import PagesIndex from "../../PagesIndex";

const DeleteUsers = () => {
  //get token in localstorage
  const token = localStorage.getItem("token");

  //all state
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [deletedUserData, setDeletedUserData] = PagesIndex.useState([]);
  const [timehistoryData, setTimehistoryData] = PagesIndex.useState([]);
  const [updatedData, setUpdatedData] = PagesIndex.useState({});

  //get deleted user api
  const getDeletedUserList = async () => {
    const payload = {
      page: 1,
      limit: 20,
      searchQuery: SearchInTable,
    };
    const res = await PagesIndex.admin_services.GET_DELETED_USERS_API(
      payload,
      token
    );
    if (res?.status) {
      setDeletedUserData(res?.data);
    }
  };

  //get deleted user with time history
  const getDeletedUserTimeHistoryList = async () => {
    const res =
      await PagesIndex.admin_services.DELETED_USERS_GET_TIMEHISTORY_API(token);
    if (res?.status) {
      setTimehistoryData(res?.data);
    }
  };

  //call getDeletedUserList in useeffect
  PagesIndex.useEffect(() => {
    getDeletedUserList();
    getDeletedUserTimeHistoryList();
  }, []);

  const visibleFields = ["id", "name", "username", "mobile"];

  const UserFullButtonList = [];

  // Handle field changes
  const handleFieldChange = (field, value, row) => {
    setUpdatedData((prev) => ({
      ...prev,
      [row._id]: {
        ...prev[row._id],
        [field]: value,
      },
    }));
  };

  // Submit handler
  const handleSubmit = async () => {
    console.log(updatedData)
    const timeList = timehistoryData.map((item) => ({
      _id: item._id,
      deleteTime: updatedData[item._id]?.deleteTime || item.deleteTime,
      description: updatedData[item._id]?.description || item.description,
      isActive: updatedData[item._id]?.isActive || item.isActive,
      name: item.name,
    }));

    // Send payload to API
    const payload = { timeList };
    const res = await PagesIndex.admin_services.DELETED_USERS_TIMEHISTORY_API(
      payload,
      token
    );

    if (res?.status) {
      PagesIndex.toast.success(res?.message);
      getDeletedUserTimeHistoryList();
      setUpdatedData({});
    } else {
      PagesIndex.toast.error(res?.message);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
    },

    {
      name: "deleteTime",
      selector: (row) => (
        <div>
          <input
            class="deleted-user-field"
            type="text"
            value={updatedData[row._id]?.deleteTime || row.deleteTime}
            onChange={(e) => {
              handleFieldChange("deleteTime", e.target.value, row);
            }}
          />
        </div>
      ),
    },
    {
      name: "description",
      selector: (row) => (
        <div>
           <textarea
            class="deleted-user-field"
            type="textarea"
            value={updatedData[row._id]?.description || row.description}
            onChange={(e) => {
              handleFieldChange("description", e.target.value, row);
            }}
          />
        </div>
      ),
    },

    {
      name: "Is Active",
      selector: (row) => (
        <div>
          <select
            className="p-1"
            aria-label="Default select example"
            value={updatedData[row._id]?.isActive || row.isActive}
            onChange={(e) => {
              handleFieldChange("isActive", e.target.value, row);
            }}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
      ),
    },
  ];

  const cardLayouts = [
    {
      size: 12,
      body: (
        <div>
          <div>
            <h4 class="profile-note-title mt-0 mb-4">View All Users</h4>
          </div>
          <PagesIndex.TableWitCustomPegination
            data={deletedUserData}
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
    {
      size: 12,
      body: (
        <div>
          <div className="delete-user-main">
            <h4 class="profile-note-title mt-0 mb-4">Delete All Users Data</h4>
            <button className="btn btn-info" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <PagesIndex.Data_Table columns={columns} data={timehistoryData} />
        </div>
      ),
    },
  ];

  return (
    <>
      <PagesIndex.Split_Main_Containt
        title="All User"
        add_button={false}
        cardLayouts={cardLayouts}
      />
      <PagesIndex.toast />
    </>
  );
};

export default DeleteUsers;
