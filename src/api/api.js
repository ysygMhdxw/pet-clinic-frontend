/**
 * 业务请求方法管理
 */

import base from './baseUrl'
import {httpDelete, httpGet, httpPost, httpPut, Delete, Post, Put} from './http'

export const storeToken = (token) => {
    localStorage.setItem("token", "Token " + token)
}
export const storeUserName = (userName) => {
    localStorage.setItem("username", userName)
}

const api = {
    getLogin(params) {
        const url = base.ownUrl + base.login
        return httpPost(url, params)
    },
    getRegister(params) {
        const url = base.ownUrl + base.register
        return Post(url, params)
    },
    editPassword(params) {
        const url = base.ownUrl + base.editPassword
        return Put(url, params)
    },
    //Case Study Management API
    getAllCases() {
        const url = base.ownUrl + base.getAllCases
        return httpGet(url)
    },
    getCaseCategories() {
        const url = base.ownUrl + base.getCaseCategory
        return httpGet(url)
    },
    getCaseByDiseaseName(disease_name) {
        let url = `${base.ownUrl}${base.getCaseByDiseaseName}${disease_name}/`
        if (disease_name === "") {
            url = `${base.ownUrl}${base.getCaseByDiseaseName}`
        }
        return httpGet(url)
    },
    getCaseByCaseId(case_id) {
        const url = `${base.ownUrl}${base.getCaseByCaseId}${case_id}/`
        return httpGet(url)
    },
    getCaseCheckUpByCaseNumber(case_number) {
        const url = `${base.ownUrl}${base.getCaseCheckUpByCaseNumber}${case_number}/`
        return httpGet(url)
    },
    deleteCasesByCaseIds(case_numbers) {
        const url = `${base.ownUrl}${base.getAllCases}`
        return httpDelete(url, {case_number_list: case_numbers})
    },
    addCase(case_data) {
        const url = `${base.ownUrl}${base.getAllCases}`
        return httpPost(url, case_data)
    },
    //Department Management API
    getDepartment() {
        const url = `${base.ownUrl}${base.getDepartment}`
        return httpGet(url)
    },
    getDepartmentById(id) {
        const url = `${base.ownUrl}${base.getDepartment}${id}/`
        return httpGet(url)
    },
    getDepartmentInstrumentationById(id) {
        const url = `${base.ownUrl}${base.getDepartmentInstrumentation}${id}`
        return httpGet(url)
    },
    getDepartmentCheckupById(id) {
        const url = `${base.ownUrl}${base.getDepartmentCheckup}${id}`
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
    //Medicine Management API
    getMedicine() {
        const url = `${base.ownUrl}${base.getMedicine}`
        return httpGet(url)
    },
    deleteMedicine(medicine_id) {
        const url = `${base.ownUrl}${base.getMedicine}${medicine_id}/`
        return httpDelete(url)
    },
    editMedicine(medicine) {
        const url = `${base.ownUrl}${base.getMedicine}`
        return httpPut(url, medicine)
    },
    addMedicine(medicine) {
        const url = `${base.ownUrl}${base.getMedicine}`
        return httpPost(url, medicine)
    },
    //Instrument Management API
    getInstrument() {
        const url = `${base.ownUrl}${base.getInstrument}`
        return httpGet(url)
    },
    deleteInstrument(instrument_id) {
        const url = `${base.ownUrl}${base.getInstrument}${instrument_id}/`
        return httpDelete(url)
    },
    editInstrument(instrument) {
        const url = `${base.ownUrl}${base.getInstrument}`
        return httpPut(url, instrument)
    },
    addInstrument(instrument) {
        const url = `${base.ownUrl}${base.getInstrument}`
        return Post(url, instrument)
    },
    //Checkup Management API
    getCheckup() {
        const url = `${base.ownUrl}${base.getCheckup}`
        return httpGet(url)
    },
    deleteCheckup(checkup_id) {
        const url = `${base.ownUrl}${base.getCheckup}${checkup_id}/`
        return httpDelete(url)
    },
    editCheckup(checkup) {
        const url = `${base.ownUrl}${base.getCheckup}`
        return httpPut(url, checkup)
    },
    addCheckup(checkup) {
        const url = `${base.ownUrl}${base.getCheckup}`
        return Post(url, checkup)
    },
    //Hospitalization Management API
    getHospitalization() {
        const url = `${base.ownUrl}${base.getHospitalization}`
        return httpGet(url)
    },
    deleteHospitalization(hospitalization_id) {
        const url = `${base.ownUrl}${base.getHospitalization}${hospitalization_id}/`
        return httpDelete(url)
    },
    editHospitalilzation(hospitalization) {
        const url = `${base.ownUrl}${base.getHospitalization}`
        return Put(url, hospitalization)
    },
    addHospitalization(hospitalization) {
        const url = `${base.ownUrl}${base.getHospitalization}`
        return Post(url, hospitalization)
    },
    //TestAPI methods
    getQuestionList() {
        const url = `${base.ownUrl}${base.getQuestionList}`
        return httpGet(url)
    },

    getQuizList() {
        const url = `${base.ownUrl}${base.getQuizList}`
        return httpGet(url)
    },

    getQuestion(type, id) {
        const url = `${base.ownUrl}${base.getQuestionList}${type}/${id}/`
        return httpGet(url)
    },

    deleteQuestions(questions) {
        const url = `${base.ownUrl}${base.getQuestionList}`
        return Delete(url, questions)
    },

    addQuestions(questions) {
        const url = `${base.ownUrl}${base.getQuestionList}`
        return Post(url, questions)
    },
    //Users Management API
    getUsers() {
        const url = `${base.ownUrl}${base.getPersonnel}`
        return httpGet(url)
    },
    deleteUsers(users) {
        const url = `${base.ownUrl}${base.getPersonnel}`
        return Delete(url, {users: users})
    },
    editUser(user) {
        const url = `${base.ownUrl}${base.getPersonnel}`
        return Put(url, user)
    },
    addUser(user) {
        const url = `${base.ownUrl}${base.register}`
        return Post(url, user)
    },
    //Role Play Management API
    getRoleInfo(roleId) {
        const url = `${base.ownUrl}${base.getRoleInfo}${roleId}/`
        return httpGet(url, roleId)
    },


}

export default api
