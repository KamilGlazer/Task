import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { getCampaigns } from "../services/campaignService";
import { FaPlus } from "react-icons/fa";

const HomePage = () => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try{
                const data = await getCampaigns();
                setCampaigns(data);
            }catch(error){
                console.error("Error : ", error);
            }
        }
        fetchCampaigns();
    },[]);


    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="flex justify-center mb-6">
            <Link 
                to="/campaign/add" 
                className="flex items-center px-6 py-3 rounded-lg shadow-lg border-2 border-emerald-600 bg-gradient-to-r from-emerald-500 to-emerald-600 font-semibold text-white
                        hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-700 hover:text-white 
                        transition-all duration-300">
                <FaPlus className="mr-2 text-lg" />
                Add Campaign
            </Link>
            </div>
    
            <div className="grid grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                    <div 
                        key={campaign.id} 
                        className="p-6 border-2 border-emerald-500 rounded-lg bg-white shadow-md 
                        transition-transform transform hover:scale-102 hover: duration-800"
                    >
                        <h2 className="font-semibold text-xl text-emerald-700 mb-2">{campaign.name}</h2>
                        <p className="text-gray-600">Status: {campaign.campaignStatus}</p>
                        <p className="text-gray-600 mb-4">Town: {campaign.town}</p>
                        <Link 
                        to={`/campaign/${campaign.id}`} 
                        className="px-4 py-2 border-2 border-emerald-500 text-white bg-emerald-500 font-semibold 
                                rounded-md"
                        >Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;