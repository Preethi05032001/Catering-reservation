// Utility functions for interacting with localStorage

const STORAGE_KEYS = {
    USERS: 'cateringUsers',
    PRODUCTS: 'cateringProducts',
    CARTS: 'cateringCarts',
    ORDERS: 'cateringOrders',
    THEME: 'theme',
    CURRENT_USER: 'currentUser',
    INITIALIZED: 'initialized' // New key to prevent re-initialization
};

// --- Generic Local Storage Helpers ---

const getFromLocalStorage = (key, defaultValue) => {
    const data = localStorage.getItem(key);
    if (data === null) return defaultValue;

    try {
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error parsing data for key "${key}":`, error);
        return defaultValue;
    }
};

const saveToLocalStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving data to key "${key}":`, error);
    }
};

// --- Exported Accessors ---

export const getUsers = () => getFromLocalStorage(STORAGE_KEYS.USERS, []);
export const saveUsers = (users) => saveToLocalStorage(STORAGE_KEYS.USERS, users);

export const getProducts = () => getFromLocalStorage(STORAGE_KEYS.PRODUCTS, []);
export const saveProducts = (products) => saveToLocalStorage(STORAGE_KEYS.PRODUCTS, products);

export const getOrders = () => getFromLocalStorage(STORAGE_KEYS.ORDERS, []);
export const saveOrders = (orders) => saveToLocalStorage(STORAGE_KEYS.ORDERS, orders);

export const getTheme = () => getFromLocalStorage(STORAGE_KEYS.THEME, 'light');
export const saveTheme = (theme) => saveToLocalStorage(STORAGE_KEYS.THEME, theme);

export const getCurrentUser = () => getFromLocalStorage(STORAGE_KEYS.CURRENT_USER, null);
export const saveCurrentUser = (user) => saveToLocalStorage(STORAGE_KEYS.CURRENT_USER, user);
export const removeCurrentUser = () => localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);

export const getCart = (userId) => {
    const allCarts = getFromLocalStorage(STORAGE_KEYS.CARTS, {});
    return allCarts[userId] || {};
};

export const saveCart = (userId, cart) => {
    const allCarts = getFromLocalStorage(STORAGE_KEYS.CARTS, {});
    allCarts[userId] = cart;
    saveToLocalStorage(STORAGE_KEYS.CARTS, allCarts);
};

// --- Populate Default Data If Needed ---

export const populateDefaultData = () => {
    if (localStorage.getItem(STORAGE_KEYS.INITIALIZED)) return;

    let users = getUsers();
    let products = getProducts();
    let orders = getOrders();

    if (users.length === 0) {
        const defaultUsers = [
            { id: 'customer-1', username: 'customer', password: 'password', role: 'customer' },
            { id: 'caterer-1', username: 'caterer1', password: 'password', role: 'caterer' },
            { id: 'caterer-2', username: 'caterer2', password: 'password', role: 'caterer' },
        ];
        saveUsers(defaultUsers);
        users = defaultUsers;
        console.log("✅ Default users initialized.");
    }

    if (products.length === 0) {
        const caterer1 = users.find(u => u.username === 'caterer1');
        const caterer2 = users.find(u => u.username === 'caterer2');

        const defaultProducts = [
            {
                id: 'prod-1',
                catererId: caterer1?.id || 'caterer-1',
                name: 'Traditional Indian Thali',
                description: 'A complete meal with rice, roti, dal, vegetables, and dessert.',
                price: 250,
                imageUrl: 'https://static.toiimg.com/thumb/resizemode-4,width-1000,height-720,msid-94078477/94078477.jpg'
            },
            {
                id: 'prod-2',
                catererId: caterer1?.id || 'caterer-1',
                name: 'Biryani Feast',
                description: 'Fragrant basmati rice cooked with spices and your choice of meat or vegetables.',
                price: 350,
                imageUrl: 'https://www.indianveggiedelight.com/wp-content/uploads/2020/04/veg-biryani-instant-pot.jpg'
            },
            {
                id: 'prod-3',
                catererId: caterer2?.id || 'caterer-2',
                name: 'South Indian Breakfast Combo',
                description: 'Idli, Vada, Dosa with Sambar and Chutneys.',
                price: 180,
                imageUrl: 'https://www.shutterstock.com/image-photo/group-south-indian-food-like-600nw-1153818823.jpg'
            },
            {
                id: 'prod-4',
                catererId: caterer2?.id || 'caterer-2',
                name: 'Gujarati Thali',
                description: 'Sweet and savory Gujarati dishes.',
                price: 280,
                imageUrl: 'https://www.nehascookbook.com/wp-content/uploads/2022/10/Shrad-thali-WS-500x500.jpg'
            },
        ];
        saveProducts(defaultProducts);
        console.log("✅ Default products initialized.");
    }

    // Optional: Add default orders here if needed

    // Mark initialization complete
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
};
