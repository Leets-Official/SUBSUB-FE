export default function findToken() {
    const cookies = document.cookie;
    const cookieArray = cookies.split(";");
  
    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      if (cookie.startsWith("access_token=")) {
        const startIndex = "access_token=".length;
        const endIndex = cookie.length;
        return cookie.substring(startIndex, endIndex);
      }
    }
    return null;
  }