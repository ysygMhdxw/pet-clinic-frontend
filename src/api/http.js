/**
 * 封装请求
 */
import qs from 'qs'
import axios from "axios";


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

/**
 * get
 */
export function httpGet(url) {
    const result = axios.get(url)
    return result
}

/**
 * post
 */
export function httpPost(url, params) {
    const result = axios.post(url,
        qs.stringify(params)
    )
    return result
}

/**
 * put
 */
export function httpPut(url, params) {
    const result = axios.put(url, qs.stringify(params)
    )
    return result
}

/**
 * delete
 */
export function httpDelete(url) {
    const result = axios.delete(url)
    return result
}

/**
 * delete
 * 用body传参
 */
export function Delete(url,data){
    const result  = axios({
        method: 'delete',
        url:url,
        data:data
    })
    return result
}



/**
 * post
 * 用body传参
 */
export function Post(url,data){
    const result  = axios({
        method: 'post',
        url:url,
        data:data
    })
    return result
}