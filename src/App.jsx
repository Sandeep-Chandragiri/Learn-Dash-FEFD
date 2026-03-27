import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/common/ProtectedRoute";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import MyCourses from "./pages/MyCourses";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Navigation />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Authenticated Layout */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
