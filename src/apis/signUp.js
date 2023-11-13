import axios from 'axios'
export const signUp=async (newId, newPassword, nickName)=>{
    const result =await axios.post('주소',{
        newId, newPassword, nickName
    });
    return result.data;
}