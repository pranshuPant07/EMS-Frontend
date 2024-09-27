/* eslint-disable no-unused-vars */
import { useState } from 'react';
import '../Style/Home.css';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Loader from './Loader';
import axios from 'axios';

function Home() {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState('');
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const navigate = useNavigate();

  //FUNCTION TO VALIDATE THE INPUT FIELD
  const validate = () => {
    const newErrors = [];
    if (!Username.trim()) newErrors.Username = 'Username is required';
    if (!Password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  //FUNCTION TO SHOW PASSWORD AND HIDE PASSWORD
  const handleCheckboxChange = () => {
    setShowPassword(prevState => !prevState);
  };

  //FUNCTION TO HANDLE LOGIN 
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validate()) {
      try {
        const response = await axios.post('http://192.168.3.14:5000/api/loginData', { Username: Username, Password: Password });
        const { token } = response.data;
        if (token) {
          setErrors('');
          localStorage.setItem('authToken', token);
          await delay(2000);
          setLoading(false);
          Swal.fire({
            title: "WELCOME",
            text: "Login Sucessful",
            icon: "success"
          });
          navigate('./Form', { replace: true });
        }
      } catch (error) {
        // Handle errors
        if (error.response) {
          // Server responded with a status other than 200 range
          await delay(1000);
          setErrors(error.response.data.message);
          setSuccess('');
          setLoading(false);

        } else {
          // Something happened in setting up the request
          await delay(1000);
          setErrors('An unexpected error occurred.');
          setSuccess('');
          setLoading(false);
        }
      }
    } else {
      setLoading(false)
    }

  }

  return (
    <div className='main'>
      <>
        {loading ? (
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
                value={Username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }} />
              <span style={{ "color": "black" }}>Username</span>
              {errors.Username && <p style={{ color: 'red' }}>{errors.Username}</p>}
            </label>
            <label>
              <input
                className="input"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={Password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }} />
              <span style={{ "color": "black" }}>Password</span>
              {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            </label>
            <input
              type='checkbox'
              className='checkBox'
              checked={showPassword}
              onChange={handleCheckboxChange} />
            <span className='showPassword'>Show Password</span>
            <button
              className="submit">
              Login
            </button>
            {errors && <p style={{ color: 'red', textAlign: "center" }}>{errors}</p>}
            <p
              className="signin">
              Already have an acount ? <Link to="/Signup">Signup</Link>{" "}
            </p>
          </form>
        )}
      </>
    </div>
  )
}

export default Home