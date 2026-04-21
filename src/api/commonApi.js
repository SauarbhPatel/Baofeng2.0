import {
    __getApiData,
    __postApiData,
    __putApiData,
    __deleteApiData,
    __patchApiData,
} from ".";

// ─── Auth ─────────────────────────────────────────────────────
export const loginWithPhone = (payload) =>
    __postApiData("consumer/login", payload);

export const verifyOtp = (payload) =>
    __postApiData("consumer/verifyOtp", payload);

// ─── Consumer Profile ─────────────────────────────────────────
export const getConsumerProfile = () => __getApiData("consumer/profile");

export const updateConsumerProfile = (payload) =>
    __postApiData("consumer/updateProfile", payload);

// ─── Categories ───────────────────────────────────────────────
export const getCategories = () => __getApiData("category");

// ─── Products ─────────────────────────────────────────────────
export const getProductListing = (page = 1, limit = 4) =>
    __getApiData(`product/listing?page=${page}&limit=${limit}`);

// ─── Product Details ──────────────────────────────────────────
// slug  → e.g. "baofeng-bf-33c-uhf-compact-communication-radio-licence-free-walkie-talkie-pack-1"
// listingId → e.g. "L00000513"
// pickupPointId → e.g. "69a1e57b1aeed5f800c42ef8"
export const getProductDetails = (slug, listingId, pickupPointId) =>
    __getApiData(`product/${slug}/${listingId}?pickupPointId=${pickupPointId}`);

// ─── Similar Products ─────────────────────────────────────────
export const getSimilarProducts = (categoryId, productId) =>
    __getApiData(`product/similar/${categoryId}/${productId}`);

// ─── Search ───────────────────────────────────────────────────
export const searchProducts = (q) =>
    __getApiData(`product/searchFilter?q=${encodeURIComponent(q)}`);

// ─── Pincode / COD Check ──────────────────────────────────────
export const checkPincode = (pincode) =>
    __getApiData(`pincode/check?pincode=${pincode}`);

export const getShippingMethods = (pincode) =>
    __getApiData(`pincode/shipping-methods?pincode=${pincode}`);

// ─── Cart ─────────────────────────────────────────────────────
export const addToCart = (payload) => __postApiData("cart/addToCart", payload);

export const getCart = (cartToken) =>
    __getApiData(`cart?cartToken=${cartToken}`);

export const updateCartQuantity = (payload) =>
    __patchApiData("cart/items/quantity", payload);

export const removeCartItem = (payload) =>
    __postApiData("cart/items/remove", payload);

export const clearCart = (payload) => __postApiData("cart/clear", payload);

export const registerCart = (payload) =>
    __postApiData("cart/register", payload);

// ─── Orders ───────────────────────────────────────────────────
export const checkoutOrder = (payload) =>
    __postApiData("order/checkout", payload);

export const getAbundantOrder = (abundantId) =>
    __getApiData(`order/abundant/${abundantId}`);

export const placeOrder = (orderId, payload) =>
    __postApiData(`order/placeOrder/${orderId}`, payload);

export const verifyRazorpayPayment = (orderId, payload) =>
    __postApiData(`order/${orderId}/verify-razorpay-payment`, payload);

export const getOrderListing = (consumerId) =>
    __getApiData(`order/myOrderListing/${consumerId}`);

// ─── Address ──────────────────────────────────────────────────
export const getShippingAddresses = () =>
    __getApiData("address/getAllAddress/shipping");

export const getBillingAddresses = () =>
    __getApiData("address/getAllAddress/Billing");

// ─── Documents ────────────────────────────────────────────────
// Upload file to S3 — payload is FormData with key "files"
export const uploadFilesToS3 = (formData) =>
    __postApiData("s3upload/uploadMultipleFiles", formData, "form");

// Save uploaded doc record
export const saveUploadedDoc = (payload) =>
    __postApiData("consumer/uploadedDocs", payload);

// Get all uploaded docs for current consumer
export const getUploadedDocs = () => __getApiData("consumer/uploadedDocs");
