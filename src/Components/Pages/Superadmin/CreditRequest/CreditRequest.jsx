import React from 'react'
import PagesIndex from "../../PagesIndex";
const CreditRequest = () => {



  const columns = [
    {
      name: "Username",
      selector: (row) => row.title,
    },
    {
      name: "Name",
      selector: (row) => row.year,
    },
    {
      name: "Mobile",
      selector: (row) => row.year,
    },
    {
      name: "Status",
      selector: (row) => row.year,
    },
    {
      name: "Time",
      selector: (row) => row.year,
    },
    {
      name: "Mode",
      selector: (row) => row.year,
    },
    {
      name: "Amount",
      selector: (row) => row.year,
    }
   
   
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
    },
    validate: (values) => {
   
    },

    onSubmit: async (values) => {
     
    },
  });

  const fields = [
  
    {
      name: "date",
      label: "Search By Approve Date",
      type: "date",
      label_size: 12,
      col_size: 12,
    },
  ];
let amount = "Approved : 0"
  return (
    <>
  <PagesIndex.WalletMain title="Declined Report" columns={columns} data={data} fields={fields} formik={formik}  totalAmount={true} showsubmitbtn={true} amount={amount}/>
    </>
  );
};

export default CreditRequest;
