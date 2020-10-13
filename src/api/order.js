import request from "@/utils/request";

export function orderList(params) {
    return request({
        url: '/order/list',
        method: 'post',
        data: {
            uid: params.uid,
            orderCode: params.orderCode,
            pageSize: params.pageSize,
            pageNum:params.pageIndex,
        }
    });
}

export function orderDetail(orderCode) {
    return request({
        url: '/order/detail',
        method: 'post',
        data: {
            orderCode: orderCode
        }
    });
}

export function OrderDelivery(data) {
    return request({
        url: '/order/delivery',
        method: 'post',
        data: {
            orderCode: data.orderCode,
            expressCompany: data.expressCompany,
            expressCode: data.expressCode
        }
    });
}