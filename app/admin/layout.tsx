import AdminNavIcon from "./NavIcon";

export const metadata = {
  title: "Consultant Admin",
  description: "Consultant Admin Dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-[80vh]">
      {/* Sidebar */}
      <AdminNavIcon />

      {/* Main Content Area */}
      <main className="flex-grow bg-gray-100 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
