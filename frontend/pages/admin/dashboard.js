import React from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";

const Dashboard = () => {
  // Dummy data for multiple cards
  const data = [
    { title: "Sales Report", description: "View monthly sales data", image: "test.jpg" },
    { title: "User Analytics", description: "Track user activity", image: "test.jpg" },
    { title: "Revenue", description: "Total earnings this month", image: "test.jpg" },
    { title: "Support Tickets", description: "Pending customer queries", image: "test.jpg" },
    { title: "Marketing Campaigns", description: "Track ongoing ads", image: "test.jpg" },
    { title: "Performance", description: "System health status", image: "test.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <AdminNavbar />

      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 md:ml-64 p-6 pt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

          {/* Grid Layout (3 grids per row) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.map((item, index) => (
              <div key={index} className="h-64 bg-white rounded-lg shadow-md overflow-hidden">
                {/* Upper Part - Image Section */}
                <div className="h-2/3 bg-[#ca0905] flex justify-center items-center">
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-full" />
                </div>

                {/* Lower Part - Text Section */}
                <div className="h-1/3 bg-gray-200 flex flex-col justify-center items-center p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
