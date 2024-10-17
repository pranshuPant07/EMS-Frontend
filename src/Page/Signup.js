import React, { useState } from 'react';
import './../Style/Signup.css';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Component/Loader';
import { useForm } from 'react-hook-form';

function Signup() {

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
    const API_LINK= "https://ems-backend-v3pb.onrender.com"

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setShowPassword(prevState => !prevState);
  };

  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(`${API_LINK}/api/register`, {
        Name: data.Name,
        Mobilenumber: data.mobileNumber,
        Username: data.userName,
        Password: data.passWord,
      });

      setMessage(response.data.message);

      if (response.status === 201) {
        setTimeout(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "New user registered successfully",
            footer: 'Redirecting to login page',
            showConfirmButton: false,
            timer: 2000,
          });
          setLoading(false);
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      setMessage(error.response.data.error);
      setLoading(false);
    }
  };


  return (
    <div className='mainSignup'>
      {loading ? (
        <Loader />
      ) : (
        <div className='signUpDiv'>
          <div className='formToSignUp'>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <p className="title">Signup</p>
              <div className="flex">
                <label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter your name"
                    {...register('Name',
                      { required: "Required" }
                    )}
                  />
                  <span style={{ color: "black" }}>Name</span>
                  {errors.Name && <p style={{ color: "red" }}>{errors.Name.message}</p>}
                </label>

                <label>
                  <input
                    className="input"
                    type="number"
                    placeholder="Enter your mobile number"
                    {...register('mobileNumber', {
                      required: "Required",
                      maxLength: {
                        value: 10,
                        message: "10 digits are allowed",
                      },
                      minLength: {
                        value: 10,
                        message: "Min. 10 digits",
                      },
                    })}
                  />
                  <span style={{ color: "black" }}>Mobile Number</span>
                  {errors.mobileNumber && <p style={{ color: "red" }}>{errors.mobileNumber.message}</p>}
                </label>
              </div>

              <label>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter your username"
                  {...register('userName', { required: "Required" })}
                />
                <span style={{ color: "black" }}>Username</span>
                {errors.userName && <p style={{ color: "red" }}>{errors.userName.message}</p>}
              </label>

              <label>
                <input
                  className="input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...register('passWord', {
                    required: "Required",
                    minLength: {
                      value: 10,
                      message: "Password length should be more than 10",
                    },
                  })}
                />
                <span style={{ color: "black" }}>Password</span>
                {errors.passWord && <p style={{ color: "red" }}>{errors.passWord.message}</p>}
              </label>

              <label>
                <input
                  className="input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-Enter your password"
                  {...register('confirmPassword', {
                    required: "Re-Enter your Password",
                    validate: (value) => {
                      const password = watch('passWord');
                      return password === value || "Passwords do not match";
                    },
                  })}
                />
                <span style={{ color: "black" }}>Confirm password</span>
                {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}
              </label>

              <input
                type='checkbox'
                className='checkBox'
                checked={showPassword}
                onChange={handleCheckboxChange}
              />
              <span className='showPassword'>Show Password</span>

              <input type='submit' className='submit' />
              {message && <p style={{ color: 'red', textAlign: "center" }}>{message}</p>}
              <p className="signin">
                Already have an account?<Link to="/"> Back to login</Link>{" "}
              </p>
            </form>
          </div>
          <div className='blankSpace'></div>
        </div>
      )}
    </div>
  );
}

export default Signup;
