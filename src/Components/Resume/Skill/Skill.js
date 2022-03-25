import js_icon from "../../../images/js_icon.png";
import { Avatar } from "antd";

function Skill({ skill }) {
  return (
    <li>
      <Avatar shape="square" size={64} alt="skill" src={js_icon} />
      <span className="skill-name">{skill.name}</span>
    </li>
  );
}

export default Skill;
