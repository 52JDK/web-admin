import request from '../utils/request';
import api from '@/utils/request'
export function fetchData(params)  {
    return request({
        url: '/product/list',
        method: 'post',
        data: {
            name:params.name,
            productId:params.productId,
            pageSize:params.pageSize,
            pageNum:params.pageIndex
        }
    });
};

export const findSpecies = query => {
    return request({
        url: '/product/findSpecies',
        method: 'post'
    });
};


export function editProductEnable(data) {
    return request({
        url: '/product/enable',
        method: 'post',
        data:{
            productId:data.productId,
            enable:data.enable,
        }
    });
};

export function productDetail(productId) {
    return request({
        url: '/product/detail',
        method: 'post',
        data:{
            productId:productId
        }
    });
};

export function deleteProduct(productId){
    return request({
        url:'/product/delete',
        method:'post',
        data:{
            productId:productId,
        }
    })
}

export function addProduct(data) {
    return request({
        url: '/product/add',
        method: 'post',
        data: {
            id:data.id,
            name: data.name,
            recommend: data.recommend,
            productId: data.productId,
            img: data.img,
            price:data.price,
            rollImg: data.rollImg,
            detailImg: data.detailImg,
            introduction: data.introduction,
            virtualNum: data.virtualNum,
            brandId: data.brandId,
            sort: data.sort,
            rights: data.rights.toString(),
            tableData: data.tableData,

        }
    });
};


export function uploadFile(formData) {
    return request({
        url: '/product/uploadFile',
        data: {
            files:formData
        },
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}



export function swiperList() {
    return request({
        url: './button.json',
        method: 'get'
    })
}


export function userLogin(param) {
    return request({
        url: '/userLogin/index',
        method: 'post',
        data:{
            userName:param.username,
            passWord:param.password
        }
    })
}

export function donateList() {
    return request({
        url: '/userLogin/findDonateList',
        method: 'post',
    })
}