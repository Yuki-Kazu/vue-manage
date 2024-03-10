import request from "./request";

export const login = (data) => {
    return request({
        url: "/admin/admin/login",
        method: "POST",
        data,
    });
};

