import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import Menu from "../pages/Menu";
import Offers from "../pages/Offers";
import Staff from "../pages/Staff";
import Bookings from "../pages/Bookings";
import Kitchen from "../pages/Kitchen";
import Inventory from "../pages/Inventory";
import Reports from "../pages/Reports";
import Revenue from "../pages/Revenue";
import Payments from "../pages/Payments";
import Settings from "../pages/Settings";

const AppRoutes = () => (
  <Routes>
    <Route element={<DashboardLayout />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/kitchen" element={<Kitchen />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/revenue" element={<Revenue />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/settings" element={<Settings />} />
    </Route>
  </Routes>
);

export default AppRoutes;
