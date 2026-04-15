import axios from "axios";
import { __apiHeader, __apiHeaderFormData, baseUrl } from "./constant";

const BASE_URL = baseUrl;

const __getApiData = (endpoint) => {
    console.log(`${BASE_URL}${endpoint}`);
    return axios
        .get(`${BASE_URL}${endpoint}`, __apiHeader())
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
};

const __postApiData = (endpoint, data, type) => {
    console.log(`${BASE_URL}${endpoint}`);
    return axios
        .post(
            `${BASE_URL}${endpoint}`,
            data,
            type == "from" ? __apiHeaderFormData() : __apiHeader(),
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

const __putApiData = (endpoint, data, type) => {
    return axios
        .put(
            `${BASE_URL}${endpoint}`,
            data,
            type == "from" ? __apiHeaderFormData() : __apiHeader(),
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

const __deleteApiData = (endpoint, data) => {
    return axios
        .delete(`${BASE_URL}${endpoint}`, { data: data, ...__apiHeader() })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(JSON.stringify(error));
            throw error;
        });
};

export { __getApiData, __postApiData, __putApiData, __deleteApiData };
