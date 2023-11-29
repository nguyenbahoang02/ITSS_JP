import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import './Login.scss';
import { useLoginMutation } from 'app/api/authService';

function Login() {
    const [form] = Form.useForm();
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const onFinish = (values) => {
        const { username: email, password } = values;
        login({ email, password })
            .then((res) => {
                localStorage.setItem('user', JSON.stringify(res.data));
                message.success('Login successfully');
                if (res.data.roleId === 2) {
                    navigate('/admin');
                } else navigate('/');
            })
            .catch((err) => console.log(err));
    };
    return (
        <Form form={form} name="normal_login" className="login-form" size="large" onFinish={onFinish}>
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
}

export default Login;
