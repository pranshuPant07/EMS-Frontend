// /* eslint-disable no-lone-blocks */
// //   FUNCTION TO UPDATE USER DATA INTO DATABASE

// //   const handleUpdates = async (e) => {
// //     e.preventDefault();
// //     setErrorInVerification("");
// //     SetIsEditing(false)
// //     setDatalogout(false);
// //     setLoading(true);
// //     try {
// //       const formData = new FormData();
// //       formData.append('Name', upName);
// //       formData.append('Dateofjoin', formatDate(upDateofjoin));
// //       formData.append('Department', upupdatedDepartment);
// //       if (upupdatedPhoto) {
// //         formData.append('photo', upupdatedPhoto);
// //       }
// //       await axios.put(`http://192.168.3.14:5000/update-user/${userID}`, formData);
// //       setTimeout(() => {
// //         setLoading(false);
// //         setDatalogout(true);
// //         Swal.fire({
// //           title: "SUCCESS",
// //           text: "Updated data has been saved",
// //           icon: "success",
// //         });
// //       }, 2000)
// //     } catch (error) {
// //       // Handle errors from the update API call
// //       setLoading(false);
// //       setDatalogout(true)
// //       if (error.response) {
// //         const errorMessage = error.response.data.message || "An error occurred during the update.";
// //         setErrorInVerification(errorMessage);
// //         Swal.fire('Error', errorMessage, 'error');
// //       } else {
// //         Swal.fire('Error', 'No response from the server.', 'error');
// //       }
// //     } finally {
// //       fetchuserData(); // Fetch updated user data
// //     }

// //     // Scroll to top after a delay
// //     setTimeout(() => {
// //       window.scrollTo({
// //         top: 0,
// //         behavior: 'smooth',
// //       });
// //     }, 1200);
// //   };




// // const handleDelete = async (e, id) => {
// //   e.stopPropagation();
// //   setViewModal(false);
// //   setLoading(true);
// //   setDatalogout(false);

// //   try {
// //     // Verify the code first
// //     const res = await axios.post("http://192.168.3.14:5000/api/verify", { code: code });

// //     if (res.status === 200) {
// //       const result = await Swal.fire({
// //         title: "Are you sure?",
// //         text: "You won't be able to revert this!",
// //         icon: "warning",
// //         showCancelButton: true,
// //         confirmButtonColor: "#3085d6",
// //         cancelButtonColor: "#d33",
// //         confirmButtonText: "Yes, delete it!"
// //       });

// //       if (result.isConfirmed) {
// //         await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
// //         await deletee(id); // Call the delete function
// //         Swal.fire({
// //           title: "Deleted!",
// //           text: "Employee's data has been deleted.",
// //           icon: "success",
// //         });
// //       }
// //     }
// //   } catch (error) {
// //     setLoading(false);
// //     // Handle errors from the verification API call
// //     if (error.response) {
// //       const errorMessage = error.response.data.message || "An error occurred during verification.";
// //       Swal.fire('Verification failed', errorMessage, 'error');
// //     } else {
// //       Swal.fire('Error', 'No response from the server.', 'error');
// //     }
// //   } finally {
// //     setLoading(false);
// //     setDatalogout(true);
// //     // Reset the code input field for verification
// //     setCode("");
// //   }













// // TO DISPLAY VALIDATION IN SIGNUP
// {/* <ul>
//                   <li style={{ color: errors.length ? 'red' : 'green' }}>
//                     {errors.length ? 'At least 10 characters long' : '✓ At least 10 characters long'}
//                   </li>
//                   <li style={{ color: errors.uppercase ? 'red' : 'green' }}>
//                     {errors.uppercase ? 'At least one uppercase letter' : '✓ At least one uppercase letter'}
//                   </li>
//                   <li style={{ color: errors.lowercase ? 'red' : 'green' }}>
//                     {errors.lowercase ? 'At least one lowercase letter' : '✓ At least one lowercase letter'}
//                   </li>
//                   <li style={{ color: errors.number ? 'red' : 'green' }}>
//                     {errors.number ? 'At least one number' : '✓ At least one number'}
//                   </li>
//                   <li style={{ color: errors.specialChar ? 'red' : 'green' }}>
//                     {errors.specialChar ? 'At least one special character' : '✓ At least one special character'}
//                   </li>
//                 </ul> */}







