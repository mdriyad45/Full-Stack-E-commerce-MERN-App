const backendDomain = 'http://localhost:8000';

const SummaryApi = {
    signUp: {
        url: `${backendDomain}/api/signup`,
        method: 'post'
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: 'post'
    },
    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: 'get'
    },
    logout_user: {
        url: `${backendDomain}/api/userLogout`,
        method: 'get'
    },
    allUser: {
        url: `${backendDomain}/api/all-user`,
        method: 'get'
    },
    updatedUser: {
        url: `${backendDomain}/api/update-user`,
        method: 'post'
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: 'post'
    },
    getProduct:{
        url: `${backendDomain}/api/get-product`,
        method: 'get'
    },
    updateProduct:{
        url: `${backendDomain}/api/update-product`,
        method: 'post'
    }
}

export default SummaryApi;