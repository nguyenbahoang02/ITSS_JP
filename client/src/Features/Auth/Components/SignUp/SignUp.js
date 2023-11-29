import { Button, Form, Input, message } from 'antd';

import './SignUp.scss';
import { useSignUpMutation } from 'app/api/authService';

function SignUp({ setTab }) {
    const [form] = Form.useForm();
    const [signUp] = useSignUpMutation();

    const onFinish = (values) => {
        const { email, password, nickname: name } = values;
        signUp({ email, password, name })
            .then((res) => {
                message.success('Sign up successfully');
                setTab(1);
            })
            .catch((err) => console.log(err));
    };
    return (
        <Form
            size="large"
            labelCol={{ span: 6 }}
            labelWrap
            labelAlign="left"
            form={form}
            name="register"
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="nickname"
                label="Nickname"
                tooltip="What do you want others to call you?"
                rules={[
                    {
                        required: true,
                        message: 'Please input your nickname!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
}

export default SignUp;
