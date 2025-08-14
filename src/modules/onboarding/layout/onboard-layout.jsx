import { Outlet, useLocation, useNavigate } from "react-router-dom";
import StepIndicator from "../components/StepIndicator";
import RouteGuard from "../components/RouteGuard";

export default function OnboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine current step and total steps based on route
  const getStepInfo = () => {
    const path = location.pathname;
    
    if (path.includes('/account-setup/')) {
      const stepMatch = path.match(/step-(\d+)/);
      const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;
      return {
        currentStep,
        totalSteps: 4,
        stepTitle: "Account Setup",
        section: "account-setup"
      };
    } else if (path.includes('/public-profile/')) {
      const stepMatch = path.match(/step-(\d+)/);
      const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;
      return {
        currentStep,
        totalSteps: 4,
        stepTitle: "Public Profile Creation",
        section: "public-profile"
      };
    } else if (path.includes('/free-gift/')) {
      const stepMatch = path.match(/step-(\d+)/);
      const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;
      return {
        currentStep,
        totalSteps: 2,
        stepTitle: "Get a Free Gift",
        section: "free-gift"
      };
    }
    
    return {
      currentStep: 1,
      totalSteps: 4,
      stepTitle: "Account Setup",
      section: "account-setup"
    };
  };

  // Check if a section is completed based on current route
  const isSectionCompleted = (sectionName) => {
    const path = location.pathname;
    
    if (sectionName === "account-setup") {
      // Account setup is completed if we're on public-profile or free-gift sections
      return path.includes('/public-profile/') || path.includes('/free-gift/');
    } else if (sectionName === "public-profile") {
      // Public profile is completed if we're on free-gift section
      return path.includes('/free-gift/');
    } else if (sectionName === "free-gift") {
      // Free gift is completed if we're on the final step
      return path.includes('/free-gift/step-2');
    }
    
    return false;
  };

  // Check if a section is accessible (previous section completed)
  const isSectionAccessible = (sectionName) => {
    if (sectionName === "account-setup") {
      return true; // Always accessible
    } else if (sectionName === "public-profile") {
      return isSectionCompleted("account-setup");
    } else if (sectionName === "free-gift") {
      return isSectionCompleted("public-profile");
    }
    return false;
  };

  // Handle section click
  const handleSectionClick = (sectionName) => {
    if (!isSectionAccessible(sectionName)) {
      return; // Don't navigate if section is not accessible
    }
    
    if (sectionName === "account-setup") {
      navigate('/onboard/account-setup/step-1');
    } else if (sectionName === "public-profile") {
      navigate('/onboard/public-profile/step-1');
    } else if (sectionName === "free-gift") {
      navigate('/onboard/free-gift/step-1');
    }
  };

  const stepInfo = getStepInfo();

  return (
    <RouteGuard>
      <div className="flex min-h-screen bg-white">
        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {/* Header Section */}
          <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-b-3xl">
            {/* Background decorative shapes */}
            <div className="absolute inset-0 overflow-hidden rounded-b-3xl">
              <div className="absolute top-4 right-8 w-24 h-24 bg-blue-200 rounded-full opacity-30"></div>
              <div className="absolute top-12 right-20 w-16 h-16 bg-blue-300 rounded-full opacity-20"></div>
              <div className="absolute bottom-8 right-12 w-20 h-20 bg-blue-200 rounded-full opacity-25"></div>
            </div>
            
            {/* Logo and Title */}
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">G</span>
                </div>
                <span className="text-blue-600 font-semibold text-lg">GetProjects.ai</span>
              </div>
              <h1 className="text-3xl font-bold text-blue-900 leading-tight">
                Simplified Onboarding<br />Experience
              </h1>
            </div>
          </div>

          {/* Onboarding Steps Section */}
          <div className="flex-1 p-8 relative">
            {/* Background decorative G logo */}
            <div className="absolute bottom-8 right-8 w-64 h-64 text-gray-100 opacity-10">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-9xl font-bold">G</span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="relative z-10 max-w-md">
              <div className="space-y-8">
                {/* Step 1: Account setup */}
                <div className="flex items-start">
                  <div className="flex flex-col items-center mr-4">
                    <button
                      onClick={() => handleSectionClick("account-setup")}
                      disabled={!isSectionAccessible("account-setup")}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isSectionCompleted("account-setup")
                          ? 'bg-green-500 text-white cursor-pointer hover:bg-green-600'
                          : isSectionAccessible("account-setup")
                          ? 'bg-blue-600 text-white cursor-pointer hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {isSectionCompleted("account-setup") ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-sm font-medium">1</span>
                      )}
                    </button>
                    <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-1 ${
                      isSectionCompleted("account-setup") 
                        ? 'text-green-600' 
                        : isSectionAccessible("account-setup")
                        ? 'text-gray-800'
                        : 'text-gray-400'
                    }`}>
                      Account setup
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">Helps us stay in touch.</p>
                    <div className="flex items-center text-blue-600 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>30sec</span>
                    </div>
                  </div>
                </div>

                {/* Step 2: Post 1st requirement */}
                <div className="flex items-start">
                  <div className="flex flex-col items-center mr-4">
                    <button
                      onClick={() => handleSectionClick("public-profile")}
                      disabled={!isSectionAccessible("public-profile")}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isSectionCompleted("public-profile")
                          ? 'bg-green-500 text-white cursor-pointer hover:bg-green-600'
                          : isSectionAccessible("public-profile")
                          ? 'bg-blue-600 text-white cursor-pointer hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {isSectionCompleted("public-profile") ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-sm font-medium">2</span>
                      )}
                    </button>
                    <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-1 ${
                      isSectionCompleted("public-profile") 
                        ? 'text-green-600' 
                        : isSectionAccessible("public-profile")
                        ? 'text-gray-800'
                        : 'text-gray-400'
                    }`}>
                      Post 1st requirement
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">We'll match you with the right experts</p>
                    <div className="flex items-center text-blue-600 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>60sec</span>
                    </div>
                  </div>
                </div>

                {/* Step 3: Review and post */}
                <div className="flex items-start">
                  <div className="flex flex-col items-center mr-4">
                    <button
                      onClick={() => handleSectionClick("free-gift")}
                      disabled={!isSectionAccessible("free-gift")}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isSectionCompleted("free-gift")
                          ? 'bg-green-500 text-white cursor-pointer hover:bg-green-600'
                          : isSectionAccessible("free-gift")
                          ? 'bg-blue-600 text-white cursor-pointer hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {isSectionCompleted("free-gift") ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-sm font-medium">3</span>
                      )}
                    </button>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-1 ${
                      isSectionCompleted("free-gift") 
                        ? 'text-green-600' 
                        : isSectionAccessible("free-gift")
                        ? 'text-gray-800'
                        : 'text-gray-400'
                    }`}>
                      Review and post
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">One last look before we go live</p>
                    <div className="flex items-center text-blue-600 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>30sec</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="p-8 border-t border-gray-100">
            <p className="text-gray-500 text-sm">Copyright, GetProjects.ai 2025</p>
          </div>
        </main>

        {/* Right side content area */}
        <div className="w-1/2 bg-gray-50 p-8">
          <StepIndicator 
            currentStep={stepInfo.currentStep}
            totalSteps={stepInfo.totalSteps}
            stepTitle={stepInfo.stepTitle}
          />
          <Outlet />
        </div>
      </div>
    </RouteGuard>
  );
}