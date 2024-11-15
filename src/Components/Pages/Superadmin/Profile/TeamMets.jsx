import React from "react";
import PagesIndex from "../../PagesIndex";

const TeamMets = () => {
  const { getEmployeeListState } = PagesIndex.useSelector(
    (state) => state.SuperAdminSlice
  );

  const dispatch = PagesIndex.useDispatch();
  const userId = localStorage.getItem("userId");

  PagesIndex.useEffect(() => {
    dispatch(PagesIndex.getEmployeeList(userId));
  }, []);

  const handleBlockEmployee = async (id, isBlock) => {
    try {
      let apidata = {
        adminId: userId,
        empId: id,
        isBlock: !isBlock,
      };

      const res = await PagesIndex.admin_services.BLOCK_EMPLOYEE_API(apidata);

      if (res?.status === 200) {
        PagesIndex.toast.success(res?.message);
        dispatch(PagesIndex.getEmployeeList(userId));
      } else {
        PagesIndex.toast.error(res?.message);
      }
    } catch (error) {
      PagesIndex.toast.error(error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title-text text-center">
          Bhau777 Games Team Members
        </h3>
        {getEmployeeListState &&
          getEmployeeListState?.map((row) => (
            <div>
              <div className="media media-reply">
                <img
                  className="circle-rounded"
                  src={PagesIndex.empLogo}
                  width={90}
                  height={50}
                  alt="Logo"
                />

                <div className="">
                  <h5 className="">{row?.employeeName}</h5>
                  <p>Bhau777 Employee</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleBlockEmployee(row?._id, row?.isBlock)}
                  class={`btn ${row?.isBlock ? "unblock-btn" : "btn-danger"} `}
                >
                  {row?.isBlock ? "Unblock" : "Block"}
                </button>
              </div>
              <hr />
            </div>
          ))}
      </div>
    </div>
  );
};

export default TeamMets;
