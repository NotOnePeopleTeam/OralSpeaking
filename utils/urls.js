// 请求接口
const BaseUrl = `https://yunketang.cn.utools.club/`;
const login = `${ BaseUrl}api/mp_auth`;
const upImg =  `${ BaseUrl}api/upload_image`;
const _language = `${ BaseUrl}api/index`;
const _teacherList = `${ BaseUrl}api/teachers`
const _teacherDetail = `${ BaseUrl}api/teacherInfo`
module.exports = {
    login, upImg, _language, _teacherList, _teacherDetail
}