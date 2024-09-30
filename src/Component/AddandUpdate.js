import React, { useEffect, useState } from 'react';
import './../Style/AddandUpdate.css';
import { formatDate } from './dateFormat';
import axios from 'axios';
import Swal from 'sweetalert2';
import { convertDateFormat } from './OtherFunctions';

function AddandUpdate({ mode, onClose, setLoading, setDatalogout, setpopupModal, code, userID, fetchuserData, setCode }) {
    const [input, setInput] = useState({
        Name: '',
        Mobilenumber: '',
        Photo: null,
        Dateofjoin: '',
        Department: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

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
    ];

    useEffect(() => {
        if (userID && mode === "Edit") {
            const fetchUserDetails = async () => {
                try {
                    const response = await axios.get(`http://192.168.1.10:5000/api/employees/${userID}`);
                    const user = response.data;

                    setInput({
                        Name: user.Name,
                        Mobilenumber: user.Mobilenumber,
                        Photo: user.Photo,
                        Dateofjoin: user.Dateofjoin,
                        Department: user.Department,
                    });
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            };

            fetchUserDetails();
        } else if (mode === "Add") {
            toResetInput(); // Reset input when switching to Add mode
        }
    }, [userID, mode]);

    const toResetInput = () => {
        setInput({
            Name: "",
            Mobilenumber: "",
            Photo: null,
            Dateofjoin: "",
            Department: ""
        });
        setErrorMessage(''); // Reset errors too
    };

    const validate = () => {
        setErrorMessage('');
    
        if (!input.Name.trim()) {
            setErrorMessage('All fields are required.');
            return false;
        }
        if (!input.Mobilenumber) {
            setErrorMessage('All fields are required.');
            return false;
        } else if (!/^\d{10}$/.test(input.Mobilenumber)) {
            setErrorMessage('Mobile number must be 10 digits.');
            return false;
        }
        if (!input.Dateofjoin) {
            setErrorMessage('All fields are required.');
            return false;
        }
        if (!input.Department.trim()) {
            setErrorMessage('All fields are required.');
            return false;
        }
        if (!input.Photo) {
            setErrorMessage('All fields are required.');
            return false;
        }
    
        return true; // No errors
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setInput((prevInput) => ({
            ...prevInput,
            Photo: file,
        }));
    };

    const updateMobilenumber = (e) => {
        const { value } = e.target;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setInput((prevInput) => ({
                ...prevInput,
                Mobilenumber: value,
            }));
        }
    };

    const functiontoclose = () => {
        toResetInput(); // Reset input fields on close
        onClose(); // Close the popup
    };

    const DateSelect = (e) => {
        const input = e.target.value;
        setInput((prevInput) => ({
            ...prevInput,
            Dateofjoin: formatDate(input)
        }));
    };

    const HandleAddEmpl = async (e) => {
        e.preventDefault();
        setpopupModal(false);
        setDatalogout(false);
        setLoading(true);
        try {
            if (validate()) {
                const formData = new FormData();
                formData.append('Name', input.Name);
                formData.append('Mobilenumber', input.Mobilenumber);
                formData.append('Department', input.Department);
                formData.append('Dateofjoin', formatDate(input.Dateofjoin));
                if (input.Photo) {
                    formData.append('photo', input.Photo);
                }
                await axios.post("http://192.168.1.10:5000/api/signup", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setTimeout(() => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Employee data has been saved',
                        showConfirmButton: false,
                        timer: 1200,
                    });
                    setLoading(false);
                    setDatalogout(true);
                    toResetInput(); // Reset fields after successful addition
                }, 2000);
            }
        } catch (error) {
            setDatalogout(true);
            setLoading(false);
            setErrorMessage({ general: 'Error occurred' });
        } finally {
            fetchuserData();
        }
    };

    const HandleEditEmpl = async (e) => {
        e.preventDefault();
        setpopupModal(false);
        setDatalogout(false);
        setLoading(true);

        try {
            if (validate()) {
                const formData = new FormData();
                formData.append('Name', input.Name);
                formData.append('Dateofjoin', formatDate(input.Dateofjoin));
                formData.append('Department', input.Department);
                if (input.Photo) {
                    formData.append('photo', input.Photo);
                }
                await axios.put(`http://192.168.1.10:5000/update-user/${userID}`, formData);
                setTimeout(() => {
                    Swal.fire({ title: "SUCCESS", text: "Updated data has been saved", icon: "success" });
                    setDatalogout(true);
                    setLoading(false);
                    toResetInput();
                }, 2000);
            }
        } catch (error) {
            setDatalogout(true);
            setLoading(false);
            setErrorMessage({ general: 'Error occurred' });
        } finally {
            fetchuserData();
            setCode("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            if (mode === "Add") {
                HandleAddEmpl(e);
            } else if (mode === 'Edit') {
                HandleEditEmpl(e);
            }
        } else {
            setDatalogout(true);
            setLoading(false);
        }
    };


    return (
        <div className='addPageMain'>
            <div className='inputAreaAgain'>
                <div className='headingAndButton'>
                    <h1>{mode === 'Edit' ? 'EDIT EMPLOYEE' : 'ADD EMPLOYEE'}</h1>
                    <button onClick={functiontoclose}>X</button>
                </div>
                <div className='area'>
                    <input
                        value={input.Name}
                        type='text'
                        placeholder='Enter your name'
                        name="Name"
                        onChange={handleInputChange} />
                    {/* {errors.Name && <p style={{ color: 'red' }}>{errors.Name}</p>} */}
                    <input
                        type='number'
                        value={input.Mobilenumber}
                        placeholder='Enter your mobile number'
                        onChange={updateMobilenumber}
                    />
                    {/* {errors.Mobilenumber && <p style={{ color: 'red' }}>{errors.Mobilenumber}</p>} */}
                    <select
                        id="select-input"
                        name="Department"
                        onChange={handleInputChange}
                        value={input.Department}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {/* {errors.Department && <p style={{ color: 'red' }}>{errors.Department}</p>} */}

                    <input
                        type='file'
                        placeholder='upload Image'
                        name='image'
                        accept='image/*'
                        onChange={handleFileChange}
                    />
                    {/* {errors.Photo && <p style={{ color: 'red' }}>{errors.Photo}</p>} */}

                    <input
                        type='date'
                        value={convertDateFormat(input.Dateofjoin)}
                        placeholder='Enter your date of join'
                        name='Dateofjoin'
                        onChange={DateSelect} />
                    {/* {errors.Dateofjoin && <p style={{ color: 'red' }}>{errors.Dateofjoin}</p>} */}
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                    <button onClick={handleSubmit}>{mode === 'Edit' ? 'Update' : 'Add'}</button>
                </div>
            </div>
        </div>
    );
}

export default AddandUpdate;
