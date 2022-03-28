import { message, Input, Modal, Button, Avatar } from "antd";
// import { PlusOutlined } from "@ant-design/icons"
import {  useState } from "react";

import { addSkill } from "../../../services/index";

// import js_icon from "../../../images/js_icon.png";

export default function TestModal({resumeId, setVisible}) {
  const [skills, setSkills] = useState([
    {
      name: 'JavaScript',
      iconURL: 'https://cdn.iconscout.com/icon/free/png-256/javascript-2752148-2284965.png',
    },
    {
      name: 'React',
      iconURL: 'R - #0091D7',
    }
  ]);
  const [skill, setSkill] = useState({
    name: '',
    iconURL: '',
  });
  const [color, setColor] = useState('');
  const [currentSkills, setCurrentSkills] = useState([]);

  const onSave = () => {
    addSkill(resumeId, currentSkills)
    .then((res) => {
      if(res.ok) {
        setVisible(false);
      }
    }).catch((err) => {
      message.error(`${err}`)
    })
  }

  const handleAddSkill = () => {
    if (skill.name.trim() !== '' && skill.iconURL.trim() !== '') {
      setSkills([...skills,
        {
          name: skill.name,
          iconURL: `${skill.iconURL} - ${color}`,
        }
      ]);
      setCurrentSkills([...skills,
        {
          name: skill.name,
          iconURL: color !== '' ? `${skill.iconURL} - ${color}` : skill.iconURL,
        }
      ]);
      
    }
    setColor('#ffffff')
    setSkill({
        name: '',
        iconURL: '',
    });
  };

  const colorInput = (
    <Input
      type="color"
      className="color-input"
      value={color}
      onChange={(e) => setColor(e.target.value)}
    />
    // TODO... add clear icon in color input
  );
  return (
    <Modal
      title="Edit Skills"
      className="form-modal skills"
      visible={true}
      onOk={onSave}
      okText="Save"
    >
      <div className="inputs">
        <Input
          className="skill-name"
          onChange={(e) => setSkill(state => ({ ...state, name: e.target.value }))}
          value={skill.name}
          placeholder="Skill"/>
        <Input
          onChange={(e) => setSkill(state => ({ ...state, iconURL: e.target.value }))}
          placeholder="Icon URL or Initial Letters"
          value={skill.iconURL}
          suffix={colorInput}
        />
        <Button className="add-btn" onClick={handleAddSkill} type="button" value="Add" >Add</Button>
      </div>
      <div className="current-skills">
        <ul className="skills">
          {skills.length && skills.map((skill) => (
            <li>
              <Avatar
                shape="square"
                src={skill.iconURL.includes('https') && skill.iconURL}
                style={skill.iconURL.split(' - ') ? { backgroundColor: skill.iconURL.split(' - ')[1]} : {}}
                size={64}
                alt="skill"
              >
                {!skill.iconURL.includes('https') && skill.iconURL.split(' - ')[0]}
              </Avatar>
              <span className="skill-name">{skill.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}