import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SubjectsContext } from "../components/SubjectsContextFiles";
import ButtonBar from "../components/ButtonBar";
import styled from "styled-components";
import { getSubjects } from "../apis/subject.js";
import findToken from "../findToken";

const SubForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  margin-top: 100px;
  width: 650px;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
`;
const DayBox = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 18px;
`;
const Label = styled.label`
 margin-right: 10px;
`;
const Input = styled.input`
  font-size: 20px;
  width: 300px;
  height:35px;
  border-radius: 10px;
  font-weight: bold;
`;
const Select = styled.select`
  font-size: 18px;
  font-weight: bold;
  height: 30px;;
`;
const CheckBox = styled.input`
    transform: scale(1.5);
`;
const SelectColorBox = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 30px;
`;
const Option = styled.option`
font-size: 18px;
font-weight: bold;
`;
const SubBox = styled.div`
`;
const Button = styled.button`
  border-radius: 6px;
  border: none;
  font-size: 20px;
  height: 40px;
  width: 300px;
  color: white;
  font-family: "Arial", sans-serif;
  font-weight: bold;
  background-color: #228b22;
  cursor: pointer;
  &:hover {
    background-color: #006400;
  }
`;
export default function Edit() {
  const { subjects, setSubjects } = useContext(SubjectsContext);
  const [subject, setSubject] = useState({});
  const navigate = useNavigate();
  const { index } = useParams();
  const access_token=findToken()

  const [day, setDay] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
  });


  useEffect(() => {
    getSubjects(index, access_token, setSubject)
  }, [index]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "color") {
      setSubject({
        ...subject,
        color: value,
      });
    } else {
      setSubject({
        ...subject,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = { ...subject, day };
    setSubjects(updatedSubjects);
    navigate("/Main");
  };

  const handleCheckbox = (event) => {
    const { name, value } = event.target;
    setDay({
      ...day,
      [name]: value,
    });
  };

  return (
    <div>
      <ButtonBar headText={"수정기능 미완성"} />
      <SubForm onSubmit={handleSubmit}>
      <SubBox>
        <label>
          과목이름{" "}
          <Input
            name="subjectName"
            placeholder="과목"
            value={subject.subjectName}
            onChange={handleChange}
          ></Input>
        </label>
        {'  '}
        </SubBox>
        <label>
          교수이름{" "}
          <Input
            name="professorName"
            placeholder="교수명"
            value={subject.professorName}
            onChange={handleChange}
          ></Input>
        </label>
        <DayBox>
          월
          <Label>
            <CheckBox
              type="checkbox"
              name="mon"
              checked={subject.mon}
              value={subject.mon}
              onChange={handleCheckbox}
            />
          </Label>
          화
          <Label>
            <CheckBox
              type="checkbox"
              name="tue"
              checked={subject.tue}
              value={subject.tue}
              onChange={handleCheckbox}
            />
          </Label>
          수
          <Label>
            <CheckBox
              type="checkbox"
              name="wed"
              checked={subject.wed}
              value={subject.wed}
              onChange={handleCheckbox}
            />
          </Label>
          목
          <Label>
            <CheckBox
              type="checkbox"
              name="thu"
              checked={subject.thu}
              value={subject.thu}
              onChange={handleCheckbox}
            />
          </Label>
          금
          <Label>
            <CheckBox
              type="checkbox"
              name="fri"
              checked={subject.fri}
              value={subject.fri}
              onChange={handleCheckbox}
            />
          </Label>
        </DayBox>
        <SelectColorBox> 
          <label> 
        <Select
          name="classType"
          onChange={handleChange}
          value={subject.classType}
        >
          <Option value="전공필수">전공필수</Option>
          <Option value="전공선택">전공선택</Option>
          <Option value="교양">교양</Option>
          <Option value="기타">기타</Option>
        </Select>
        </label>
        <label>
          과목색상 :{" "}
          <input
            type="color"
            defaultValue={subject.color}
            onChange={(e) =>
              handleChange({ target: { name: "color", value: e.target.value } })
            }
          ></input>
        </label>
        </SelectColorBox>
        <Button type="submit" disabled>수정완료</Button>
      </SubForm>
    </div>
  );
}
