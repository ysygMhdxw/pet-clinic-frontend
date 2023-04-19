/**
 * 请求地址管理
 */
const base = {
    // http://iwenwiki.com/api/blueberryapi/getChengpinInfo.php
    // ownUrl: 'http://127.0.0.1:4523/m1/2420754-0-default/',
    ownUrl: 'http://127.0.0.1:8000/',
    // front end
    // Login
    login: "authentication/token/",
    //register
    register: "authentication/user/register/",
    editPassword: "authentication/user/",
    //status
    getStatus:"authentication/user/status/",

    // Case Learning
    getAllCases: "case/",
    getCaseCategory: "case/category/",
    getCaseByDiseaseName: "case/name/",
    getCaseByCaseId: "case/number/",
    getCaseCheckUp: "case/checkup/",
    getCaseByDiseaseType: "case/type/",

    // Questions and Tests
    getQuestionList: "quiz/question/",
    getQuizList: "quiz/",

    //Role Play
    getRoleInfo:"role/",


    // back end
    // basicStructureAndFunctionManagement
    // departmentManagement
    getDepartment: "management/department/",
    getDepartmentInstrumentation: "management/department/instrumentation/",
    getDepartmentCheckup: "management/department/checkup/",
    //drugManagement
    getMedicine: "management/medicine/",
    //personnelManagement
    getPersonnel: 'authentication/user/',
    //instrumentManagement
    getInstrument:'management/instrumentation/',
    //checkupManagement
    getCheckup:'management/checkup/',
    //hospitalizationManagement
    getHospitalization:'management/hospitalization/',


}

export default base
