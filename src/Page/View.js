import React, { useEffect, useState } from 'react'
import '../Style/View.css'
import axios from 'axios'

function View(props) {
    const [employees, setEmployees] = useState([]);

    const id = props.selectedEmp;

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                // const response = await axios.get(`http://192.168.3.14:5000/api/employees/${id}`);

                const response = await axios.get(`http://192.168.1.10:5000/api/employees/${id}`);
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employee', error);
            }
        };

        fetchEmployee();
    }, [id]);

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
                                    // src={`http://192.168.3.14:5000/${employees.Photo}`}
                                    src={`http://192.168.1.10:5000/${employees.Photo}`}
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
                        <h6 style={{ "color": "white" }}>{employees.Department}</h6>
                        <h6 style={{ "color": "white" }}>{employees.Mobilenumber}</h6>
                        <h6 style={{ "color": "white" }}> DOJ : {employees.Dateofjoin}</h6>
                    </div>
                    <div className='buttonsSections'>
                        <button className='btn_close' onClick={(e) => {
                            props.onClose()
                        }}>Ok</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default View