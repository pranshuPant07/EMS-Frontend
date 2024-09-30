/* eslint-disable no-lone-blocks */
import React, { useState } from 'react'
import './../Style/Signup.css'
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Component/Loader';


function Signup() {
  const [name, setName] = useState('');
  const [mobilenumber, setmobileNumber] = useState('');
  const [userName, setuserName] = useState('');
  const [passWord, setpassWord] = useState('');
  const [confirmPassword, setconfirmpassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setloading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    mobileNumber: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const navigate = useNavigate();
  const isValid = !Object.values(errors).includes(true);

  // Validation function
  const validate = () => {
    const newErrors = {};

    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!userName.trim()) {
      newErrors.username = 'Username is required';
    }

    // Validate mobile number
    if (!mobilenumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(mobilenumber)) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits';
    }

    if (!passWord.trim()) {
      newErrors.passWord = 'Password is required';
    }

    // Validate confirm password
    if (passWord !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  //FUNCTION TO HANDLE INPUT MOBILE NUMBER LENGTH SHOULD NOT EXCEED 10 AND SAVING THAT NUMBER INTO STATE
  const handleNumber = (e) => {
    const { value } = e.target;

    // Check if the length is less than or equal to 10
    if (value.length <= 10) {
      setmobileNumber(value);
    }
  };

  //FUNCTION TO SHOW AND HIDE PASSWORD ON CHECKBOX CLICK
  const handleCheckboxChange = () => {
    setShowPassword(prevState => !prevState);
  }

  //FUNCTION TO HANDLE SIGNUP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    if (validate()) {
      try {
        // const response = await axios.post(`http://192.168.3.14:5000/api/register`, { Name: name, Mobilenumber: mobilenumber, Username: userName, Password: passWord });
        const response = await axios.post(`http://192.168.1.10:5000/api/register`, { Name: name, Mobilenumber: mobilenumber, Username: userName, Password: passWord });

        setMessage(response.data.message);
        if (response.status === 201) {
          await delay(2000);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "New user registered successfully",
            footer: 'Redireting to login page',
            showConfirmButton: false,
            timer: 2000,
          });
          setloading(false)
          navigate('/');
        }
      } catch (error) {
        await delay(1000);
        setMessage(error.response.data.error);
        setloading(false);
      }
    } else {
      setloading(false)
    }
  };

  return (
    <div className='mainSignup'>

      {loading ? (
        <Loader />
      ) : (<div className='signUpDiv'>
        <div className='formToSignUp'>
          <>
            <form className="form" onSubmit={handleSubmit}>
              <p className="title">Signup </p>
              <div className="flex">
                <label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter your name"
                    required=""
                    onChange={(e) => {
                      setName(e.target.value)
                    }} />
                  <span style={{ "color": "black" }}>Name</span>
                  {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </label>

                <label>
                  <input
                    className="input"
                    type="number"
                    placeholder="Enter your mobile number"
                    required=""
                    onChange={handleNumber}
                    value={mobilenumber} />
                  <span style={{ "color": "black" }} >Mobile Number</span>
                  {errors.mobileNumber && <p style={{ color: 'red' }}>{errors.mobileNumber}</p>}
                </label>

              </div>
              <label>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter your username"
                  onChange={(e) => {
                    setuserName(e.target.value)
                  }} />
                <span style={{ "color": "black" }}>Username</span>
                {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
              </label>

              <label>
                <input
                  className="input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  onChange={(e) => {
                    setpassWord(e.target.value)
                  }}
                />
                <span style={{ "color": "black" }}>Password</span>
                {errors.passWord && <p style={{ color: 'red' }}>{errors.passWord}</p>}
              </label>

              <label>
                <input
                  className="input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-Enter your password"
                  onChange={(e) => {
                    setconfirmpassword(e.target.value)
                  }} />
                <span style={{ "color": "black" }}>Confirm password</span>
                {errors.passWord && <p style={{ color: 'red' }}>{errors.passWord}</p>}
              </label>

              <input type='checkbox' className='checkBox' checked={showPassword} onChange={handleCheckboxChange} /><span className='showPassword'>Show Password</span>

              <button
                className="submit"
                type='submit'
                disabled={!isValid}
              >
                Submit
              </button>
              {message && <p style={{ color: 'red', textAlign: "center" }}>{message}</p>}
              <p className="signin">
                Already have an acount ?<Link to="/">Back to login</Link>{" "}
              </p>
            </form>
          </>
        </div>
        <div className='blankSpace'>
        </div>
      </div>)}
    </div>
  )
}

export default Signup