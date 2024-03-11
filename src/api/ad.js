import request from "./request";

//上传广告?差文件上传
export const uploadAd = (data) => {
    return request({
        url: `/admin/ad/add`,
        method: "POST",
        data,
    });
};

//删除广告
export const deleteAd = (userId) => {
    return request({
        url: `/admin/ad/delete?id=${userId}`,
        method: "DELETE",
    });
};

//修改广告
export const updateAd = (data) => {
    return request({
        url: `/admin/ad/update`,
        method: "PUT",
        data,
    });
};

//获取广告
export const getAd = () => {
    return request({
        url: "/admin/ad/list",
        method: "GET",
    })
}