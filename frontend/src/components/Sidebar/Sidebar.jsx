import {
  LayoutDashboard,
  BrainCircuit,
  ChartSpline,
  FileText,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "AI Analytics",
    path: "/ai",
    icon: BrainCircuit,
  },
  {
    name: "Forecasting",
    path: "/forecasting",
    icon: ChartSpline,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FileText,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <aside className="w-64 shrink-0 h-screen bg-slate-900 text-white flex flex-col">

      {/* Logo */}

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-2xl font-bold text-blue-400">
          InsightIQ
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          AI Business Analyst
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 mb-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-blue-600"
                }`
              }
            >

              <Icon size={20} />

              <span>{item.name}</span>

            </NavLink>

          );

        })}

      </nav>

      {/* Footer */}

      <div className="p-4 border-t border-slate-700">

        <p className="text-xs text-slate-400">
          © 2026 InsightIQ
        </p>

      </div>

    </aside>
  );
}

export default Sidebar;