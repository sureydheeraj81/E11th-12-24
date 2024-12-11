import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import PublicRoute from "./admin/components/PublicRoute";
import UserProtect from "./components/UserProtect";


// User end pages
const RegisterSuccess = React.lazy(() =>
  import("./pages/UserRegistration/RegisterSuccess")
);
const RegistrationForm = React.lazy(() =>
  import("./pages/UserRegistration/RegistrationForm")
);
const Home = React.lazy(() => import("./pages/Home"));
const Registration = React.lazy(() =>
  import("./pages/UserRegistration/Registration")
);
const Reg = React.lazy(() => import("./pages//UserRegistration/Reg"));
const Login = React.lazy(() => import("./pages/Login"));
const Subscription = React.lazy(() => import("./pages/Subscription"));
const PaymentIntegration = React.lazy(() =>
  import("./pages/PaymentIntegration")
);
const SubscriptionPlan = React.lazy(() =>
  import("./pages/Subscriptions/SubscriptionPlan")
);
const UserProfilePlans = React.lazy(() =>
  import("./pages/Subscriptions/UserProfilePlans")
);
const BharatKoshForm = React.lazy(() =>
  import("./pages/Subscriptions/BharatKoshForm")
);
const SubsSuccess = React.lazy(() =>
  import("./pages/Subscriptions/SubsSuccess")
);
const SubsMobVerify = React.lazy(() =>
  import("./pages/Subscriptions/SubsMobVerify")
);
const PaymentForm=React.lazy(()=>import("./pages/Subscriptions/PaymentForm"))


