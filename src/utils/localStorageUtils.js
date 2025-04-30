// Utility functions for interacting with localStorage

const STORAGE_KEYS = {
    USERS: 'cateringUsers',
    PRODUCTS: 'cateringProducts',
    CARTS: 'cateringCarts', // Store carts per user
    ORDERS: 'cateringOrders',
    THEME: 'theme',
    CURRENT_USER: 'currentUser'
};

/**
 * Retrieves data from localStorage for a given key.
 * @param {string} key - The key to retrieve.
 * @param {any} defaultValue - The value to return if the key is not found.
 * @returns {any} - The parsed data or the default value.
 */
const getFromLocalStorage = (key, defaultValue) => {
    const data = localStorage.getItem(key);
    if (data === null) {
        return defaultValue;
    }
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error parsing data from localStorage for key "${key}":`, error);
        return defaultValue;
    }
};

/**
 * Saves data to localStorage for a given key.
 * @param {string} key - The key to save under.
 * @param {any} data - The data to save (will be stringified).
 */
const saveToLocalStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving data to localStorage for key "${key}":`, error);
    }
};

// --- Specific functions for different data types ---

export const getUsers = () => getFromLocalStorage(STORAGE_KEYS.USERS, []);
export const saveUsers = (users) => saveToLocalStorage(STORAGE_KEYS.USERS, users);

export const getProducts = () => getFromLocalStorage(STORAGE_KEYS.PRODUCTS, []);
export const saveProducts = (products) => saveToLocalStorage(STORAGE_KEYS.PRODUCTS, products);

/**
 * Retrieves the cart for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {object} - The user's cart object.
 */
export const getCart = (userId) => {
    const allCarts = getFromLocalStorage(STORAGE_KEYS.CARTS, {});
    return allCarts[userId] || {};
};

/**
 * Saves the cart for a specific user.
 * @param {string} userId - The ID of the user.
 * @param {object} cart - The user's cart object to save.
 */
export const saveCart = (userId, cart) => {
    const allCarts = getFromLocalStorage(STORAGE_KEYS.CARTS, {});
    allCarts[userId] = cart;
    saveToLocalStorage(STORAGE_KEYS.CARTS, allCarts);
};


export const getOrders = () => getFromLocalStorage(STORAGE_KEYS.ORDERS, []);
export const saveOrders = (orders) => saveToLocalStorage(STORAGE_KEYS.ORDERS, orders);

export const getTheme = () => getFromLocalStorage(STORAGE_KEYS.THEME, 'light');
export const saveTheme = (theme) => saveToLocalStorage(STORAGE_KEYS.THEME, theme);

export const getCurrentUser = () => getFromLocalStorage(STORAGE_KEYS.CURRENT_USER, null);
export const saveCurrentUser = (user) => saveToLocalStorage(STORAGE_KEYS.CURRENT_USER, user);
export const removeCurrentUser = () => localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);


// --- Function to populate default data if localStorage is empty ---
export const populateDefaultData = () => {
    const users = getUsers();
    const products = getProducts();
    const orders = getOrders();

    if (users.length === 0) {
        const defaultUsers = [
            { id: 'customer-1', username: 'customer', password: 'password', role: 'customer' },
            { id: 'caterer-1', username: 'caterer1', password: 'password', role: 'caterer' },
            { id: 'caterer-2', username: 'caterer2', password: 'password', role: 'caterer' },
        ];
        saveUsers(defaultUsers);
        console.log("Default users added to localStorage.");
    }

    if (products.length === 0) {
         // Find caterer IDs from default users
        const caterer1 = users.find(u => u.username === 'caterer1');
        const caterer2 = users.find(u => u.username === 'caterer2');

        const defaultProducts = [
            {
                id: 'prod-1',
                catererId: caterer1 ? caterer1.id : 'caterer-1', // Use found ID or fallback
                name: 'Traditional Indian Thali',
                description: 'A complete meal with rice, roti, dal, vegetables, and dessert.',
                price: 250,
                imageUrl: 'https://static.toiimg.com/thumb/resizemode-4,width-1000,height-720,msid-94078477/94078477.jpg' // Placeholder image
            },
            {
                id: 'prod-2',
                catererId: caterer1 ? caterer1.id : 'caterer-1',
                name: 'Biryani Feast',
                description: 'Fragrant basmati rice cooked with spices and your choice of meat or vegetables.',
                price: 350,
                imageUrl: 'https://www.indianveggiedelight.com/wp-content/uploads/2020/04/veg-biryani-instant-pot.jpg' // Placeholder image
            },
             {
                id: 'prod-3',
                catererId: caterer2 ? caterer2.id : 'caterer-2',
                name: 'South Indian Breakfast Combo',
                description: 'Idli, Vada, Dosa with Sambar and Chutneys.',
                price: 180,
                imageUrl: 'https://www.shutterstock.com/image-photo/group-south-indian-food-like-600nw-1153818823.jpg' // Placeholder image
            },
             {
                id: 'prod-4',
                catererId: caterer2 ? caterer2.id : 'caterer-2',
                name: 'Gujarati Thali',
                description: 'Sweet and savory Gujarati dishes.',
                price: 280,
                imageUrl: 'https://www.nehascookbook.com/wp-content/uploads/2022/10/Shrad-thali-WS-500x500.jpg' // Placeholder image
            },
        ];
        saveProducts(defaultProducts);
        console.log("Default products added to localStorage.");
    }

    if (orders.length === 0) {
         // You can add some default orders here if needed for testing the view orders page
         // Example:
        // const defaultOrders = [
        //     { id: 'order-1', customerId: 'customer-1', date: new Date().toISOString(), items: [{ productId: 'prod-1', productName: 'Traditional Indian Thali', quantity: 2, price: 250, catererId: 'caterer-1' }], total: 500, status: 'Delivered' }
        // ];
        // saveOrders(defaultOrders);
        // console.log("Default orders added to localStorage.");
    }
};
