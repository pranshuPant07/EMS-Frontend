import React, { useEffect, useState } from 'react';
import '../Style/View.css';
import axios from 'axios';

function View(props) {
    const [employees, setEmployees] = useState([]);
    const API_LINK= "https://ems-backend-v3pb.onrender.com";

    const id = props.selectedEmp;

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`${API_LINK}/api/employees/${id}`);
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employee', error);
            }
        };

        fetchEmployee();
    }, [id]);

    // Construct the S3 URL for the photo
    const photoUrl = employees.Photo ? `${employees.Photo}` : '';

    return (
        <div className='fullMain'>
            <div className='formToView'>
                <div className='profilePicture'>
                    <div className='buttonToCloseTab'>
                        <button onClick={props.onClose}>X</button>
                    </div>
                    <div className='profilePictureViewer'>
                        <div className='Imagess'>
                            {employees.Photo && (
                                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                <img
                                    src={photoUrl}
                                    alt={`${employees.Name}'s photo`}
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className='DetailsToEdit'>
                    <div className='details'>
                        <h3>{employees.Name}</h3>
                        <h6 style={{ color: "white" }}>{employees.Department}</h6>
                        <h6 style={{ color: "white" }}>{employees.Mobilenumber}</h6>
                        <h6 style={{ color: "white" }}> DOJ : {employees.Dateofjoin}</h6>
                    </div>
                    <div className='buttonsSections'>
                        <button className='btn_close' onClick={props.onClose}>Ok</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default View;
