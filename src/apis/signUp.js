import axios from "axios";
export const signUp = async (newId, newPassword, nickName) => {
  try {
    const result = await axios.post(
      "/register",
      {
        "userid": newId,
        "nickname": nickName,
        "password": newPassword,
      }
    );
    return result.data;
  } catch (error) {
    console.error("에러발생", error);
    throw error;
  }
};
    