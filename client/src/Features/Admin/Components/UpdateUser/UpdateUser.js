import React from "react";
import { useParams } from "react-router-dom";
import { useUpdateUserMutation } from "app/api/userService";
import { message, Form, Button, Input, Space } from "antd";
import Sidebar from 'Features/Admin/Components/Sidebar/Sidebar';
import './UpdateUser.scss';
import 'Features/Admin/index.scss';

const UpdateUser = () => {
    const params = useParams();
    const [updateUser] = useUpdateUserMutation();
    const onSubmit = (data) => {
        updateUser({
            id: params.id,
            data: data,
            headers: { accessToken: JSON.parse(localStorage.getItem('user')).token }
        }).then((response) => {
            if (response.data.error !== undefined) {
                message.error(response.data.error.message);
            } else message.success('Updated successfully');
            console.log(response);
        },
        );
    };

    const [form] = Form.useForm();
    return (
        <div className="update-user">
            <div className="home-admin">
                <Sidebar />
                <div className="admin-selected-features">
                    <div className="title" >
                        <h1>Update User</h1>
                    </div>
                   
                    <div className="update-user-form">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onSubmit}
                            initialValues={{
                                name: '',
                                password: '',
                            }}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input />
                            </Form.Item>
                        
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                           
                            <Form.Item>
                                <Space size="middle">
                                <Button type="primary" htmlType="submit">
                                    Update
                                </Button>
                                <Button type="primary" htmlType="reset">
                                    Reset
                                </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>

        );
};

export default UpdateUser;  