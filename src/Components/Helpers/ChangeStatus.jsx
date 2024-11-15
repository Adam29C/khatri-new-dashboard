
import React, { useEffect, useState } from "react";
import PagesIndex from "../Pages/PagesIndex";

const ChangeStatus = ({ rowData, apiRoute, checkboxStatus, req }) => {
  const userId = localStorage.getItem("userId");

  const [isChecked, setIsChecked] = useState(checkboxStatus);

  useEffect(() => {
    setIsChecked(checkboxStatus);
  }, [checkboxStatus]);

  const updateStatus = async () => {
    setIsChecked(!isChecked);
    const res = await apiRoute({ adminId: userId, ...req, isBlock: !isChecked });
    if(res.status === 200){
      PagesIndex.toast.success(res.message)
    }else{
      PagesIndex.toast.error(res.response.data.message)
    }
  };

  return (
    <div>
      <label className="switch">
        <input
          type="checkbox"
          id="employee-switch"
          checked={isChecked}
          onChange={updateStatus}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ChangeStatus;