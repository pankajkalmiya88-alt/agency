import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Auth
const AuthLayout = lazy(() => import("../modules/auth/layout/auth-layout"));
const Login = lazy(() => import("../modules/auth/pages/login"));

// Onboarding
const OnboardLayout = lazy(() => import("../modules/onboarding/layout/onboard-layout"));
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
          <Route path="/" element={<Navigate to="/auth" replace />} />

          {/* Auth */}
          <Route path="/auth" element={<AuthLayout />}>
            {/* Default redirect */}
            <Route index element={<Navigate to="login" replace />} />

            {/* Relative child paths */}
            <Route path="login" element={<Login />} />
          </Route>




          {/* Onboarding */}
          <Route path="/onboard" element={<OnboardLayout />}>
            {/* Default redirect */}
            <Route index element={<Navigate to="step-one" replace />} />

            {/* Relative child paths */}
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