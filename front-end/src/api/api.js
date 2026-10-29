
const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080"
).replace(/\/+$/, "");

const API_URL = BASE_URL.endsWith("/api")
    ? BASE_URL
    : `${BASE_URL}/api`;

// 1. Register
export const registerData = async (formData) => {
    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        return await res.json();
    } catch (error) {
        console.error("Register failed:", error.message);
        throw error;
    }
};

// 2. Login
export const loginData = async (formData) => {
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        return await res.json();
    } catch (error) {
        console.error("Login failed:", error.message);
        throw error;
    }
};

// Common headers for authenticated requests
const getHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

// 3. Dashboard stats
export const getDashboardStats = async () => {
    try {
        const res = await fetch(`${API_URL}/dashboard/stats`, {
            method: "GET",
            headers: getHeaders(),
        });

        return await res.json();
    } catch (error) {
        console.error("Dashboard stats failed:", error.message);
        throw error;
    }
};

// 4. Recent activities

export const getRecentActivities = async () => {
    const res = await fetch(`${API_URL}/dashboard/activities`, {
        method: "GET",
        headers: getHeaders(),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Recent activities fetch failed");
    }

    return data;
};


// 5. My properties
export const getMyProperties = async () => {
    try {
        const res = await fetch(`${API_URL}/property/my-properties`, {
            method: "GET",
            headers: getHeaders(),
        });

        return await res.json();
    } catch (error) {
        console.error("My properties failed:", error.message);
        throw error;
    }
};

// 6. Approved properties
export const getApprovedProperties = async () => {
    try {
        const res = await fetch(`${API_URL}/property/approved`, {
            method: "GET",
            headers: getHeaders(),
        });

        return await res.json();
    } catch (error) {
        console.error("Approved properties failed:", error.message);
        throw error;
    }
};

// 7. My wishlist
export const getMyWishlist = async () => {
    try {
        const res = await fetch(`${API_URL}/wishlist`, {
            method: "GET",
            headers: getHeaders(),
        });

        return await res.json();
    } catch (error) {
        console.error("Wishlist failed:", error.message);
        throw error;
    }
};

// 8. Property views count
export const getPropertyViewsCount = async () => {
    try {
        const res = await fetch(`${API_URL}/activities/views-count`, {
            method: "GET",
            headers: getHeaders(),
        });

        return await res.json();
    } catch (error) {
        console.error("Property views count failed:", error.message);
        throw error;
    }
};



export const getMyProfile = async () => {
    const res = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: getHeaders(),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch profile");
    }

    return data;
};


// 6. Create Property (POST)
export const createProperty = async (propertyData) => {
    try {
        const res = await fetch(`${API_URL}/property`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(propertyData),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Property creation failed");
        }

        return data;
    } catch (error) {
        console.error("Create property failed:", error.message);
        throw error;
    }
};