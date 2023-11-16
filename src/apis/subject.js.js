import axios from "axios";
export const addSubject = async (subject, access_token) => {
  try {
    const result = await axios.post(
      "/subject",
      {
        subjectName: subject.subject_name,
        professorName: subject.professor_name,
        mon: subject.mon,
        tue: subject.tue,
        wed: subject.wed,
        thu: subject.thu,
        fri: subject.fri,
        classType: subject.class_type,
        color: subject.color,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log('새로운 데이터 과목 입력 완료',result);
    return result;
  } catch (error) {
    console.error("에러발생", error);
    throw error;
  }
};
export const deleteSub = async (index, access_token, navigate) => {
    try {
      await axios.delete(`/subject/delete/${index}`,{
        headers:{
          Authorization: `Bearer ${access_token}`
        }
      });  
    } catch (error) {
      console.error("삭제하는데 에러발생", error);
    }
    navigate(`/Main`);
  };

  export const getSubjects = async (index, access_token, setSubject ) => {
    try {
      const result = await axios.get(`/subject/${index}`,{
        headers:{
          Authorization: `Bearer ${access_token}`
        }
      });
      setSubject(result.data);  
    } catch (error) {
      console.error("과목 투두 불러오는데 에러발생", error);
    }
  };