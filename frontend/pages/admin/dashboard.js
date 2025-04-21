import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { useRouter } from "next/router";
import { getFinfotable } from "@/api.service"; // Import the getFinfotable function

const Dashboard = () => {
  const router = useRouter(); // For navigation

  // State for data
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(""); // State for dropdown selection

  // Function to fetch data using getFinfotable
  const fetchData = async () => {
    try {
      setIsLoading(true); // Start loading
      const result = await getFinfotable(1, 10, "en"); // Fetch the first page with 10 records in English
      if (result && result.data) {
        setData(result.data); // Update state with fetched data
      } else {
        setError("Failed to fetch data.");
      }
    } catch (err) {
      setError(err.message); // Handle errors
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to open modal
  const openModal = (item) => {
    setModalContent(item);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({});
    setSelectedCategory(""); // Reset dropdown selection
  };

  // Function to handle dropdown change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar
          onEditClick={() => router.push("/admin/edit")} // Redirect to the edit page
        />

        {/* Main Content */}
        <div className="flex-1 md:ml-64 p-6 pt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Post Board</h2>

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
    onClick={() => openModal(item)}
  >
    {/* Upper Part - Image Section */}
    <div className="h-40 bg-white flex justify-center items-center">
      <img
        src={item.banner_link}
        alt={item.title}
        className="h-full w-full object-cover"
      />
    </div>

    {/* Lower Part - Text Section */}
    <div className="h-24 bg-gray-200 flex flex-col justify-center items-center p-4">
      <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
      {/* <p className="text-sm text-gray-600">{item.content}</p> */}
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
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
            >
              &times;
            </button>
            <img src={modalContent.banner_link} alt={modalContent.title} className="w-full h-64 object-cover rounded-md mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{modalContent.title}</h3>
            <p className="text-gray-600 mb-6">{modalContent.content}</p>

            {/* Dropdown and Buttons */}
            <div className="absolute bottom-4 right-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              {/* Dropdown */}
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Economy & Outlook">Economy & Outlook</option>
                <option value="Stocks">Stocks</option>
                <option value="Commodities">Commodities</option>
                <option value="Cryptocurrencies">Cryptocurrencies</option>
                <option value="Forex">Forex</option>
              </select>

              {/* Close Button */}
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={closeModal}
              >
                Close
              </button>

              {/* Post Button */}
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => {
                  if (selectedCategory) {
                    alert(`Post functionality triggered for category: ${selectedCategory}`);
                  } else {
                    alert("Please select a category before posting!");
                  }
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;