import axios from "axios";

export const baseURLAPI = "https://ehprimo.up.railway.app/api/";

const api = axios.create({
    baseURL: baseURLAPI,
});

// // Add a request interceptor
// api.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
// }, function (error) {
//     // Do something with request error
//     console.log("Error", error);
//     return Promise.reject(error);
// });

// Add a response interceptor
api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("Success", response);
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("Error", error);
    if (error.response) console.log("Response error", error.response);
    return Promise.reject(error);
});


export default api;