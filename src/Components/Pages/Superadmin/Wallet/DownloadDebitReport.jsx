import React from 'react'
import PagesIndex from '../../PagesIndex'

const DownloadDebitReport = () => {
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
          name: "Bank",
          selector: (row) => row.year,
        },
        {
          name: "IFSC",
          selector: (row) => row.year,
        },
        {
          name: "A/C NO",
          selector: (row) => row.year,
        },
        {
          name: "Amt",
          selector: (row) => row.year,
        },
        {
          name: "Date",
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
          searchType: "",
          reportType: "",
          date: "",
        },
        validate: (values) => {
        },
    
        onSubmit: async (values) => {
        },
      });
    
      const fields = [
        {
          name: "searchType",
          label: "Search Type",
          type: "select",
          label_size: 12,
          col_size: 4,
          options: [
            {
              label: "Approved",
              value: "Approved",
            },
            {
              label: "Pending",
              value: "Pending",
            },
          ],
        },
        {
          name: "reportType",
          label: "Report Type",
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
          name: "date",
          label: "Report Date",
          type: "date",
          label_size: 12,
          col_size: 4,
        },
      ];
  return (
    <PagesIndex.WalletMain title="Sales Report" columns={columns} data={data} fields={fields} formik={formik} approvebtn={false} totalAmount={false} showsubmitbtn={false}/>

  )
}

export default DownloadDebitReport