const Faq = React.lazy(() => import("./pages/Faq"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const Introduction = React.lazy(() => import("./pages/Introduction"));
const Abbreviations = React.lazy(() => import("./pages/Abbreviations"));
const Usages = React.lazy(() => import("./pages/Usages"));
const Advantages = React.lazy(() => import("./pages/Advantages"));
const Requirements = React.lazy(() => import("./pages/Requirements"));
const Connectionsettings = React.lazy(() =>
  import("./pages/Connectionsettings")
);
const Guidelines = React.lazy(() => import("./pages/Guidelines"));
const Videotutorial = React.lazy(() => import("./pages/Videotutorial"));
const Corsservices = React.lazy(() => import("./pages/Corsservices"));
const Rti = React.lazy(() => import("./pages/Rti"));
const Subscriptioncharges = React.lazy(() =>
  import("./pages/Subscriptioncharges")
);
const AccessbilityStatement = React.lazy(() =>
  import("./pages/Accessbilitystatement")
);
const SoftwarePlugins = React.lazy(() => import("./pages/SoftwarePlugins"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const HyperlinkingPolicy = React.lazy(() =>
  import("./pages/Hyperlinkingpolicy")
);
const CopyrightPolicy = React.lazy(() => import("./pages/Copyrightpolicy"));
const TermsConditions = React.lazy(() => import("./pages/Termsconditions"));
const Disclaimer = React.lazy(() => import("./pages/Disclaimer"));
const AccessbilityOptions = React.lazy(() =>
  import("./pages/Accessbilityoptions")
);
const ProactiveDisclosure = React.lazy(() =>
  import("./pages/Proactivedisclosure")
);
const Feedback = React.lazy(() => import("./pages/Feedback"));
const Error404 = React.lazy(() => import("./pages/Error404"));

// Admin pages
const AdminRegistration = React.lazy(() => import("./admin/AdminRegistration"));
const AdminDashboard = React.lazy(() => import("./admin/AdminDashboard"));
const AdminLogin = React.lazy(() => import("./admin/AdminLogin"));
const AllAdmins = React.lazy(() => import("./admin/AllAdmins"));
const ActiveAdmins = React.lazy(() => import("./admin/ActiveAdmins"));
const AdminBlocked = React.lazy(() => import("./admin/AdminBlocked"));
const AdminRequest = React.lazy(() => import("./admin/AdminRequest"));
const UpdateAdminStatus = React.lazy(() => import("./admin/UpdateAdminStatus"));
const CorsPlans = React.lazy(() => import("./admin/CorsPlans"));
const CorsPlansEdit = React.lazy(() => import("./admin/CorsPlanEdit"));
const RegisRejectionReason = React.lazy(() =>
  import("./admin/RegisRejectionReason")
);
const RegRejectionReasonEdit = React.lazy(() =>
  import("./admin/RegRejectionReasonEdit")
);
const SubsRejectionReason = React.lazy(() =>
  import("./admin/SubsRejectionReason")
);
const SubsRejectionReasonEdit = React.lazy(() =>
  import("./admin/SubsRejectionReasonEdit")
);
const TotalSubsList = React.lazy(() => import("./admin/TotalSubsList"));
const AcceptedSubsList = React.lazy(() => import("./admin/AcceptedSubsList"));
const VerifiedSubsList = React.lazy(() => import("./admin/VerifiedSubsList"));
const RejectedSubsList = React.lazy(() => import("./admin/RejectedSubsList"));
const PendingSubsList = React.lazy(() => import("./admin/PendingSubsList"));
const RegionOneSubsList = React.lazy(() => import("./admin/RegionOneSubsList"));
const RegionTwoSubsList = React.lazy(() => import("./admin/RegionTwoSubsList"));
const UpdateSubsStatus = React.lazy(() => import("./admin/UpdateSubsStatus"));
const UserCategory = React.lazy(() => import("./admin/UserCategory"));
const UserCategoryEdit = React.lazy(() => import("./admin/UserCategoryEdit"));
const Feedbacks = React.lazy(() => import("./admin/Feedbacks"));
const Profile = React.lazy(() => import("./admin/Profile"));
const UpdateProfile  = React.lazy(()=> import("./admin/UpdateProfile"));
const ChangePassword = React.lazy(() => import("./admin/ChangePassword"));
const ForgetPassword = React.lazy(() => import("./admin/ForgetPassword"));

const UsageUserType = React.lazy(() =>
  import("./admin/UserRegister/UsageUserType")
);
const TransferRegion = React.lazy(() =>
  import("./admin/UserRegister/TransferRegion")
);
const TotalRegUserList = React.lazy(() =>
  import("./admin/UserRegister/TotalRegUserList")
);
const RejectedUserList = React.lazy(() =>
  import("./admin/UserRegister/RejectedUserList")
);
const RegionOneUserList = React.lazy(() =>
  import("./admin/UserRegister/RegionOneUserList")
);
const RegionTwoUserList = React.lazy(() =>
  import("./admin/UserRegister/RegionTwoUserList")
);
const PendingUserList = React.lazy(() =>
  import("./admin/UserRegister/PendingUserList")
);
const ApprovedForm = React.lazy(() =>
  import("./admin/UserRegister/ApprovedForm")
);
const AcceptUserList = React.lazy(() =>
  import("./admin/UserRegister/AcceptUserList")
);

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense
        fallback={
          <div className="d-flex justify-content-center">
            <div className="spinner-grow text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/reg" element={<Reg />} />
          <Route path="/login" element={<Login />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/payment" element={<PaymentIntegration />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/abbreviations" element={<Abbreviations />} />
          <Route path="/usages" element={<Usages />} />
          <Route path="/advantages" element={<Advantages />} />
          <Route path="/requirements" element={<Requirements />} />
          <Route path="/connection-settings" element={<Connectionsettings />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/video-tutorials" element={<Videotutorial />} />
          <Route path="/cors-services" element={<Corsservices />} />
          <Route
            path="/subscription-charges"
            element={<Subscriptioncharges />}
          />
          <Route path="/rti" element={<Rti />} />
          <Route
            path="/accessbilityStatement"
            element={<AccessbilityStatement />}
          />
          <Route path="/software-plugins" element={<SoftwarePlugins />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/hyperlinkingPolicy" element={<HyperlinkingPolicy />} />
          <Route path="/copyrightPolicy" element={<CopyrightPolicy />} />
          <Route path="/termsConditions" element={<TermsConditions />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route
            path="/accessbilityOptions"
            element={<AccessbilityOptions />}
          />
          <Route
            path="/proactive-disclosure"
            element={<ProactiveDisclosure />}
          />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="*" element={<Error404 />} />
          <Route
            path="/admin/dashboard"
            element={
              // <ProtectedRoute>
                <AdminDashboard />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/register"
            element={
              <PublicRoute>
                <AdminRegistration />
              </PublicRoute>
            }
          />
          <Route
            path="/admin/login"
            element={
              <PublicRoute>
                <AdminLogin />
              </PublicRoute>
            }
          />
          <Route
            path="/admin/dashboard/all-admins"
            element={
              // <ProtectedRoute>
                <AllAdmins />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard/active-admins"
            element={
              // <ProtectedRoute>
                <ActiveAdmins />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard/admin-blocked"
            element={
              // <ProtectedRoute>
                <AdminBlocked />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard/admin-request"
            element={
              // <ProtectedRoute>
                <AdminRequest />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard/edit-status/:sno"
            element={
              // <ProtectedRoute>
                <UpdateAdminStatus />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              // <ProtectedRoute>
                <CorsPlans />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services/edit/:idx"
            element={
              // <ProtectedRoute>
                <CorsPlansEdit />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reg-rejection"
            element={
              // <ProtectedRoute>
                <RegisRejectionReason />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reg-rejection/edit/:idx"
            element={
              // <ProtectedRoute>
                <RegRejectionReasonEdit />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/sub-rejection"
            element={
              // <ProtectedRoute>
                <SubsRejectionReason />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/sub-rejection/edit/:idx"
            element={
              // <ProtectedRoute>
                <SubsRejectionReasonEdit />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/subscription-list"
            element={
              // <ProtectedRoute>
                <TotalSubsList />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/subscription-accepted-list"
            element={
              // <ProtectedRoute>
                <AcceptedSubsList />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/subscription-verified-list"
            element={
              // <ProtectedRoute>
                <VerifiedSubsList />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/subscription-rejected-list"
            element={
              // <ProtectedRoute>
                <RejectedSubsList />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/subscription-pending-list"
            element={
              // <ProtectedRoute>
                <PendingSubsList />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/subscription-r1-list"
            element={
              // <ProtectedRoute>
                <RegionOneSubsList />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/subscription-r2-list"
            element={
              // <ProtectedRoute>
                <RegionTwoSubsList />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/update-subs-status"
            element={
              // <ProtectedRoute>
                <UpdateSubsStatus />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-categories"
            element={
              // <ProtectedRoute>
                <UserCategory />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-categories/edit/:idx"
            element={
              // <ProtectedRoute>
                <UserCategoryEdit />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/feedbacks"
            element={
              // <ProtectedRoute>
                <Feedbacks />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              // <ProtectedRoute>
                <Profile />
              // </ProtectedRoute>
            }
          />
           <Route
            path="/admin/update-profile"
            element={
              // <ProtectedRoute>
                <UpdateProfile />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/change-password"
            element={
                <ChangePassword />
            }
          />
        
          <Route
            path="/admin/usage-details"
            element={
              // <ProtectedRoute>
                <UsageUserType />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-transfer"
            element={
              // <ProtectedRoute>
                <TransferRegion />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-list"
            element={
              // <ProtectedRoute>
                <TotalRegUserList />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-rejected-list"
            element={
              // <ProtectedRoute>
                <RejectedUserList />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-r2-list"
            element={
              // <ProtectedRoute>
                <RegionTwoUserList />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-r1-list"
            element={
              // <ProtectedRoute>
                <RegionOneUserList />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-pending-list"
            element={
              // <ProtectedRoute>
                <PendingUserList />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/approved/:sno"
            element={
              // <ProtectedRoute>
                <ApprovedForm />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-accepted-list"
            element={
              // <ProtectedRoute>
                <AcceptUserList />
              // </ProtectedRoute>
            }
          />
           <Route path="/register-form" element={<RegistrationForm />} />
          <Route path="/register-success" element={<RegisterSuccess />} />
          <Route path="/get-subscription" element={< UserProtect Component={SubscriptionPlan} />} />
          <Route path="/subscription1/plan" element={<UserProtect Component={UserProfilePlans} />} />
          <Route path="/subscription1/selectP" element={<UserProtect Component={BharatKoshForm} />} />
          <Route path="/subs-success" element={<SubsSuccess />} />
          <Route path="/subs-otp" element={<SubsMobVerify />} />
          <Route path="/pay-bharat" element={<PaymentForm/>} />
          <Route path="/admin/forgot-password" element={<ForgetPassword />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
