import { useLocation, useNavigate } from 'react-router-dom';

export default function StepIndicator({ currentStep, totalSteps, stepTitle }) {
  const navigate = useNavigate();
  const location = useLocation();

  const getStepPath = (stepNumber) => {
    const currentPath = location.pathname;
    const basePath = currentPath.split('/step-')[0];
    return `${basePath}/step-${stepNumber}`;
  };

  const handleStepClick = (stepNumber) => {
    const targetPath = getStepPath(stepNumber);
    navigate(targetPath);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{stepTitle}</h2>
      <p className="text-gray-600 mb-4">Step {currentStep} of {totalSteps}</p>
      
      {/* Step Indicators */}
      <div className="flex items-center space-x-2">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <button
              key={stepNumber}
              onClick={() => handleStepClick(stepNumber)}
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                isActive
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : isCompleted
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'bg-white border-gray-300 text-gray-500 hover:border-blue-400'
              }`}
              title={`Go to step ${stepNumber}`}
            >
              {isCompleted ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <span className="text-sm font-medium">{stepNumber}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
