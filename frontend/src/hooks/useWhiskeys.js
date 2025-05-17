import { useEffect,useState } from "react";

import axios from "axios";

export default function useWhiskeys(token){
    const [whiskeys,setWhiskeys] = useState([]);

    useEffect(()=>{
        if (!token) return;
        axios.get("http://localhost:5000/whiskeys",{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(res=> setWhiskeys(res.data))
        .catch(err => console.error(err));

    },[token]);
    return [whiskeys,setWhiskeys];
}