import { useEffect, useState } from "react";
import { getAccount } from "../services/accountService";
import { useLocation } from "react-router-dom";
import { FaUser} from 'react-icons/fa'

const Navbar = () => {
    const [account,setAccount] = useState({ownerName:"",balance:0});
    const location = useLocation();

    useEffect(() => {
        const fetchAccount = async () => {
            try{
                const response = await getAccount(1);
                console.log("Dane konta z API:", response);
                setAccount(response);
            }catch(error) {
                console.error("Error : ", error);
            }
        }
        fetchAccount();
    },[location]);

    return (
        <div className="fixed top-4 right-8 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white 
                        rounded-full shadow-lg p-2 flex flex-col items-center gap-2 w-40 hover:scale-105 hover: duration-800">
            <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                    <FaUser className="text-emerald-600 text-xl" />
                </div>
                <p className="font-semibold">{account.ownerName || "Unknown User"}</p>
            </div>
            <p className="text-sm ">{account.balance?.toFixed(2)} USD</p>
        </div>
    );
}

export default Navbar;