import axios from "axios";

let isRefreshing  = false;
let refreshSubcribers = [];

const httpRequest = axios.create();

async function refreshToken() {
    try {
        const refreshResponse = await axios.post(REACT_APP_BASE_URL + '/refresh_token', {
            refreshToken: localStorage.getItem('refreshToken')
        });
        localStorage.setItem('accessToken', refreshResponse.data.accessToken)
        localStorage.setItem('refreshToken', refreshResponse.data.refreshToken)
        return refreshResponse.data.accessToken;
    }catch (err) {
        throw err;
    }
}

httpRequest.interceptors.response.use(
    (response) => response,  
    (err) => {
        const {config, response} = err;
        const status = response?.status;
        if(status === 401 && !config._retry) {
            if(!isRefreshing ) {
                isRefreshing  = true;
                refreshToken().then(newAccessToken => {
                    config.headers.Authorization = 'Bearer ' + newAccessToken;
                    config._retry = true;
                    refreshSubcribers.forEach(cb => cb(newAccessToken));
                }).catch(err => {
                    console.error('Error refreshing token: ', err);
                }).finally(() => {
                    isRefreshing  = false;
                    refreshSubcribers = []
                })
            }
            const retryOriginalRequest = new Promise(resolve => {
                refreshSubcribers.push(token => {
                    config.headers.Authorization = 'Bearer ' + newAccessToken;
                    resolve(httpRequest(config));
                });
            });
            return retryOriginalRequest;
        }
        return Promise.reject(err);

    }
);
export default httpRequest;