import { useState } from "react";
import OtpInput from "./otpInput";
import "../App.css";

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setshowOtpInput] = useState(false);

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePhoneSubmit = (event) => {
    event.preventDefault();

    // phone validations
    const regex = /[^0-9]/g;
    if (phoneNumber.length > 11 || regex.test(phoneNumber)) {
      alert("Invalid phone Number");
      return;
    }

    // Call BE API
    // show otp field
    setshowOtpInput(true);
  };

  const onOtpSubmit = (otp) => {
    console.log("LogIn Successfull", otp);
  };
  return (
    <div>
      {!showOtpInput ? (
        <form onSubmit={handlePhoneSubmit}>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder="Enter Phone Number"
            className="otpform"
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      ) : (
        <div className="show-no">
          <p>
            {" "}
            Enter OTP Sent to "
            <span style={{ color: "#4285f4" }}>{phoneNumber}</span>"
          </p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
};
export default PhoneOtpForm;
