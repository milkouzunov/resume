import { useState } from "react";
import { Form, Input, Button, Avatar, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Loader from "../Components/Loader";
import emailjs from "emailjs-com";

import env from "react-dotenv";

function About({ resumeData }) {
  const { name, imageUrl, bio, phone, email } = resumeData;
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const sendEmail = (data) => {
    setIsLoading(true);
    // TODO add loader for send email form in button

    emailjs.send(env.SERVICE_ID, env.TEMPLATE_ID, data, env.USER_ID)
    .then(() => {
        message.success("Send");
        setIsLoading(false);
        form.resetFields(['name', 'subject', 'email', 'message']);
    }, (error) => {
        message.error(error.text);
        form.resetFields(['name', 'subject', 'email', 'message'])
        setIsLoading(false);
    });

  }

  return (
    <section id="about">
      <div className="row flex contacts">
        <div className="nine columns main-col">
          <div className="three columns avatar-container">
            <Avatar
              size={{
                xs: 70,
                sm: 70,
                md: 70,
                lg: 84,
                xl: 90,
                xxl: 120,
              }}
              src={imageUrl}
            />
          </div>
          <h2>About Me</h2>

          <p>{bio}</p>
          <div className="row">
            <div className="columns contact-details">
              <h2>Contact Details</h2>
              <p className="address">
                <span>{name}</span>
                <br />
                <span>
                  <span>
                    <a className="phone-number" href={`tel:${phone}`}>
                      <FontAwesomeIcon icon={faPhoneAlt} />
                      {phone}
                    </a>
                  </span>
                </span>
                <br />
                <span>
                  <a className="email" href={`mailto:${email}`}>
                    <FontAwesomeIcon icon={faEnvelope} />
                    {email}
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="contact-me">
          <Form
            name="contact-form"
            labelCol={{
              span: 8,
            }}
            form={form}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={sendEmail}
            autoComplete="off"
          >
            <Form.Item className="header">
              <div className="title">
                Contact Me
              </div>
            </Form.Item>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input placeholder="* Your Name" />
            </Form.Item>
            <Form.Item
              name="subject"
              rules={[
                {
                  required: true,
                  message: "Please input subject!",
                },
              ]}
            >
              <Input placeholder="* Subject" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email address!",
                },
              ]}
            >
              <Input placeholder="* Email Address" />
            </Form.Item>
            <Form.Item
              name="message"
              rules={[
                {
                  required: true,
                  message: "Please input your message!",
                },
              ]}
            >
              <Input.TextArea placeholder="* Message" autoSize={{ minRows: 5, maxRows: 6 }} />
            </Form.Item>
            <Form.Item
            >
              <Button disabled={isLoading ? true : false} className="send-btn" htmlType="submit">
                {isLoading ? <Loader/> : 'Send'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default About;
