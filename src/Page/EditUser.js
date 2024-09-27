import React from 'react'
import './../Style/FormToEdit.css'
import { formatDate } from '../Component/dateFormat';

const EditUser = ({ onClose,
  setVerifyModal,
  setName,
  setMobileNumber,
  setDateOfJoin,
  setUpdatedPhoto,
  setUpdatedDepartment,
  Name,
  Mobilenumber,
  Dateofjoin,
  Errors,
  updatedDepartment,
  SetIsEditing,
  handleUpdates
}) => {

  //OPTIONS TO SELECT FOR DEPARTMENT
  const options = [
    { value: '', label: 'Select Department' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Admin Department', label: 'Admin Department' },
    { value: 'Maintenance Department', label: 'Maintenance Department' },
    { value: 'HR Department', label: 'HR Department' },
    { value: 'IT Department', label: 'IT Department' },
    { value: 'Support Department', label: 'Support Department' },
    { value: 'Sales Department', label: 'Sales Department' },
    { value: 'Helper', label: 'Helper' }
  ]

  //FUNCTION TO HANDLE DATE AND CHANGING FORMAT OF DATE AND SAVING IT INTO STATE
  const handleDate = (e) => {
    const { value } = e.target;
    setDateOfJoin(formatDate(value))
  }

  //FUNCTION TO HANDLE NAME CHANGE AND SAVE IT INTO STATE
  const handleName = (e) => {
    const { value } = e.target;
    setName(value)
  }

  //FUNCTION TO HANDLE DEPARTMENT SELECT AND SAVE IT INTO STATE
  const handleOption = (e) => {
    const { value } = e.target;
    setUpdatedDepartment(value)
  }

  //FUNCTION TO HANDLE UPDATE CLICK
  const checkUpdate = (e) => {
    setVerifyModal(true);
    SetIsEditing(false);
  }

  //FUNCTION TO CONVERT DATE FORMAT
  function convertDateFormat(dateString) {
    // Create a date object from the string
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    // Format the date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;


  }

  return (
    <div className='addPageMainn'>
      <div className='inputAreaAgainn'>
        <div className='headingAndButtonn'>
          <h1>Editing User's Data</h1>
          <button onClick={onClose}>X</button>
        </div>
        <div className='areaa'>
          <input placeholder='Enter employee name'
            value={Name}
            onChange={handleName}
          />
          {Errors.Namee && <p style={{ color: 'red' }}>{Errors.Namee}</p>}
          <input
            placeholder='Enter employee mobile number'
            disabled
            value={Mobilenumber}
          />
          {Errors.mobileNumber && <p style={{ color: 'red' }}>{Errors.mobileNumber}</p>}
          <input
            type='file'
            name='image'
            accept='image/*'
            placeholder='Upload your new photo'
            onChange={(e) => setUpdatedPhoto(e.target.files[0])}
          />
          <select
            id="select-input"
            value={updatedDepartment}
            onChange={handleOption}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <input placeholder='Enter employee date of join'
            value={convertDateFormat(Dateofjoin)}
            type="date"
            onChange={handleDate}
          />
          {Errors && <p style={{ color: 'red' }}>{Errors}</p>}
          <button onClick={checkUpdate}>Update</button>
        </div>
      </div>
    </div>
  )
}

export default EditUser