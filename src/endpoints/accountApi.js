const baseAddress = 'http://0.0.0.0:8880';

class accountApi {
    static login = `${baseAddress}/api/account/login`;
    static signup = `${baseAddress}/api/account/signup`;
    static profile = `${baseAddress}/api/account/profile`;
}

export default accountApi;
