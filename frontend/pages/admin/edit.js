import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import {
  getFinfotable,
  getFinfotableByCategory,
  updateRecordById,
} from "@/api.service";
import { useAuth } from "@/context/auth";
import { withAuth } from "@/components/withAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

// Replace or extend this list with your actual categories
const categoryOptions = [
  { value: "", label: "All Categories" },
  { value: "Economy & Outlook", label: "Economy & Outlook" },
  { value: "Stocks", label: "Stocks" },
  { value: "Commodities", label: "Commodities" },
  { value: "Cryptocurrencies", label: "Cryptocurrencies" },
  { value: "Forex", label: "Forex" },
  // ... add more as needed
];

const EditPage = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 12, totalPages: 1 });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saveError, setSaveError] = useState(null);
  const { logout } = useAuth();

  const { page, pageSize, totalPages } = pagination;

  // Fetch data whenever page or selectedCategory changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let response;
        if (selectedCategory) {
          response = await getFinfotableByCategory(
            selectedCategory,
            page,
            pageSize,
            "en"
          );
        } else {
          response = await getFinfotable(page, pageSize, "en");
        }

        if (response?.data) {
          setData(response.data);
          // Normalize pagination info — adapt if your API returns differently
          const paginationInfo = response.pagination || {
            page: response.page || page,
            pageSize: response.pageSize || pageSize,
            totalPages: response.totalPages || Math.ceil((response.total || 0) / pageSize),
          };
          setPagination(paginationInfo);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, selectedCategory]);

  const openModal = (index) => {
    setModalContent({ ...data[index] });
    setEditingIndex(index);
    setIsModalOpen(true);
    setSaveError(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({});
    setEditingIndex(null);
    setSaveError(null);
  };

  const handleModalSave = async () => {
    if (editingIndex === null) return;

    try {
      const fieldsToSend = [
        "title",
        "slug",
        "content",
        "category",
        "source_link",
        "banner_link",
        "lang",
      ];

      const updatedFields = fieldsToSend.reduce((acc, key) => {
        const value = modalContent[key];
        if (value !== undefined && value !== null && value !== "undefined") {
          acc[key] = value;
        }
        return acc;
      }, {});

      const recordId = data[editingIndex].id;
      const updatedRecord = await updateRecordById(recordId, updatedFields);

      if (updatedRecord) {
        setData((prev) =>
          prev.map((item, idx) => (idx === editingIndex ? updatedRecord : item))
        );
        closeModal();
      }
    } catch (err) {
      console.error("Update failed:", err);
      setSaveError(err.message || "Failed to save changes");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar onLogoutClick={logout} />

        <div className="flex-1 md:ml-64 p-6 pt-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Edit Board</h2>
            <div className="relative w-56">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPagination((prev) => ({ ...prev, page: 1 }));
                }}
                className="appearance-none w-full px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 
                          focus:border-blue-500 focus:outline-none hover:border-gray-400 transition-all text-sm"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="absolute right-4 top-3 text-gray-500 pointer-events-none"
              />
            </div>
          </div>

          {isLoading && <p className="text-gray-600">Loading articles...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!isLoading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.map((item, idx) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => openModal(idx)}
                  >
                    <div className="h-40 relative">
                      <img
                        src={item.banner_link || "/default-banner.jpg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.src = "/default-banner.jpg")}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center justify-center mt-6 space-x-4">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-gray-700">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-700">Edit Article</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {saveError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                  {saveError}
                </div>
              )}

              <div className="space-y-4">
                {[
                  { label: "Title", key: "title", type: "text" },
                  { label: "Slug", key: "slug", type: "text" },
                  { label: "Category", key: "category", type: "text" },
                  { label: "Banner Link", key: "banner_link", type: "url" },
                  { label: "Source Link", key: "source_link", type: "url" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={modalContent[field.key] || ""}
                      onChange={(e) =>
                        setModalContent((prev) => ({
                          ...prev,
                          [field.key]: e.target.value,
                        }))
                      }
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    value={modalContent.content || ""}
                    onChange={(e) =>
                      setModalContent((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded h-40 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleModalSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(EditPage);
