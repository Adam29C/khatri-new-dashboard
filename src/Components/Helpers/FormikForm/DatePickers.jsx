// src/components/CustomDatePicker.js
import React from 'react';
import DatePicker from 'react-datepicker';

const CustomDatePicker = ({ field, formik, setDateStates, dateStates }) => {
  // const handleDateChange = (date, name) => {
  //   console.log(date)
  //   // const formattedTime = date
  //   //   ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  //   //   : "";
  //   setDateStates((prevStates) => ({
  //     ...prevStates,
  //     [field.name]: date,
  //   }));
  //   formik.setFieldValue(name, date);
  // };
  const handleDateChange = (date) => {
    const formattedDate = date
    ? `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
        .getDate()
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`
    : "";
    setDateStates((prevStates) => ({
      ...prevStates,
      [field.name]: date, // Store the selected date
    }));
    formik.setFieldValue(field.name, formattedDate); // Update Formik state
  };
  return (
    <div className={`col-lg-${field.col_size}`}>
      <div className="row flex-column">
        <label
          className={`custom-label col-lg-${field.label_size}`}
          htmlFor={field.name}
        >
          {field.label}
          <span className="text-danger">*</span>
        </label>
        <div className="d-flex">
          <DatePicker
            // className={`form-control`}
            // name={field.name}
            // selected={dateStates[field.name]}
            // onChange={(date) => handleDateChange(date, field.name)}
            // {...formik.getFieldProps(field.name)}
            // dateFormat="mm/dd/yyyy"
            className="form-control"
            selected={dateStates[field.name] || null} // Ensure a valid date object or null
            onChange={handleDateChange} // Handle date changes
            onBlur={() => formik.setFieldTouched(field.name, true)} // Mark field as touched
            dateFormat="MM/dd/yyyy"
          />
          <div className="invalid-feedback">
            Please enter {field.label}
          </div>
        </div>
        {formik.errors[field.name] && (
          <div className="error-text">
            {formik.errors[field.name]}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDatePicker;
