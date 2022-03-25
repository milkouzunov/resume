import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useContext } from "react";
import FormEdit from "../ModalForm/ModalForm";
import { deleteEducation } from "../../../services";
import { message } from "antd";
import AuthContext from "../../../AuthContext";

function Education({ education, resumeId }) {
  const [visible, setVisible] = useState(false);
  const auth = useContext(AuthContext);

  const delEducation = () => {
    deleteEducation(resumeId, education._id)
      .then((res) => {
        if (res._id === resumeId) {
          message.success("Deleted");
        }
      })
      .catch((err) => {
        message.error(`${err}`);
      });
  };

  return (
    <div className="education-content">
      <div className="title">
        <h3>
          <p>
            {education.degree} <span>&bull; </span>
            <em className="date">{education.graduated}</em>
          </p>
        </h3>
        <p className="info">{education.school}</p>
      </div>
      {auth && (
        <div className="actions">
          <p>
            <EditOutlined
              onClick={() => {
                setVisible(true);
              }}
              title="Edit"
            />
            <DeleteOutlined onClick={delEducation} title="Delete" />
          </p>
        </div>
      )}
      {visible && (
        <FormEdit
          data={education}
          visible={visible}
          setVisible={setVisible}
          education={true}
        />
      )}
    </div>
  );
}

export default Education;
