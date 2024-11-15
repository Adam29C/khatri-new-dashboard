// import PagesIndex from "../../Pages/PagesIndex";

// const CuttingGroupMain = ({
//   tableHeaders,
//   tableRows,
//   columns,
//   data,
//   fields,
//   formik,
//   title,
// }) => {
//   const userId = localStorage.getItem("userId");
//   const navigate = PagesIndex.useNavigate();

//   return (
//     <>

//       <div className="content-body">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-lg-8 col-xl-8">
//               <div className="card">
//                 <div className="card-body">
//                   <PagesIndex.Formikform
//                     fieldtype={fields.filter((field) => !field.showWhen)}
//                     formik={formik}
//                     btn_name={"Submit"}
//                     button_Size={"w-25"}
//                     show_submit={true}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-4 col-xl-4">
//               <div className="card ">
//                 <div className="card-body p-0">
//                   <table class="table ">
//                     <thead>
//                       <tr className="table-secondary">
//                         <th scope="col">Type</th>
//                         <th scope="col">Bids</th>
//                         <th scope="col">Amount</th>

//       <PagesIndex.Main_Containt title={title} >
//         <div className="row">
//           <div className="col-lg-8 col-xl-8">
//             <div className="card shadow-lg">
//               <div className="card-body">
//                 <PagesIndex.Formikform
//                   fieldtype={fields.filter((field) => !field.showWhen)}
//                   formik={formik}
//                   btn_name={"Submit"}
//                   button_Size={"w-25"}
//                   show_submit={true}
//                 />
//               </div>
//             </div>{" "}
//           </div>
//           <div className="col-lg-4 col-xl-4">
//             <div className="card shadow-lg">
//               <div className="card-body p-0">
//                 <table class="table ">
//                   <thead>
//                     <tr className="table-secondary">
//                       {tableHeaders.map((header, index) => (
//                         <th key={index} scope="col">
//                           {header}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {tableRows.map((row, rowIndex) => (
//                       <tr key={rowIndex}>
//                         {row.map((cell, cellIndex) => (
//                           <td key={cellIndex}>{cell}</td>
//                         ))}

//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>{" "}
//           </div>
//           <div className="col-lg-12 col-xl-12">
//             <div className="card shadow-lg">
//               <div className="card-body p-0">
//                 <PagesIndex.Data_Table columns={columns} data={data} />
//               </div>
//             </div>{" "}
//           </div>
//         </div>
//         <PagesIndex.Toast />
//       </PagesIndex.Main_Containt>
//     </>
//   );
// };

// export default CuttingGroupMain;


import React from 'react'

const CuttingGroup = () => {
  return (
    <div>CuttingGroup</div>
  )
}

export default CuttingGroup