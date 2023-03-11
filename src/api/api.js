/**
 * 业务请求方法管理
 */

import base from './baseUrl'
import { httpGet } from './http'

const api = {
    // getLogin(params) {
    //     const url = base.ownUrl + base.login
    //     return httpPost(url, params)
    // },
    getCaseCategories() {
        const url = base.ownUrl + base.getCaseCategoriesUrl
        return httpGet(url)
    },
    getCaseByDiseaseName(params) {
        const url = base.ownUrl + base.getCaseByDiseaseName
        return httpGet(url, params)
    },
    getCaseByCaseId(params) {
        const url = base.ownUrl + base.getCaseByCaseId
        return httpGet(url, params)
    }

}

export default api
