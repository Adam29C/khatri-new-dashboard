// import React, { useEffect, useState } from "react";
// import PagesIndex from "../../PagesIndex";
// import { Formik, FieldArray, ErrorMessage, useFormik } from "formik";

// import { toast } from "react-toastify";

// const HowToPlay = () => {
//   const userId = localStorage.getItem("userId");
//   const [htpData, setHtpData] = useState([]);
//   const [loading, setLoading] = PagesIndex.useState(true);
//   // Fetch data from API
//   const getHtpeData = async () => {
//     const res = await PagesIndex.admin_services.GET_HTP_LIST_API(userId);
//     if (res?.status === 200) {
//       setHtpData(res?.data);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getHtpeData();
//   }, []);

//   const initialValues = {
//     howtoplay: [],
//   };

//   const handleFormSubmit = async (values) => {
//     let apidata = {
//       adminId: userId,
//       htpId: htpData[0]?._id,
//       howtoplay: values.howtoplay,
//     };

//     const res = await PagesIndex.admin_services.UPDATE_HTP_API(apidata);
//     if (res.status === 200) {
//       toast.success(res.message);
//       getHtpeData();
//     } else {
//       toast.error(res.response.data.message);
//     }
//   };

//   return (
//     <PagesIndex.Main_Containt title="Update How To Play" col_size={12}>
//          {loading ? (
//         <PagesIndex.Loader lodersize={20} />
//       ) : (
//       <Formik
//         initialValues={initialValues}
//         validate={(values) => {
//           const errors = {};
//           values.howtoplay.forEach((item, index) => {
//             if (!item.title) {
//               if (!errors.howtoplay) errors.howtoplay = [];
//               errors.howtoplay[index] = { title: 'Title is required' };
//             }
//             if (!item.videoUrl) {
//               if (!errors.howtoplay) errors.howtoplay = [];
//               errors.howtoplay[index] = { ...errors.howtoplay[index], videoUrl: 'Video URL is required' };
//             }
//             if (!item.description) {
//               if (!errors.howtoplay) errors.howtoplay = [];
//               errors.howtoplay[index] = { ...errors.howtoplay[index], description: 'Description is required' };
//             }
//           });
//           return errors;
//         }}
//         onSubmit={handleFormSubmit}

//       >
//         {({
//           values,
//           handleChange,
//           handleBlur,
//           setFieldValue,
//           handleSubmit,
//           errors,

//           touched,
//         }) => {
//           useEffect(() => {
//             if (htpData.length > 0) {
//               const formattedData = htpData[0].howtoplay?.map((data) => ({
//                 title: data?.title || "",
//                 description: data?.description || "",
//                 videoUrl: data?.videoUrl || "",
//                 _id: data?._id || "",
//               }));
//               setFieldValue("howtoplay", formattedData);
//             }
//           }, [htpData, setFieldValue]);

//           return (
//             <form onSubmit={handleSubmit}>
//               <FieldArray name="howtoplay">
//                 {({ insert, remove, push }) => (
//                   <div className="">
//                     {values?.howtoplay?.length > 0 &&
//                       values?.howtoplay?.map((row, index) => (
//                         <div className="row htp-card" key={index}>
//                           <div className="col-lg-6">
//                             <label
//                               className={`custom-label  `}
//                               htmlFor={`howtoplay.${index}.title`}
//                             >
//                               Title
//                               <span className="text-danger">*</span>
//                             </label>
//                             <input
//                               name={`howtoplay.${index}.title`}
//                               placeholder="Enter Title"
//                               type="text"
//                               className="form-control"
//                               onChange={handleChange}
//                               onBlur={handleBlur}
//                               value={row.title}
//                             />

//                             {errors.howtoplay &&
//                               errors.howtoplay[index] &&
//                               errors.howtoplay[index].title &&
//                               touched &&
//                               touched.howtoplay &&
//                               touched.howtoplay[index] &&
//                               touched.howtoplay[index].title && (
//                                 <p className="error-text">
//                                   {errors.howtoplay[index].title}
//                                 </p>
//                               )}{" "}
//                           </div>
//                           <div className="col-lg-6 ">
//                             <label
//                               className={`custom-label  `}
//                               htmlFor={`howtoplay.${index}.videoUrl`}
//                             >
//                               Video URL
//                               <span className="text-danger">*</span>
//                             </label>

//                             <input
//                               name={`howtoplay.${index}.videoUrl`}
//                               placeholder="Enter Video URL"
//                               type="text"
//                               className="form-control"
//                               onChange={handleChange}
//                               onBlur={handleBlur}
//                               value={row.videoUrl}
//                               />
//                               {errors.howtoplay &&
//                                 errors.howtoplay[index] &&
//                                 errors.howtoplay[index].videoUrl &&
//                                 touched &&
//                                 touched.howtoplay &&
//                                 touched.howtoplay[index] &&
//                                 touched.howtoplay[index].videoUrl && (
//                                   <p className="error-text">
//                                     {errors.howtoplay[index].videoUrl}
//                                   </p>
//                                 )}{" "}
//                           </div>

//                           <div className="col-lg-12 mb-4 ">
//                             <label
//                               className={`custom-label   `}
//                               htmlFor={`howtoplay.${index}.description`}
//                             >
//                               Description
//                               <span className="text-danger">*</span>
//                             </label>

//                             <textarea
//                               name={`howtoplay.${index}.description`}
//                               placeholder="Enter Description"
//                               type="text"
//                               className="form-control"
//                               onChange={handleChange}
//                               onBlur={handleBlur}
//                               value={row.description}
//                               />
//                               {errors.howtoplay &&
//                                 errors.howtoplay[index] &&
//                                 errors.howtoplay[index].description &&
//                                 touched &&
//                                 touched.howtoplay &&
//                                 touched.howtoplay[index] &&
//                                 touched.howtoplay[index].description && (
//                                   <p className="error-text">
//                                     {errors.howtoplay[index].description}
//                                   </p>
//                                 )}{" "}
//                           </div>
//                           {index >= htpData[0].howtoplay?.length && (
//                             <div className="col ms-auto d-flex justify-content-end pl-2 mb-2">
//                               <button
//                                 type="button"
//                                 className="btn btn-danger"
//                                 onClick={() => remove(index)}
//                               >
//                                 Delete Row
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     <div className="d-flex justify-content-end gap-2 p-2">
//                       <button
//                         type="submit"
//                         className="btn  submitBtn "
//                       >
//                         Update
//                       </button>
//                       <button
//                         type="button"
//                         className="btn  submitBtn "
//                         onClick={() =>
//                           push({ title: "", description: "", videoUrl: "" })
//                         }
//                       >
//                         Add Row
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </FieldArray>
//             </form>
//           );
//         }}
//       </Formik>
//             )}
//       <PagesIndex.Toast />
//     </PagesIndex.Main_Containt>
//   );
// };

// export default HowToPlay;

import React from "react";

const HowToPlay = () => {
  return <div>HowToPlay</div>;
};

export default HowToPlay;
