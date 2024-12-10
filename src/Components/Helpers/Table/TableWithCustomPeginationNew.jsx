import React, { useState, useEffect } from "react";

const CustomTable = ({
  fetchData,
  columns,
  UserFullButtonList,
  showIndex,
  Refresh,
}) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [TotalPages, setTotalPages] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [isResponsive, setIsResponsive] = useState(window.innerWidth < 425);
  const [Refresh1, setRefresh1] = useState(false);

  const fetchTableData = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchData(page, rowsPerPage);
      setRefresh1(!Refresh1);
      setData(result.mainRes || []);
      setFilteredData(result.mainRes || []);
      setTotalPages(result.totalRows);
      // setRefresh1();
    } catch (err) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [Refresh, page, rowsPerPage]);

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
      columns.some(
        (field) =>
          !field.isButton &&
          row[field.value]
            ?.toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    );

    setFilteredData(searchResults);
  }, [data, sortConfig, searchQuery]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const totalPages = Math.ceil(TotalPages && TotalPages / rowsPerPage);

  const renderButton = (field, row) => {
    const buttonText =
      typeof field.value === "function" ? field.value(row) : field.value;
    return (
      <button
        key={field.name}
        // className={`btn btn-${field.buttonColor} btn-sm`}
        onClick={() => field.Conditions(row)}
        className={`btn ${
          typeof field.buttonColor === "function"
            ? `btn-${field.buttonColor(row)}`
            : field.buttonColor
            ? `btn-${field.buttonColor}`
            : "unblock-btn"
        } btn-sm me-2`}
      >
        {buttonText}
      </button>
    );
  };

  const handleResize = () => {
    setIsResponsive(window.innerWidth < 425);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="container">
      <div className="row d-flex">
        <div className=" align-items-center col-md-4">
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
        <div className=" ms-auto col-md-3">
          <label htmlFor="rowsPerPage" className="form-label me-2">
            Search
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table
          id="myTable"
          className={`table table-striped table-bordered  ${
            isResponsive ? "table-responsive" : ""
          }`}
        >
          <thead className="primary-color text-center table-header-backeground">
            <tr>
              {showIndex && <th>#</th>}
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.value)}
                  style={{ cursor: col.sortable ? "pointer" : "default" }}
                >
                  {col.name}
                  {sortConfig.key === col.value && (
                    <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                {showIndex && <td>{(page - 1) * rowsPerPage + index + 1}</td>}
                {columns.map((field) => (
                  <td
                    key={field.value}
                    style={field.style ? field.style(row) : {}}
                    onClick={() => {
                      if (field.onClick) {
                        field.onClick(row);
                      }
                    }}
                  >
                    {field.render
                      ? field.render(row)
                      : field.transform
                      ? field.transform(row[field.value], row)
                      : field.isButton
                      ? renderButton(field, row)
                      : row[field.value]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <nav>
        <ul className="pagination justify-content-end">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              First
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
            >
              Last
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CustomTable;
