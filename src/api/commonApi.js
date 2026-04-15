import { __getApiData, __postApiData, __putApiData, __deleteApiData } from ".";

// ─── Categories ───────────────────────────────────────────────
export const getCategories = () => __getApiData("category");

// ─── Products ─────────────────────────────────────────────────
export const getProductListing = (page = 1, limit = 4) =>
    __getApiData(`product/listing?page=${page}&limit=${limit}`);
