# 🛒 Full-Stack E-Commerce MERN Application

A modern, responsive e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, product management, shopping cart functionality, and admin panel.

![E-Commerce Banner](https://via.placeholder.com/1200x400/EF4444/FFFFFF?text=E-Commerce+MERN+App)

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

## 📁 Project Structure

\`\`\`
Full-Stack-E-commerce-MERN-App/
├── Backend/
│   ├── config/
│   │   └── db.js
│   ├── controller/
│   │   ├── userController/
│   │   ├── productController/
│   │   └── addToCartController.js
│   ├── helpers/
│   │   └── permission.js
│   ├── middleware/
│   │   └── authToken.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── productModel.js
│   │   └── addToCartModel.js
│   ├── routes/
│   │   └── index.js
│   ├── index.js
│   └── vercel.json
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   ├── Pages/
│   │   ├── Helper/
│   │   ├── Store/
│   │   ├── Routes/
│   │   └── assets/
│   ├── package.json
│   └── vercel.json
└── README.md
\`\`\`

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

## 🚀 Deployment on Vercel

### Backend Deployment

1. **Prepare Backend for Deployment**
   - Ensure `vercel.json` is configured in the Backend directory
   - Update CORS settings for production

2. **Deploy Backend**
   \`\`\`bash
   cd Backend
   vercel --prod
   \`\`\`

3. **Set Environment Variables in Vercel Dashboard**
   - `URI` - MongoDB connection string
   - `TOKEN_SECRET_KEY` - JWT secret
   - `FRONTEND_URL` - Your frontend domain

### Frontend Deployment

1. **Update API URLs**
   - Update `backendDomain` in `Frontend/src/common/index.jsx` with your deployed backend URL

2. **Deploy Frontend**
   \`\`\`bash
   cd Frontend
   vercel --prod
   \`\`\`

3. **Set Environment Variables**
   - `VITE_CLOUD_NAME_CLOUDINARY` - Cloudinary cloud name

### Environment Variables Setup

#### Backend Environment Variables
\`\`\`env
URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
TOKEN_SECRET_KEY=your_super_secret_jwt_key_here
FRONTEND_URL=https://your-frontend-domain.vercel.app
\`\`\`

#### Frontend Environment Variables
\`\`\`env
VITE_CLOUD_NAME_CLOUDINARY=your_cloudinary_cloud_name
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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Jakariya Kabir Riyad**
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
- GitHub: [Your GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- React team for the amazing library
- MongoDB for the database solution
- Cloudinary for image management
- Vercel for hosting platform
- Tailwind CSS for styling utilities

## 📞 Support

If you have any questions or need help with deployment, please open an issue or contact me directly.

---

⭐ If you found this project helpful, please give it a star!
