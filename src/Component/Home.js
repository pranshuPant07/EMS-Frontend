/* eslint-disable no-unused-vars */
import { useState } from 'react';
import '../Style/Home.css';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Loader from './Loader';
import axios from 'axios';

function Home() {
  const [state, setState] = useState({
    Username: '',
    Password: '',
    loading: false,
    success: '',
    showPassword: false,
    errors: ''
  });

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const navigate = useNavigate();

  // Function to update state
  const updateState = (newState) => {
    setState(prevState => ({
      ...prevState,
      ...newState
    }));
  };

  //FUNCTION TO VALIDATE THE INPUT FIELD
  const validate = () => {
    const newErrors = [];

    if (!state.Username.trim()) newErrors.Username = 'Username is required';
    if (!state.Password) newErrors.password = 'Password is required';

    updateState({ errors: newErrors }); // Update errors in state
    return !Object.keys(newErrors).length;
  };


  // Function to show/hide password
  const handleCheckboxChange = () => {
    updateState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    updateState({ loading: true });

    if (validate()) {
      try {
        const response = await axios.post('http://192.168.1.10:5000/api/loginData', {
          Username: state.Username,
          Password: state.Password
        });
        const { token } = response.data;

        if (token) {
          updateState({ errors: '', success: '' });
          localStorage.setItem('authToken', token);
          await delay(2000);
          updateState({ loading: false });

          Swal.fire({
            title: "WELCOME",
            text: "Login Successful",
            icon: "success"
          });

          navigate('/Form', { replace: true });
        }
      } catch (error) {
        // Handle errors
        await delay(1000);
        if (error.response) {
          updateState({ errors: error.response.data.message, success: '', loading: false });
        } else {
          updateState({ errors: 'An unexpected error occurred.', success: '', loading: false });
        }
      }
    } else {
      updateState({ loading: false });
    }
  };


  return (
    <div className='main'>
      <>
        {state.loading ? (
          <Loader />
        ) : (
          <form className="form" onSubmit={handleLogin}>
            <p className="title">Login</p>
            <label>
              <input
                className="input"
                type="text"
                placeholder="Enter your username"
                required=""
                value={state.Username} // Updated to use state
                onChange={(e) => {
                  updateState({ Username: e.target.value }); // Update state
                }}
              />
              <span style={{ color: "black" }}>Username</span>
              {state.errors.Username && <p style={{ color: 'red' }}>{state.errors.Username}</p>} {/* Updated to use state */}
            </label>
            <label>
              <input
                className="input"
                type={state.showPassword ? 'text' : 'password'} // Updated to use state
                placeholder="Enter your password"
                value={state.Password} // Updated to use state
                onChange={(e) => {
                  updateState({ Password: e.target.value }); // Update state
                }}
              />
              <span style={{ color: "black" }}>Password</span>
              {state.errors.password && <p style={{ color: 'red' }}>{state.errors.password}</p>} 
            </label>
            <input
              type='checkbox'
              className='checkBox'
              checked={state.showPassword}
              onChange={handleCheckboxChange}
            />
            <span className='showPassword'>Show Password</span>
            <button
              className="submit"
            >
              Login
            </button>
            {state.errors && <p style={{ color: 'red', textAlign: "center" }}>{state.errors}</p>}
            <p className="signin">
              Already have an account? <Link to="/Signup">Signup</Link>{" "}
            </p>
          </form>
        )}
      </>
    </div>
  )
}

export default Home