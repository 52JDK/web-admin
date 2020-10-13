import request from "@/utils/request";

export function roleList(params) {
    return request({
        url: '/permission/list',
        method: 'post',
        data: {
            pageNum: params.pageNum,
            pageSize: params.pageSize
        }
    });
}

export function permissionList() {
    return request({
        url: '/permission/permissionList',
        method: 'post',
    });
}


export function permissionUpdate(params) {
    return request({
        url: '/permission/update',
        method: 'post',
        data:params
    });
}