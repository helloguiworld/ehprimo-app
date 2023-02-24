import api from ".";
import { StatusCodes } from "http-status-codes";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function storeUser(user) {
    try {
        delete user['password'];
        await AsyncStorage.setItem('@User', JSON.stringify(user));
    } catch (error) {
        console.log("Erro ao salvar user em AsyncStorage");
    }
}

async function readStoragedUser() {
    try {
        let item = await AsyncStorage.getItem('@User');
        console.log("@User", JSON.parse(item));
        return JSON.parse(item);
    } catch (error) {
        console.log("Erro ao obter user em AsyncStorage");
    }
}

export async function createUserToken(data = {}, setCommonHeader = true) {
    return api.post(`token-auth/`, data)
        .then(async function (response) {
            // handle success
            if (response.status == StatusCodes.OK && response.data.token && setCommonHeader) {
                api.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;
                await AsyncStorage.setItem('@Token', response.data.token);
            }
            return response;
        })
        .catch(function (error) {
            // handle error
            return error.response ? error.response : error;
        });
}

export async function readTokenAuthUser() {
    return api.get(`auth-user/`)
        .then(async function (response) {
            // handle success
            if (response.status == StatusCodes.OK)
                storeUser(response.data);
            return response;
        })
        .catch(function (error) {
            // handle error
            return error.response ? error.response : error;
        });
}

export async function loginUser(data = {}) {
    const response = await createUserToken(data);
    if (response.status == StatusCodes.OK)
        return await readTokenAuthUser(data);
    return response;
}

const usersServices = {
    storeUser,
    readStoragedUser,
    createUserToken,
    readTokenAuthUser,
    loginUser,
}
export default usersServices;