// //VALIDATE FUNCTION FOR SIGNUP FORM

// // const validatePassword = (password) => {
// //   const lengthValid = password.length >= 10;
// //   const uppercaseValid = /[A-Z]/.test(password);
// //   const lowercaseValid = /[a-z]/.test(password);
// //   const numberValid = /[0-9]/.test(password);
// //   const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);

// //   setErrors({
// //     length: !lengthValid,
// //     uppercase: !uppercaseValid,
// //     lowercase: !lowercaseValid,
// //     number: !numberValid,
// //     specialChar: !specialCharValid,
// //   });

// //   return lengthValid && uppercaseValid && lowercaseValid && numberValid && specialCharValid;
// // };




// // {
// //   modal &&
// //   <FormToAdd
// //     onClose={() => setModal(false)}
// //     setempName={setempName}
// //     setempMobileNumber={setempMobileNumber}
// //     Employee={Employee}
// //     Mobilenumber={Mobilenumber}
// //     Namee={Namee}
// //     Mobilenumberr={Mobilenumberr}
// //     Errors={Errors}
// //     setDate={setDate}
// //     date={date}
// //     setPhoto={setPhoto}
// //     setErrors={setErrors}
// //     setOptions={setOptions}
// //     option={options}
// //   />
// // }



// // //FUNCTION TO ADD EMPLOYEE DATA TO DATABASE
// // const   = async (e) => {
// // };


// //FUNCTION TO VALIDATE INPUT FIELDS
// // const validate = () => {
// //   const newErrors = [];

// //   // Validate username
// //   if (!Name.trim()) {
// //     newErrors.Namee = 'Name is required';
// //   }
// //   // Validate Mobilenumber
// //   if (!Mobilenumber) {
// //     newErrors.mobileNumber = 'Mobile number is required';
// //   } else if (!/^\d{10}$/.test(Mobilenumber)) {
// //     newErrors.mobileNumber = 'Mobile number must be 10 digits';
// //   }

// //   setErrors(newErrors);
// //   // Return true if no errors
// //   return Object.keys(newErrors).length === 0;
// // };



// //FUNCTION TO HANDLE UPDATE
// // const handleUpdates = async (e) => {
// //   e.preventDefault();
// //   setErrorInVerification("");
// //   setLoading(true);

// //   try {
// //     // Verify the code first
// //     const res = await axios.post("http://192.168.3.14:5000/api/verify", { code: code });
// //     if (res.status === 200) {
// //       setVerifyModal(false);
// //       const formData = new FormData();
// //       formData.append('Name', upName);
// //       formData.append('Dateofjoin', formatDate(upDateofjoin));
// //       formData.append('Department', upupdatedDepartment);
// //       if (upupdatedPhoto) {
// //         formData.append('photo', upupdatedPhoto);
// //       }

// //       setDatalogout(false);

// //       await axios.put(`http://192.168.3.14:5000/update-user/${userID}`, formData);
// //       setCode("");

// //       await delay(1200);
// //       setLoading(false);
// //       setDatalogout(true);
// //       Swal.fire({
// //         title: "SUCCESS",
// //         text: "Updated data has been saved",
// //         icon: "success"
// //       });

// //       fetchuserData();
// //     }
// //   } catch (error) {
// //     setLoading(false);
// //     if (error.response) {
// //       const errorMessage = error.response.data.message || "An error occurred during verification.";
// //       setErrorInVerification(errorMessage);
// //     } else {
// //       Swal.fire('Error', 'No response from the server.', 'error');
// //     }
// //   } finally {
// //     window.scrollTo({
// //       top: 0,
// //       behavior: 'smooth'
// //     });
// //   }
// // };





