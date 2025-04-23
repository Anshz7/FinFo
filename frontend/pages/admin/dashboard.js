import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { useRouter } from "next/router";
import { getPhpFlips, createFinfotableRecord } from "@/api.service"; // Added createFinfotableRecord
import { useAuth } from "../../context/auth";
import { withAuth } from "../../components/withAuth";

const Dashboard = () => {
  const router = useRouter();
  const { logout } = useAuth();

  // State for data
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  // Track visited IDs (persist in localStorage)
  const [visited, setVisited] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("visitedNews")) || [];
    } catch {
      return [];
    }
  });

  // Selected category for post
  const [selectedCategory, setSelectedCategory] = useState("");

  // Posting state
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);

  // Fetch all flips
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getPhpFlips();
      if (Array.isArray(result)) {
        setData(result);
      } else {
        setError("Failed to fetch data.");
      }
    } catch (err) {
      setError(err.message || "Error fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Persist visited whenever it changes
  useEffect(() => {
    localStorage.setItem("visitedNews", JSON.stringify(visited));
  }, [visited]);

  // Open modal and mark visited
  const openModal = (item) => {
    setModalContent(item);
    setIsModalOpen(true);
    const id = item.id || item.slug || item.title;
    if (!visited.includes(id)) {
      setVisited((prev) => [...prev, id]);
    }
  };

  // Close modal and reset states
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({});
    setSelectedCategory("");
    setPostError(null);
    setPostSuccess(false);
  };

  // Dropdown change
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  // Logout handler
  const handleLogout = async () => {
    await logout();
    router.push("/admin");
  };

  // Handle post creation
  const handlePost = async () => {
    if (!selectedCategory) {
      alert("Please select a category before posting!");
      return;
    }
    setIsPosting(true);
    setPostError(null);
    try {
      const recordData = {
        title: modalContent.title,
        slug: modalContent.slug,
        content: modalContent.content,
        category: selectedCategory,
        source_link: modalContent.source_link,
        banner_link: modalContent.banner_link,
      };
      const result = await createFinfotableRecord(recordData);
      if (result) {
        setPostSuccess(true);
        // Optionally refresh list or provide feedback
        alert("Posted successfully!");
        closeModal();
      } else {
        throw new Error("No response from server");
      }
    } catch (err) {
      console.error("Error posting record:", err);
      setPostError(err.message);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar
          onEditClick={() => router.push("/admin/edit")}
          onLogoutClick={handleLogout}
        />

        {/* Main Content */}
        <div className="flex-1 md:ml-64 p-6 pt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Post Board</h2>

          {isLoading && <p>Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.map((item, index) => {
                const id = item.id || item.slug || index;
                const wasVisited = visited.includes(id);
                return (
                  <div
                    key={id}
                    className={`h-64 relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer ${wasVisited ? 'opacity-60' : ''}`}
                    onClick={() => openModal(item)}
                  >
                    {wasVisited && (
                      <span className="absolute top-2 right-2 bg-yellow-300 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
                        Visited
                      </span>
                    )}
                    <div className="h-40 bg-white flex justify-center items-center">
                      <img
                        src={item.banner_link}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="h-24 bg-gray-200 flex flex-col justify-center items-center p-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={modalContent.banner_link}
              alt={modalContent.title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {modalContent.title}
            </h3>

            <div className="flex flex-wrap gap-2 mb-4">
              {modalContent.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-gray-600 mb-4">{modalContent.content}</p>

            {modalContent.source_link && (
              <div className="mb-4">
                <span className="font-semibold">Source: </span>
                <a
                  href={modalContent.source_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {modalContent.source_link}
                </a>
              </div>
            )}

            {/* Category dropdown and Post button */}
            <div className="absolute bottom-4 right-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
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

              <button
                className={`px-4 py-2 rounded ${isPosting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                onClick={handlePost}
                disabled={isPosting}
              >
                {isPosting ? 'Posting...' : 'Post'}
              </button>

              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={closeModal}
              >
                Close
              </button>
            </div>

            {postError && <p className="text-red-500 mt-4">Error: {postError}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(Dashboard);
