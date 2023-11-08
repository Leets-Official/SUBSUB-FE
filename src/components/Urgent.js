export default function Urgent({ sub, todo, date, deadline }) {
  return (
    <div>
      <p>
        <input type="checkbox"></input>
        {sub} {todo} {date} {deadline}
      </p>
    </div>
  );
}
