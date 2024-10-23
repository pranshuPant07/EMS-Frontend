/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import '../Style/Form.css'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css'
import Loader from './Loader';
import Pagination from './Pagination';
import UploadMedia from '../Page/UploadMedia';
import ErrorDisplay from '../Page/ErrorDisplay';
import View from '../Page/View';
import Verification from '../Page/Verification';
import AddandUpdate from './AddandUpdate';

function Form() {
  const [state, setState] = useState({
    modal: false,
    Employee: [],
    photo: null,
    isEditing: false,
    userID: '',
    loading: false,
    Namee: '',
    option: '',
    Mobilenumberr: '',
    Errors: '',
    date: '',
    datalogout: true,
    uploadModal: false,
    file: null,
    message: '',
    currentPage: 1,
    postsPerPage: 6,
    response: [],
    ErrorModal: false,
    processing: false,
    errorMessage: '',
    selectedEmp: '',
    selectedOption: '',
    searchTerm: '',
    ViewModal: false,
    verifyModal: false,
    code: '',
    errorInVerification: '',
    mode: '',
    popupModal: false,
  });

  const API_LINK = process.env.REACT_APP_API_URL;

  const updateState = (newState) => {
    setState(prevState => ({ ...prevState, ...newState }));
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const LastPostIndex = state.currentPage * state.postsPerPage;
  const firstPostIndex = LastPostIndex - state.postsPerPage;
  const totalPosts = state.Employee.length;

  // Filtering and Sorting
  const filteredEmployees = state.Employee.filter(employee => {
    const mobileNumberString = String(employee.Mobilenumber);
    const isNumericSearchTerm = !isNaN(state.searchTerm) && state.searchTerm.trim() !== '';

    const matchesSearchTerm = employee.Name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      (isNumericSearchTerm && mobileNumberString.includes(state.searchTerm));
    const matchesDepartment = state.selectedOption === '' || employee.Department === state.selectedOption;

    return matchesSearchTerm && matchesDepartment;
  });

  const currentEmployees = filteredEmployees.slice(firstPostIndex, LastPostIndex);

  const navigate = useNavigate();
  const hasData = state.Employee.length > 0;

  // Fetch user data
  useEffect(() => {
    fetchuserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch today's date
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    updateState({ date: today });
  }, []);

  // Options for department
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
  ];

  // Search query handler
  const searchByQuery = (e) => {
    updateState({ searchTerm: e.target.value });
  };

  // Handle edit button click
  const handleEditClick = (e, userId) => {
    e.stopPropagation();
    updateState({ userID: userId, isEditing: true });
  };

  // Handle search by department
  const handleSearchByDepartment = (e) => {
    updateState({ selectedOption: e.target.value });
  };

  // Refresh employee data
  const handleUpdate = () => {
    fetchuserData();
  };

  // Open upload modal
  const UploadEmp = async () => {
    updateState({ uploadModal: true });
  };

  // Get serial number
  const getSerialNumber = (index) => {
    return (state.currentPage - 1) * state.postsPerPage + index + 1;
  };

  // Handle view popup
  const handle_View = async (id) => {
    updateState({ selectedEmp: id, ViewModal: true });
  };

  // Fetch user data
  const fetchuserData = async () => {
    try {
      const response = await axios.get(`${API_LINK}/api/employees`);
      const data = await response.data;
      updateState({ Employee: data });
    } catch (error) {
      console.log(error);
    }
  };

  // Handle adding employee
  const HandleAddEmp = (e) => {
    e.stopPropagation();
    updateState({ popupModal: true, mode: "Add" });
  };

  // Handle editing employee
  const handleEditEmp = (e, id) => {
    e.stopPropagation();
    updateState({ userID: id, popupModal: true, mode: "Edit" });
  };

  // Handle exporting data
  const handleExport = async () => {
    updateState({ loading: true, datalogout: false });
    Swal.fire({
      title: "Do you want to download the file?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "EXCEL",
      denyButtonText: `PDF`
    }).then(async (result) => {
      updateState({ loading: true });
      if (result.isConfirmed) {
        Swal.fire({
          title: "Done!",
          text: "Your file will be available for download shortly.",
          icon: "info"
        });
        await delay(3000);
        axios({
          url: `${API_LINK}/export/employees`,
          // url: 'http://192.168.1.10:5000/export/employees',
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
        updateState({ loading: false, datalogout: true });
      } else if (result.isDenied) {
        updateState({ loading: true });
        Swal.fire({
          title: "Done!",
          text: "Your file will be available for download shortly.",
          icon: "info"
        });
        await delay(3000);
        try {
          const response = await axios.get(`${API_LINK}/export/downloadEmpl`, {
            responseType: 'blob',
          });

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'employees.pdf'); // consider dynamic filename if needed
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error('Error downloading the PDF:', error);
          alert('There was an error downloading the file. Please try again later.'); // User feedback
        }

        updateState({ loading: false, datalogout: true });
      } else {
        updateState({ loading: false, datalogout: true });
      }
    });
  };

  // Logout
  const logout = (e) => {
    updateState({ datalogout: false });
    Swal.fire({
      title: "Are you sure?",
      text: "You want to log out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout"
    }).then(async (result) => {
      if (result.isConfirmed) {
        updateState({ loading: true });
        localStorage.removeItem('authToken');
        await delay(1500);
        updateState({ loading: false });
        navigate("/", { replace: true });
      } else {
        updateState({ datalogout: true });
      }
    });
  };

  // Handle delete
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    updateState({ loading: true, datalogout: false });
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
        await deletee(id);
        Swal.fire({
          title: "Deleted!",
          text: "Employee's data has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error('Error occurred during delete:', error);
    } finally {
      updateState({ loading: false, datalogout: true });
    }
  };

  // Delete employee data
  const deletee = async (id) => {
    try {
      await axios.delete(`${API_LINK}/api/employees/${id}`);
      fetchuserData();
    } catch (error) {
      console.error('There was an error deleting the item!', error);
    }
  };


  return (
    <div className='formMain'>

      <div className='Application'>
        <div className='navBarr'>
          <h1><i className="ri-group-fill"></i></h1>
          <div className='buttonToaddeMployee'>
            <button
              className="buttonsForAdd"
              onClick={HandleAddEmp}>ADD</button>
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
                  <a className="dropdown-item" id='firstt' onClick={HandleAddEmp}>
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


          {state.loading ? (
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
                              onClick={(e) =>
                                handleEditEmp(e, item._id)}
                            // handleEditClick(e, item._id)
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
          {state.datalogout && hasData && (
            <Pagination
              totalPosts={totalPosts}
              postsPerPage={state.postsPerPage}
              setCurrentPage={(page) => updateState({ currentPage: page })}
              currentPage={state.currentPage}
            />
          )}
        </div>

      </div>


      {state.popupModal && (
        <AddandUpdate
          mode={state.mode}
          onClose={() => updateState({ popupModal: false })}
          setLoading={(loading) => updateState({ loading })}
          setDatalogout={(datalogout) => updateState({ datalogout })}
          setpopupModal={(popupModal) => updateState({ popupModal })}
          setVerifyModal={(verifyModal) => updateState({ verifyModal })}
          code={state.code}
          setCode={(code) => updateState({ code })}
          userID={state.userID}
          fetchuserData={fetchuserData}
          setErrorInVerification={(error) => updateState({ errorInVerification: error })}
        />
      )}

      {state.uploadModal && (
        <UploadMedia
          onClose={() => updateState({ uploadModal: false })}
          setUploadModal={(uploadModal) => updateState({ uploadModal })}
          message={state.message}
          setMessage={(message) => updateState({ message })}
          loading={state.loading}
          setLoading={(loading) => updateState({ loading })}
          setDatalogout={(datalogout) => updateState({ datalogout })}
          errorModal={state.ErrorModal}
          setErrorModal={(ErrorModal) => updateState({ ErrorModal })}
          setResponse={(response) => updateState({ response })}
          setErrorMessge={(errorMessage) => updateState({ errorMessage })}
          setEmployee={(Employee) => updateState({ Employee })}
        />
      )}

      {state.ErrorModal && (
        <ErrorDisplay
          onClose={() => updateState({ ErrorModal: false })}
          response={state.response}
          errorMessage={state.errorMessage}
        />
      )}

      {state.ViewModal && (
        <View
          onClose={() => updateState({ ViewModal: false })}
          selectedEmp={state.selectedEmp}
          handleEditClick={handleEditClick}
          handleDelete={handleDelete}
        />
      )}

      {state.verifyModal && (
        <Verification
          code={state.code}
          setCode={(code) => updateState({ code })}
          handleUpdate={handleUpdate}
          setVerifyModal={(verifyModal) => updateState({ verifyModal })}
          SetIsEditing={(isEditing) => updateState({ isEditing })}
          errorInVerification={state.errorInVerification}
          setErrorInVerification={(error) => updateState({ errorInVerification: error })}
        />
      )}
    </div>
  )
}
export default Form;