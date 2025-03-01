import api from "./api";

export const getAccount = async (id) => {
    const response = await api.get(`/account/${id}`);
    return response.data;
};