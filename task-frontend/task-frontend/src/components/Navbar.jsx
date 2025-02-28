import { useEffect, useState } from "react";
import { getAccount } from "../services/accountService";
import { FaUser} from 'react-icons/fa'

const Navbar = () => {
    const [account,setAccount] = useState({ownerName:"",balance:0});

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
    },[]);

    return (
        <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-md">
            <div className="flex items-center text-white">
                <FaUser className="mr-2 text-xl" /> 
                <div className="text-right">
                    <p className="font-semibold">{account.ownerName || "Unknown User"}</p>
                </div>
            </div>
            <div className="text-white font-semibold">
                <p>Balance: {account.balance?.toFixed(2)} USD</p>
            </div>
        </nav>
    );
}

export default Navbar;