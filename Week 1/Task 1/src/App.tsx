import { Route, Routes } from "react-router";
import { Suspense, lazy } from "react";
import "./styles/tailwind.css";
import ErrorBoundary from "./components/ui/ErrorBoundary/ErrorBoundary";

// Lazy load pages for better performance
const DashboardLayout = lazy(
  () => import("./components/layout/DashboardLayout/DashboardLayout")
);
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Analytics = lazy(() => import("./pages/Analytics/Analytics"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const Users = lazy(() => import("./pages/Users/Users"));
const Login = lazy(() => import("./pages/Login/Login"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
