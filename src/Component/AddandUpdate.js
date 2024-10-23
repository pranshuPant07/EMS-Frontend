import React, { useEffect, useState } from 'react';
import './../Style/AddandUpdate.css';
import { formatDate } from './dateFormat';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { convertDateFormat } from './OtherFunctions';

function AddandUpdate({ mode,
    onClose,
    setLoading,
    setDatalogout,
    setpopupModal,
    userID,
    fetchuserData }) {

    const API_LINK = process.env.REACT_APP_API_URL;

    const
        { register,
            handleSubmit,
            setValue,
            reset,
            formState: { errors } } = useForm();

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
                    const response = await axios.get(`${API_LINK}/api/employees/${userID}`);
                    const user = response.data;

                    setValue('Name', user.Name);
                    setValue('Mobilenumber', user.Mobilenumber);
                    setValue('Photo', user.Photo);
                    setValue('Dateofjoin', convertDateFormat(user.Dateofjoin));
                    setValue('Department', user.Department);
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            };

            fetchUserDetails();
        } else if (mode === "Add") {
            reset(); // Reset form when switching to Add mode
        }
    }, [userID, mode, reset, setValue]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setErrorMessage("Photo is required");
        } else {
            setValue('Photo', file);
        }
    };

    const functiontoclose = () => {
        reset();
        onClose();
    };

    const HandleAddEmpl = async (data) => {
        setDatalogout(false);
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('Name', data.Name);
            formData.append('Mobilenumber', data.Mobilenumber);
            formData.append('Department', data.Department);
            formData.append('Dateofjoin', formatDate(data.Dateofjoin));
            if (data.Photo) {
                formData.append('photo', data.Photo);
            }

            const response = await axios.post(`${API_LINK}/api/addEmployee`, formData);


            console.log("Response from server:", response.data);
            setpopupModal(false);

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
                reset();
            }, 1000);
        } catch (error) {
            setDatalogout(true);
            setLoading(false);
            // Check if error.response is defined
            console.error("Error response:", error.response);
            setErrorMessage(error.response?.data?.error || 'An error occurred');
        } finally {
            fetchuserData();
        }
    };

    const HandleEditEmpl = async (data) => {
        setDatalogout(false);
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('Name', data.Name);
            formData.append('Dateofjoin', formatDate(data.Dateofjoin));
            formData.append('Department', data.Department);
            if (data.Photo) {
                formData.append('photo', data.Photo);
            }
            await axios.put(`${API_LINK}/api/employees/${userID}`, formData);
            setpopupModal(false);
            setTimeout(() => {
                Swal.fire({ title: "SUCCESS", text: "Updated data has been saved", icon: "success" });
                setDatalogout(true);
                setLoading(false);
                fetchuserData();
                reset();
            }, 2000);
        } catch (error) {
            setDatalogout(true);
            setLoading(false);
            setErrorMessage(error.response.data.error);
        } finally {
            fetchuserData();
        }
    };

    const onSubmit = (data) => {
        if (mode === "Add") {
            HandleAddEmpl(data);
        } else if (mode === 'Edit') {
            HandleEditEmpl(data);
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register('Name',
                                { required: true }
                            )}
                            type='text'
                            placeholder='Enter your name'
                        />
                        {errors.Name && <span style={{ color: 'red' }}>Name is required</span>}

                        <input
                            type='number'
                            {...register('Mobilenumber',
                                { required: true, pattern: /^\d{10}$/ }
                            )}
                            placeholder='Enter your mobile number'
                            disabled={mode === 'Edit'}
                        />
                        {errors.Mobilenumber && <span style={{ color: 'red' }}>Mobile number must be 10 digits</span>}

                        <select className='selectDepartment'
                            {...register('Department',
                                { required: true }
                            )}
                        >
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {errors.Department && <span style={{ color: 'red' }}>Department is required</span>}

                        <input
                            type='file'
                            placeholder='Upload Image'
                            accept='image/*'
                            onChange={handleFileChange}
                        />
                        {errors.Photo && <span style={{ color: 'red' }}>Photo is required</span>}

                        <input
                            type='date'
                            className='dateArea'
                            value={setValue.Dateofjoin}
                            {...register('Dateofjoin',
                                { required: true }
                            )}
                        />
                        {errors.Dateofjoin && <span style={{ color: 'red' }}>Date of join is required</span>}
                        {errorMessage && <p style={{ color: 'red', textAlign: "center", marginBottom: "14%" }}>{errorMessage}</p>}

                        <button type="submit" style={{ marginLeft: "25%" }}>{mode === 'Edit' ? 'Update' : 'Add'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddandUpdate;
