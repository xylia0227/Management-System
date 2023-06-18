import http from "@/utils/request";
//请求首页数据
export const getData = () =>{
    return http.get('/home/getData')
}
export const getUser = (params)=>{
    return http.get('/user/getUser',params)
}

export const updateUser = (data)=>{
    return http.post('user/edit',data)
}
export const delUser = (data)=>{
    return http.post('user/del',data)
}
export const createUser = (data)=>{
    return http.post('user/add',data)
}
export const getMenu =(data)=>{
    return http.post('permission/getMenu',data)
}