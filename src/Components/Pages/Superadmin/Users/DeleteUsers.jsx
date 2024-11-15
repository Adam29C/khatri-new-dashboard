import React from "react";
import PagesIndex from "../../PagesIndex";

const DeleteUsers = () => {
  const [loading, setLoading] = PagesIndex.useState(false);
  const [data, setData] = PagesIndex.useState([]);

  const userId = localStorage.getItem("userId");

  const getList = async () => {
    setLoading(true);
    try {
      const res = await PagesIndex.admin_services.GET_DELETED_USERS(userId);
      setData(res?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  PagesIndex.useEffect(() => {
    getList();
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
    },
    {
      name: "User Name",
      selector: (row) => row?.username,
    },
    {
      name: "Mobile No.",
      selector: (row) => row?.mobile,
    },
    {
      name: "Device Name",
      selector: (row) => row?.deviceName,
    },
    {
      name: "Device Id",
      selector: (row) => row?.deviceId,
    },
    {
      name: "Reason",
      selector: (row) => row?.reason,
    },
  ];

  return (
    <PagesIndex.Main_Containt add_button={false} title="All Deleted Users">
      <PagesIndex.Data_Table
        isLoading={loading}
        columns={columns}
        data={data}
      />
    </PagesIndex.Main_Containt>
  );
};

export default DeleteUsers;
