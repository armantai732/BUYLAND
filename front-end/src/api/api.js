const BASE_URL = 'http://localhost:8080/api' || import.meta.env.VITE_API_KEY

export const registerData = async (formData) => {
    try {
        const res = await fetch(`${BASE_URL}/auth/register`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        return await res.json();
    } catch (error) {
        console.log(`Register failed ${error.message}`)
    }
}


export const loginData = async (formData) => {
    try {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        return await res.json();
    } catch (error) {
        console.log(`Login failed ${error.message}`)
    }
}