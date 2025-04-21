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