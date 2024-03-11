import request from "./request";

//登录
export const login = (data) => {
    return request({
        url: "/admin/admin/login",
        method: "POST",
        data,
    });
};

//获取所有农民信息
export const getFarmer = () => {
    return request({
        url: '/admin/farmer/list',
        method: "GET"
    })
}

//文件上传???
export const uploadData = (data) => {
    return request({
        url: "/admin/admin/login",
        method: "POST",
        data,
    });
};