// //STATES FOR EDITING USER
// // const [upName, setupName] = useState('');
// // const [upMobilenumber, setupMobileNumber] = useState('');
// // const [upDateofjoin, setupDateOfJoin] = useState('');
// // const [upErrors, setupErrors] = useState('');
// // const [upupdatedPhoto, setupUpdatedPhoto] = useState(null);
// // const [upupdatedDepartment, setupUpdatedDepartment] = useState('');

// // {
// //   isEditing &&
// //   <EditUser
// //     isOpen={isEditing}
// //     onUpdate={handleUpdate}
// //     handleEditClick={handleEditClick}
// //     onClose={handleCloseModal}
// //     onClosee={() => SetIsEditing(false)}
// //     setDatalogout={setDatalogout}
// //     setViewModal={setViewModal}
// //     setVerifyModal={setVerifyModal}
// //     setCode={setCode}
// //     code={code}
// //     SetIsEditing={SetIsEditing}
// //     setName={setupName}
// //     setMobileNumber={setupMobileNumber}
// //     setDateOfJoin={setupDateOfJoin}
// //     setErrors={setupErrors}
// //     setUpdatedPhoto={setupUpdatedPhoto}
// //     setUpdatedDepartment={setupUpdatedDepartment}

// //     Name={upName}
// //     Mobilenumber={upMobilenumber}
// //     Dateofjoin={upDateofjoin}
// //     Errors={upErrors}
// //     updatedDepartment={upupdatedDepartment}
// //   />
// // }

// //USEEFFECT TO FETCH SELECETED EMPLOYEE USING IT'S USERID AND DISPLAY THAT FETCHED USER DETAILS IN EDIT FORM POPUP
// // useEffect(() => {
// //   if (userID && isEditing) {
// //     const fetchUserDetails = async () => {
// //       try {
// //         // const response = await axios.get(`http://192.168.3.14:5000/api/employees/${userID}`);
// //         const response = await axios.get(`http://192.168.1.10:5000/api/employees/${userID}`);
// //         const user = response.data;
// //         setupName(user.Name);
// //         setupMobileNumber(user.Mobilenumber);
// //         setupUpdatedDepartment(user.Department);
// //         setupDateOfJoin(user.Dateofjoin);
// //       } catch (error) {
// //         console.error('Error fetching user details:', error);
// //       }
// //     };

// //     fetchUserDetails();
// //   }
// // }, [userID, isEditing]);
















// const LastPostIndex = currentPage * postsPerPage;
// const firstPostIndex = LastPostIndex - postsPerPage;

// //Filtering and Sorting
// const filteredEmployees = Employee.filter(employee => {
//   const mobileNumberString = String(employee.Mobilenumber);
//   const isNumericSearchTerm = !isNaN(searchTerm) && searchTerm.trim() !== '';

//   const matchesSearchTerm = employee.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (isNumericSearchTerm && mobileNumberString.includes(searchTerm));
//   const matchesDepartment = selectedOption === '' || employee.Department === selectedOption;

//   return matchesSearchTerm && matchesDepartment;
// });

// const currentEmployees = filteredEmployees.slice(firstPostIndex, LastPostIndex);

// const navigate = useNavigate();
// const hasData = Employee.length > 0;

// //USEEFFECT TO FETCH EMPLOYEE DATA
// useEffect(() => {
//   // Fetch user data from an API
//   fetchuserData();
// }, []);

// //USEEFFECT TO FETCH TODAY's DATE
// useEffect(() => {
//   // Get today's date in YYYY-MM-DD format
//   const today = new Date().toISOString().split('T')[0];
//   formatDate(setDate(today));
// }, []);

