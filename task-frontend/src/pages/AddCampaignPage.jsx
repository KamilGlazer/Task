import { use, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCampaign, updateCampaign, getCampaign } from "../services/campaignService";
import { FaSave, FaTimes } from "react-icons/fa";
import { getKeywords } from "../services/keywordsService";


const AddCampaignPage = () => {
    const { id } = useParams();

    const [campaign, setCampaign] = useState({
        name: "",
        keywords: [],
        bidAmount: "",
        campaignFund: "",
        campaignStatus: "ON",
        town: "",
        radius: "",
        emeraldAccountId: 1,
    });

    const [keywordSuggestions, setKeywordSuggestions] = useState([]);
    const [keywordInput, setKeywordInput] = useState("");
    const [errors, setErrors] = useState({});
    const [towns] = useState(["Warszawa", "Krakow", "Gdansk", "Wroclaw", "Poznan"]);
    const navigate = useNavigate();


    useEffect(() => {
        if (id) {
            getCampaign(id).then(data => setCampaign(data)).catch(err => console.error("Error fetching campaign:", err));
        }
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCampaign({ ...campaign, [name]: value });
    };

    const handleKeywordsChange = async (e) => {
        const query = e.target.value;
        setKeywordInput(query);

        if (query.length > 0) {
            try {
                const suggestions = await getKeywords(query);
                setKeywordSuggestions(suggestions);
            } catch (error) {
                console.error("Error fetching keyword suggestions:", error);
            }
        } else {
            setKeywordSuggestions([]);
        }
    };


    const handleSelectKeyword = (keyword) => {
        if (keyword && !campaign.keywords.includes(keyword)) {
            setCampaign({ ...campaign, keywords: [...campaign.keywords, keyword] });
        }
        setKeywordInput(""); 
        setKeywordSuggestions([]); 
    };


    const handleRemoveKeyword = (index) => {
        setCampaign({
            ...campaign,
            keywords: campaign.keywords.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let validationErrors = {};

        if (!campaign.name.trim()) validationErrors.name = "Campaign Name is required";
        if (campaign.keywords.length === 0) validationErrors.keywords = "At least one keyword is required";
        if (!campaign.bidAmount) validationErrors.bidAmount = "Bid Amount is required";
        if (!campaign.campaignFund) validationErrors.campaignFund = "Campaign Fund is required";
        if (!campaign.town) validationErrors.town = "Town selection is required";
        if (!campaign.radius) validationErrors.radius = "Radius is required";

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        try {
            if(id){
                await updateCampaign(id, campaign);
            }else{
                await createCampaign(campaign);
            }
            navigate("/");
        } catch (error) {
            console.error("Error submitting campaign:", error);
        }
    };

    return (
        <div className="p-16 bg-gray-100 min-h-screen flex justify-center items-center">
            <form 
                onSubmit={handleSubmit} 
                className="flex flex-col bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full space-y-4"
            >
                <h2 className="text-2xl font-bold text-emerald-700 text-center">
                    {id ? "Edit Campaign" : "Add New Campaign"}
                </h2>

                <div>
                    <label className="block font-semibold ml-2 text-gray-700">Campaign Name</label>
                    <input
                        type="text"
                        name="name"
                        value={campaign.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="relative">
                    <label className="block font-semibold ml-2 text-gray-700">Keywords</label>
                    <input
                        type="text"
                        value={keywordInput}
                        onChange={handleKeywordsChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && keywordInput.trim()) {
                                e.preventDefault(); 

                                if (!campaign.keywords.includes(keywordInput.trim())) {
                                    setCampaign(prevState => ({
                                        ...prevState,
                                        keywords: [...prevState.keywords, keywordInput.trim()]
                                    }));
                                }

                                setKeywordInput(""); 
                            }
                        }}
                        className="w-full p-3 border border-gray-300 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        placeholder="Type a keyword and press Enter..."
                    />
                    
                    {errors.keywords && <p className="text-red-500 text-sm mt-1">{errors.keywords}</p>}


                    {keywordSuggestions.length > 0 && (
                        <div className="absolute z-10 bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto w-full mt-1">
                            {keywordSuggestions.map((keyword) => (
                                <p
                                    key={keyword}
                                    onClick={() => handleSelectKeyword(keyword)}
                                    className="cursor-pointer p-2 hover:bg-emerald-100 transition-colors duration-200"
                                >
                                    {keyword}
                                </p>
                            ))}
                        </div>
                     )}

                    <div className="flex flex-wrap gap-2 mt-2">
                        {campaign.keywords.map((keyword, index) => (
                            <div key={index} className="flex items-center bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full shadow-sm">
                                <span className="mr-2">{keyword}</span>
                                <FaTimes 
                                    className="cursor-pointer text-emerald-500 hover:text-emerald-700"
                                    onClick={() => handleRemoveKeyword(index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {[
                    { label: "Bid Amount", name: "bidAmount", type: "number", min: "1" },
                    { label: "Campaign Fund", name: "campaignFund", type: "number" },
                    { label: "Radius (km)", name: "radius", type: "number" }
                ].map((field) => (
                    <div key={field.name}>
                        <label className="block font-semibold ml-2 text-gray-700">{field.label}</label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={campaign[field.name]}
                            onChange={handleChange}
                            min={field.min}
                            className="w-full p-3 border border-gray-300 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                        {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
                    </div>
                ))}

                <div>
                    <label className="block font-semibold ml-2 text-gray-700">Status</label>
                    <select
                        name="campaignStatus"
                        value={campaign.campaignStatus}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                        <option value="ON">On</option>
                        <option value="OFF">Off</option>
                    </select>
                </div>
                

                <div>
                    <label className="block font-semibold ml-2 text-gray-700">Town</label>
                    <select
                        name="town"
                        value={campaign.town}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                        <option value="">Select Town</option>
                        {towns.map((town) => (
                            <option key={town} value={town}>
                                {town}
                            </option>
                        ))}
                    </select>
                    {errors.town && <p className="text-red-500 text-sm mt-1">{errors.town}</p>}
                </div>

                <button
                    type="submit"
                    className="flex items-center justify-center px-6 py-3 rounded-2xl shadow-lg border-2 border-emerald-500 bg-emerald-500 font-semibold text-white
                    hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-700 hover:text-white hover:scale-105
                    transition-all duration-300"
                >
                    <FaSave className="mr-2 text-lg" />
                    Save Campaign
                </button>
            </form>
        </div>
    );
};

export default AddCampaignPage;