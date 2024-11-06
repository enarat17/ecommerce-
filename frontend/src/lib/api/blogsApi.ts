import axios from "axios";

const siteName = process.env.NEXT_PUBLIC_DEVELOPMENT_SITE

export const fetchArticles = async ()=>{
    try{
        const response = await axios.get(`${siteName}/api/v1/blogs`)
        return response.data.data.data
    }catch(error){
        throw error;
    }
}