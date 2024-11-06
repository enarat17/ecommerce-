import axios from "axios";

const siteName = process.env.NEXT_PUBLIC_DEVELOPMENT_SITE

export const fetchCoupons = async ()=>{
    try{
        const response = await axios.get(`${siteName}/api/v1/coupons`)
        return response.data.data.data
    }catch(error){
        throw error;
    }
}