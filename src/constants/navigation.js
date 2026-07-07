import {
  PiSquaresFourDuotone, PiClipboardTextDuotone, PiBowlFoodDuotone,
  PiPercentDuotone, PiUsersThreeDuotone, PiCalendarCheckDuotone,
  PiCookingPotDuotone, PiStackDuotone, PiChartBarDuotone,
  PiChartLineUpDuotone, PiWalletDuotone, PiGearSixDuotone,
} from "react-icons/pi";

export const NAV_ITEMS = [
  { label: "Dashboard", path: "/", icon: PiSquaresFourDuotone },
  { label: "Order Management", path: "/orders", icon: PiClipboardTextDuotone },
  { label: "Menu Management", path: "/menu", icon: PiBowlFoodDuotone },
  { label: "Offers & Deals", path: "/offers", icon: PiPercentDuotone },
  { label: "Staff Management", path: "/staff", icon: PiUsersThreeDuotone },
  { label: "Bookings & Tables", path: "/bookings", icon: PiCalendarCheckDuotone },
  { label: "Kitchen Management", path: "/kitchen", icon: PiCookingPotDuotone },
  { label: "Inventory Management", path: "/inventory", icon: PiStackDuotone },
  { label: "Reports", path: "/reports", icon: PiChartBarDuotone },
  { label: "Revenue Stats", path: "/revenue", icon: PiChartLineUpDuotone },
  { label: "Payment Management", path: "/payments", icon: PiWalletDuotone },
  { label: "Settings", path: "/settings", icon: PiGearSixDuotone },
];
