import request from "./request";

//上传商品?差文件上传
export const uploadItem = (data) => {
    return request({
        url: "/admin/commodity/add",
        method: "POST",
        data,
    });
};

//删除商品
export const deleteItem = (itemId) => {
    return request({
        url: `/admin/commodity/${itemId}`,
        method: "DELETE",
    });
};

//修改商品
export const updateItem = (data) => {
    return request({
        url: "/admin/commodity/update",
        method: "PUT",
        data,
    });
};

//获取商品
export const getItem = (params) => {
    return request({
        url: "/admin/commodity/page",
        method: "GET",
        params,
    })
}
