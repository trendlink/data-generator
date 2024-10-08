import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://cors-anywhere.herokuapp.com/https://data.gcis.nat.gov.tw',
  baseURL: 'https://data.gcis.nat.gov.tw',
  // baseURL: 'https://cors-anywhere.herokuapp.com/https://www.twtainan.net',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
  },
});

//設置 request 的攔截器
api.interceptors.request.use(
  // 2xx
  (config) => {
    // Do something before request is sent
    console.log('config-->', config);
    return config;
  },
  // not 2xx
  // Do something with request error
  (error) => {
    console.log('API error-->', error);
    Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    console.log('response', response);
    return {
      data: response.data,
    };
  },
  (error) => {
    console.log('API error-->', error);
    return Promise.reject(error);
  },
);

export default {
  async GET(path) {
    const data = await api.get(path);
    return data;
  },
};
