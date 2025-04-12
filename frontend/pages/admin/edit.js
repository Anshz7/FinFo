import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";

const EditPage = () => {
  const [data, setData] = useState([
    { title: "Sales Report", image: "/test.jpg", description: "Detailed sales report for the month." },
    { title: "User Analytics", image: "/test.jpg", description: "Analytics of user behavior and trends." },
    { title: "Revenue", image: "/test.jpg", description: "Revenue generated in the last quarter." },
    { title: "Support Tickets", image: "/test.jpg", description: "Overview of support tickets." },
    { title: "Marketing Campaigns", image: "/test.jpg", description: "Performance of marketing campaigns." },
    { title: "Performance", image: "/test.jpg", description: "System performance metrics." },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);

  const handleEdit = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
  };

  const openModal = (index) => {
    setModalContent(data[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({});
    setEditingIndex(null);
  };

  const handleModalSave = () => {
    if (editingIndex !== null) {
      const updatedData = [...data];
      updatedData[editingIndex] = modalContent;
      setData(updatedData);
    }
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <AdminNavbar />

      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 md:ml-64 p-6 pt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Dashboard</h2>

          {/* Grid Layout (3 grids per row) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.map((item, index) => (
              <div
                key={index}
                className="h-64 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                onClick={() => openModal(index)}
              >
                {/* Upper Part - Image Section */}
                <div className="h-2/3 bg-white flex justify-center items-center">
                  <img src={item.image} alt={item.title} className="w-full object-cover" />
                </div>

                {/* Lower Part - Editable Text Section */}
                <div className="h-1/3 bg-gray-200 flex flex-col justify-center items-center p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Edit Box</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={modalContent.title}
                  onChange={(e) => setModalContent({ ...modalContent, title: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={modalContent.description}
                  onChange={(e) => setModalContent({ ...modalContent, description: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleModalSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPage;