import request from "./request";

export const getUserData = (params) => {
    return request({
        url: "/admin/farmer/list",
        params,
    })
}