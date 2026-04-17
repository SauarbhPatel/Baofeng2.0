import AppInfo from "../../appInfo";
let TOKEN = null;

const baseUrl = AppInfo.Api;
const _CompanyId = AppInfo?.companyId;

const pathUrl = {
    // LOGIN_API_URL: "/auth/login",
};

function __setToken(authToken) {
    TOKEN = authToken;
    return;
}

function __getToken() {
    return TOKEN;
}

function __apiHeader() {
    return {
        headers: {
            "Content-Type": "application/json",
            ...(TOKEN && { Authorization: "Bearer " + TOKEN }),
            "x-company-id": _CompanyId,
        },
    };
}

function __apiHeaderFormData() {
    return {
        headers: {
            "Content-Type": "multipart/form-data",
            ...(TOKEN && { Authorization: "Bearer " + TOKEN }),
            "x-company-id": _CompanyId,
        },
    };
}

export {
    baseUrl,
    pathUrl,
    __setToken,
    __getToken,
    __apiHeader,
    __apiHeaderFormData,
};
