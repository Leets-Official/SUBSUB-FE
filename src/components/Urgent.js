import styled from "styled-components";

const UrgentBox = styled.div`
  display: flex;
  flex-direction: row;
  row-gap: 10px; 
  margin:10px;
`;
export default function Urgent({ sub, todo, date, deadline }) {
  return (
    <UrgentBox>
        <input type="checkbox"></input>
        <div>
        {sub}{todo} {date} {deadline}
        </div>
    </UrgentBox>
  );
}
