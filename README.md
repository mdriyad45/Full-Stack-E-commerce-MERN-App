# 🛒 Full-Stack E-Commerce MERN Application

A modern, responsive e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, product management, shopping cart functionality, and admin panel.

![E-Commerce Banner](https://via.placeholder.com/1200x400/EF4444/FFFFFF?text=E-Commerce+MERN+App)

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://kenakatakori.netlify.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/mdriyad45/full-stack-ecommerce-mern)

---

## 📋 Table of Contents

- [🌟 Features](#-features)
  - [🔐 Authentication & Authorization](#-authentication--authorization)
  - [🛍️ Product Management](#️-product-management)
  - [🛒 Shopping Cart](#-shopping-cart)
  - [👨‍💼 Admin Panel](#-admin-panel)
  - [🎨 UI/UX Features](#-uiux-features)
- [🚀 Tech Stack](#-tech-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Cloud Services](#cloud-services)
- [🛠️ Installation & Setup](#️-installation--setup)
  - [Prerequisites](#prerequisites)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
  - [4. Run the Application](#4-run-the-application)
- [📁 Project Structure](#-project-structure)
- [📱 API Endpoints](#-api-endpoints)
  - [Authentication](#authentication)
  - [Products](#products)
  - [Cart](#cart)
  - [Admin](#admin)
- [🎯 Usage](#-usage)
  - [For Users](#for-users)
  - [For Admins](#for-admins)
- [🔧 Configuration](#-configuration)
  - [MongoDB Setup](#mongodb-setup)
  - [Cloudinary Setup](#cloudinary-setup)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [👨‍💻 Author](#-author)
- [🙏 Acknowledgments](#-acknowledgments)
- [📞 Support](#-support)

---

## 🌟 Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (Admin/General)
- Password encryption with bcrypt
- Secure cookie management

### 🛍️ Product Management
- Product catalog with categories
- Product search and filtering
- Category-wise product display
- Product image upload (Cloudinary integration)
- Product details with zoom functionality
- Admin product CRUD operations

### 🛒 Shopping Cart
- Add/remove products from cart
- Quantity management
- Real-time cart count updates
- Persistent cart data
- Cart total calculations

### 👨‍💼 Admin Panel
- User management
- Product management
- Role assignment
- Upload multiple product images
- Edit/update products

### 🎨 UI/UX Features
- Responsive design (Mobile-first)
- Modern UI with Tailwind CSS
- Image carousel banners
- Product image zoom
- Loading animations
- Toast notifications
- AOS animations

---

## 🚀 Tech Stack

### Frontend
- **React 18** - UI Library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management
- **React Router DOM** - Navigation
- **React Toastify** - Notifications
- **AOS** - Animations
- **Moment.js** - Date formatting

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Cookie Parser** - Cookie handling
- **CORS** - Cross-origin requests

### Cloud Services
- **Cloudinary** - Image storage
- **Vercel** - Deployment platform
- **MongoDB Atlas** - Database hosting

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Cloudinary account
- Git

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/yourusername/full-stack-ecommerce-mern.git
cd full-stack-ecommerce-mern
\`\`\`

### 2. Backend Setup

\`\`\`bash
cd Backend
npm install
\`\`\`

Create a `.env` file in the Backend directory:
\`\`\`env
PORT=8080
URI=your_mongodb_connection_string
TOKEN_SECRET_KEY=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
\`\`\`

### 3. Frontend Setup

\`\`\`bash
cd Frontend
npm install
\`\`\`

Create a `.env` file in the Frontend directory:
\`\`\`env
VITE_CLOUD_NAME_CLOUDINARY=your_cloudinary_cloud_name
\`\`\`

### 4. Run the Application

**Backend (Terminal 1):**
\`\`\`bash
cd Backend
npm start
\`\`\`

**Frontend (Terminal 2):**
\`\`\`bash
cd Frontend
npm run dev
\`\`\`

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`

---

## 📁 Project Structure

\`\`\`
Full-Stack-E-commerce-MERN-App/
│
├── 📂 Backend/                          # Server-side application
│   ├── 📂 config/                       # Configuration files
│   │   └── 📄 db.js                     # Database connection
│   │
│   ├── 📂 controller/                   # Request handlers
│   │   ├── 📂 userController/           # User-related controllers
│   │   │   ├── 📄 allUsers.js           # Get all users
│   │   │   ├── 📄 updatedUser.js        # Update user details
│   │   │   ├── 📄 userDetails.js        # Get user details
│   │   │   ├── 📄 userLogOut.js         # User logout
│   │   │   ├── 📄 userSignIn.js         # User login
│   │   │   └── 📄 userSignUp.js         # User registration
│   │   │
│   │   ├── 📂 productController/        # Product-related controllers
│   │   │   ├── 📄 filterProductController.js    # Filter products
│   │   │   ├── 📄 getCategoryProductOne.js      # Get one product per category
│   │   │   ├── 📄 getCategoryWiseProduct.js     # Get products by category
│   │   │   ├── 📄 getProduct.js                 # Get all products
│   │   │   ├── 📄 getProductDetails.js          # Get product details
│   │   │   ├── 📄 searchProduct.js              # Search products
│   │   │   ├── 📄 updateProduct.js              # Update product
│   │   │   └── 📄 uploadProduct.js              # Upload new product
│   │   │
│   │   └── 📄 addToCartController.js    # Cart operations
│   │
│   ├── 📂 helpers/                      # Utility functions
│   │   └── 📄 permission.js             # Permission checks
│   │
│   ├── 📂 middleware/                   # Custom middleware
│   │   └── 📄 authToken.js              # JWT authentication
│   │
│   ├── 📂 models/                       # Database schemas
│   │   ├── 📄 addToCartModel.js         # Cart schema
│   │   ├── 📄 productModel.js           # Product schema
│   │   └── 📄 userModel.js              # User schema
│   │
│   ├── 📂 routes/                       # API routes
│   │   └── 📄 index.js                  # Main router
│   │
│   ├── 📄 index.js                      # Server entry point
│   ├── 📄 package.json                  # Dependencies & scripts
│   └── 📄 vercel.json                   # Vercel deployment config
│
├── 📂 Frontend/                         # Client-side application
│   ├── 📂 public/                       # Static assets
│   │   ├── 📄 index.html                # HTML template
│   │   ├── 📄 vite.svg                  # Vite logo
│   │   └── 📄 _redirects                # Netlify redirects
│   │
│   ├── 📂 src/                          # Source code
│   │   ├── 📂 assets/                   # Images & static files
│   │   │   ├── 📂 banner/               # Banner images
│   │   │   │   ├── 🖼️ img1.webp         # Desktop banners
│   │   │   │   ├── 🖼️ img1_mobile.jpg   # Mobile banners
│   │   │   │   └── ... (more images)
│   │   │   ├── 🎬 forgotpasswnedSend.gif
│   │   │   ├── 🖼️ loginImage.png
│   │   │   ├── 🖼️ sampleImage.jpg
│   │   │   ├── 🎬 signin.gif
│   │   │   └── 📄 logo.svg
│   │   │
│   │   ├── 📂 Components/               # Reusable components
│   │   │   ├── 📂 AdminEditProduct/     # Admin product editing
│   │   │   ├── 📂 AdminProductCard/     # Admin product card
│   │   │   ├── 📂 BannerProduct/        # Homepage banner
│   │   │   ├── 📂 CategoryWishProductDisplay/  # Category products
│   │   │   ├── 📂 ChangeUserRole/       # User role management
│   │   │   ├── 📂 DisplayImage/         # Image display modal
│   │   │   ├── 📂 Footer/               # Footer component
│   │   │   ├── 📂 Header/               # Navigation header
│   │   │   ├── 📂 HorizontalCardProduct/ # Horizontal product cards
│   │   │   ├── 📂 Logo/                 # Logo component
│   │   │   ├── 📂 UploadProducts/       # Product upload form
│   │   │   ├── 📄 Cart.jsx              # Cart component
│   │   │   └── 📄 ProductList.jsx       # Product listing
│   │   │
│   │   ├── 📂 Pages/                    # Page components
│   │   │   ├── 📂 AdminPanel/           # Admin dashboard
│   │   │   ├── 📂 AllProducts/          # All products page
│   │   │   ├── 📂 AllUsers/             # All users page
│   │   │   ├── 📂 Cart/                 # Shopping cart page
│   │   │   ├── 📂 CategoryProduct/      # Category products page
│   │   │   ├── 📂 ForgotPassword/       # Password reset page
│   │   │   ├── 📂 Home/                 # Homepage
│   │   │   ├── 📂 Login/                # Login page
│   │   │   ├── 📂 SearchProduct/        # Search results page
│   │   │   ├── 📂 SignUp/               # Registration page
│   │   │   └── 📄 ProductDetails.jsx    # Product details page
│   │   │
│   │   ├── 📂 Helper/                   # Utility functions
│   │   │   ├── 📄 addToCart.js          # Add to cart helper
│   │   │   ├── 📄 displayCurrency.js    # Currency formatter
│   │   │   ├── 📄 fetchCategoryWiseProduct.js  # Category fetch
│   │   │   ├── 📄 imageToBase64.js      # Image converter
│   │   │   ├── 📄 ProductCategory.jsx   # Product categories
│   │   │   ├── 📄 scrollTop.js          # Scroll utility
│   │   │   └── 📄 uploadImage.js        # Image upload
│   │   │
│   │   ├── 📂 Store/                    # Redux store
│   │   │   ├── 📄 Store.jsx             # Store configuration
│   │   │   └── 📄 userSlice.jsx         # User state slice
│   │   │
│   │   ├── 📂 Routes/                   # Routing configuration
│   │   │   └── 📄 index.jsx             # Route definitions
│   │   │
│   │   ├── 📂 common/                   # Common utilities
│   │   │   ├── 📄 index.jsx             # API endpoints
│   │   │   └── 📄 role.jsx              # User roles
│   │   │
│   │   ├── 📄 App.jsx                   # Main App component
│   │   ├── 📄 App.css                   # Global styles
│   │   ├── 📄 Context/index.jsx         # React Context
│   │   ├── 📄 index.css                 # Tailwind imports
│   │   └── 📄 main.jsx                  # App entry point
│   │
│   ├── 📄 package.json                  # Dependencies & scripts
│   ├── 📄 postcss.config.js             # PostCSS configuration
│   ├── 📄 tailwind.config.js            # Tailwind configuration
│   ├── 📄 vercel.json                   # Vercel deployment config
│   └── 📄 vite.config.js                # Vite configuration
│
├── 📄 README.md                         # Project documentation
├── 📄 DEPLOYMENT.md                     # Deployment guide
├── 📄 .env.example                      # Environment variables template
└── 📄 .gitignore                        # Git ignore rules
\`\`\`

## 📱 API Endpoints

### Authentication
- `POST /api/signup` - User registration
- `POST /api/signin` - User login
- `GET /api/user-details` - Get user details
- `GET /api/userLogout` - User logout

### Products
- `GET /api/get-product` - Get all products
- `POST /api/upload-product` - Upload product (Admin)
- `POST /api/update-product` - Update product (Admin)
- `GET /api/get-CategoryProductOne` - Get one product per category
- `POST /api/category-product` - Get products by category
- `GET /api/product-details/:id` - Get product details
- `GET /api/search` - Search products
- `POST /api/filter-Product` - Filter products

### Cart
- `POST /api/add-to-cart` - Add product to cart
- `GET /api/count-addToCart-product` - Get cart count
- `GET /api/addToCartViewProduct` - Get cart products
- `POST /api/updateAddToCartQuantity` - Update cart quantity
- `POST /api/deleteAddToCartProduct` - Remove from cart

### Admin
- `GET /api/all-user` - Get all users (Admin)
- `POST /api/update-user` - Update user role (Admin)

---

## 🎯 Usage

### For Users
1. **Registration/Login**: Create an account or login
2. **Browse Products**: Explore products by categories
3. **Search**: Use the search functionality to find specific products
4. **Add to Cart**: Add desired products to your cart
5. **Manage Cart**: Update quantities or remove items
6. **Product Details**: View detailed product information with zoom

### For Admins
1. **Admin Panel**: Access via user menu (Admin role required)
2. **User Management**: View and manage user roles
3. **Product Management**: Add, edit, or update products
4. **Image Upload**: Upload multiple product images

---

## 🔧 Configuration

### MongoDB Setup
1. Create a MongoDB Atlas cluster
2. Create a database named `ecommerce`
3. Get your connection string
4. Add your IP to the whitelist

### Cloudinary Setup
1. Create a Cloudinary account
2. Get your cloud name
3. Create an upload preset named `mern_product`
4. Configure upload settings

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Jakariya Kabir Riyad**
- LinkedIn: [Your LinkedIn Profile](https://www.linkedin.com/in/mdriyad45/)
- GitHub: [Your GitHub Profile](https://github.com/mdriyad45)

---

## 🙏 Acknowledgments

- React team for the amazing library
- MongoDB for the database solution
- Cloudinary for image management
- Vercel for hosting platform
- Tailwind CSS for styling utilities

---

## 📞 Support

If you have any questions or need help with deployment, please open an issue or contact me directly.

---

⭐ If you found this project helpful, please give it a star!