// const options = [
//   { value: '', label: 'Select' },
//   { value: 'Manager', label: 'Manager' },
//   { value: 'Admin Department', label: 'Admin Department' },
//   { value: 'Maintenance Department', label: 'Maintenance Department' },
//   { value: 'HR Department', label: 'HR Department' },
//   { value: 'IT Department', label: 'IT Department' },
//   { value: 'Support Department', label: 'Support Department' },
//   { value: 'Sales Department', label: 'Sales Department' },
//   { value: 'Helper', label: 'Helper' }
// ]

// //FUNCTION FOR FILTER AND SORTING
// const searchByQuery = (e) => {
//   const query = e.target.value;
//   setSearchTerm(query);
// };

// //FUNCTION TO HANDLE EDIT BUTTON CLICK
// const handleEditClick = (e, userId) => {
//   e.stopPropagation();
//   setUserID(userId);
//   SetIsEditing(true);
// };

// //FUNCTION TO HANDLE SEARCH BY DEPARTMENT FROM OPTIONS FOR FILTERATION
// const handleSearchByDepartment = (e) => {
//   setSelectedOption(e.target.value);
// };

// //FUNCTION TO REFRESH EMPLOYEE DATA AFTER EMPLOYEE DATA UPDATED
// const handleUpdate = () => {
//   // Logic to refresh user data if needed
//   fetchuserData();
// };

// //FUNCTION FOR MAKING A UPLOAD POPUP MODAL TRUE
// const UploadEmp = async () => {
//   setUploadModal(true)
// }

// //FUNCTION TO GET SERIAL NUMBER
// const getSerialNumber = (index) => {
//   return (currentPage - 1) * 6 + index + 1;
// };

// //FUNCTION TO HANDLE VIEW POPUP ON CLICK
// const handle_View = async (id) => {
//   setSeletedEmp(id);
//   setViewModal(true)
// }

// // //FUCTION TO FETCH USER DATA FROM DATABASE
// const fetchuserData = async (e) => {
//   try {
//     // const response = await axios.get("http://192.168.3.14:5000/api/users");
//     const response = await axios.get("http://192.168.1.10:5000/api/users");
//     const data = await response.data;
//     setEmployee(data);
//   } catch (error) {
//     console.log(error)
//   }
// }

// //FUNCTION TO HANDLE CLOSE MODAL
// const handleCloseModal = () => {
//   SetIsEditing(false);
//   setUserID(null);
// };

// //Function to Handle Delete
// const handleDelete = async (e, id) => {
//   e.stopPropagation();
//   setLoading(true);
//   setDatalogout(false)
//   try {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     });

//     if (result.isConfirmed) {
//       await delay(1000);
//       await deletee(id); // Call the delete function
//       Swal.fire({
//         title: "Deleted!",
//         text: "Employee's data has been deleted.",
//         icon: "success",
//       });
//     }

//   } catch (error) {
//     // Optionally handle errors
//     console.error('Error occurred during delete:', error);
//   } finally {
//     setLoading(false);
//     setDatalogout(true);
//   }
// };

// // FUNCTION TO DELETE EMPLOYEE DATA FROM DATABASE
// const deletee = async (id) => {
//   try {
//     // await axios.delete(`http://192.168.3.14:5000/api/items/${id}`);
//     await axios.delete(`http://192.168.1.10:5000/api/items/${id}`);
//     fetchuserData();
//     setLoading(false)
//   } catch (error) {
//     console.error('There was an error deleting the item!', error);
//     setLoading(false)
//   }
// };

// //FUNCTION TO LOGOUT FROM FORM PAGE TO LOGIN PAGE
// const logout = (e) => {
//   setDatalogout(false)
//   Swal.fire({
//     title: "Are you sure?",
//     text: "you want to log out",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "logout"
//   }).then(async (result) => {
//     if (result.isConfirmed) {
//       setLoading(true);
//       localStorage.removeItem('authToken'); // Remove token from localStorage
//       await delay(1500);
//       setLoading(false);
//       navigate("/", { replace: true });
//     }
//     else {
//       setDatalogout(true)
//     }
//   });
// }

// const HandleAddEmp = (e) => {
//   e.stopPropagation();
//   setpopupModal(true)
//   setMode("Add")
// }

// const handleEditEmp = (e, id) => {
//   e.stopPropagation();
//   setUserID(id)
//   setpopupModal(true)
//   setMode("Edit")
// }

// //FUNCTION TO HANDLE UPLOADING EXCEL FILE DATA TO DATABASE
// const onUpload = async () => {

//   if (!file) {
//     setMessage('Please choose a file first.');
//     return;
//   }
//   setLoading(true);
//   setDatalogout(false);
//   try {
//     setUploadModal(false);
//     setProcessing(true);
//     await delay(1000);

//     const formData = new FormData();
//     formData.append('file', file);

//     // Perform the file upload
//     // const response = await axios.post('http://192.168.3.14:5000/upload', formData, {
//     const response = await axios.post('http://192.168.1.10:5000/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     const { data } = response;
//     console.log('Upload response data:', data);

//     if (data.invalidEmployees.length > 0) {
//       setResponse(data.invalidEmployees);
//       setErrorMessage(data.errorMessage || 'Some records are invalid or already exist');
//       setErrorModal(true);
//     } else {
//       await delay(1200);
//       Swal.fire({
//         position: 'center',
//         icon: 'success',
//         title: 'Employee data has been saved',
//         showConfirmButton: false,
//         timer: 1200,
//       });
//       fetchuserData()
//     }

//   } catch (error) {
//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       text: `Error uploading file: ${error.response?.data || error.message}`,
//     });
//   } finally {

//     setLoading(false);
//     setProcessing(false);
//     setDatalogout(true);
//     fetchuserData(); // Update the employee data
//     setUploadModal(false); // Ensure the upload modal is closed
//     setFile(null);
//     setMessage('')
//   }
// }

// //FUNCTION TO HANDLE EXPORTING DATA FROM DATABASE
// const handleExport = async () => {
//   setLoading(true)
//   setDatalogout(false)
//   Swal.fire({
//     title: "Do you want to download the file?",
//     showDenyButton: true,
//     showCancelButton: true,
//     confirmButtonText: "EXCEL",
//     denyButtonText: `PDF`
//   }).then(async (result) => {
//     setLoading(true)
//     if (result.isConfirmed) {
//       Swal.fire({
//         title: "Done!",
//         text: "Your file will be avaiable for download shortly.",
//         icon: "info"
//       });
//       await delay(3000);
//       axios({
//         // url: 'http://192.168.3.14:5000/export/employees',
//         url: 'http://192.168.1.10:5000/export/employees',
//         method: 'GET',
//         responseType: 'blob',
//       }).then((response) => {
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', 'employees.xlsx');
//         document.body.appendChild(link);
//         link.click();
//       }).catch((error) => {
//         console.error('Error exporting data:', error);
//       });
//       setLoading(false)
//       setDatalogout(true);
//     } else if (result.isDenied) {
//       setLoading(true)
//       Swal.fire({
//         title: "Done!",
//         text: "Your file will be avaiable for download shortly.",
//         icon: "info"
//       });
//       await delay(3000);
//       try {
//         // const response = await axios.get('http://192.168.3.14:5000/download-employees', {
//         const response = await axios.get('http://192.168.1.10:5000/download-employees', {
//           responseType: 'blob', // Important for handling binary data
//         });

//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', 'employees.pdf'); // Set the file name
//         document.body.appendChild(link);
//         link.click();
//         link.remove(); // Remove the link element after the download

//         // Optionally, you could also revoke the object URL after use
//         window.URL.revokeObjectURL(url);
//       } catch (error) {
//         console.error('Error downloading the PDF:', error);
//         // Handle errors as needed
//       }
//       setLoading(false)
//       setDatalogout(true)
//     }
//     else {
//       setLoading(false)
//       setDatalogout(true)
//     }
//   });
// }


