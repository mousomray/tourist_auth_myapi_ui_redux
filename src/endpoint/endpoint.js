export const endpoints = {

    auth: {
        register: "auth/register",
        login: "auth/login",
        dashboard: "auth/dashboard",
        forget: "auth/forgetpassword",
        update: "auth/updatepassword",
        deleteaccount:"auth/deleteaccount"
    },

    cms: {
        create: "api/createtourist",
        read: "api/touristlist",
        delete: "api/deletetourist"
    },

}

export const myendpoints = [
    endpoints.auth.register, //Index number 0
    endpoints.auth.login, //Index number 1
    endpoints.auth.dashboard, //Index number 2
    endpoints.cms.create, //Index number 3
    endpoints.cms.read, //Index number 4
    endpoints.cms.delete, //Index number 5
    endpoints.auth.forget, //Index number 6
    endpoints.auth.update, //Index number 7
    endpoints.auth.deleteaccount //Index number 8
]