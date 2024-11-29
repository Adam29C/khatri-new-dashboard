import React, { useState, useEffect } from "react";

const PaginatedTable = ({
  data,
  initialRowsPerPage = 5,
  visibleFields,
  UserFullButtonList,
  showIndex,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [filteredData, setFilteredData] = useState(data || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const maxPagesToShow = 5; // Max pages to show in pagination at a time

  // Sort and Filter data
  useEffect(() => {
    let sortedData = [...data];

    // Apply sorting
    if (sortConfig.key) {
      sortedData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    // Apply search filtering
    const searchResults = sortedData.filter((row) =>
      visibleFields.some(
        (field) =>
          !field.isButton &&
          row[field.value]
            ?.toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    );

    setFilteredData(searchResults || []);
    setCurrentPage(1); // Reset to first page on search/sort
  }, [searchQuery, data, visibleFields, sortConfig]);

  // Handle column header click for sorting
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        // Toggle sort direction if same column
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      // Default to ascending sort
      return { key, direction: "asc" };
    });
  };

  // Pagination details
  const totalPages = Math.ceil(filteredData?.length / rowsPerPage);
  const currentData = filteredData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Calculate the range of pages to display
  const startPage =
    Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  // Render buttons dynamically
  const renderButton = (field, row) => {
    const buttonConfig = UserFullButtonList.find(
      (btn) => btn.value === field.value
    );
    if (!buttonConfig) return null;

    return (
      <button
        key={buttonConfig.buttonName}
        className={`btn btn-${buttonConfig.buttonColor} btn-sm`}
        onClick={() => buttonConfig.Conditions(row)}
      >
        {buttonConfig.buttonName}
      </button>
    );
  };

  return (
    <div className="container">
      {/* Controls */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <label htmlFor="rowsPerPage" className="form-label me-2">
            Show:
          </label>
          <select
            id="rowsPerPage"
            className="form-select w-auto"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            {[5, 10, 25, 50].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
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
      <table className="table table-striped table-bordered">
        <thead className="primary-color text-center">
          <tr>
            {showIndex && <th>#</th>}
            {visibleFields.map((field) => (
              <th
                key={field.value}
                onClick={() => handleSort(field.value)}
                style={{ cursor: "pointer" }}
              >
                {field.name}
                {sortConfig.key === field.value && (
                  <span>{sortConfig.direction === "asc" ? " ↑ " : " ↓ "}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {currentData?.length ? (
            currentData.map((row, index) => (
              <>
                <tr key={index}>
                {showIndex && (
                  <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                )}
                  {visibleFields.map((field) => (
                    <td key={field.value}>
                      {field.render
                        ? field.render(row) // Custom render function
                        : field.transform
                        ? field.transform(row[field.value]) // Custom transformation
                        :field.isButton
                        ? renderButton(field, row): row[field.value]}
                    </td>
                  ))}
                </tr>
              </>
            ))
          ) : (
            <tr>
              <td colSpan={visibleFields.length + (showIndex ? 1 : 0)}>
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-end">
          {/* "First" Button */}
          {currentPage > 1 && (
            <li className="page-item">
              <button className="page-link" onClick={() => setCurrentPage(1)}>
                First
              </button>
            </li>
          )}
          {/* "Previous" Button */}
          {currentPage > 1 && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
            </li>
          )}

          {/* Range of Pages */}
          {startPage > 1 && <li className="page-item disabled"></li>}
          {[...Array(endPage - startPage + 1)].map((_, i) => {
            const pageNum = startPage + i;
            return (
              <li
                key={pageNum}
                className={`page-item ${
                  currentPage === pageNum ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              </li>
            );
          })}
          {endPage < totalPages && <li className="page-item disabled"></li>}

          {/* "Next" Button */}
          {currentPage < totalPages && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </li>
          )}

          {/* "Last" Button */}
          {currentPage < totalPages && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => setCurrentPage(totalPages)}
              >
                Last
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default PaginatedTable;
