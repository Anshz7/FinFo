import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSync,
  faTrashAlt,
  faEnvelopeOpen,
  faEnvelope,
  faCaretUp,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  getContactMessages,
  updateMessageStatus,
  deleteContactMessage,
} from "@/api.service";
import AdminSidebar from "@/components/AdminSidebar";
import { useAuth } from "@/context/auth";
import { withAuth } from "@/components/withAuth";

const ContactDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [openedMessage, setOpenedMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "created_at",
    direction: "desc",
  });
  const { logout } = useAuth();
  const pageSize = 10;

  const statusOptions = [
    { value: "pending", label: "Pending", color: "text-yellow-500" },
    { value: "read", label: "Read", color: "text-blue-500" },
    { value: "resolved", label: "Resolved", color: "text-green-500" },
  ];

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await getContactMessages(currentPage, pageSize);

      if (response && Array.isArray(response.messages)) {
        setMessages(response.messages);
        setTotalPages(response.totalPages || 1);
      } else {
        throw new Error("Received invalid data format from server");
      }
    } catch (err) {
      setError(err.message);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [currentPage]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateMessageStatus(id, newStatus);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, status: newStatus } : msg))
      );
      if (openedMessage?.id === id) {
        setOpenedMessage({ ...openedMessage, status: newStatus });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteContactMessage(id);
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
        if (openedMessage?.id === id) {
          setOpenedMessage(null);
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedMessages = [...messages].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortConfig.direction === "asc"
      ? aValue < bValue
        ? -1
        : 1
      : aValue > bValue
      ? -1
      : 1;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar
          onLogoutClick={logout}
          activeTab="contacts" // Highlight contacts in sidebar
        />

        <div className="flex-1 md:ml-64 p-6 pt-20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-2xl md:text-4xl font-bold mb-4 text-gray-700">
                Contact Messages Dashboard
              </h1>
              <div className="h-1 bg-[#ca0905] w-24 mx-auto mb-6"></div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <div className="bg-[#23292f] rounded-xl shadow-md p-6">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <button
                  onClick={fetchMessages}
                  disabled={loading}
                  className="bg-[#ca0905] hover:bg-[#b00805] px-4 py-2 rounded-lg transition-all disabled:opacity-50"
                >
                  <FontAwesomeIcon icon={faSync} spin={loading} />
                  <span className="ml-2">
                    {loading ? "Refreshing..." : "Refresh"}
                  </span>
                </button>

                <div className="flex items-center space-x-4">
                  <span className="">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1 || loading}
                    className="px-4 py-2 rounded-lg bg-[#363d44] hover:bg-[#40474e] disabled:opacity-50"
                    >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages || loading}
                    className="px-4 py-2 rounded-lg bg-[#363d44] hover:bg-[#40474e] disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                {loading && messages.length === 0 ? (
                  <div className="text-center py-8 text-gray-600">
                    Loading messages...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-8 text-gray-600">
                    No messages found
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        {[
                          { key: "name", label: "Name" },
                          { key: "email", label: "Email" },
                          { key: "category", label: "Category" },
                          { key: "status", label: "Status" },
                          { key: "created_at", label: "Date" },
                          { label: "Actions" },
                        ].map((header) => (
                          <th
                            key={header.key || header.label}
                            className="px-4 py-3 text-left cursor-pointer hover:bg-gray-700"
                            onClick={() => header.key && handleSort(header.key)}
                          >
                            <div className="flex items-center font-medium text-gray-100">
                              {header.label}
                              {header.key && (
                                <FontAwesomeIcon
                                  icon={
                                    sortConfig.key === header.key
                                      ? sortConfig.direction === "asc"
                                        ? faCaretUp
                                        : faCaretDown
                                      : faCaretUp
                                  }
                                  className="ml-2 opacity-50"
                                />
                              )}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sortedMessages.map((message) => (
                        <tr
                          key={message.id}
                          className="border-b border-gray-200 hover:bg-gray-700"
                        >
                          <td className="px-4 py-3">{message.name}</td>
                          <td className="px-4 py-3">{message.email}</td>
                          <td className="px-4 py-3">{message.category}</td>
                          <td className="px-4 py-3">
                            <select
                              value={message.status}
                              onChange={(e) =>
                                handleStatusChange(message.id, e.target.value)
                              }
                              className={`bg-transparent ${
                                statusOptions.find(
                                  (opt) => opt.value === message.status
                                )?.color
                              } border rounded px-2 py-1`}
                            >
                              {statusOptions.map((option) => (
                                <option
                                  key={option.value}
                                  value={option.value}
                                  className="bg-white"
                                >
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            {new Date(message.created_at).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </td>
                          <td className="px-4 py-3 space-x-4">
                            <button
                              onClick={() => handleDelete(message.id)}
                              className="text-red-500 hover:text-red-700"
                              title="Delete"
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                            <button
                              className="text-blue-500 hover:text-blue-700"
                              onClick={() => setOpenedMessage(message)}
                              title="View Details"
                            >
                              <FontAwesomeIcon
                                icon={
                                  message.status === "read"
                                    ? faEnvelopeOpen
                                    : faEnvelope
                                }
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* Message Detail Modal */}
          {openedMessage && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  onClick={() => setOpenedMessage(null)}
                >
                  ✕
                </button>
                <h2 className="text-xl font-bold mb-2">
                  {openedMessage.subject}
                </h2>
                <div className="mb-4">
                  <p className="text-gray-600">
                    <strong>From:</strong> {openedMessage.name} (
                    {openedMessage.email})
                  </p>
                  <p className="text-gray-600">
                    <strong>Date:</strong>{" "}
                    {new Date(openedMessage.created_at).toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    <strong>Category:</strong> {openedMessage.category}
                  </p>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Message:</h3>
                  <p className="whitespace-pre-wrap text-gray-700">
                    {openedMessage.message}
                  </p>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <select
                    value={openedMessage.status}
                    onChange={(e) =>
                      handleStatusChange(openedMessage.id, e.target.value)
                    }
                    className={`bg-gray-100 rounded px-3 py-1 ${
                      statusOptions.find(
                        (opt) => opt.value === openedMessage.status
                      )?.color
                    }`}
                  >
                    {statusOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-white"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    className="bg-[#ca0905] hover:bg-[#b00805] text-white px-4 py-2 rounded-lg"
                    onClick={() => setOpenedMessage(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(ContactDashboard);
