import { message, Form, Modal, Checkbox } from "antd";
import { DatePicker, Input } from "antd";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import {
  editEducation,
  addEducation,
  editCourse,
  addCourse,
} from "../../../services";

export default function FormEdit({
  visible,
  resumeId,
  setVisible,
  data,
  education,
  setFormType,
}) {
  const [formFieldsEducation, setFormFieldsEducation] = useState({
    degree: "",
    school: "",
    dateFrom: "",
    dateTo: "",
  });
  const [formFieldsCourse, setFormFieldsCourse] = useState({
    title: "",
    university: "",
    date: "",
    certificate: "",
  });
  const [checkOngoing, setCheckOngoing] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    if (data && education) {
      const [dateFrom, dateTo] = data?.graduated?.split("/");
      if (dateTo.trim() === "Ongoing") {
        setCheckOngoing(true);
      }

      setFormFieldsEducation({
        degree: data.degree,
        school: data.school,
        dateFrom,
        dateTo,
      });
    } else if (data && !education) {
      setFormFieldsCourse({
        title: data.courseTitle,
        university: data.university,
        date: data.date,
        certificate: data.certificate,
      });
    }
  }, [data]);

  const handleOnSubmitEducation = (event) => {
    event.preventDefault();
    const education = {
      degree: formFieldsEducation.degree,
      school: formFieldsEducation.school,
      graduated: `${moment(formFieldsEducation.dateFrom).format("MMMM-YYYY")}/${
        checkOngoing
          ? "Ongoing"
          : moment(formFieldsEducation.dateTo).format("MMMM-YYYY")
      }`,
    };
    if (data) {
      editEducation(data._id, education)
        .then((res) => {
          if (res.ok) {
            message.success("Success");
            formRef.current.resetFields([
              "degree",
              "school",
              "graduated",
              "dateFrom",
              "dateTo",
            ]);
            setVisible(false);
          }
        })
        .catch((err) => {
          message.error(`${err}`);
          formRef.current.resetFields([
            "degree",
            "school",
            "graduated",
            "dateFrom",
            "dateTo",
          ]);
          setVisible(false);
        });
    } else {
      addEducation(resumeId, education)
        .then((res) => {
          if (res.ok) {
            message.success("Success");
            formRef.current.resetFields([
              "degree",
              "school",
              "graduated",
              "dateFrom",
              "dateTo",
            ]);
            setVisible(false);
            setFormType(false);
          }
        })
        .catch((err) => {
          message.error(`${err}`);
          formRef.current.resetFields([
            "degree",
            "school",
            "graduated",
            "dateFrom",
            "dateTo",
          ]);
          setVisible(false);
          setFormType(false);
        });
    }
    return true;
  };

  const renderEducationForm = () => {
    const onChangeForm = (changedValues) => {
      if (!changedValues.ongoing) {
        const [key, value] = Object.entries(changedValues)[0];
        setFormFieldsEducation((state) => ({ ...state, [key]: value }));
      }
    };

    const onChangeCheckbox = () => {
      setCheckOngoing(!checkOngoing);
    };

    return (
      <Form
        ref={formRef}
        name="edit-form"
        onValuesChange={onChangeForm}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item name="degree">
          <Input
            defaultValue={formFieldsEducation.degree || undefined}
            placeholder="Degree"
          />
        </Form.Item>
        <Form.Item name="school">
          <Input
            defaultValue={formFieldsEducation.school || undefined}
            placeholder="School"
          />
        </Form.Item>
        <Form.Item label="Graduated" className="graduated-form-item">
          <Form.Item name="dateFrom">
            <DatePicker
              format={"MMMM-YYYY"}
              defaultValue={
                formFieldsEducation.dateFrom
                  ? moment(formFieldsEducation.dateFrom, "MMMM-YYYY")
                  : undefined
              }
              picker="month"
              showToday={false}
              placeholder="From"
            />
          </Form.Item>
          <Form.Item name="dateTo">
            <DatePicker
              format={"MMMM-YYYY"}
              defaultValue={
                !checkOngoing && formFieldsEducation.dateTo
                  ? moment(formFieldsEducation.dateTo, "MMMM-YYYY")
                  : undefined
              }
              picker="month"
              showToday={false}
              placeholder="To"
            />
          </Form.Item>
          <Form.Item>
            <Checkbox onChange={onChangeCheckbox} checked={checkOngoing}>
              Ongoing
            </Checkbox>
          </Form.Item>
        </Form.Item>
      </Form>
    );
  };

  const handleOnSubmitCourse = (event) => {
    event.preventDefault();
    const course = {
      courseTitle: formFieldsCourse.title,
      university: formFieldsCourse.university,
      certificate: formFieldsCourse.certificate,
      date: checkOngoing
        ? "Ongoing"
        : moment(formFieldsEducation.date).format("MMMM-YYYY"),
    };
    if (data) {
      editCourse(data._id, course)
        .then((res) => {
          if (res.ok) {
            message.success("Success");
            setVisible(false);
            formRef.current.resetFields([
              "title",
              "university",
              "certificate",
              "date",
            ]);
          }
        })
        .catch((err) => {
          message.error(`${err}`);
          setVisible(false);
        });
    } else {
      addCourse(resumeId, course)
        .then((res) => {
          if (res.ok) {
            message.success("Success");
            formRef.current.resetFields([
              "title",
              "university",
              "certificate",
              "date",
            ]);
            setVisible(false);
          }
        })
        .catch((err) => {
          message.error(`${err}`);
          setVisible(false);
        });
    }
    return true;
  };

  const renderCourseForm = () => {
    const onChangeForm = (changedValues) => {
      if (!changedValues.ongoing) {
        const [key, value] = Object.entries(changedValues)[0];
        setFormFieldsCourse((state) => ({ ...state, [key]: value }));
      }
    };

    const onChangeCheckbox = () => {
      setCheckOngoing(!checkOngoing);
    };

    return (
      <Form
        ref={formRef}
        name="edit-form course"
        onValuesChange={onChangeForm}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item name="title">
          <Input
            defaultValue={formFieldsCourse.title || undefined}
            placeholder="Course Title"
          />
        </Form.Item>
        <Form.Item name="university">
          <Input
            defaultValue={formFieldsCourse.university || undefined}
            placeholder="University"
          />
        </Form.Item>
        <Form.Item name="certificate">
          <Input
            defaultValue={formFieldsCourse.certificate || undefined}
            placeholder="Certifiacate URL"
          />
        </Form.Item>
        <Form.Item className="date-form-item">
          <Form.Item name="date">
            <DatePicker
              format={"MMMM-YYYY"}
              defaultValue={
                !checkOngoing && formFieldsCourse.date
                  ? moment(formFieldsCourse.date, "MMMM-YYYY")
                  : undefined
              }
              picker="month"
              showToday={false}
              placeholder="Date"
            />
          </Form.Item>
          <Form.Item>
            <Checkbox onChange={onChangeCheckbox} checked={checkOngoing}>
              Ongoing
            </Checkbox>
          </Form.Item>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={`${data ? "Edit" : "Add"} ${education ? "Education" : "Course"}`}
      className="form-modal"
      visible={visible}
      onCancel={() => {
        setVisible(false);
        if (!data) {
          setFormType(false);
        }
      }}
      okText={data ? "Edit" : "Add"}
      onOk={education ? handleOnSubmitEducation : handleOnSubmitCourse}
    >
      {education ? renderEducationForm() : renderCourseForm()}
    </Modal>
  );
}
