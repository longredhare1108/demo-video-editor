import { UPDATE_COMPANY_ACCOUNT, UPDATE_LECTURER_ACCOUNT, DELETE_LECTURER_ACCOUNT,UPDATE_STUDENT_ACCOUNT } from '../URL/user-url';
import axios from 'axios';
import { headers } from '../util/headers';
export default {
    updateCompanyAccount: data => axios.post(UPDATE_COMPANY_ACCOUNT, JSON.stringify(data), {headers}).then(res => res.data.payload),
    updateLecturerAccount: data => axios.post(UPDATE_LECTURER_ACCOUNT, JSON.stringify(data), {headers}).then(res => res.data.payload),
    deleteLecturerAccount: data => axios.post(DELETE_LECTURER_ACCOUNT, JSON.stringify(data), {headers}).then(res => res.data.payload),
    updateStudentAccount: data => axios.post(UPDATE_STUDENT_ACCOUNT, JSON.stringify(data), {headers}).then(res => res.data.payload),
}