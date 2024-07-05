import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Index from "./layouts/Index";
import ErrorPage from "./pages/ErrorPage";
import WeekTimeFrame from "./pages/WeekTimeFrame";
import AccessPermission from "./pages/AccessPermission";
import RealtimeMonitoring from "./pages/RealtimeMonitoring";
import AccessRecord from "./pages/AccessRecord";
import DoorStatusRecord from "./pages/DoorStatusRecord";
import GroupManagement from "./pages/GroupManagement";
import DeviceManagement from "./pages/DeviceManagement";
import Department from "./pages/Department";
import UserAccount from "./pages/UserAccount";
import DayTimeFrame from "./pages/DayTimeFrame";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="access-management/day-time-frame"
          element={<DayTimeFrame />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="access-management/week-time-frame"
          element={<WeekTimeFrame />}
        />
        <Route
          path="access-management/access-permission"
          element={<AccessPermission />}
        />
        <Route
          path="access-management/realtime-monitoring"
          element={<RealtimeMonitoring />}
        />
        <Route
          path="access-management/access-record"
          element={<AccessRecord />}
        />
        <Route
          path="access-management/door-status-record"
          element={<DoorStatusRecord />}
        />
        <Route
          path="access-management/group-management"
          element={<GroupManagement />}
        />
        <Route
          path="system-settings/device-management"
          element={<DeviceManagement />}
        />
        <Route path="system-settings/department" element={<Department />} />
        <Route path="system-settings/user-account" element={<UserAccount />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
