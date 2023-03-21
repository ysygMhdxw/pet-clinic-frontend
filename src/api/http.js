/**
 * 封装请求
 */
import qs from 'qs'

/**
 * get
 */
export function httpGet(url) {
    const result = fetch(url)
    return result
}
/**
 * post
 */
export function httpPost(url, params) {
    const result = fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'accept': 'application/json,text/plain,*/*',
            // 'authorizatoin':"",
        },
        body: qs.stringify(params)
    })
    return result
}

/**
 * put
 */
export function httpPut(url,params) {
    const result = fetch(url, {
        method: 'PUT',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'accept': 'application/json,text/plain,*/*',
            // 'authorizatoin':"",
        },
        body: qs.stringify(params)
    })
    return result
}

/**
 * delete
 */
export function httpDelete(url) {
    const result = fetch(url, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'accept': 'application/json,text/plain,*/*',
            // 'authorizatoin':"",
        }
    })
    return result
}
