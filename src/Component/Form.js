/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import '../Style/Form.css'
import FormToAdd from '../Page/FormToAdd';
import Swal from 'sweetalert2';
import axios from 'axios';
import { formatDate } from './dateFormat';
import { useNavigate } from 'react-router-dom';
import EditUser from '../Page/EditUser';
import 'remixicon/fonts/remixicon.css'
import Loader from './Loader';
import Pagination from './Pagination';
import UploadMedia from '../Page/UploadMedia';
import ErrorDisplay from '../Page/ErrorDisplay';
import View from '../Page/View';
import Verification from '../Page/Verification';

function Form() {
  const [modal, setModal] = useState(false);
  const [Name, setempName] = useState('');
  const [Mobilenumber, setempMobileNumber] = useState('');
  const [Employee, setEmployee] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [isEditing, SetIsEditing] = useState(false);
  const [userID, setUserID] = useState('');
  const [loading, setLoading] = useState(false);
  const [Namee, setNamee] = useState('');
  const [option, setOptions] = useState('')
  const [Mobilenumberr, setMobilenumberr] = useState('');
  const [Errors, setErrors] = useState('');
  const [date, setDate] = useState('');
  const [datalogout, setDatalogout] = useState(true);
  const [uploadModal, setUploadModal] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const totalPosts = Employee.length;
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const [response, setResponse] = useState([]);
  const [ErrorModal, setErrorModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedEmp, setSeletedEmp] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [ViewModal, setViewModal] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);
  const [code, setCode] = useState('');
  const [errorInVerification, setErrorInVerification] = useState('');

  //STATES FOR EDITING USER
  const [upName, setupName] = useState('');
  const [upMobilenumber, setupMobileNumber] = useState('');
  const [upDateofjoin, setupDateOfJoin] = useState('');
  const [upErrors, setupErrors] = useState('');
  const [upupdatedPhoto, setupUpdatedPhoto] = useState(null);
  const [upupdatedDepartment, setupUpdatedDepartment] = useState('');

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const LastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = LastPostIndex - postsPerPage;

  //Filtering and Sorting
  const filteredEmployees = Employee.filter(employee => {
    const mobileNumberString = String(employee.Mobilenumber);
    const isNumericSearchTerm = !isNaN(searchTerm) && searchTerm.trim() !== '';

    const matchesSearchTerm = employee.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (isNumericSearchTerm && mobileNumberString.includes(searchTerm));
    const matchesDepartment = selectedOption === '' || employee.Department === selectedOption;

    return matchesSearchTerm && matchesDepartment;
  });

  const currentEmployees = filteredEmployees.slice(firstPostIndex, LastPostIndex);

  const navigate = useNavigate();
  const hasData = Employee.length > 0;

  //USEEFFECT TO FETCH EMPLOYEE DATA
  useEffect(() => {
    // Fetch user data from an API
    fetchuserData();
  }, []);

  //USEEFFECT TO FETCH TODAY's DATE
  useEffect(() => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    formatDate(setDate(today));
  }, []);

  //USEEFFECT TO FETCH SELECETED EMPLOYEE USING IT'S USERID AND DISPLAY THAT FETCHED USER DETAILS IN EDIT FORM POPUP
  useEffect(() => {
    if (userID && isEditing) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`http://192.168.3.14:5000/api/employees/${userID}`);
          const user = response.data;
          setupName(user.Name);
          setupMobileNumber(user.Mobilenumber);
          setupUpdatedDepartment(user.Department);
          setupDateOfJoin(user.Dateofjoin);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      fetchUserDetails();
    }
  }, [userID, isEditing]);

  const options = [
    { value: '', label: 'Select' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Admin Department', label: 'Admin Department' },
    { value: 'Maintenance Department', label: 'Maintenance Department' },
    { value: 'HR Department', label: 'HR Department' },
    { value: 'IT Department', label: 'IT Department' },
    { value: 'Support Department', label: 'Support Department' },
    { value: 'Sales Department', label: 'Sales Department' },
    { value: 'Helper', label: 'Helper' }
  ]

  const resetForm = () => {
    setNamee("");
    setempMobileNumber("");
    setOptions("");
    setDate(new Date());
    setPhoto(null);
    setErrors('');
  };

  //FUNCTION FOR FILTER AND SORTING
  const searchByQuery = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
  };

  //FUNCTION TO HANDLE EDIT BUTTON CLICK
  const handleEditClick = (e, userId) => {
    e.stopPropagation();
    setUserID(userId);
    SetIsEditing(true);
  };

  //FUNCTION TO HANDLE SEARCH BY DEPARTMENT FROM OPTIONS FOR FILTERATION
  const handleSearchByDepartment = (e) => {
    setSelectedOption(e.target.value);
  };

  //FUNCTION TO REFRESH EMPLOYEE DATA AFTER EMPLOYEE DATA UPDATED
  const handleUpdate = () => {
    // Logic to refresh user data if needed
    fetchuserData();
  };

  //FUNCTION FOR MAKING A UPLOAD POPUP MODAL TRUE
  const UploadEmp = async () => {
    setUploadModal(true)
  }

  //FUNCTION TO GET SERIAL NUMBER
  const getSerialNumber = (index) => {
    return (currentPage - 1) * 6 + index + 1;
  };

  //FUNCTION TO HANDLE VIEW POPUP ON CLICK
  const handle_View = async (id) => {
    setSeletedEmp(id);
    setViewModal(true)
  }

  //FUCTION TO FETCH USER DATA FROM DATABASE
  const fetchuserData = async (e) => {
    try {
      const response = await axios.get("http://192.168.3.14:5000/api/users");
      const data = await response.data;
      setEmployee(data);
    } catch (error) {
      console.log(error)
    }
  }

  //FUNCTION TO VALIDATE INPUT FIELDS  
  const validate = () => {
    const newErrors = [];

    // Validate username
    if (!Name.trim()) {
      newErrors.Namee = 'Name is required';
    }
    // Validate Mobilenumber
    if (!Mobilenumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(Mobilenumber)) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits';
    }

    setErrors(newErrors);
    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  //FUNCTION TO HANDLE CLOSE MODAL
  const handleCloseModal = () => {
    SetIsEditing(false);
    setUserID(null);
  };

  //Function to Handle Delete
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    setLoading(true);
    setDatalogout(false)
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        await delay(1000);
        await deletee(id); // Call the delete function
        Swal.fire({
          title: "Deleted!",
          text: "Employee's data has been deleted.",
          icon: "success",
        });
      }

    } catch (error) {
      // Optionally handle errors
      console.error('Error occurred during delete:', error);
    } finally {
      setLoading(false);
      setDatalogout(true);
    }
  };

  // FUNCTION TO DELETE EMPLOYEE DATA FROM DATABASE  
  const deletee = async (id) => {
    try {
      await axios.delete(`http://192.168.3.14:5000/api/items/${id}`);
      fetchuserData();
      setLoading(false)
    } catch (error) {
      console.error('There was an error deleting the item!', error);
      setLoading(false)
    }
  };

  //FUNCTION TO LOGOUT FROM FORM PAGE TO LOGIN PAGE
  const logout = (e) => {
    setDatalogout(false)
    Swal.fire({
      title: "Are you sure?",
      text: "you want to log out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "logout"
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        localStorage.removeItem('authToken'); // Remove token from localStorage
        await delay(1500);
        setLoading(false);
        navigate("/", { replace: true });
      }
      else {
        setDatalogout(true)
      }
    });
  }

  //FUNCTION TO ADD EMPLOYEE DATA TO DATABASE
  const addData = async (e) => {
    e.preventDefault();
    setDatalogout(false);
    setLoading(true);

    if (validate()) {
      try {
        const formData = new FormData();
        formData.append('Name', Name);
        formData.append('Mobilenumber', Mobilenumber);
        formData.append('Department', option)
        formData.append('Dateofjoin', formatDate(date));
        if (photo) {
          formData.append('photo', photo);
        }

        await axios.post("http://192.168.3.14:5000/api/signup", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setErrors('');
        setModal(false);
        setTimeout(() => {
          setLoading(false);
          setDatalogout(true);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Employee data has been saved',
            showConfirmButton: false,
            timer: 1200,
          });
        }, 2000)
        resetForm();
        fetchuserData();
      } catch (error) {
        setErrors(error.response?.data?.error || 'Error occurred');
        setLoading(false);
        setDatalogout(true);
        fetchuserData();
      }
    } else {
      setLoading(false);
      setDatalogout(true);
      fetchuserData();
    }

    await delay(1200);
    window.scrollTo({
      top: 0, // Scroll to the top of the page
      behavior: 'smooth', // Smooth scrolling effect
    });

  };

  //FUNCTION TO HANDLE UPDATE
  const handleUpdates = async (e) => {
    e.preventDefault();
    setErrorInVerification("");
    setLoading(true);

    try {
      // Verify the code first
      const res = await axios.post("http://192.168.3.14:5000/api/verify", { code: code });
      if (res.status === 200) {
        setVerifyModal(false);
        const formData = new FormData();
        formData.append('Name', upName);
        formData.append('Dateofjoin', formatDate(upDateofjoin));
        formData.append('Department', upupdatedDepartment);
        if (upupdatedPhoto) {
          formData.append('photo', upupdatedPhoto);
        }

        setDatalogout(false);

        await axios.put(`http://192.168.3.14:5000/update-user/${userID}`, formData);
        setCode("");

        await delay(1200);
        setLoading(false);
        setDatalogout(true);
        Swal.fire({
          title: "SUCCESS",
          text: "Updated data has been saved",
          icon: "success"
        });

        fetchuserData();
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        const errorMessage = error.response.data.message || "An error occurred during verification.";
        setErrorInVerification(errorMessage);
      } else {
        Swal.fire('Error', 'No response from the server.', 'error');
      }
    } finally {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  //FUNCTION TO HANDLE UPLOADING EXCEL FILE DATA TO DATABASE
  const onUpload = async () => {

    if (!file) {
      setMessage('Please choose a file first.');
      return;
    }
    setLoading(true);
    setDatalogout(false);
    try {
      setUploadModal(false);
      setProcessing(true);
      await delay(1000);

      const formData = new FormData();
      formData.append('file', file);

      // Perform the file upload
      const response = await axios.post('http://192.168.3.14:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { data } = response;
      console.log('Upload response data:', data);

      if (data.invalidEmployees.length > 0) {
        setResponse(data.invalidEmployees);
        setErrorMessage(data.errorMessage || 'Some records are invalid or already exist');
        setErrorModal(true);
      } else {
        await delay(1200);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Employee data has been saved',
          showConfirmButton: false,
          timer: 1200,
        });
        fetchuserData()
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Error uploading file: ${error.response?.data || error.message}`,
      });
    } finally {

      setLoading(false);
      setProcessing(false);
      setDatalogout(true);
      fetchuserData(); // Update the employee data
      setUploadModal(false); // Ensure the upload modal is closed
      setFile(null);
      setMessage('')
    }
  }

  //FUNCTION TO HANDLE EXPORTING DATA FROM DATABASE
  const handleExport = async () => {
    setLoading(true)
    setDatalogout(false)
    Swal.fire({
      title: "Do you want to download the file?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "EXCEL",
      denyButtonText: `PDF`
    }).then(async (result) => {
      setLoading(true)
      if (result.isConfirmed) {
        Swal.fire({
          title: "Done!",
          text: "Your file will be avaiable for download shortly.",
          icon: "info"
        });
        await delay(3000);
        axios({
          url: 'http://192.168.3.14:5000/export/employees',
          method: 'GET',
          responseType: 'blob',
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'employees.xlsx');
          document.body.appendChild(link);
          link.click();
        }).catch((error) => {
          console.error('Error exporting data:', error);
        });
        setLoading(false)
        setDatalogout(true);
      } else if (result.isDenied) {
        setLoading(true)
        Swal.fire({
          title: "Done!",
          text: "Your file will be avaiable for download shortly.",
          icon: "info"
        });
        await delay(3000);
        try {
          const response = await axios.get('http://192.168.3.14:5000/download-employees', {
            responseType: 'blob', // Important for handling binary data
          });

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'employees.pdf'); // Set the file name
          document.body.appendChild(link);
          link.click();
          link.remove(); // Remove the link element after the download

          // Optionally, you could also revoke the object URL after use
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error('Error downloading the PDF:', error);
          // Handle errors as needed
        }
        setLoading(false)
        setDatalogout(true)
      }
      else {
        setLoading(false)
        setDatalogout(true)
      }
    });
  }

  return (
    <div className='formMain'>

      <div className='Application'>
        <div className='navBarr'>
          <h1><i className="ri-group-fill"></i></h1>
          <div className='buttonToaddeMployee'>
            <button
              className="buttonsForAdd"
              onClick={() => {
                setModal(true)
              }}>ADD</button>
            <button
              className='buttonsForUpload'
              onClick={UploadEmp}>
              UPLOAD</button>
            <button
              className='buttonsForexport'
              onClick={handleExport}>
              EXPORT</button>
            <button
              className='buttonForLogout'
              onClick={logout}>
              LOG OUT</button>
          </div>

          <div className='menuButton'>
            <div className="dropdown" >
              <a
                className="btn btn-secondary "
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="ri-menu-3-line"></i>
              </a>
              <ul className="dropdown-menu">
                <li key={"1"}>
                  <a className="dropdown-item" id='firstt' onClick={() => {
                    setModal(true)
                  }}>
                    ADD EMPLOYEE
                  </a>
                </li>
                <li key={"2"}>
                  <a className="dropdown-item" style={{ textAlign: "center" }} id='secondd' onClick={UploadEmp}>
                    UPLOAD
                  </a>
                </li>
                <li key={"34"}>
                  <a className="dropdown-item" style={{ textAlign: "center" }} id='secondd' onClick={handleExport}>
                    EXPORT
                  </a>
                </li>
                <li key={"3"}>
                  <a className="dropdown-item" style={{ textAlign: "center" }} id='thirdd' onClick={logout}>
                    LOGOUT
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>
        <div className='backgroundd'>
          <div className='FilterAndSorting'>
            <input className='searchForEmployee' placeholder='Search Employee' type='text' onChange={searchByQuery} />
            <select
              id="select-Department"
              onChange={handleSearchByDepartment}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

          </div>


          {loading ? (
            <Loader />
          ) : (
            <table key={"table"} style={{ margin: "0" }} className="table table-dark table-striped table-hover">
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th className='cenTer2' scope="col">S.No</th>
                  <th className='cenTer2' scope="col">Name</th>
                  <th className='cenTer2' scope="col">Mobile number</th>
                  <th className='cenTer2' scope="col">Date of join</th>
                  <th className='cenTer2' scope="col">Actions</th>
                </tr>
              </thead>
              {currentEmployees.length === 0 ? (
                <tbody key={"tbody"} >
                  <tr>
                    <td style={{ "textAlign": "Center", "fontSize": "20px", "fontWeight": "700" }} colSpan={10}>NO RECORDS FOUND</td>

                  </tr>
                </tbody>
              ) : (
                currentEmployees.map((item, index) => {
                  return (
                    <tbody key={item._id} >
                      <tr key={"1"} style={{ textAlign: "center" }} onClick={(e) => {
                        handle_View(item._id);
                      }}>
                        <th className='cenTer3' scope="row" key={item.id} >{getSerialNumber(index)}</th>
                        <td className='cenTer'>{item.Name}</td>
                        <td className='cenTer'>{item.Mobilenumber}</td>
                        <td className='cenTer'>{item.Dateofjoin}</td>
                        <td className='cenTer'>
                          <div className='buttons_space'>
                            <button className='edit_Button'
                              onClick={(e) => {
                                handleEditClick(e, item._id)
                              }}
                            >Edit</button>

                            <button className='delete_Button'
                              onClick={(e) =>
                                handleDelete(e, item._id)
                              }>Delete</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  )
                }))}
            </table>)}
          {datalogout && hasData &&
            <Pagination
              totalPosts={totalPosts}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />}
        </div>

      </div>

      {
        modal &&
        <FormToAdd
          onClose={() => setModal(false)}
          setempName={setempName}
          setempMobileNumber={setempMobileNumber}
          Employee={Employee}
          addData={addData}
          Mobilenumber={Mobilenumber}
          Namee={Namee}
          Mobilenumberr={Mobilenumberr}
          Errors={Errors}
          setDate={setDate}
          date={date}
          setPhoto={setPhoto}
          setErrors={setErrors}
          setOptions={setOptions}
          option={options}
        />
      }
      {
        isEditing &&
        <EditUser
          isOpen={isEditing}
          onUpdate={handleUpdate}
          handleEditClick={handleEditClick}
          onClose={handleCloseModal}
          onClosee={() => SetIsEditing(false)}
          setDatalogout={setDatalogout}
          setViewModal={setViewModal}
          setVerifyModal={setVerifyModal}
          setCode={setCode}
          code={code}
          SetIsEditing={SetIsEditing}
          handleUpdates={handleUpdates}

          setName={setupName}
          setMobileNumber={setupMobileNumber}
          setDateOfJoin={setupDateOfJoin}
          setErrors={setupErrors}
          setUpdatedPhoto={setupUpdatedPhoto}
          setUpdatedDepartment={setupUpdatedDepartment}

          Name={upName}
          Mobilenumber={upMobilenumber}
          Dateofjoin={upDateofjoin}
          Errors={upErrors}
          updatedDepartment={upupdatedDepartment}
        />
      }
      {
        uploadModal &&
        <UploadMedia
          onClosee={() => setUploadModal(false)}
          onUpload={onUpload}
          message={message}
          setMessage={setMessage}
          loading={loading}
          setLoading={setLoading}
          setFile={setFile}
        />
      }
      {
        ErrorModal &&
        <ErrorDisplay
          onClose={() => setErrorModal(false)}
          response={response}
          errorMessage={errorMessage}
        />
      }
      {
        ViewModal &&
        <View
          onClose={() => setViewModal(false)}
          selectedEmp={selectedEmp}
          handleEditClick={handleEditClick}
          handleDelete={handleDelete}
        />
      }
      {verifyModal &&
        <Verification
          code={code}
          setCode={setCode}
          handleUpdate={handleUpdate}
          setVerifyModal={setVerifyModal}
          handleUpdates={handleUpdates}
          SetIsEditing={SetIsEditing}
          errorInVerification={errorInVerification}
          setErrorInVerification={setErrorInVerification}
        />
      }
    </div>
  )
}
export default Form;