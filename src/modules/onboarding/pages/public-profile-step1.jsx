import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PublicProfileStep1() {
  const [companyName, setCompanyName] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const validateWebsite = (url) => {
    if (!url) return false;
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    return companyName.trim() !== '' && validateWebsite(companyWebsite);
  };

  useEffect(() => {
    setIsValid(validateForm());
  }, [companyName, companyWebsite]);

  const handleWebsiteChange = (e) => {
    let value = e.target.value;
    if (value && !value.startsWith('http')) {
      value = `https://${value}`;
    }
    setCompanyWebsite(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      navigate('/onboard/public-profile/step-2', { 
        state: { companyName, companyWebsite } 
      });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Public Profile Creation</h2>
        <p className="text-gray-600">Step 1 of 6</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your company name"
            required
          />
        </div>

        <div>
          <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700 mb-2">
            Company Website *
          </label>
          <input
            type="url"
            id="companyWebsite"
            value={companyWebsite}
            onChange={handleWebsiteChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com"
            required
          />
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
          Submit
        </button>
      </form>
    </div>
  );
}
