import React from 'react'
import PagesIndex from '../../PagesIndex'
import { show } from '../../../Utils/Common_Date';

const UsersIdeas = () => {
  const [loading, setLoading] = PagesIndex.useState(false);
  const [data, setData] = PagesIndex.useState([]);

  const userId = localStorage.getItem("userId");

  const getList = async () => {
    setLoading(true);
    try {
      const res = await PagesIndex.admin_services.GET_USERS_IDEAS(userId);
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
      name: "Idea",
      selector: (row) => row?.idea,
    },
    {
      name: "User Name",
      selector: (row) => row?.username,
    },

    {
      name: "Is Approved Idea",
      selector: (row) => (
        <span
          className={`badge fw-bold ${
            row.approveIdea ? "bg-primary" : "bg-danger"
          }`}
        >
          {row.approveIdea ? "Approved" : "Not-Approved"}
        </span>
      ),
    },
    {
      name: "Submitted At",
      selector: (row) => show(row?.createdAt),
    },

  ];

  return (
    <PagesIndex.Main_Containt add_button={false} 
    title="Users Idea's">
 <PagesIndex.Data_Table
      isLoading={loading}
      columns={columns}
      data={data}

    />
  </PagesIndex.Main_Containt>
  )
}

export default UsersIdeas
