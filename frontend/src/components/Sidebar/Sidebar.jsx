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
    /* Changed width from w-64 to w-52 */
    <aside className="w-52 shrink-0 h-screen bg-zinc-950 text-zinc-400 flex flex-col border-r border-zinc-900 shadow-xl shadow-black/50">

      {/* Header / Brand Details */}
      <div className="p-4 border-b border-zinc-900">
        <h1 className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          InsightIQ
        </h1>
        <p className="text-[10px] font-bold text-zinc-600 tracking-wider uppercase mt-0.5">
          AI Business Analyst
        </p>
      </div>

      {/* Navigation Space */}
      <nav className="flex-1 px-2.5 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? "bg-zinc-900 border border-zinc-800 text-zinc-100 shadow-md"
                    : "hover:bg-zinc-900/60 hover:text-zinc-200"
                }`
              }
            >
              <Icon size={16} className="shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Content */}
      <div className="p-4 border-t border-zinc-900 text-center">
        <p className="text-[9px] tracking-widest text-zinc-600 font-bold uppercase">
          © 2026 InsightIQ
        </p>
      </div>

    </aside>
  );
}

export default Sidebar;