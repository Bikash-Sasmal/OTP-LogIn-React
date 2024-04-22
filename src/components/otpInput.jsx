import React, { useEffect, useRef, useState } from 'react'
import '../App.css'

const OtpInput = ({length, onOtpSubmit}) => {

    const [otp, setOtp] = useState(new Array(length).fill("")); // initially we add the otp array length is 4(length).
    const inputRefs = useRef([]);

    useEffect(() => {
        if(inputRefs.current[0]){
            inputRefs.current[0].focus();
        }
    }, [])

    console.log(otp);

    const handleChange = (index, e) => {
        const value = e.target.value;
        if(isNaN(value)) return

        const newOtp = [...otp];

        // allow only one input to that text field (otherwise we can type so many characters)
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp); // this setOtp is asynchronous so that's why we use newOtp,   this newOtp is not been updated at this point 
        
        
        // submit trigger
        //  we don't have the updated value at this point so we use newOtp otherwise it will give the oldValue
        const combinedOtp = newOtp.join("");  // at last we combine all the number which has we typed 
        
        if(combinedOtp.length === length){
            onOtpSubmit(combinedOtp);
        }
            // move to next input if current field is filled
         if(value && index < length - 1 && inputRefs.current[index + 1]){
                inputRefs.current[index + 1].focus();
            }
        
    }

    const handleOnClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1);
    }
    // move to back if current field is deleted or we click backspace
    const handleKeyDown = (index, e) => {
        if(e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]){

            inputRefs.current[index - 1].focus();
        }
    }
  return (
    <div>
    {
        otp.map((value, index) => {
            return <input 
                key = {index}
                type = "text"
                ref = {(input) => (inputRefs.current[index] = input)}
                value={value}
                onChange={(e) => handleChange(index, e)}
                onClick={() => handleOnClick(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className='otpInput'
            />
        })
    }
    </div>
  )
}

export default OtpInput;