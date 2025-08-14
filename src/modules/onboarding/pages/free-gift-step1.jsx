import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FreeGiftStep1() {
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    return name.trim().length >= 2;
  };

  useEffect(() => {
    setIsValid(validateForm());
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      navigate('/onboard/free-gift/step-2', { state: { name } });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Get a Free Gift</h2>
        <p className="text-gray-600">Step 1 of 2</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your full name"
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
