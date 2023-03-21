/**
 * 业务请求方法管理
 */

import base from './baseUrl'
import {httpDelete, httpGet, httpPost, httpPut} from './http'

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


    getDepartment() {
        const url = `${base.ownUrl}${base.getDepartment}`
        return httpGet(url)
    },
    deleteDepartment(department_id) {
        const url = `${base.ownUrl}${base.getDepartment}${department_id}/`
        return httpDelete(url)
    },
    editDepartment(department) {
        const url = `${base.ownUrl}${base.getDepartment}`
        return httpPut(url, department)
    },
    addDepartment(department) {
        const url = `${base.ownUrl}${base.getDepartment}`
        return httpPost(url, department)
    },
    getQuestionList() {
        const url = `${base.ownUrl}${base.getQuestionList}`
        return httpGet(url)
    }


}

export default api
