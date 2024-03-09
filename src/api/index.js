import request from "./request";

export const login = (data) => {
    return request({
        url: "/admin/admin/login",
        method: "POST",
        data,
    });
};

export const fetchData = (data) => {
    return request({
        url: "/admin/farmer/list",
        method: "GET",
        data,
    });
};

