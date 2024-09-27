import React from 'react'
import '../Style/Verification.css'

function Verification({ code, setCode, setVerifyModal, SetIsEditing, errorInVerification, setErrorInVerification, verificationDone, handleUpdates }) {

    //FUNCTION TO HANDLE POPUP CLOSE ON BUTTON CLICK
    const closeButton = (e) => {
        setVerifyModal(false);
        SetIsEditing(true);
    }

    //FUNCTION TO SET ENTER VERIFICATION CODE INTO STATE
    const changeCheck = (e) => {
        const value = (e.target.value)
        setCode(value);
        if (value.length > 0) {
            setErrorInVerification("")
        }
    }

    return (
        <div className='verificationScreen'>
            <form className="otp-Form" >
                <span className="mainHeading">VERIFY YOURSELF</span>
                <p className="otpSubheading">
                    Please enter the security code to proceed
                </p>
                <div className="inputContainer">
                    <input
                        required="required"
                        maxLength={4}
                        value={code}
                        type="password"
                        className="otp-input"
                        id="otp-input1"
                        onChange={changeCheck}
                    />
                </div>
                <button className="verifyButton" type="submit" onClick={handleUpdates}>
                    Verify
                </button>
                {errorInVerification && <p className='errorin' style={{ color: 'red' }}>{errorInVerification}</p>}
                <button className="exitBtn" onClick={closeButton}>x</button>
            </form>

        </div>
    )
}

export default Verification
