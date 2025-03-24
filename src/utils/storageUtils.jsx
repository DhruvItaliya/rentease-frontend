// Function to set data in localStorage
export const setStorage = (key, value) => {
    if (typeof window !== 'undefined') {
        // Store the value in localStorage after converting it to a string
        localStorage.setItem(key, JSON.stringify(value));
    }
};

// Function to get data from localStorage
export const getStorage = (key) => {
    if (typeof window !== 'undefined') {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null; // Return parsed value or null if not found
    }
    return null;
};

// Function to remove data from localStorage
export const removeStorage = (key) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};
