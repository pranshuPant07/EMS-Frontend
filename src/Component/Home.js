/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import '../Style/Home.css';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Loader from './Loader';
import axios from 'axios';
import { useForm } from 'react-hook-form';

function Home({ setIsAuthenticated }) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');
  const API_LINK= "https://ems-backend-v3pb.onrender.com"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/Form'); // REDIRECT TO FORM IF ALREADY AUTHENTICATED
    }
  }, [navigate]);

  const handleCheckboxChange = () => {
    setShowPassword(prev => !prev);
  };

  const handleLogin = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    setApiError('');

    try {
      const response = await axios.post(`${API_LINK}/api/login`, {
        Username: data.userName,
        Password: data.Password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);

        setTimeout(() => {
          Swal.fire({
            title: "WELCOME",
            text: "Login Successful",
            icon: "success",
          });
          setLoading(false);
          navigate('/Form', { replace: true });
        }, 2000);
      }
    } catch (error) {
      setApiError(error.response ? error.response.data.message : 'An unexpected error occurred.');
      setLoading(false);
    } finally {
      if (!setIsAuthenticated) {
        setLoading(false);
      }
    }
  };



  return (
    <div className='main'>
      {loading ? (
        <Loader />
      ) : (
        <form className="form" onSubmit={handleSubmit(handleLogin)}>
          <p className="title">Login</p>
          <label>
            <input
              className='input'
              type="text"
              placeholder="Enter your username"
              {...register('userName', { required: "Username is required" })}
            />
            <span style={{ color: "black" }}>Username</span>
            {errors.userName && <p style={{ color: "red" }}>{errors.userName.message}</p>}
          </label>

          <label>
            <input
              className='input'
              {...register('Password', { required: "Password is required" })}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
            />
            <span style={{ color: "black" }}>Password</span>
            {errors.Password && <p style={{ color: "red" }}>{errors.Password.message}</p>}
          </label>

          <input
            type='checkbox'
            className='checkBox'
            checked={showPassword}
            onChange={handleCheckboxChange}
          />
          <span className='showPassword'>Show Password</span>

          <input type='submit' className='submit' />
          {apiError && <p style={{ color: 'red', textAlign: "center" }}>{apiError}</p>}
          <p className="signin">
            Already have an account? <Link to="/Signup">Signup</Link>
          </p>
        </form>
      )}
    </div>
  );
}

export default Home;