const backendDomain = "http://localhost:9000";

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomain}/api/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomain}/api/all-user`,
    method: "get",
  },
  updatedUser: {
    url: `${backendDomain}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: "post",
  },
  getProduct: {
    url: `${backendDomain}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomain}/api/update-product`,
    method: "post",
  },
  getCategoryProduct: {
    url: `${backendDomain}/api/get-CategoryProductOne`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomain}/api/category-product`,
    method: "post",
  },
  uploadMultipleProducts: {
    url: `${backendDomain}/api/upload-multiple-products`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomain}/api/product-details`,
    method: "get",
  },
  addToCart: {
    url: `${backendDomain}/api/add-to-cart`,
    method: "post",
  },
  countAddToProduct: {
    url: `${backendDomain}/api/count-addToCart-product`,
    method: "get",
  },
  addToCartViewProduct: {
    url: `${backendDomain}/api/addToCartViewProduct`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomain}/api/updateAddToCartQuantity`,
    method: "post",
  },
  deleteAddToCartProduct: {
    url: `${backendDomain}/api/deleteAddToCartProduct`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomain}/api/search`,
    method: "get",
  },
  filterProducts: {
    url: `${backendDomain}/api/filter-Product`,
    method: "post",
  },
};

export default SummaryApi;
