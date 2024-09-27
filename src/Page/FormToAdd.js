import React, { useState } from 'react'
import '../Style/FormToAdd.css'
import { formatDate } from '../Component/dateFormat';

function FormToAdd(props) {
  const [option, setOption] = useState('');

  //FUNCTION TO HANDLE MOBILE NUMBER LENGTH SHOULD NOT BE EXCEED 10 AND SAVING THAT NUMBER INTO STATE
  const handleChange = (e) => {
    const { value } = e.target;
    props.setErrors("");

    // Check if the length is less than or equal to 10 
    if (value.length <= 10) {
      props.setempMobileNumber(value);
    }
  }
  //FUNCTION TO HANDLE INPUT NAME AND SAVE THAT NAME INTO STATE
  const handleName = (e) => {
    props.setErrors("")
    props.setempName(e.target.value)
  }

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

  //FUNCTION TO HANDLE SELECT DEPARTMENT FROM OPTIONS
  const handleOptionChange = (e) => {
    setOption(e.target.value)
    props.setOptions(e.target.value)
  }

  return (
    <div className='addPageMain'>
      <div className='inputAreaAgain'>
        <div className='headingAndButton'>
          <h1>ADD EMPLOYEE</h1>
          <button onClick={props.onClose}>X</button>
        </div>
        <div className='area'>
          <input type='text' placeholder='Enter your name' onChange={handleName} />
          {props.Errors.Namee && <p style={{ color: 'red' }}>{props.Errors.Namee}</p>}
          <input type='number' placeholder='Enter your mobile number' onChange={handleChange} value={props.Mobilenumber} />
          {props.Errors.mobileNumber && <p style={{ color: 'red' }}>{props.Errors.mobileNumber}</p>}
          <select
            id="select-input"
            value={option}
            onChange={handleOptionChange}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input type='file' placeholder='upload Image' name='image' accept='image/*' onChange={(e) => props.setPhoto(e.target.files[0])} />
          <input type='date' placeholder='Enter your date of join' onChange={(e) => { formatDate(props.setDate(e.target.value)) }} value={props.date} />
          {props.Errors && <p style={{ color: 'red' }}>{props.Errors}</p>}
          <button onClick={props.addData}>Add</button>
        </div>
      </div>
    </div>
  )
}

export default FormToAdd