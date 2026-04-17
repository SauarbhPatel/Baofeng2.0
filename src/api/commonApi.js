import { __getApiData, __postApiData, __putApiData, __deleteApiData } from ".";

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

// ─── Pincode / COD Check ──────────────────────────────────────
export const checkPincode = (pincode) =>
    __getApiData(`pincode/check?pincode=${pincode}`);

// ─── Cart ─────────────────────────────────────────────────────
export const addToCart = (payload) => __postApiData("cart/addToCart", payload);

export const getCart = (cartToken) =>
    __getApiData(`cart?cartToken=${cartToken}`);
