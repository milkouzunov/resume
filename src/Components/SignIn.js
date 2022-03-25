import { useHistory } from "react-router-dom";
import { Modal, Form, Input, message } from "antd";
import { signIn } from "../services";

export default function SignIn({handleStartTotal}) {
  const history = useHistory();


  const onSubmitForm = (values) => {
    signIn(values)
    .then(res => {
      message.success(res);
      handleStartTotal();
      history.push('/');
    })
    .catch(err => message.error(`${err}`))
  }

  return (
  <>
    <Modal
      title="Sign In"
      className="sign-in"
      centered
      visible={window.location.href.includes('/login')}
      onCancel={() => history.push('/')}
      footer={null}
    >
      <Form
        name="sign-in"
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
        onFinish={onSubmitForm}
      >
        <Form.Item name="username">
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="password">
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Input type="submit" value="Sign In" />
        </Form.Item>
      </Form>
    </Modal>
  </>
  );
}
