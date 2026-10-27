const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/+$/, "");

export async function loginWithGoogleToken(idToken) {
    const response = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
        throw new Error(data.message || "Google login failed");
    }

    return data;
}