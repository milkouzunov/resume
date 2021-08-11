
function Skill({ skill }) {
  return (
    <li>
      <span style={{ width: skill.level }} className={"bar-expand " + skill.name}></span>
      <em>{skill.name}</em>
    </li>
  );
}

export default Skill;
