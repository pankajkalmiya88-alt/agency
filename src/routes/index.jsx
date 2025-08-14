import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Auth
const AuthLayout = lazy(() => import("../modules/auth/layout/auth-layout"));
const Login = lazy(() => import("../modules/auth/pages/login"));
const VerifyOtp = lazy(() => import("../modules/auth/pages/verify-otp"));

// Onboarding
const OnboardLayout = lazy(() => import("../modules/onboarding/layout/onboard-layout"));

// Account Setup Steps
const AccountSetupStep1 = lazy(() => import("../modules/onboarding/pages/account-setup-step1"));
const AccountSetupStep2 = lazy(() => import("../modules/onboarding/pages/account-setup-step2"));
const AccountSetupStep3 = lazy(() => import("../modules/onboarding/pages/account-setup-step3"));
const AccountSetupStep4 = lazy(() => import("../modules/onboarding/pages/account-setup-step4"));

// Public Profile Steps
const PublicProfileStep1 = lazy(() => import("../modules/onboarding/pages/public-profile-step1"));
const PublicProfileStep2 = lazy(() => import("../modules/onboarding/pages/public-profile-step2"));
const PublicProfileStep3 = lazy(() => import("../modules/onboarding/pages/public-profile-step3"));
const PublicProfileStep4 = lazy(() => import("../modules/onboarding/pages/public-profile-step4"));

// Free Gift Steps
const FreeGiftStep1 = lazy(() => import("../modules/onboarding/pages/free-gift-step1"));
const FreeGiftStep2 = lazy(() => import("../modules/onboarding/pages/free-gift-step2"));

// Legacy onboarding steps (keeping for backward compatibility)
const StepOne = lazy(() => import("../modules/onboarding/pages/step-one"));
const StepTwo = lazy(() => import("../modules/onboarding/pages/step-two"));
const StepThree = lazy(() => import("../modules/onboarding/pages/step-three"));

// New Requirement
const NewRequirementLayout = lazy(() => import("../modules/new-requirement/layout/new-requirement-layout"));
const NRList = lazy(() => import("../modules/new-requirement/pages/list"));

// My Requirement
const MyRequirementLayout = lazy(() => import("../modules/my-requirement/layout/new-requirement-layout"));
const MRList = lazy(() => import("../modules/my-requirement/pages/list"));
const PostRequirement = lazy(() => import("../modules/my-requirement/pages/post-requirement"));

// Settings
const SettingLayout = lazy(() => import("../modules/settings/layout/setting-layout"));
const MyAccount = lazy(() => import("../modules/settings/pages/my-account"));
const MyCompany = lazy(() => import("../modules/settings/pages/my-company"));

// Shared
const NotFound = lazy(() => import("../modules/shared/pages/not-found"));

export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<div style={{ padding: "2rem" }}>Loading...</div>}>
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/onboard/account-setup/step-1" replace />} />

          {/* Auth */}
          <Route path="/auth" element={<AuthLayout />}>
            {/* Default redirect */}
            <Route index element={<Navigate to="login" replace />} />

            {/* Relative child paths */}
            <Route path="login" element={<Login />} />
            <Route path="login/:email" element={<Login />} />
            <Route path="verify-otp/:email" element={<VerifyOtp />} />
          </Route>

          {/* Onboarding */}
          <Route path="/onboard" element={<OnboardLayout />}>
            {/* Default redirect */}
            <Route index element={<Navigate to="account-setup/step-1" replace />} />

            {/* Account Setup Steps */}
            <Route path="account-setup">
              <Route index element={<Navigate to="step-1" replace />} />
              <Route path="step-1" element={<AccountSetupStep1 />} />
              <Route path="step-2" element={<AccountSetupStep2 />} />
              <Route path="step-3" element={<AccountSetupStep3 />} />
              <Route path="step-4" element={<AccountSetupStep4 />} />
            </Route>

            {/* Public Profile Steps */}
            <Route path="public-profile">
              <Route index element={<Navigate to="step-1" replace />} />
              <Route path="step-1" element={<PublicProfileStep1 />} />
              <Route path="step-2" element={<PublicProfileStep2 />} />
              <Route path="step-3" element={<PublicProfileStep3 />} />
              <Route path="step-4" element={<PublicProfileStep4 />} />
            </Route>

            {/* Free Gift Steps */}
            <Route path="free-gift">
              <Route index element={<Navigate to="step-1" replace />} />
              <Route path="step-1" element={<FreeGiftStep1 />} />
              <Route path="step-2" element={<FreeGiftStep2 />} />
            </Route>

            {/* Legacy onboarding routes (keeping for backward compatibility) */}
            <Route path="step-one" element={<StepOne />} />
            <Route path="step-two" element={<StepTwo />} />
            <Route path="step-three" element={<StepThree />} />
          </Route>

          {/* New Requirement */}
          <Route path="/new-requirement" element={<NewRequirementLayout />}>
            {/* Default redirect */}
            <Route index element={<Navigate to="list" replace />} />

            {/* Relative child paths */}
            <Route path="list" element={<NRList />} />
          </Route>

          {/* My Requirement */}
          <Route path="/my-requirement" element={<MyRequirementLayout />}>
            {/* Default redirect */}
            <Route index element={<Navigate to="list" replace />} />

            {/* Relative child paths */}
            <Route path="list" element={<MRList />} />
            <Route path="post" element={<PostRequirement />} />
          </Route>

          {/* Settings */}
          <Route path="/settings" element={<SettingLayout />}>
            {/* Default redirect */}
            <Route index element={<Navigate to="my-account" replace />} />

            {/* Relative child paths */}
            <Route path="my-account" element={<MyAccount />} />
            <Route path="my-company" element={<MyCompany />} />
          </Route>

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}