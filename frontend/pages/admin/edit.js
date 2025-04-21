import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { getFinfotable, updateRecordById } from "@/api.service"; // Import the getFinfotable function

const EditPage = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getFinfotable(1, 10, "en"); // Fetch the first page with 10 records in English
        console.log("Fetched data:", result); // Log the fetched data
        if (result && result.data) {
          setData(result.data); // Update state with fetched data
        } else {
          setError("Failed to fetch data.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const handleModalSave = async () => {
    console.log("Editing index:", editingIndex);
    console.log("Data at index:", data[editingIndex]);
    console.log("ID being sent:", data[editingIndex]?.id);

    if (editingIndex !== null) {
      const fieldsToSend = ["title", "slug", "content", "category", "source_link", "banner_link", "lang"];
      const updatedFields = {};

      // Collect only valid fields to send
      fieldsToSend.forEach((key) => {
        const value = modalContent[key];
        if (value !== undefined && value !== null && value !== "undefined") {
          updatedFields[key] = value;
        }
      });

      const recordId = data[editingIndex].id; // Get the record ID

      try {
        const updatedRecord = await updateRecordById(recordId, updatedFields); // Call the API to update the record
        if (updatedRecord) {
          const updatedData = [...data];
          updatedData[editingIndex] = updatedRecord; // Update the local state with the updated record
          setData(updatedData);
        }
      } catch (error) {
        console.error("Failed to update record:", error.message);
      }
    }
    closeModal(); // Close the modal after saving
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 md:ml-64 p-6 pt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Board</h2>

          {/* Loading and Error States */}
          {isLoading && <p>Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          {/* Grid Layout (3 grids per row) */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="h-64 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                  onClick={() => openModal(index)}
                >
                  {/* Upper Part - Image Section */}
                  <div className="h-40 bg-white flex justify-center items-center">
                    <img src={item.banner_link} alt={item.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Lower Part - Editable Text Section */}
                  <div className="h-24 bg-gray-200 flex flex-col justify-center items-center p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    {/* <p className="text-sm text-gray-600">{item.description}</p> */}
                  </div>
                </div>
              ))}
            </div>
          )}
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
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={modalContent.description}
                  onChange={(e) => setModalContent({ ...modalContent, description: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
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