// Handle file upload
//   const onUpload = async () => {
//     if (!state.file) {
//       updateState({ message: 'Please choose a file first.' });
//       return;
//     }
//     updateState({ loading: true, datalogout: false });
//     try {
//       updateState({ uploadModal: false, processing: true });
//       await delay(1000);

//       const formData = new FormData();
//       formData.append('file', state.file);

//       // const response = await axios.post('http://192.168.1.10:5000/upload', formData, {
//       const response = await axios.post('http://192.168.3.14:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const { data } = response;
//       if (data.invalidEmployees.length > 0) {
//         updateState({ response: data.invalidEmployees, errorMessage: data.errorMessage || 'Some records are invalid or already exist', ErrorModal: true });
//       } else {
//         await delay(1200);
//         Swal.fire({
//           position: 'center',
//           icon: 'success',
//           title: 'Employee data has been saved',
//           showConfirmButton: false,
//           timer: 1200,
//         });
//         fetchuserData();
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: `Error uploading file: ${error.response?.data || error.message}`,
//       });
//     } finally {
//       updateState({ loading: false, processing: false, datalogout: true, uploadModal: false, file: null, message: '' });
//     }
//   };


// import React, { useState } from 'react'
// import '../Style/FormToAdd.css'
// import { formatDate } from '../Component/dateFormat';

// function FormToAdd(props) {
//   const [option, setOption] = useState('');

//   //FUNCTION TO HANDLE MOBILE NUMBER LENGTH SHOULD NOT BE EXCEED 10 AND SAVING THAT NUMBER INTO STATE
//   const handleChange = (e) => {
//     const { value } = e.target;
//     props.setErrors("");

//     // Check if the length is less than or equal to 10 
//     if (value.length <= 10) {
//       props.setempMobileNumber(value);
//     }
//   }
//   //FUNCTION TO HANDLE INPUT NAME AND SAVE THAT NAME INTO STATE
//   const handleName = (e) => {
//     props.setErrors("")
//     props.setempName(e.target.value)
//   }

//   //OPTIONS TO SELECT FOR DEPARTMENT
//   const options = [
//     { value: '', label: 'Select Department' },
//     { value: 'Manager', label: 'Manager' },
//     { value: 'Admin Department', label: 'Admin Department' },
//     { value: 'Maintenance Department', label: 'Maintenance Department' },
//     { value: 'HR Department', label: 'HR Department' },
//     { value: 'IT Department', label: 'IT Department' },
//     { value: 'Support Department', label: 'Support Department' },
//     { value: 'Sales Department', label: 'Sales Department' },
//     { value: 'Helper', label: 'Helper' }
//   ]

//   //FUNCTION TO HANDLE SELECT DEPARTMENT FROM OPTIONS
//   const handleOptionChange = (e) => {
//     setOption(e.target.value)
//     props.setOptions(e.target.value)
//   }

//   return (
//     <div className='addPageMain'>
//       <div className='inputAreaAgain'>
//         <div className='headingAndButton'>
//           <h1>ADD EMPLOYEE</h1>
//           <button onClick={props.onClose}>X</button>
//         </div>
//         <div className='area'>
//           <input type='text' placeholder='Enter your name' onChange={handleName} />
//           {props.Errors.Namee && <p style={{ color: 'red' }}>{props.Errors.Namee}</p>}
//           <input type='number' placeholder='Enter your mobile number' onChange={handleChange} value={props.Mobilenumber} />
//           {props.Errors.mobileNumber && <p style={{ color: 'red' }}>{props.Errors.mobileNumber}</p>}
//           <select
//             id="select-input"
//             value={option}
//             onChange={handleOptionChange}
//           >
//             {options.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//           <input type='file' placeholder='upload Image' name='image' accept='image/*' onChange={(e) => props.setPhoto(e.target.files[0])} />
//           <input type='date' placeholder='Enter your date of join' onChange={(e) => { formatDate(props.setDate(e.target.value)) }} value={props.date} />
//           {props.Errors && <p style={{ color: 'red' }}>{props.Errors}</p>}
//           <button onClick={props.addData}>Add</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FormToAdd



