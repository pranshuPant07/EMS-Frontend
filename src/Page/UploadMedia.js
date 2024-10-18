import React, { useState } from 'react';
import '../Style/UploadMedia.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function UploadMedia({ onClose, message, setUploadModal, setMessage, setLoading, setErrorModal, setResponse, setErrorMessge, setDatalogout }) {
    const [state, setState] = useState({
        file: null,
        processing: false,
        response: [],
    });
    const API_LINK = process.env.REACT_APP_API_URL;

    const updateState = (newState) => {
        setState(prevState => ({ ...prevState, ...newState }));
    };

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const fetchUserData = async () => {
        try {
            // const response = await axios.get("http://192.168.1.10:5000/api/users");
            const response = await axios.get("http://192.168.3.14:5000/api/users");
            const data = await response.data;
            updateState({ Employee: data });
        } catch (error) {
            console.log(error);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            updateState({ file });
            setMessage('');
        }
    };

    const onUpload = async () => {
        if (!state.file) {
            setMessage('Please choose a file first.');
            return;
        }
        setUploadModal(false);
        setLoading(true);
        setDatalogout(false);
        updateState({ processing: true });
        try {
            await delay(1000);
            const formData = new FormData();
            formData.append('file', state.file);

            const response = await axios.post(`${API_LINK}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { data } = response;
            console.log(data)
            if (data.invalidEmployees.length > 0) {
                setErrorModal(true);
                setErrorMessge(data.errorMessage || 'Some records are invalid or already exist');
                setResponse(data.invalidEmployees);
                setLoading(false);
            } else {
                await delay(2000);
                setLoading(false)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Employee data has been saved',
                    showConfirmButton: false,
                    timer: 1200,
                });
                fetchUserData();
            }
        } catch (error) {
            setLoading(false)
            setErrorModal(true);
            setMessage(`Error uploading file: ${error.response?.data || error.message}`);
        } finally {
            updateState({ processing: false, file: null });
            setDatalogout(true);
        }
    };

    return (
        <div className='areaToUploadFile'>
            <div className='containerFORInput'>
                <div className='headingANDBtn'>
                    <h1>UPLOAD</h1>
                    <button onClick={onClose}>X</button>
                </div>
                <div className='InputFeildForMedia'>
                    <input name="file" type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                    <p style={{ color: "red" }}>{message}</p>
                </div>
                <div className='BtnForUploadANDCancel'>
                    <button className='btn_Upload' onClick={onUpload}>Upload</button>
                    <button className='btn_Cancel' onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default UploadMedia;
