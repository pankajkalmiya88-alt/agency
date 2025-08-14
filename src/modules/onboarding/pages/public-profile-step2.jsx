import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PublicProfileStep2() {
  const [aboutCompany, setAboutCompany] = useState('');
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const validateForm = () => {
    return aboutCompany.trim().length >= 10;
  };

  useEffect(() => {
    setIsValid(validateForm());
  }, [aboutCompany]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      navigate('/onboard/public-profile/step-3', { 
        state: { 
          ...location.state,
          aboutCompany 
        } 
      });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Public Profile Creation</h2>
        <p className="text-gray-600">Step 2 of 6</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="aboutCompany" className="block text-sm font-medium text-gray-700 mb-2">
            About Company *
          </label>
          <textarea
            id="aboutCompany"
            value={aboutCompany}
            onChange={(e) => setAboutCompany(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell us about your company..."
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Minimum 10 characters required
          </p>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-2 px-4 rounded-md font-medium ${
            isValid
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </form>
    </div>
  );
}
