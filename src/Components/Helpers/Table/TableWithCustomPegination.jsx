import React, { useState, useEffect } from "react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import PagesIndex from "../../Pages/PagesIndex";
const PaginatedTable = ({
  data,
  initialRowsPerPage = 5,
  SearchInTable,
  visibleFields,
  additional,
  UserFullButtonList,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  //
  const columns = useMemo(() => {
    if (data.length > 0) {
      return Object.keys(data[0]).map((key) => ({
        header: key.charAt(0).toUpperCase() + key.slice(1),
        field: key,
        visible: visibleFields.includes(key),
      }));
    }
    return [];
  }, [data, visibleFields]);

  const ddd = () => {
    const filtered = data.filter((row) =>
      columns.some((column) =>
        row[column.field]
          ?.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    ddd();
  }, [searchQuery, data, columns]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Get current page data
  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle rows per page change
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  // Render pagination items
  const renderPagination = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <label htmlFor="rowsPerPage" className="form-label me-2">
            Show:
          </label>
          <select
            id="rowsPerPage"
            className="form-select w-auto"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <table className="table table-striped table-bordered table-responsive">
        <thead className="text-center table-header-backeground">
          <tr>
            <th>ID</th>

            {columns.map(
              (column, id) =>
                column.visible && (
                  <>
                    <th key={column.field}>{column.header}</th>
                  </>
                )
            )}

            {UserFullButtonList.map((items) => {
              return (
                <>
                  <th>{items.buttonName}</th>
                </>
              );
            })}
          </tr>
        </thead>
        <tbody className="text-center">
          {/* {currentData.length > 0 ? (
            <>
              {currentData.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {columns.map((column) =>
                    column.visible ? (
                      <>
                        <td key={column.field}>{row[column.field]}</td>

                        {UserFullButtonList.length - 1 &&
                          UserFullButtonList.map((items) => {
                            return (
                              <>
                                <td>
                                  {items.type === "link" ? (
                                    <Link
                                      to={items.route}
                                      className={`btn btn-${items.buttonColor} btn-sm me-2`}
                                    >
                                      {items.buttonName}
                                    </Link>
                                  ) : items.type === "button" ? (
                                    <button
                                      className={`btn btn-${items.buttonColor} btn-sm me-2`}
                                      onClick={() => items.Conditions(row)}
                                    >
                                      {items.buttonName}
                                    </button>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </>
                            );
                          })}
                      </>
                    ) : (
                      ""
                    )
                  )}
                </tr>
              ))}
            </>
          ) : (
            <span>No Data Available</span>
          )}

          {additional && (
            <tr>
              <td colSpan={3}>{additional}</td>
            </tr>
          )} */}

          {currentData.length > 0 ? (
            <>
              {currentData.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {columns.map((column) =>
                    column.visible ? (
                      <td key={column.field}>{row[column.field]}</td>
                    ) : null
                  )}

                  {/* Render buttons only in the last column */}
                  {UserFullButtonList.length > 0 &&
                    UserFullButtonList.map((items) => {
                      return (
                        <td>
                          <span key={items.buttonName}>
                            {items.type === "link" ? (
                              <Link
                                to={items.route}
                                className={`btn btn-${items.buttonColor} btn-sm me-2`}
                              >
                                {items.buttonName}
                              </Link>
                            ) : items.type === "button" ? (
                              <button
                                className={`btn btn-${items.buttonColor} btn-sm me-2`}
                                onClick={() => items.Conditions(row)}
                              >
                                {items.buttonName}
                              </button>
                            ) : items.type === "check" ? (
                              <PagesIndex.ChangeStatus
                                apiRoute={""}
                                req={""}
                                checkboxStatus={""}
                                rowData={""}
                              />
                            ) : null}
                          </span>
                        </td>
                      );
                    })}
                </tr>
              ))}
            </>
          ) : (
            <span>No Data Available</span>
          )}

          {additional && (
            <tr>
              <td colSpan={columns.length + 1}>{additional}</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-end">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {renderPagination()}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginatedTable;

// import React, { useState, useEffect } from "react";
// import { useMemo } from "react";
// import { useNavigate } from "react-router-dom";

// const PaginatedTable = ({
//   data,
//   initialRowsPerPage = 5,
//   visibleFields,
//   additional,
// }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
//   const [filteredData, setFilteredData] = useState(data);
//   const [searchQuery, setSearchQuery] = useState("");

//   const navigate = useNavigate(); // React Router's navigation function

//   const columns = useMemo(() => {
//     if (data.length > 0) {
//       return Object.keys(data[0]).map((key) => ({
//         header: key.charAt(0).toUpperCase() + key.slice(1),
//         field: key,
//         visible: visibleFields.includes(key),
//       }));
//     }
//     return [];
//   }, [data, visibleFields]);

//   const filterData = () => {
//     const filtered = data.filter((row) =>
//       columns.some((column) =>
//         row[column.field]
//           ?.toString()
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase())
//       )
//     );
//     setFilteredData(filtered);
//     setCurrentPage(1);
//   };

//   useEffect(() => {
//     filterData();
//   }, [searchQuery, data, columns]);

//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);

//   const currentData = filteredData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(Number(event.target.value));
//     setCurrentPage(1);
//   };

//   const handleProfileClick = (id) => {
//     console.log("ididid", id);

//     // Navigate to the profile page with the ID as a query parameter or dynamic route
//     // navigate(`/profile/${id}`);
//   };

//   const renderPagination = () => {
//     let pages = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(
//         <li
//           key={i}
//           className={`page-item ${i === currentPage ? "active" : ""}`}
//         >
//           <button className="page-link" onClick={() => setCurrentPage(i)}>
//             {i}
//           </button>
//         </li>
//       );
//     }
//     return pages;
//   };

//   return (
//     <div className="container">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <div className="d-flex align-items-center">
//           <label htmlFor="rowsPerPage" className="form-label me-2">
//             Show:
//           </label>
//           <select
//             id="rowsPerPage"
//             className="form-select w-auto"
//             value={rowsPerPage}
//             onChange={handleRowsPerPageChange}
//           >
//             <option value="5">5</option>
//             <option value="10">10</option>
//             <option value="25">25</option>
//             <option value="50">50</option>
//           </select>
//         </div>
//         <div>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <table className="table table-striped table-bordered">
//         <thead className="text-center table-header-backeground">
//           <tr>
//             <th>ID</th>
//             {columns.map(
//               (column) =>
//                 column.visible && <th key={column.field}>{column.header}</th>
//             )}
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody className="text-center">
//           {currentData.length > 0 ? (
//             currentData.map((row, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 {columns.map(
//                   (column) =>
//                     column.visible && (
//                       <td key={column.field}>{row[column.field]}</td>
//                     )
//                 )}
//                 <td>
//                   <button
//                     className="btn btn-primary btn-sm me-2"
//                     onClick={() => handleProfileClick(row._id)}
//                   >
//                     Profile
//                   </button>
//                   <button
//                     className="btn btn-warning btn-sm me-2"
//                     onClick={() => alert(`Editing ID ${row.id}`)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => alert(`Deleting ID ${row.id}`)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={columns.length + 2}>No Data Available</td>
//             </tr>
//           )}

//           {additional && (
//             <tr>
//               <td colSpan={columns.length + 2}>{additional}</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <nav>
//         <ul className="pagination justify-content-end">
//           <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//             <button
//               className="page-link"
//               onClick={() => setCurrentPage(currentPage - 1)}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//           </li>
//           {renderPagination()}
//           <li
//             className={`page-item ${
//               currentPage === totalPages ? "disabled" : ""
//             }`}
//           >
//             <button
//               className="page-link"
//               onClick={() => setCurrentPage(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default PaginatedTable;