// import React from 'react'
// import './../Style/FormToEdit.css'
// import { formatDate } from '../Component/dateFormat';

// const EditUser = ({ onClose,
//   setVerifyModal,
//   setName,
//   setMobileNumber,
//   setDateOfJoin,
//   setUpdatedPhoto,
//   setUpdatedDepartment,
//   Name,
//   Mobilenumber,
//   Dateofjoin,
//   Errors,
//   updatedDepartment,
//   SetIsEditing,
//   handleUpdates
// }) => {

//   //OPTIONS TO SELECT FOR DEPARTMENT
//   const options = [
//     { value: '', label: 'Select Department' },
//     { value: 'Manager', label: 'Manager' },
//     { value: 'Admin Department', label: 'Admin Department' },
//     { value: 'Maintenance Department', label: 'Maintenance Department' },
//     { value: 'HR Department', label: 'HR Department' },
//     { value: 'IT Department', label: 'IT Department' },
//     { value: 'Support Department', label: 'Support Department' },
//     { value: 'Sales Department', label: 'Sales Department' },
//     { value: 'Helper', label: 'Helper' }
//   ]

//   //FUNCTION TO HANDLE DATE AND CHANGING FORMAT OF DATE AND SAVING IT INTO STATE
//   const handleDate = (e) => {
//     const { value } = e.target;
//     setDateOfJoin(formatDate(value))
//   }

//   //FUNCTION TO HANDLE NAME CHANGE AND SAVE IT INTO STATE
//   const handleName = (e) => {
//     const { value } = e.target;
//     setName(value)
//   }

//   //FUNCTION TO HANDLE DEPARTMENT SELECT AND SAVE IT INTO STATE
//   const handleOption = (e) => {
//     const { value } = e.target;
//     setUpdatedDepartment(value)
//   }

//   //FUNCTION TO HANDLE UPDATE CLICK
//   const checkUpdate = (e) => {
//     setVerifyModal(true);
//     SetIsEditing(false);
//   }

//   //FUNCTION TO CONVERT DATE FORMAT
//   function convertDateFormat(dateString) {
//     // Create a date object from the string
//     const date = new Date(dateString);

//     // Check if the date is valid
//     if (isNaN(date.getTime())) {
//       return 'Invalid Date';
//     }

//     // Format the date as YYYY-MM-DD
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;


//   }

//   return (
//     <div className='addPageMainn'>
//       <div className='inputAreaAgainn'>
//         <div className='headingAndButtonn'>
//           <h1>Editing User's Data</h1>
//           <button onClick={onClose}>X</button>
//         </div>
//         <div className='areaa'>
//           <input placeholder='Enter employee name'
//             value={Name}
//             onChange={handleName}
//           />
//           {Errors.Namee && <p style={{ color: 'red' }}>{Errors.Namee}</p>}
//           <input
//             placeholder='Enter employee mobile number'
//             disabled
//             value={Mobilenumber}
//           />
//           {Errors.mobileNumber && <p style={{ color: 'red' }}>{Errors.mobileNumber}</p>}
//           <input
//             type='file'
//             name='image'
//             accept='image/*'
//             placeholder='Upload your new photo'
//             onChange={(e) => setUpdatedPhoto(e.target.files[0])}
//           />
//           <select
//             id="select-input"
//             value={updatedDepartment}
//             onChange={handleOption}
//           >
//             {options.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>

//           <input placeholder='Enter employee date of join'
//             value={convertDateFormat(Dateofjoin)}
//             type="date"
//             onChange={handleDate}
//           />
//           {Errors && <p style={{ color: 'red' }}>{Errors}</p>}
//           <button onClick={checkUpdate}>Update</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EditUser