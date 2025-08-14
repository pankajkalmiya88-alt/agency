import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function RouteGuard({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

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

  // Check if current route is accessible
  const isRouteAccessible = () => {
    const path = location.pathname;
    
    // Account setup is always accessible
    if (path.includes('/account-setup/')) {
      return true;
    }
    
    // Public profile requires account setup to be completed
    if (path.includes('/public-profile/')) {
      return isSectionCompleted("account-setup");
    }
    
    // Free gift requires public profile to be completed
    if (path.includes('/free-gift/')) {
      return isSectionCompleted("public-profile");
    }
    
    return true;
  };

  useEffect(() => {
    if (!isRouteAccessible()) {
      // Redirect to the first step of the first incomplete section
      if (!isSectionCompleted("account-setup")) {
        navigate('/onboard/account-setup/step-1');
      } else if (!isSectionCompleted("public-profile")) {
        navigate('/onboard/public-profile/step-1');
      } else {
        navigate('/onboard/free-gift/step-1');
      }
    }
  }, [location.pathname, navigate]);

  return children;
}
