import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCampaign, deleteCampaign } from "../services/campaignService";
import { FaArrowLeft } from "react-icons/fa";

const CampaignDetailsPage = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const data = await getCampaign(id);
                setCampaign(data);
            } catch (error) {
                console.error("Error fetching campaign details:", error);
            }
        };
        fetchCampaign();
    }, [id]);


    const handleDelete = async () => {
            try {
                await deleteCampaign(campaign.id);
                navigate("/"); 
            } catch (error) {
                console.error("Error deleting campaign:", error);
            }
    };


    if (!campaign) {
        return <div className="p-8 text-center text-gray-700">Loading campaign details...</div>;
    }

    return (
        <>
            <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
                <div className="bg-white p-6 rounded-3xl shadow-lg max-w-xl w-full border-2 border-emerald-300">
                    <button
                        className="flex items-center text-emerald-600 hover:text-emerald-800 font-semibold mb-4"
                        onClick={() => navigate("/")}
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Campaigns
                    </button>
                    <h2 className="text-2xl font-bold text-emerald-700 mb-4">{campaign.name}</h2>
                    <p className="text-gray-600"><strong>Status:</strong> {campaign.campaignStatus}</p>
                    <p className="text-gray-600"><strong>Town:</strong> {campaign.town}</p>
                    <p className="text-gray-600"><strong>Bid Amount:</strong> ${campaign.bidAmount}</p>
                    <p className="text-gray-600"><strong>Campaign Fund:</strong> ${campaign.campaignFund}</p>
                    <p className="text-gray-600"><strong>Radius:</strong> {campaign.radius} km</p>
                    <div className="mt-4">
                        <strong className="text-gray-700">Keywords:</strong>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {campaign.keywords.map((keyword, index) => (
                                <span key={index} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-md shadow-sm">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between mt-8">
                        <button 
                            onClick={() => navigate(`/campaign/${campaign.id}/edit`)}
                            className="px-6 py-3 rounded-full shadow-md border-2 border-blue-500 bg-blue-500 font-semibold text-white
                            hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:scale-105 transition-all duration-300"
                        >
                            Edit
                        </button>
    
                        <button 
                            onClick={handleDelete}
                            className="px-6 py-3 rounded-full shadow-md border-2 border-red-500 bg-red-500 font-semibold text-white
                            hover:bg-gradient-to-r hover:from-red-500 hover:to-red-700 hover:scale-105 transition-all duration-300"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
    
};

export default CampaignDetailsPage;
