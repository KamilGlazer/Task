import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCampaign } from "../services/campaignService";
import { FaSave } from "react-icons/fa";
import { getKeywords } from "../services/keywordsService";


const AddCampaignPage = () => {
    const [campaign,setCampaign] = useState({
        name: "",
        keywords: [],
        bidAmount: 0,
        campaignFund: 0,
        campaignStatus: "ON",
        town: "",
        radius: 0,
        emeraldAccountId: 1
    });
    const [keywordSuggestions,setKeywordSuggestions] = useState([]);
    const [towns] = useState(["Warsaw", "Krakow", "Gdansk", "Wroclaw", "Poznan"]);
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCampaign({ ...campaign, [name]: value });
    };

    const handleKeywordsChange = async (e) => {
        const query = e.target.value;
        if (query.length > 0) {
            const suggestions = await getKeywords(query);
            setKeywordSuggestions(suggestions);
        } else {
            setKeywordSuggestions([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
                await createCampaign(campaign);
                navigate("/");
        }catch(error) {
            console.error("Error : " , error);
        }
    }


    return (
        <div>
        </div>
    );

}

export default AddCampaignPage