import React from 'react'
import '../Style/ErrorDisplay.css'

function ErrorDisplay({ onClose, response, errorMessage }) {

    return (
        <div className='areaToDisplayError'>
            <div className='containerFORError'>
                <div className='headingANDBtnn'>
                    <h1>Error</h1>
                    <button onClick={onClose}>X</button>
                </div>
                <div className='FeildForDisplayError'>
                    <table style={{ margin: "0" }} className="table table-dark table-striped table-hover">
                        <thead >
                            <tr style={{ textAlign: "center" }}>
                                <th className='cenTer2' scope="col">S.No</th>
                                <th className='cenTer2' scope="col">Name</th>
                                <th className='cenTer2' scope="col">Mobile number</th>
                                <th className='cenTer2' scope="col">Date of join</th>
                            </tr>
                        </thead>
                        {
                            response.map((item, index) => {
                                return (
                                    <tbody>
                                        <tr style={{ textAlign: "center" }}>
                                            <th style={{ color: "red" }} className='cenTer3' scope="row" key={item.id}>{(index + 1)}</th>
                                            <td style={{ color: "red" }} className='cenTer'>{item.Name}</td>
                                            <td style={{ color: "red" }} className='cenTer'>{item.Mobilenumber}</td>
                                            <td style={{ color: "red" }} className='cenTer'>{item.Dateofjoin}</td>
                                        </tr>
                                    </tbody>
                                )
                            })
                        }
                    </table>
                </div>
                <div className='BtnForCanCel'>
                    <p className='pForError' style={{ color: "red" }}>{errorMessage}</p>
                    <button className='btn_Cancell' onClick={onClose}>CANCEL</button>
                </div>
            </div>
        </div>
    )
}

export default ErrorDisplay
