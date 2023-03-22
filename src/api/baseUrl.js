/**
 * 请求地址管理
 */
const base = {
    // http://iwenwiki.com/api/blueberryapi/getChengpinInfo.php
    ownUrl: 'http://127.0.0.1:4523/m1/2420754-0-default/',
    // front end
    // Login
    login: "authentication/token/",
    //register
    register: "authentication/user/",

    // Case Learning
    getAllCases: "case/",
    getCaseCategory: "case/category/",
    getCaseByDiseaseName: "case/name/",
    getCaseByCaseId: "case/number/",

    // Questions and Tests
    getQuestionList: "quiz/question/",


    // back end
    // basicStructureAndFunctionManagement
    // departmentManagement
    getDepartment: "management/department/",
    //drugManagement
    getMedicine: "management/medicine/",


}

export default base
