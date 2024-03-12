import request from "./request";

//获取订单新鲜详情
export const getOrigin = (orderId) => {
    return request({
        url: `/admin/order/getDetail?orderId=${orderId}`,
        method: "GET",
    });
};

//订单发货
export const deliverOrder = (data) => {
    return request({
        url: `/admin/order/deliver`,
        method: "POST",
        data,
    });
};

//获取订单
export const getOrder = (data) => {
    return request({
        url: "/admin/order/list",
        method: "POST",
        data,
    })
}

//获取地址与用户
export const getAddress = (addressId) => {
    return request({
        url: `/admin/order/address?addressId=${addressId}`,
        method: "GET",
    })
}