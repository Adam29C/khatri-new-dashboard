// src/components/CustomDatePicker.js
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ field, formik, setDateStates, dateStates }) => {
  const handleDateChange = (date, name) => {
    const formattedTime = date
      ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "";
    setDateStates((prevStates) => ({
      ...prevStates,
      [name]: formattedTime,
    }));
    formik.setFieldValue(name, formattedTime);
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
            className={`col-lg-${field.col_size} form-control Date-picker-control`}
            name={field.name}
            selected={dateStates[field.name]}
            onChange={(date) => handleDateChange(date, field.name)}
            {...formik.getFieldProps(field.name)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={5}
            timeCaption="Time"
            dateFormat="h:mm aa"
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
