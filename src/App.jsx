// import { useState } from 'react'
// import Splash from './screens/SplashScreen/Splash'
import SignUp from "./screens/Signup/Signup";
import Intro1 from "./screens/SplashScreen/intro1";

import { createBrowserRouter } from "react-router-dom";
import SignUpNext from "./screens/Signup/SignupNext";
import Verify from "./screens/Signup/Verify";
import Profile from "./screens/Profile/Profile";

import Login from "./screens/Login/Login";
import CheckAuth from "./components/CheckAuth";
import VerifiedOTP from "./screens/Signup/VerifiedOTP";
import SignUpLoreal from "./screens/Signup/SignupLoreal";
import ForgotPassword from "./screens/Login/ForgotPassword";
import ResetPassword from "./screens/Signup/ResetPassword";
import ImpactDetails from "./screens/Impact/ImpactDetails";
import ProfileSettings from "./screens/Profile/ProfileSettings";
import ProfileEdit from "./screens/Signup/ProfileEdit";
import About from "./screens/Profile/About";
import Notification from "./screens/Profile/Notification";
import Subscription from "./screens/Profile/Subscription";
import PortImpactDetails from "./screens/Impact/PortImpact";
import FarmerImpactDetails from "./screens/Impact/FarmerImpact";
import Events from "./screens/Events/Event";
import EventsBooking from "./screens/Events/EventsBooking";
import Chat from "./screens/Chat/Chat";
import Direction from "./screens/Direction/Direction";
import Payment from "./screens/Profile/Payment";
import Trasnsport from "./screens/Transport/Trasnsport";
import Bags from "./screens/Transport/Bags";
import Esign from "./screens/Esign/Esign";
import SubscriptionOTP from "./screens/Profile/SubcriptionOTP";
import PaymentPage from "./screens/Profile/PaymentPage";
import ValidOTP from "./screens/Login/ValidOTP";

import SDGDisplay from "./screens/Profile/SDGDisplay";
import LoginLoreal from "./screens/Login/LoginLoreal";
// import Main from "./screens/SplashScreen/MainIntro";
import MainIntro from "./screens/SplashScreen/MainIntro";
import LoginOverview from "./screens/Login/LoginOverview";
import IntroFarmer from "./screens/SplashScreen/introFarmer";
import IntroAgriculture from "./screens/SplashScreen/introAgriculture";
import IntroPort from "./screens/SplashScreen/introPort";
import FarmerDetails from "./screens/Login/FarmerDetails";
import PortDetails from "./screens/Login/PortDetails";
import ClicUser from "./screens/NewUsersPages/ClicUser";

const App = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Splash/>,
  // },
  {
    // path: "/onboarding",
    path: "/",
    element: <MainIntro />,
  },
  {
    path: "/new/clic-user",
    element: <ClicUser />,
  },

  {
    // path: "/onboarding",
    path: "/farmers",
    element: <IntroFarmer />,
  },

  {
    // path: "/onboarding",
    path: "/agriculture",
    element: <IntroFarmer />,
  },

  {
    // path: "/onboarding",
    path: "/port-and-vessels",
    element: <IntroPort />,
  },

  {
    path: "/farmer-details",
    element: <FarmerDetails />,
  },

  {
    path: "/port-details",
    element: <PortDetails />,
  },

  {
    // path: "/onboarding",
    path: "/main",
    element: <Intro1 />,
  },

  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signup/next",
    element: <SignUpNext />,
  },
  {
    path: "/signup/loreal",
    element: <SignUpLoreal />,
  },
  {
    path: "/signup/verify",
    element: <Verify />,
  },

  {
    path: "/signup/verify/otp",
    element: <VerifiedOTP />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/login/category",
    element: <LoginOverview />,
  },

  {
    path: "/ptxy",
    element: <SDGDisplay />,
  },

  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/forgot-password/new-password",
    element: <ValidOTP />,
  },
  {
    path: "/reset-link-shared",
    element: <ResetPassword />, // Use for showing success request
  },
  {
    path: "/profile",
    element: (
      <CheckAuth>
        <Profile />
      </CheckAuth>
    ),
  },
  {
    path: "/profile/settings",
    element: (
      <CheckAuth>
        <ProfileSettings />
      </CheckAuth>
    ),
  },

  {
    path: "/profile/settings/about",
    element: (
      <CheckAuth>
        <About />
      </CheckAuth>
    ),
  },
  {
    path: "/profile/settings/notification",
    element: (
      <CheckAuth>
        <Notification />
      </CheckAuth>
    ),
  },
  {
    path: "/profile/settings/subscription",
    element: (
      <CheckAuth>
        <Subscription />
      </CheckAuth>
    ),
  },
  {
    path: "/profile/edit",
    element: (
      <CheckAuth>
        <ProfileEdit />
      </CheckAuth>
    ),
  },

  {
    path: "/profile/port-impact-details",
    element: (
      <CheckAuth>
        <PortImpactDetails />
      </CheckAuth>
    ),
  },

  {
    path: "/profile/loreal-impact-details",
    element: (
      <CheckAuth>
        <FarmerImpactDetails />
      </CheckAuth>
    ),
  },

  {
    path: "/events",
    element: (
      <CheckAuth>
        <Events />
      </CheckAuth>
    ),
  },
  {
    path: "/events/booking",
    element: (
      <CheckAuth>
        <EventsBooking />
      </CheckAuth>
    ),
  },

  {
    path: "/profile/chat",
    element: (
      <CheckAuth>
        <Chat />
      </CheckAuth>
    ),
  },
  {
    path: "/profile/direction",
    element: (
      <CheckAuth>
        <Direction />
      </CheckAuth>
    ),
  },

  {
    path: "/profile/pay",
    element: (
      <CheckAuth>
        <Payment />
      </CheckAuth>
    ),
  },
  {
    path: "/profile/payment-mode",
    element: (
      <CheckAuth>
        <PaymentPage />
      </CheckAuth>
    ),
  },
  {
    path: "/profile/pay/verify",
    element: (
      <CheckAuth>
        <SubscriptionOTP />
      </CheckAuth>
    ),
  },
  {
    path: "/profile/transport",
    element: (
      <CheckAuth>
        <Trasnsport />
      </CheckAuth>
    ),
  },
  {
    path: "/profile/extra-bag",
    element: (
      <CheckAuth>
        <Bags />
      </CheckAuth>
    ),
  },
  {
    path: "/profile/settings/subscription/contract",
    element: (
      <CheckAuth>
        <Esign />
      </CheckAuth>
    ),
  },
  {
    path: "/profile/impact-details",
    element: <ImpactDetails />,
  },
]);

export default App;
