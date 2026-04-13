import AppInfo from "../../appInfo";
import { __getToken } from "../localization";

const baseUrl = AppInfo.Api;
const _CompanyId = AppInfo?.companyId;

const pathUrl = {
    // LOGIN_API_URL: "/auth/login",
};
function __apiHeader() {
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + __getToken(),
            companyId: _CompanyId,
        },
    };
}

function __apiHeaderFormData() {
    return {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + __getToken(),
            companyId: _CompanyId,
        },
    };
}

export { baseUrl, pathUrl, __apiHeader, __apiHeaderFormData };
