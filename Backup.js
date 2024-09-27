/* eslint-disable no-lone-blocks */
//   FUNCTION TO UPDATE USER DATA INTO DATABASE

//   const handleUpdates = async (e) => {
//     e.preventDefault();
//     setErrorInVerification("");
//     SetIsEditing(false)
//     setDatalogout(false);
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append('Name', upName);
//       formData.append('Dateofjoin', formatDate(upDateofjoin));
//       formData.append('Department', upupdatedDepartment);
//       if (upupdatedPhoto) {
//         formData.append('photo', upupdatedPhoto);
//       }
//       await axios.put(`http://192.168.3.14:5000/update-user/${userID}`, formData);
//       setTimeout(() => {
//         setLoading(false);
//         setDatalogout(true);
//         Swal.fire({
//           title: "SUCCESS",
//           text: "Updated data has been saved",
//           icon: "success",
//         });
//       }, 2000)
//     } catch (error) {
//       // Handle errors from the update API call
//       setLoading(false);
//       setDatalogout(true)
//       if (error.response) {
//         const errorMessage = error.response.data.message || "An error occurred during the update.";
//         setErrorInVerification(errorMessage);
//         Swal.fire('Error', errorMessage, 'error');
//       } else {
//         Swal.fire('Error', 'No response from the server.', 'error');
//       }
//     } finally {
//       fetchuserData(); // Fetch updated user data
//     }

//     // Scroll to top after a delay
//     setTimeout(() => {
//       window.scrollTo({
//         top: 0,
//         behavior: 'smooth',
//       });
//     }, 1200);
//   };




// const handleDelete = async (e, id) => {
//   e.stopPropagation();
//   setViewModal(false);
//   setLoading(true);
//   setDatalogout(false);

//   try {
//     // Verify the code first
//     const res = await axios.post("http://192.168.3.14:5000/api/verify", { code: code });

//     if (res.status === 200) {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!"
//       });

//       if (result.isConfirmed) {
//         await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
//         await deletee(id); // Call the delete function
//         Swal.fire({
//           title: "Deleted!",
//           text: "Employee's data has been deleted.",
//           icon: "success",
//         });
//       }
//     }
//   } catch (error) {
//     setLoading(false);
//     // Handle errors from the verification API call
//     if (error.response) {
//       const errorMessage = error.response.data.message || "An error occurred during verification.";
//       Swal.fire('Verification failed', errorMessage, 'error');
//     } else {
//       Swal.fire('Error', 'No response from the server.', 'error');
//     }
//   } finally {
//     setLoading(false);
//     setDatalogout(true);
//     // Reset the code input field for verification
//     setCode("");
//   }













// TO DISPLAY VALIDATION IN SIGNUP
{/* <ul>
                  <li style={{ color: errors.length ? 'red' : 'green' }}>
                    {errors.length ? 'At least 10 characters long' : '✓ At least 10 characters long'}
                  </li>
                  <li style={{ color: errors.uppercase ? 'red' : 'green' }}>
                    {errors.uppercase ? 'At least one uppercase letter' : '✓ At least one uppercase letter'}
                  </li>
                  <li style={{ color: errors.lowercase ? 'red' : 'green' }}>
                    {errors.lowercase ? 'At least one lowercase letter' : '✓ At least one lowercase letter'}
                  </li>
                  <li style={{ color: errors.number ? 'red' : 'green' }}>
                    {errors.number ? 'At least one number' : '✓ At least one number'}
                  </li>
                  <li style={{ color: errors.specialChar ? 'red' : 'green' }}>
                    {errors.specialChar ? 'At least one special character' : '✓ At least one special character'}
                  </li>
                </ul> */}







//VALIDATE FUNCTION FOR SIGNUP FORM

// const validatePassword = (password) => {
//   const lengthValid = password.length >= 10;
//   const uppercaseValid = /[A-Z]/.test(password);
//   const lowercaseValid = /[a-z]/.test(password);
//   const numberValid = /[0-9]/.test(password);
//   const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);

//   setErrors({
//     length: !lengthValid,
//     uppercase: !uppercaseValid,
//     lowercase: !lowercaseValid,
//     number: !numberValid,
//     specialChar: !specialCharValid,
//   });

//   return lengthValid && uppercaseValid && lowercaseValid && numberValid && specialCharValid;
// };
