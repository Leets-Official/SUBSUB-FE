import axios from "axios";
export const login = async (userid, password) => {
  try {
    const result = await axios.post("/login", { userid, password });
    return result.data.token;
  } catch (error) {
    console.error("에러발생", error);
    throw error;
  }
};
