import axios from 'axios';
export const login = async(id ,pw) =>{
    const result = await axios.post('http백주소', {id, pw});
    return result.data.token;
}