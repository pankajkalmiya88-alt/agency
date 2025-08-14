import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Login() {
  const { email: emailParam } = useParams();
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  // Strict email regex: prevents trailing characters after TLD
  const EMAIL_REGEX =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailIsValid = EMAIL_REGEX.test(email.trim());
  const showError = touched && !emailIsValid && email;

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

  // Auto-fill from URL param
  useEffect(() => {
    if (emailParam) setEmail(base64Decode(emailParam));
  }, [emailParam]);




  const handleChange = (e) => {
    setEmail(e.target.value);
    if (touched) setTouched(false); // clear error when typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email });
    navigate(`/auth/verify-otp/${base64Encode(email.trim())}`);
  };

  const inputClasses = `w-full px-3 py-2 rounded-md border focus:outline-none ${showError ? "border-red-500" : "border-gray-300"
    }`;

  const buttonClasses = `mt-4 w-full py-2 rounded-md text-white font-semibold transition-colors ${emailIsValid
    ? "bg-blue-500 hover:bg-blue-600"
    : "bg-gray-400 cursor-not-allowed"
    }`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          placeholder="Enter your email"
          className={inputClasses}
        />

        {/* Reserve space so layout doesn't shift */}
        <p
          className={`text-sm mt-1 h-5 transition-opacity duration-200 ${showError ? "text-red-500 opacity-100" : "opacity-0"
            }`}
        >
          Invalid email
        </p>

        <button type="submit" disabled={!emailIsValid} className={buttonClasses}>
          Submit
        </button>
      </form>
    </div>
  );
}
