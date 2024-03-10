import request from "./request";

//上传用户数据
export const uploadUser = (data) => {
    return request({
        url: "/admin/farmer/add",
        method: "POST",
        data,
    });
};

//删除用户数据
export const deleteUser = (userId) => {
    return request({
        url: `/admin/farmer/delete/?id=${userId}`,
        method: "DELETE",
    });
};

//修改用户数据
export const updateUser = (data) => {
    return request({
        url: "/admin/farmer/change",
        method: "POST",
        data,
    });
};

//获取用户数据
export const getUser = (params) => {
    return request({
        url: "/admin/farmer/page",
        params,
    })
}