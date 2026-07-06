import { Bell } from "lucide-react";

function Navbar() {
  return (
    <header className="bg-zinc-900 border-b border-zinc-800 h-16 px-6 flex items-center justify-between shadow-lg shadow-black/20">

      <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
        Dashboard
      </h2>

      <div className="flex items-center gap-5">
        <button className="p-2 hover:bg-zinc-800 rounded-xl transition-colors duration-200">
          <Bell className="cursor-pointer text-zinc-400 hover:text-zinc-100 transition-colors" size={22} />
        </button>
      </div>

    </header>
  );
}

export default Navbar;