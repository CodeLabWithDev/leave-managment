// JS Dependencies
import { NavLink } from "react-router";

// Icons
import { Calendar, Users, BarChart3, UserCheck, Shield } from "lucide-react";

// Store
import { useSelector } from "react-redux";
import { useEffect } from "react";

// Type and models
import type { RootState } from "@/store";

const Navigation = () => {
  const userRole = useSelector((state: RootState) => state.auth.userRole);

  useEffect(() => {}, []);

  const getNavItems = () => {
    const baseItems = [
      { to: "/", icon: BarChart3, label: "Dashboard" },
      { to: "/my-leaves", icon: Calendar, label: "My Leaves" },
    ];

    const managerItems = [
      { to: "/approvals", icon: UserCheck, label: "Approvals" },
    ];

    const adminItems = [
      { to: "/users", icon: Users, label: "Manage Users" },
      { to: "/audit", icon: Shield, label: "Audit Logs" },
    ];

    let items = [...baseItems];

    if (userRole === "Manager" || userRole === "Admin") {
      items = [...items, ...managerItems];
    }

    if (userRole === "Admin") {
      items = [...items, ...adminItems];
    }

    return items;
  };

  return (
    <nav className="w-64 bg-white shadow-sm border-r min-h-screen">
      <div className="p-6">
        <ul className="space-y-2">
          {getNavItems().map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
