import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SubjectsContext } from "../components/SubjectsContextFiles";
import ButtonBar from "../components/ButtonBar";
import styled from "styled-components";

const SubForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-top: 50px;
  align-items:center;
  font-size:18px;
`;
const DayBox = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: row;
`;

const Label = styled.label`
  margin-right: 16px;
  font-size: 18px;
`;

const Input = styled.input`
  font-size: 18px;
`;

const Select = styled.select`
  font-size: 18px;
`;
const SubBox = styled.div`
  font-size: 18px;
`;
export default function Edit() {
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

  const navigate = useNavigate();
  const { index } = useParams();

  useEffect(() => {
    const subject = subjects[index];
    if (subject) {
      setSubData({
        subject_name: subject.subject_name,
        class_type: subject.class_type,
        professor_name: subject.professor_name,
        color: subject.color,
        id: subject.id,
      });
      setDay({
        mon: subject.day.mon,
        tue: subject.day.tue,
        wed: subject.day.wed,
        thu: subject.day.thu,
        fri: subject.day.fri,
      });
    }
  }, [subjects, index]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "color") {
      setSubData({
        ...subData,
        color: value,
      });
    } else {
      setSubData({
        ...subData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = { ...subData, day };
    setSubjects(updatedSubjects);
    navigate("/Main");
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
      <ButtonBar headText={"과목수정"} />
      <SubForm onSubmit={handleSubmit}>
      <SubBox>
        <label>
          과목{" "}
          <Input
            name="subject_name"
            placeholder="과목"
            value={subData.subject_name}
            onChange={handleChange}
          ></Input>
        </label>
        {'  '}
        <Select
          name="class_type"
          onChange={handleChange}
          value={subData.class_type}
        >
          <option disabled hidden>
            과목종류
          </option>
          <option value="전필">전필</option>
          <option value="전선">전선</option>
          <option value="교양">교양</option>
          <option value="기타">기타</option>
        </Select>
        </SubBox>
        <label>
          교수명{" "}
          <Input
            name="professor_name"
            placeholder="교수명"
            value={subData.professor_name}
            onChange={handleChange}
          ></Input>
        </label>
        <DayBox>
          월
          <Label>
            <Input
              type="checkbox"
              name="mon"
              checked={day.mon}
              value={day.mon}
              onChange={handleCheckbox}
            />
          </Label>
          화
          <Label>
            <Input
              type="checkbox"
              name="tue"
              checked={day.tue}
              value={day.tue}
              onChange={handleCheckbox}
            />
          </Label>
          수
          <Label>
            <Input
              type="checkbox"
              name="wed"
              checked={day.wed}
              value={day.wed}
              onChange={handleCheckbox}
            />
          </Label>
          목
          <Label>
            <Input
              type="checkbox"
              name="thu"
              checked={day.thu}
              value={day.thu}
              onChange={handleCheckbox}
            />
          </Label>
          금
          <Label>
            <Input
              type="checkbox"
              name="fri"
              checked={day.fri}
              value={day.fri}
              onChange={handleCheckbox}
            />
          </Label>
        </DayBox>
        <label>
          색상 선택 :{" "}
          <input
            type="color"
            defaultValue={subData.color}
            onChange={(e) =>
              handleChange({ target: { name: "color", value: e.target.value } })
            }
          ></input>
        </label>
        <button type="submit">수정완료</button>
      </SubForm>
    </div>
  );
}
