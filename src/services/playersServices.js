import api from ".";
import { StatusCodes } from "http-status-codes";

import usersServices from "./usersServices";

export async function loginPlayer(data = {}) {
    const response = await usersServices.createUserToken(data);
    if (response.status == StatusCodes.OK)
        return await usersServices.readTokenAuthUser(data);
    return response;
}

export async function registerPlayer(data = {}) {
    return api.post(`v1/players/register/`, data)
        .then(async function (response) {
            // handle success
            return response;
        })
        .catch(function (error) {
            // handle error
            return error.response ? error.response : error;
        });
}

const playersServices = {
    loginPlayer,
    registerPlayer,
}
export default playersServices;