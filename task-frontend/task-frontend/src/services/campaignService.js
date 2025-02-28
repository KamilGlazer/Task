import api from "./api"

export const getCampaigns = async () => {
    const response = await api.get("/campaign")
    return response.data
};


export const getCampaign = async (id) => {
    const response = await api.get(`/campaign/${id}`);
    return response.data;
};

export const createCampaign = async (campaign) => {
    const response = await api.post("/campaign", campaign);
    return response.data;
};

export const updateCampaign = async (id, campaign) => {
    const response = await api.put(`/campaign/${id}`, campaign);
    return response.data;
};

export const deleteCampaign = async (id) => {
    await api.delete(`/campaign/${id}`);
};

