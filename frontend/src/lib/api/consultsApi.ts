import axios from "axios";

const siteName = process.env.NEXT_PUBLIC_DEVELOPMENT_SITE
const consultUrl = `${siteName}/api/v1/consults`;

export const fetchConsults = async () => {
  try {
    const response = await axios.get(consultUrl);
    return response.data.data.data;
  } catch (error) {
    throw error;
  }
};

export const getOneConsult = async (slug: string) => {
  try {
    const response = await axios.get(`${consultUrl}/${slug}`);
    return response.data.data.data;
  } catch (error) {
    throw error;
  }
};

export const postConsult = async(data:FormData) =>{
  try{
    const response = await axios.post(
      `${consultUrl}`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return  response.data;
  }catch(error){
    throw error;
  }
}

export const updateOneConsult = async({id,data}:{id:string,data:FormData})=>{
  try{
    const response = await axios.patch(
      `${consultUrl}/${id}`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }catch(error){
    throw error;
  }
}