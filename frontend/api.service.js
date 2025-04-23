const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_URL = process.env.NEXT_PUBLIC_PHP_SERVER;

// Get FlipItNews Flips
export const getPhpFlips = async (pageNo = 0) => {
  try {
    console.log("API_URL:", API_URL);
    const url = new URL(`${API_URL}api/news/flips`);
    url.searchParams.append("pageNo", pageNo);
    console.log(url.toString());
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    console.log("Response:", response);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Response: ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching PHP flips:", error);
    return null;
  }
};

// Get all records with pagination
export const getFinfotable = async (page = 1, pageSize = 10, lang = "en") => {
  try {
    const url = new URL(`${BASE_URL}/finfotable`);
    url.searchParams.append("page", page);
    url.searchParams.append("pageSize", pageSize);
    url.searchParams.append("lang", lang);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Response: ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Get records by category with pagination
export const getFinfotableByCategory = async (
  category,
  page = 1,
  pageSize = 10,
  lang = "en"
) => {
  try {
    const url = new URL(`${BASE_URL}/finfotable/category/${category}`);
    url.searchParams.append("page", page);
    url.searchParams.append("pageSize", pageSize);
    url.searchParams.append("lang", lang);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });

    if (!response.ok) {
      const errorText = await response.text();

      // Handle 404 specifically if needed
      if (response.status === 404) {
        return { data: [], total: 0 };
      }

      throw new Error(
        `HTTP error! Status: ${response.status}, Response: ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching category data:", error);
    return null;
  }
};

// Get single record by slug
export const getFinfotableBySlug = async (slug, lang = "en") => {
  try {
    const url = new URL(`${BASE_URL}/finfotable/${slug}`);
    url.searchParams.append("lang", lang);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });

    if (!response.ok) {
      const errorText = await response.text();

      // Handle 404 specifically for slug not found
      if (response.status === 404) {
        return null;
      }

      throw new Error(
        `HTTP error! Status: ${response.status}, Response: ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }
};

//update record by id
export const updateRecordById = async (id, updatedFields) => {
  try {
    // Remove undefined or invalid fields
    const sanitizedFields = Object.fromEntries(
      Object.entries(updatedFields).filter(([_, value]) => value !== undefined)
    );

    console.log("Sanitized Fields:", sanitizedFields);

    const url = `${BASE_URL}/finfotable/${id}`; // Replace `BASE_URL` with your API base URL

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sanitizedFields), // Send only sanitized fields
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Response: ${errorText}`
      );
    }

    return await response.json(); // Return the updated record
  } catch (error) {
    console.error("Error updating record:", error);
    return null;
  }
};

// Create a new record (with automatic translations and notifications)
export const createFinfotableRecord = async (recordData) => {
  try {
    const url = `${BASE_URL}/finfotable`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recordData),
      mode: "cors",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Response: ${errorText}`
      );
    }

    // Returns an array: first item is the original, followed by translated entries
    return await response.json();
  } catch (error) {
    console.error("Error creating finfotable record:", error);
    return null;
  }
};

// Subscribe new email
export const subscribe = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Subscription failed");
    }

    return data;
  } catch (error) {
    console.error("Subscription error:", error);
    throw error;
  }
};

// Updated confirmSubscription in api.service.js
export const confirmSubscription = async (token) => {
  try {
    const url = new URL(
      `${BASE_URL}/subscribers/confirm/${encodeURIComponent(token)}`
    );

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      mode: "cors",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.reason || "confirmation_failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Confirmation error:", error);
    throw error; // Throw the actual error for better debugging
  }
};

// Ensure your unsubscribeUser function is properly handling responses
export const unsubscribeUser = async (email) => {
  try {
    const url = new URL(`${BASE_URL}/subscribers/${encodeURIComponent(email)}`);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
      mode: "cors",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(data.reason || data.message || "Unsubscribe failed");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Failed to unsubscribe");
  }
};

// Admin Login
export const adminLogin = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Login failed");

    localStorage.setItem("adminToken", data.token);
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// api.service.js - Update adminLogout
export const adminLogout = async () => {
  try {
    const token = localStorage.getItem("adminToken");
    if (!token) throw new Error("No active session");

    const response = await fetch(`${BASE_URL}/admin/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Logout failed");
    }

    return true;
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error(error.message || "Failed to logout");
  }
};

export const getAdminProfile = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to fetch profile");

    return data.admin;
  } catch (error) {
    console.error("Profile fetch error:", error);
    throw error;
  }
};

// Contact Form API Handlers
export const submitContactMessage = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error("Server response:", responseText);
      let errorMessage = "Message submission failed";
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        errorMessage = `${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    return JSON.parse(responseText);
  } catch (error) {
    console.error("Full error details:", error);
    throw error;
  }
};

export const getContactMessages = async (page = 1, pageSize = 10) => {
  try {
    const url = new URL(`${BASE_URL}/contact`);
    url.searchParams.append("page", page);
    url.searchParams.append("pageSize", pageSize);

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Response: ${errorText}`
      );
    }

    const data = await response.json();

    // Transform backend fields to match frontend expectations
    return {
      messages: data.messages.map((msg) => ({
        _id: msg.id.toString(),
        id: msg.id,
        name: msg.name,
        email: msg.email,
        subject: msg.subject,
        message: msg.message,
        category: msg.category,
        status: msg.status,
        createdAt: msg.created_at,
      })),
      totalPages: data.totalPages,
    };
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    throw error;
  }
};

export const updateMessageStatus = async (id, status) => {
  try {
    const response = await fetch(`${BASE_URL}/contact/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Status update failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating message status:", error);
    throw error;
  }
};

export const deleteContactMessage = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/contact/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Response: ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
};
