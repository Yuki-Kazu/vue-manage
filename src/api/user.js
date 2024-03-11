import request from "./request";

//上传用户
export const uploadUser = (data) => {
    return request({
        url: "/admin/farmer/add",
        method: "POST",
        data,
    });
};

//删除用户
export const deleteUser = (userId) => {
    return request({
        url: `/admin/farmer/delete?id=${userId}`,
        method: "DELETE",
    });
};

//修改用户
export const updateUser = (data) => {
    return request({
        url: "/admin/farmer/change",
        method: "PUT",
        data,
    });
};

//获取用户
export const getUser = (params) => {
    return request({
        url: "/admin/farmer/page",
        method: "GET",
        params,
    })
}