import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

function Layout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">

      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">

        <Navbar />

        <main className="flex-1 overflow-auto p-6 lg:p-8">

          {children}

        </main>

      </div>

    </div>
  );
}

export default Layout;