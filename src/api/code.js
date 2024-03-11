import request from "./request";

//上传溯源码?差文件上传
export const uploadCode = (data) => {
    return request({
        url: `/admin/code/add`,
        method: "POST",
        data,
    });
};

//删除溯源码?
export const deleteCode = (userId) => {
    return request({
        url: `/admin/code/${userId}`,
        method: "DELETE",
    });
};

//修改溯源码?
export const updateCode = (data) => {
    return request({
        url: `/admin/code/change`,
        method: "PUT",
        data,
    });
};

//获取溯源码(粗查)
export const getCode = (params) => {
    return request({
        url: "/admin/code/page",
        method: "GET",
        params,
    })
}

//获取溯源码(细查)
export const getCodeDetail = (id) => {
    return request({
        url: `/admin/code/${id}`,
        method: "GET",
    })
}