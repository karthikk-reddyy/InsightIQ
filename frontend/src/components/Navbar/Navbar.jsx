import { Bell, Search, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <header className="bg-white shadow-sm h-16 px-6 flex items-center justify-between">

      <h2 className="text-2xl font-bold text-slate-800">
        Dashboard
      </h2>

      <div className="flex items-center gap-5">

        <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">

          <Search size={18} className="text-slate-500" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2"
          />

        </div>

        <Bell className="cursor-pointer" />

        <UserCircle size={34} className="cursor-pointer" />

      </div>

    </header>
  );
}

export default Navbar;

