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
        const url = base.ownUrl + base.getCaseCategory
        return httpGet(url)
    },
    getCaseByDiseaseName(disease_name) {
        const url = `${base.ownUrl}${base.getCaseByDiseaseName}${disease_name}/`
        return httpGet(url)
    },
    getCaseByCaseId(case_id) {
        const url = `${base.ownUrl}${base.getCaseByCaseId}${case_id}/`
        return httpGet(url)
    },

    getDepartment(){
        const url=`${base.ownUrl}${base.getDepartment}$`
        return httpGet(url)
    }

}

export default api
