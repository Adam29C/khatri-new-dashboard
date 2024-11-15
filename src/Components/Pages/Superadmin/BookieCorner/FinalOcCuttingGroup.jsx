import React from "react";
import PagesIndex from "../../PagesIndex";

const FinalOcCuttingGroup = () => {
  const tableHeaders = ["Type", "Bids", "Amount"];

  const tableRows = [
    ["Pana", 274, 274],
    ["Single Digit", 274, 274],
    ["Grand Total", 924000, 92480],
  ];

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Year",
      selector: (row) => row.year,
    },
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];

  const formik = PagesIndex.useFormik({
    initialValues: {
      date: "",
      gamesession: "",
      providername: "",
    },
    validate: (values) => {},

    onSubmit: async (values) => {
    
    },
  });

  const fields = [
    {
      name: "date",
      label: "Start Date",
      type: "date",
      label_size: 12,
      col_size: 4,
    },

    {
      name: "providername",
      label: "Provider Name",
      type: "select",
      label_size: 12,
      col_size: 4,
      options: [
        {
          label: "Shridevi",
          value: "Shridevi",
        },
        {
          label: "Time Bazar",
          value: "timebazar",
        },
      ],
    },

    {
      name: "gamesession",
      label: "Game Session",
      type: "select",
      label_size: 12,
      col_size: 4,
      options: [
        {
          label: "Open",
          value: "open",
        },
        {
          label: "Close",
          value: "close",
        },
      ],
    },
  ];

  return (
    <div>
      <PagesIndex.CuttingGroupMain
        tableHeaders={tableHeaders}
        tableRows={tableRows}
        columns={columns}
        data={data}
        fields={fields}
        formik={formik}
        title={"Final OC Cutting Group"}
      />
    </div>
  );
};

export default FinalOcCuttingGroup;
