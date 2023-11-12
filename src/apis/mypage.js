import axios from "axios";

export const getMyPage = async()=>{
    const access = localStorage.getItem('access')
    const result = await axios.get('api받아 올 경로', {
        headers:{
            Authorization:access,
        }
    });
    return result.data;
}