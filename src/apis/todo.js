import axios from "axios";
export const addTodo = async (index,dueDate,content, access_token) => {
    try {
      const result = await axios.post(
        "/property",
        {
        subjectId: index,            
        expiredAt: dueDate,
        content: content,
        isCompleted: false,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log('새로운 투두 과목 입력 완료',result);
      return result;
    } catch (error) {
      console.error("에러발생", error);
      throw error;
    }
  };
export const getTodo = async (index,access_token) => {
    try {
      const result = await axios.get(`/subject/${index}`,{
        headers:{
          Authorization: `Bearer ${access_token}`
        }
      });
      console.log('투두 불러오기 성공');
      return result.data;
    } catch (error) {
      console.error("투두 불러오는데 에러발생", error);
    }
  };

  export const getUrgent = async (access_token) => {
    try {
      const result = await axios.get('/property/top',{
        headers:{
          Authorization: `Bearer ${access_token}`
        }
      });
      console.log('급한거',result);
      return result.data;
    } catch (error) {
      console.error("top 5 투두 불러오는데 에러발생", error);
    }
  };

  export const deleteToDo = async (access_token,id) => {
    try {
      await axios.delete(`/property/delete/${id}`,{
        headers:{
          Authorization: `Bearer ${access_token}`
        }
      });
    } catch (error) {
      console.error("삭제하는데 에러발생", error);
    }
  };

  export const updateToDo = async (access_token, updatedTodo, index) => {
    try {
      const result = await axios.patch(
        `/property/update/${updatedTodo.propertyId}`,
        {
        expiredAt: updatedTodo.expiredAt,
        content: updatedTodo.content,
        isCompleted: updatedTodo.isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log('체크 후 patch 송신',result);
    } catch (error) {
      console.error("체크 후 업데이트 중 오류발생",updatedTodo, error);
      throw error;
    }
  }
  export const getSortToDo = async (index,access_token ) => {
    try {
      const result = await axios.get(`/property/${index}`,{
        headers:{
          Authorization: `Bearer ${access_token}`
        }
      });
      console.log('정렬된거 들고오기',result.data);
      return result.data;
    } catch (error) {
      console.error("투두 불러오는데 에러발생", error);
    }
  };