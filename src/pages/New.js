import React, { useContext, useState } from "react";
import { SubjectsContext } from "../components/SubjectsContextFiles";
import ButtonBar from "../components/ButtonBar";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
`;

const CheckBox = styled.input`
    transform: scale(1.5);

`;
const SelectColorBox = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 30px;
`;
const Select = styled.select`
  font-size: 18px;
  font-weight: bold;
  height: 30px;
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
`;
const WarningMessage = styled.div`
  font-size: 14px;
  color: red;
  margin-top: 10px;
`;
export default function New() {
  const { subjects, setSubjects } = useContext(SubjectsContext);
  const [subData, setSubData] = useState({
    subject_name: "",
    class_type: "",
    professor_name: "",
    color: "",
    id: "",
  });
  const [day, setDay] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
  });
  const [showWarning, setShowWarning] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSubData({
      ...subData,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const goMain = () => {
    navigate("/Main");
  };

  const addSubject = () => {
    if (!subData.subject_name || !subData.class_type) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
    const newSubject = { ...subData, day };
    const newSubjects = [...subjects, newSubject];
    setSubjects(newSubjects);
    goMain();
    console.log(subjects);
  };

  const handleCheckbox = (event) => {
    const { name, checked } = event.target;
    setDay({
      ...day,
      [name]: checked,
    });
  };

  return (
    <div>
      <ButtonBar headText={"과목추가"} />
      <SubForm onSubmit={handleSubmit}>
        <SubBox>
          <label>
            과목이름{" "}
            <Input
              name="subject_name"
              placeholder="과목"
              onChange={handleChange}
            ></Input>
          </label>
          {"  "}
        </SubBox>
        <label>
          교수이름{" "}
          <Input
            name="professor_name"
            placeholder="교수명"
            onChange={handleChange}
          ></Input>
        </label>
        <DayBox>
          월
          <Label>
            <CheckBox
              type="checkbox"
              name="mon"
              checked={day.mon}
              value={day.mon}
              onChange={handleCheckbox}
            />
          </Label>
          화
          <Label>
            <CheckBox
              type="checkbox"
              name="tue"
              checked={day.tue}
              value={day.tue}
              onChange={handleCheckbox}
            />
          </Label>
          수
          <Label>
            <CheckBox
              type="checkbox"
              name="wed"
              checked={day.wed}
              value={day.wed}
              onChange={handleCheckbox}
            />
          </Label>
          목
          <Label>
            <CheckBox
              type="checkbox"
              name="thu"
              checked={day.thu}
              value={day.thu}
              onChange={handleCheckbox}
            />
          </Label>
          금
          <Label>
            <CheckBox
              type="checkbox"
              name="fri"
              checked={day.fri}
              value={day.fri}
              onChange={handleCheckbox}
            />
          </Label>
        </DayBox>
        <SelectColorBox>  
            <label>
            <Select name="class_type" onChange={handleChange}>
            <Option selected disabled hidden>
              과목종류
            </Option>
            <Option value="전공필수">전공필수</Option>
            <Option value="전공선택">전공선택</Option>
            <Option value="교양">교양</Option>
            <Option value="기타">기타</Option>
          </Select>
            </label>       
          <label>
            과목색상 :{" "}
            <input type="color" name="color" onChange={handleChange}></input>
          </label>
        </SelectColorBox>

        <Button type="submit" onClick={addSubject}>
          과목추가
        </Button>
      </SubForm>
    </div>
  );
}
