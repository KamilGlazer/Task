import api from "./api"


export const getKeywords = async (query) => {
    const response = await api.get(`/keywords`,{
        params : {query : query}
    });
    return response.data;
};