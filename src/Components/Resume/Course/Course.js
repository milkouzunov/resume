import { Modal } from "antd";
import { useState, useContext } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import FormEdit from "../ModalForm/ModalForm";
import { message } from "antd";
import certificate from "../../../images/certificate.jpeg";
import { deleteCourse } from "../../../services";
import AuthContext from "../../../AuthContext";

function Course({ course, resumeId }) {
  const [certificateVisible, setCertificateVisible] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const auth = useContext(AuthContext);

  const delEducation = () => {
    deleteCourse(resumeId, course._id)
    .then(res => {
      if (res._id === resumeId) {
        message.success("Deleted");
      }
    })
    .catch(err => {
      message.error(`${err}`);
    })
  }

  return (
    <>
      <div className="course-content">
        <div className="title" onClick={() => setCertificateVisible(true)}>
          <h3>
            <p>
              {course.courseTitle}
              <span> &bull;</span> <em className="date">{course.date}</em>
            </p>
          </h3>
          <p className="info">{course.university}</p>
        </div>
        {auth && (
          <div className="actions">
            <p>
              <EditOutlined title="Edit" onClick={() => setEditFormVisible(true)} />
              <DeleteOutlined title="Delete" onClick={delEducation} />
            </p>
          </div>
        )}
      </div>
      <Modal
        title={course.courseTitle}
        className="certificate-modal"
        centered
        visible={certificateVisible}
        onCancel={() => setCertificateVisible(false)}
        footer={null}
      >
        <img alt="certificate-image" src={certificate} />
      </Modal>
      {editFormVisible && (
        <FormEdit
          data={course}
          visible={editFormVisible}
          setVisible={setEditFormVisible}
          education={false}
        />
      )}
    </>
  );
}

export default Course;
