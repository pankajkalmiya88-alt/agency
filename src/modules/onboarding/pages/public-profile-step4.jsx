import { useNavigate } from 'react-router-dom';

export default function PublicProfileStep4() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/onboard/free-gift/step-1');
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Company Details Saved!</h3>
        <p className="text-gray-600">
          Your company profile has been successfully created. This information will help us match you with the right experts.
        </p>
      </div>

      <button
        onClick={handleContinue}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
      >
        Continue to Free Gift
      </button>
    </div>
  );
}
