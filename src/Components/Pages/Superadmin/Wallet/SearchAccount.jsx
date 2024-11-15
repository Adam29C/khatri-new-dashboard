import React from 'react'
import PagesIndex from '../../PagesIndex';

const SearchAccount = () => {
  const columns = [
    {
      name: "Username",
      selector: (row) => row.title,
    },
    {
      name: "Acc Holder",
      selector: (row) => row.year,
    },
    {
      name: "A/C NO",
      selector: (row) => row.year,
    },
    {
      name: "Bank",
      selector: (row) => row.year,
    },
    {
      name: "IFSC",
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
          accountNumber: "",
          
        },
        validate: (values) => {
        },
    
        onSubmit: async (values) => {
        },
      });
    
      const fields = [
        {
          name: "accountNumber",
          label: "User Account Number",
          type: "text",
          label_size: 12,
          col_size: 12,
        }
       
      ];
  return (
    <PagesIndex.WalletMain title="Sales Report" columns={columns} data={data} fields={fields} formik={formik} approvebtn={false} totalAmount={false} showsubmitbtn={true}/>
)
}

export default SearchAccount