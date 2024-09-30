import React from 'react';
import '../Style/UploadMedia.css'

function UploadMedia(props) {


    return (
         <div className='areaToUploadFile'>
            <div className='containerFORInput'>
                <div className='headingANDBtn'>
                    <h1>UPLOAD</h1>
                    <button onClick={props.onClose}>X</button>
                </div>
                <div className='InputFeildForMedia'>
                    <input type="file" accept=".xlsx, .xls" onChange={(e) => props.setFile(e.target.files[0])}/>
                    <p style={{color:"red"}}>{props.message}</p>
                </div>
                <div className='BtnForUploadANDCancel'>
                    <button className='btn_Upload' onClick={props.onUpload}>Upload</button>
                    <button className='btn_Cancel' onClick={props.onClosee}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default UploadMedia
