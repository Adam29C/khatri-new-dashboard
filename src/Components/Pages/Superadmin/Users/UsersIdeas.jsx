import React from "react";
import PagesIndex from "../../PagesIndex";
import { show } from "../../../Utils/Common_Date";

const UsersIdeas = () => {
  
  //get token in localstorage
  const token = localStorage.getItem("token");

  //all state
  const [data, setData] = PagesIndex.useState([]);
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");

  //get useridea list function
  const getList = async () => {
    try {
      const payload = {
        page: 1,
        limit: 10,
        searchQuery: SearchInTable,
      };
      const res = await PagesIndex.common_services.GET_USERS_IDEAS(payload,token);
      if (res?.status) {
        setData(res?.data);
      }
    } catch (error) {
    } 
  };

  PagesIndex.useEffect(() => {
    getList();
  }, []);

  const visibleFields = ["id","idea","username","createdAt"];

  return (
    <PagesIndex.Main_Containt add_button={false} title="Users Idea's">
      <PagesIndex.TableWitCustomPegination
        data={data}
        initialRowsPerPage={5}
        SearchInTable={SearchInTable}
        visibleFields={visibleFields}
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
    </PagesIndex.Main_Containt>
  );
};

export default UsersIdeas;
