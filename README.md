Project Title
    -> Catering Reservation and Ordering System 

Technologies
    -> HTML
    -> CSS
    -> JavaScript
    ->React.js (using React 19 RC)
    -> localStorage (for client-side data storage)
    -> react-router-dom (for navigation)
    -> react-toastify (for notifications)
    
Domain
    ->Food / E-commerce (Catering)
    
Problem Statement:
Catering is a platform designed to empower local caterers, particularly those in rural towns, to promote and sell their catering services and traditional commodities to a wider global audience. The primary goal is to establish a secure and user-friendly portal that allows customers to browse and order catering from registered caterers, while also enabling caterers to manage their product information securely, even via mobile devices. This project prioritizes supporting local caterers to develop their skills and promote traditional Indian culture through their offerings.

System Modules
    ->The system is divided into two main user roles with distinct modules:

Customer
    -> Register and Login: Users can create accounts and log in to access customer-specific features.
    -> View Product: Browse a list of available catering products from various caterers.
    -> Add to Cart: Add desired products to a shopping cart.
    -> My Cart: View items in the cart, adjust quantities, and remove items.
    -> Place Order: Finalize the order based on the items in the cart.
    -> My Orders: View a history of placed orders and their status.
    -> My Profile: View and potentially edit personal profile information.
    
Caterer (Admin)
    -> Register and Login: Caterers can create accounts and log in to access caterer-specific features.
    -> Upload Product Details: Add new catering products with details like name, description, price, and image.
    -> View Orders: View orders that include products from their catering business.
    -> My Profile: View and potentially edit profile information.
    
Project Evaluation Metrics
    The project development adheres to the following evaluation metrics:
        -> Code: The codebase is structured in a modular fashion using React components and context APIs.
        -> Safe: The application is designed with basic client-side validation and uses localStorage for data storage in this prototype. (Note: Production environments require robust backend security).
        -> Testable: The component-based architecture facilitates testing at the code level (though explicit unit tests are not included in this initial structure).
        -> Maintainable: The modular design, clear folder structure, and use of contexts for state management contribute to a maintainable codebase.
        -> Portable: Developed using standard web technologies (HTML, CSS, JS, React), the application is portable and can run in any modern web browser environment.
        
SetupClone the repository:

git clone [Your GitHub repository URL]
    cd catering-app
    Install dependencies:npm install
    # or
    yarn install
    Ensure React 19 RC and react-router-dom are installed:npm install react@^19.0.0-rc react-dom@^19.0.0-rc react-router-dom react-toastify --save
    # or
    yarn add react@^19.0.0-rc react-dom@^19.0.0-rc react-router-dom react-toastify
    ExecutionStart the development server:npm start
    # or
    yarn start
    The application will open in your default web browser, usually at http://localhost:3000.

Using the Application
    -> Default Data: Upon the first load, the application will populate localStorage with some default users (a customer and a couple of caterers) and some default products.
    -> Registration: You can register new users as either 'Customer' or 'Caterer'.
    -> Login: Log in using the default credentials or newly registered accounts.
    -> Navigation: The navigation bar will change based on the logged-in user's role.
    -> Customer Flow: Log in as a customer to view products, add them to the cart, view the cart, place orders, and see your order history.
    -> Caterer Flow: Log in as a caterer to upload new products and view orders that contain your products.
    -> Theme Toggle: Use the button in the navbar to switch between light and dark modes.

Folder Structure

    catering-app/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Home.js
    │   │   ├── Register.js
    │   │   ├── Login.js
    │   │   ├── Profile.js
    │   │   ├── ProductList.js
    │   │   ├── Cart.js
    │   │   ├── MyOrders.js         (Customer Orders)
    │   │   ├── UploadProduct.js    (Caterer Product Upload)
    │   │   └── ViewOrders.js       (Caterer View Orders)
    │   ├── context/
    │   │   └── AuthContext.js
    │   │   └── ThemeContext.js
    │   │   └── CartContext.js
    │   │   └── DataContext.js      (For Products, Users, Orders)
    │   ├── utils/
    │   │   └── localStorageUtils.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json

Coding Standards
    The project follows standard React coding practices, including functional components, hooks, and a component-based architecture. CSS is organized into modular files per component and uses CSS variables for theming.