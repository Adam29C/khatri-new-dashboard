import React from "react";
import PagesIndex from "../../PagesIndex";

const App = () => {
  const token = localStorage.getItem("token");

  const fetchData = async (page, rowsPerPage, searchQuery = "") => {
    const payload = {
      page: page,
      limit: rowsPerPage,
      searchQuery,
    };

    try {
      const response = await PagesIndex.admin_services.USERS_LIST_API(
        payload,
        token
      );
      const totalRows = response?.recordsTotal || 50;
      const startIndex = (page - 1) * rowsPerPage;

      let mainRes = response.data;

      return { mainRes, totalRows };
    } catch {
      console.log("rtestr");
    }
  };
  PagesIndex.useEffect(() => {
    fetchData();
  }, []);

  const visibleFields = [
    {
      name: "Name",
      value: "name",
      sortable: true,
    },
    {
      name: "User Name",
      value: "username",
      sortable: false,
    },
    {
      name: "Mobile",
      value: "mobile",
      sortable: true,
    },
    {
      name: "Device Name",
      value: "deviceName",
      sortable: true,
    },
    {
      name: "Device-Id",
      value: "deviceId",
      sortable: true,
    },
    {
      name: "Created At",
      value: "CreatedAt",
      sortable: true,
    },
    {
      name: "Block",
      value: "Block",
      sortable: true,
      isButton: true,
      renderButton: (row) => {
        setGetBannedData(row.banned);
        BlockUserAndRemoveUser(row, 1);
      },
    },
    {
      name: "Block",
      value: "block",
      isButton: true, // Indicates this column contains buttons
    },
    {
      name: "Profile",
      value: "Profile",
      isButton: true, // Indicates this column contains buttons
    },
    // {
    //   name: "Profile",
    //   value: "Profile",
    //   sortable: true,
    // },
    // {
    //   name: "Delete",
    //   value: "Delete",
    //   sortable: true,
    // },
  ];

  return (
    <PagesIndex.Main_Containt
      add_button={false}
      route="/admin/user/add"
      title="All Users"
    >
      <PagesIndex.TableWithCustomPeginationNew
        fetchData={fetchData}
        columns={visibleFields}
        UserFullButtonList={UserFullButtonList}
        showIndex={true}
      />
    </PagesIndex.Main_Containt>
  );
};

export default App;
