const baseUrl = 'https://norma.nomoreparties.space/api';

export const API_ORDERS = `${baseUrl}/orders`;
export const API_INGREDIENTS =`${baseUrl}/ingredients`;
export const GET_PASSWORD = `${baseUrl}/password-reset`;
export const RESET_PASSWORD = `${GET_PASSWORD}/reset`;
export const SET_DATA_ACCOUNT = `${baseUrl}/auth/register`;
export const USER_LOGIN = `${baseUrl}/auth/login`;
export const GET_USER = `${baseUrl}/auth/user`;
export const REFRESH_TOKEN = `${baseUrl}/auth/token`;
export const USER_LOGIN_OUT = `${baseUrl}/auth/logout`;
export const GET_ORDERS_LIST = 'wss://norma.nomoreparties.space/orders/all';