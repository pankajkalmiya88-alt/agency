import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OTP_LENGTH = 6;
const OTP_TIMER_DURATION = 30; // seconds

export default function VerifyOtp() {
    const { email: emailParam } = useParams();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpTouched, setOtpTouched] = useState(false);
    const [timer, setTimer] = useState(OTP_TIMER_DURATION);

    const otpIsValid = useMemo(() => new RegExp(`^\\d{${OTP_LENGTH}}$`).test(otp), [otp]);
    const showOtpError = otpTouched && !otpIsValid && otp.length > 0;

      // Encode UTF-8 safe
    const base64Encode = (str) => {
        return btoa(new TextEncoder().encode(str)
            .reduce((data, byte) => data + String.fromCharCode(byte), ""));
    };

    // Decode UTF-8 safe
    const base64Decode = (base64) => {
        return new TextDecoder().decode(
            Uint8Array.from(atob(base64), (char) => char.charCodeAt(0))
        );
    };

    // Auto-fill email from params
    useEffect(() => {
        if (emailParam) {
            setEmail(base64Decode(emailParam));
        }
    }, [emailParam]);

    

    // Countdown effect
    useEffect(() => {
        if (timer <= 0) return;
        const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(countdown);
    }, [timer]);

  

    const handleOtpChange = useCallback((e) => {
        const numericValue = e.target.value.replace(/\D/g, "");
        setOtp(numericValue);
        if (otpTouched) setOtpTouched(false);
    }, [otpTouched]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        console.log({ email, otp });
    }, [email, otp]);

    const handleEditEmail = useCallback(() => {
        navigate(`/auth/login/${base64Encode(email)}`);
    }, [email, navigate]);

    const handleResendOtp = useCallback(() => {
        console.log("Resend OTP clicked");
        setTimer(OTP_TIMER_DURATION);
        // API call to resend OTP can be placed here
    }, []);

    // Shared input styles
    const baseInputClasses = "w-full px-3 py-2 rounded-md border focus:outline-none";
    const otpInputClasses = `${baseInputClasses} ${showOtpError ? "border-red-500" : "border-gray-300"}`;

    const buttonClasses = `mt-4 w-full py-2 rounded-md text-white font-semibold transition-colors ${otpIsValid ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
        }`;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>

                {/* Email Field */}
                <div className="flex items-center justify-between">
                    <label htmlFor="email" className="block mb-1 font-medium">
                        Email
                    </label>
                    <button
                        type="button"
                        onClick={handleEditEmail}
                        className="text-sm text-blue-500 hover:underline"
                    >
                        Edit Email
                    </button>
                </div>
                <input
                    id="email"
                    type="email"
                    value={email}
                    disabled
                    className={`${baseInputClasses} border-gray-300 bg-gray-100 cursor-not-allowed`}
                />

                {/* OTP Field */}
                <label htmlFor="otp" className="block mt-4 mb-1 font-medium">
                    OTP
                </label>
                <input
                    id="otp"
                    type="text"
                    value={otp}
                    maxLength={OTP_LENGTH}
                    onChange={handleOtpChange}
                    onBlur={() => setOtpTouched(true)}
                    placeholder={`Enter ${OTP_LENGTH}-digit OTP`}
                    className={otpInputClasses}
                />

                {/* Error space */}
                <p
                    className={`text-sm mt-1 h-5 transition-opacity duration-200 ${showOtpError ? "text-red-500 opacity-100" : "opacity-0"
                        }`}
                >
                    Please enter correct OTP
                </p>

                {/* Timer / Resend Link */}
                <div className="mt-3 text-center text-sm">
                    {timer > 0 ? (
                        <span className="text-gray-500">Resend OTP in {timer} sec</span>
                    ) : (
                        <button
                            type="button"
                            onClick={handleResendOtp}
                            className="text-blue-500 hover:underline"
                        >
                            Resend OTP
                        </button>
                    )}
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={!otpIsValid} className={buttonClasses}>
                    Verify OTP
                </button>
            </form>
        </div>
    );
}
