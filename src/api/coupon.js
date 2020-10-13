import request from "@/utils/request";

export function couponList(params) {
    return request({
        url: '/coupon/list',
        method: 'post',
        data:{
            couponName:params.couponName,
            type:params.type,
            startTime:params.time[0],
            endTime:params.time[1],
            pageSize:params.pageSize,
            pageNum:params.pageIndex
        }
    });
};

export function addCoupon(params) {
    return request({
        url: '/coupon/add',
        method: 'post',
        data: params,
    });
};

export function sendCoupon(params) {
    return request({
        url: '/coupon/sendCoupon',
        method: 'post',
        data: params
    });
}


export function deleteCoupon(params) {
    return request({
        url: '/coupon/deleteCoupon',
        method: 'post',
        data: {
            couponId: params
        },
    });
}


export function findCouponById(params) {
    return request({
        url: '/coupon/findCouponById',
        method: 'post',
        data: {
            couponId: params
        },
    });
}