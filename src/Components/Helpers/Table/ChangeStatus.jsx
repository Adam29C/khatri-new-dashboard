import React, { useEffect, useState } from "react";

const ChangeStatus = ({ rowData, apiRoute, checkboxStatus, req }) => {
  const userId = localStorage.getItem("userId");
  
  const [isChecked, setIsChecked] = useState(checkboxStatus);

  

  useEffect(() => {
    setIsChecked(checkboxStatus);
  }, [checkboxStatus]);

  const updateStatus = async () => {
    setIsChecked(!isChecked);

    try {
      await apiRoute({ adminId: userId, ...req, isBlock: !isChecked });

    } catch (error) {
      
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
