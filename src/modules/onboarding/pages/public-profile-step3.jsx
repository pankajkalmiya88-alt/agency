import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PublicProfileStep3() {
  const [country, setCountry] = useState('');
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
    'Australia', 'Japan', 'India', 'Brazil', 'Mexico', 'Italy', 'Spain',
    'Netherlands', 'Switzerland', 'Sweden', 'Norway', 'Denmark', 'Finland',
    'Belgium', 'Austria', 'Portugal', 'Greece', 'Poland', 'Czech Republic',
    'Hungary', 'Slovakia', 'Slovenia', 'Croatia', 'Bulgaria', 'Romania'
  ];

  const validateForm = () => {
    return country.trim() !== '';
  };

  useEffect(() => {
    setIsValid(validateForm());
  }, [country]);

  const handleReviewProfile = () => {
    // Show profile review modal or navigate to review page
    alert('Profile Review:\n' + 
          `Company: ${location.state?.companyName}\n` +
          `Website: ${location.state?.companyWebsite}\n` +
          `About: ${location.state?.aboutCompany}\n` +
          `Country: ${country}`);
  };

  const handleContinueToSetup = () => {
    if (isValid) {
      navigate('/onboard/public-profile/step-4', { 
        state: { 
          ...location.state,
          country 
        } 
      });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Public Profile Creation</h2>
        <p className="text-gray-600">Step 3 of 6</p>
      </div>

      <form className="space-y-6">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
            Country *
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select a country</option>
            {countries.map((countryName) => (
              <option key={countryName} value={countryName}>
                {countryName}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleReviewProfile}
            className="w-full py-2 px-4 bg-gray-600 text-white rounded-md font-medium hover:bg-gray-700"
          >
            Review Profile
          </button>

          <button
            type="button"
            onClick={handleContinueToSetup}
            disabled={!isValid}
            className={`w-full py-2 px-4 rounded-md font-medium ${
              isValid
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue to Setup
          </button>
        </div>
      </form>
    </div>
  );
}
