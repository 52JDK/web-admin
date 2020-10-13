import request from "@/utils/request";

export function routerList() {
    return request({
        url: '/router/list',
        method: 'post',
    });
}

export function routerUpdate(params) {
    return request({
        url: '/router/update',
        method: 'post',
        data:params
    });
}

export function routerDelete(params) {
    return request({
        url: '/router/delete',
        method: 'post',
        data:params
    });
}
