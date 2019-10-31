const baseAddress = 'http://0.0.0.0:8880';

class accountApi {
    static home = `${baseAddress}/api/account`;
    static login = `${baseAddress}/api/account/login`;
    static signup = `${baseAddress}/api/account/signup`;
    static getProfile = `${baseAddress}/api/account/profile`;
    static updateProfile = `${baseAddress}/api/account/profile/update`;
}

export default accountApi;
