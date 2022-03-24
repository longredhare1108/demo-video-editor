
import { RBOLServerURL } from '../util/serverUrl';

const baseURL = RBOLServerURL + "/api/auth";

export const LOGIN = baseURL + '/signin'
export const UPDATE_COMPANY_ACCOUNT = baseURL + '/company/update'
export const UPDATE_LECTURER_ACCOUNT = baseURL + '/lecturer/update'
export const DELETE_LECTURER_ACCOUNT = baseURL + '/lecturer/delete'
export const UPDATE_STUDENT_ACCOUNT = baseURL + '/student/update'